# 技术难点与深挖指南（TechDeepDive）

> 面向后续开发/交接：梳理本项目真正"有含金量"的代码与系统设计，说明每个难点**难在哪、当前怎么解决的、还有什么可以深挖**。
> 阅读顺序建议按章节顺序，前四章是核心战斗链路，五六章是基础设施纪律。

## 难点总览

| # | 模块 | 核心文件 | 难度 | 深挖价值 |
|---|------|----------|------|----------|
| 1 | 伤害结算管线 | DamagePipeline / DamageFormulas | ★★★ | 高（扩展属性/技能必经之路） |
| 2 | 状态效果体系 | StatusEffectBase / ElementalAttackRule | ★★★ | 高 |
| 3 | 路径与预判 | PathData / EnemyMovement / TowerBase | ★★★★ | 高（手感核心） |
| 4 | 士兵拦截与围攻 | Soldier / EnemyBase.Blocker / UnitMelee | ★★★★ | 极高（玩法差异化核心） |
| 5 | 对象池与池化纪律 | ObjectPool / IPoolable | ★★★ | 中（纪律 > 技术） |
| 6 | 关卡就绪系统 | LevelPrewarmController / LevelLoader | ★★★ | 中 |
| 7 | 伤害表现层 | DamageNumberSystem / UnitHealthBarSystem | ★★ | 中 |

---

## 1. 伤害结算管线 —— 纯函数九阶段

**文件**：`Scripts/Damage/DamagePipeline.cs`、`DamageFormulas.cs`、`DamageSystem.cs`、`Combat/DamageEvents.cs`

### 设计要点
- **只算不扣**：`DamagePipeline.Calculate(DamageInfo, attacker, victim)` 是纯函数（不改入参、可重复调用），扣血/吸血执行/事件广播全部由调用方 `DamageSystem.ApplyDamage` 做。这使敌我单位复用同一条管线，也使计算层可单测。
- **九阶段固化顺序**（策划语义：攻方内容先算完，再算受方）：
  ```
  【攻】基础 → 暴击(几率×(1-受方暴击抵抗)) → 增幅(输出最终层)
  【守】护甲(非线性,按类型) → 类型减伤乘区 → 特殊抵抗(按来源) → 最终减伤(承受最终层)
  【尾】取整 → 吸血 roll(基于取整值回算)
  ```
- **公式全部下沉** `DamageFormulas`（静态纯方法），数值参数走 `DamageSystemConfig`（Resources 加载，启动注入 `DamagePipeline.Config`）。护甲为反比例变体：`减伤 = 护甲 / (护甲 + 基准值)`，边际收益递减，调基准值改曲线陡峭度。
- **事件出口统一**：受击方落账后经 `DamageEvents.Raise`（`isAlly` 区分敌我配色），飘字/统计/音效全靠订阅，战斗逻辑与表现零耦合。

### 核心代码

```csharp
// DamagePipeline.cs —— 纯计算入口（只算不扣，同一入参可重复调用）
public static DamageResult Calculate(DamageInfo info, DamageStats attacker, DamageStats victim)
{
    var r = new DamageResult();
    float raw = info.baseDamage;

    // ============ 攻方组（输出侧全部结算完） ============

    // 2 暴击：有效暴击率受受方暴击抵抗压缩；倍率 = 基础120% + 攻方加成
    float critChance = attacker != null ? attacker.critChance : info.criticalChance;
    float critBonus = attacker != null ? attacker.critDamageBonus : info.criticalMultiplier - 1.2f;
    float critResist = victim != null ? victim.critResistance : 0f;
    r.isCritical = DamageFormulas.RollCrit(critChance, critResist);
    if (r.isCritical)
        raw *= DamageFormulas.CritMultiplier(critBonus, Cfg.baseCritMultiplier);

    // 3 攻方伤害增幅（输出最终层：攻方内容到此全部结算完毕）
    if (attacker != null)
        raw = DamageFormulas.ApplyAmplification(raw, attacker);

    float attackerOutput = raw; // 攻方最终输出（供减免量统计）

    // ============ 受方组（承受侧全部结算） ============

    // 4 护甲（非线性；真实伤害跳过）→ 5 类型减伤乘区
    if (victim != null && info.damageType != AttackType.True)
    {
        raw *= 1f - DamageFormulas.ArmorReductionForType(info.damageType, victim, Cfg.armorBaseline);
        raw *= 1f - DamageFormulas.TypeReductionForType(info.damageType, victim);
    }

    // 6 特殊抵抗（按来源分类 + 伤害衰减）
    if (victim != null)
        raw *= 1f - DamageFormulas.SpecialResistanceForKind(info.kind, victim);

    // 7 受方最终减伤（承受最终层）
    if (victim != null)
        raw = DamageFormulas.ApplyFinalReduction(raw, victim);

    // ============ 收尾：承受伤害取整 → 吸血（基于取整后的值回算） ============

    r.finalAmount = Mathf.Max(0f, Mathf.RoundToInt(raw));
    r.mitigated = Mathf.Max(0f, Mathf.RoundToInt(attackerOutput) - r.finalAmount);
    r.lifestealAmount = attacker != null ? DamageFormulas.RollLifesteal(r.finalAmount, attacker) : 0f;

    return r;
}
```

```csharp
// DamageFormulas.cs —— 护甲反比例变体：边际收益递减，调 baseline 改曲线陡峭度
public static float ArmorReduction(float armor, float baseline) =>
    armor <= 0f ? 0f : armor / (armor + Mathf.Max(0.01f, baseline));

// 暴击判定：有效暴击率 = 暴击率 * (1-受方暴击抵抗)
public static bool RollCrit(float critChance, float critResistance) =>
    Random.value < critChance * (1f - Mathf.Clamp01(critResistance));
```

### 难在哪
新增一条计算规则时必须判断它属于攻方组还是受方组、插在哪个乘区位置——顺序错了数值全变（如"增幅在护甲前/后"结果不同）。管线用注释固化了这条契约。

### 可深挖
- **StatModifier 体系接入**（见 `Docs/Design/StatModifierSystemDesign.md`）：当前 `DamageStats` 是扁平字段，词缀/ Buff 系统需要修饰器栈。
- **护盾吸收**：`Soldier.CurrentShield` 目前仅显示不结算，需在管线"受方组"最前插入吸收阶段。
- **特殊抵抗的归轴**：属性/持续伤害暂归 `skillResistance` 轴（`SpecialResistanceForKind`），后续可能拆独立字段。

---

## 2. 状态效果体系 —— 组件式生命周期 + 工厂去重

**文件**：`Scripts/Enemy/StatusEffect/StatusEffectBase.cs`、`StatusEffects.cs`、`Scripts/Damage/ElementalAttackRule.cs`

### 设计要点
- 状态 = **运行时挂到敌人身上的 MonoBehaviour 组件**：`Initialize（施加）→ Update 内 OnTick → 到期 OnRemove → 自毁并注销`。
- **参数三级优先**：SO 资产 > 类默认值（类默认值读全局 `DamageSystemConfig`）——改数值不动代码，图标/文案留 SO 扩展位。
- **叠加语义**：`Stack()` 未到最大层 +1 并触发 `OnStack`，无论如何都刷新剩余时间；同名状态重复施加由 Factory 统一转叠层（不会挂两个同状态组件）。
- **属性攻击链路**（`ElementalAttackRule.RollAndApply`）：命中结算成功 → 查目标实时状态（`DebuffCount/IsChilled/IsBurning`）→ 按策划公式 roll（冰有 debuff 时概率递增、火已燃烧必叠层）→ 按返回名 `ApplyStatus`。概率公式与状态执行分离，miss 不调。

### 核心代码

```csharp
// StatusEffectBase.cs —— 组件式生命周期：Initialize → OnTick → 到期 OnRemove → 自毁注销
public void Initialize(EnemyBase t, StatusEffectData d = null)
{
    target = t;
    data = d;
    remainingTime = d != null ? d.duration : DefaultDuration;
    OnApply();
}

void Update()
{
    remainingTime -= Time.deltaTime;
    OnTick();
    if (remainingTime <= 0f) Expire();
}

void Expire()
{
    OnRemove();
    if (target != null) target.RemoveEffect(this);
    Destroy(this);
}

/// <summary>叠加/刷新：层数未到顶则 +1（触发 OnStack），并刷新剩余时间（刷新不触发 OnStack）</summary>
public void Stack()
{
    if (currentStacks < MaxStacks)
    {
        currentStacks++;
        OnStack();
    }
    remainingTime = data != null ? data.duration : DefaultDuration;
}

/// <summary>强制移除（敌人死亡回池清场用）：立即执行 OnRemove 并销毁组件，不等自然到期</summary>
public void ForceRemove()
{
    OnRemove();
    Destroy(this);
}
```

```csharp
// ElementalAttackRule.cs —— 命中后按策划公式 roll，返回应施加的状态名（空串=不施加）
public string RollApply(int debuffCount, bool alreadyChilled, bool alreadyBurning)
{
    var cfg = DamagePipeline.Config;
    if (cfg == null) return "";
    switch (elementType)
    {
        case ElementalType.Ice:
            if (alreadyChilled)
                return Random.value < DamageFormulas.IceFreezeChance(cfg) ? "Freeze" : "";
            return Random.value < DamageFormulas.IceChillChance(debuffCount, cfg) ? "Chill" : "";
        case ElementalType.Fire:
            return Random.value < DamageFormulas.FireIgniteChance(alreadyBurning, cfg) ? "Burn" : "";
        case ElementalType.Poison:
            return Random.value < DamageFormulas.PoisonChance(cfg) ? "Poison" : "";
        default: return "";
    }
}

/// <summary>命中后一键触发（属性伤害链路入口；miss 不调）：查询目标实时状态 → RollApply → 施加状态</summary>
public void RollAndApply(EnemyBase target)
{
    if (target == null || !target.IsAlive || elementType == ElementalType.None) return;
    string state = RollApply(target.DebuffCount, target.IsChilled, target.IsBurning);
    if (string.IsNullOrEmpty(state)) return;
    target.ApplyStatus(state);
}
```

### 难在哪
效果与移动/回池的生命周期交错：敌人回池必须 `ForceRemove` 清场，否则减速/燃烧残留到池复用的下一只怪（隐性 bug 温床）。

### 可深挖
- 属性索敌偏好：`ElementalAttackRule.TargetingHint` 已固化文案（冰=优先无寒冷最靠前），但 `ITargetStrategy` 尚未读取——接通即成"冰塔不打已冰冻怪"的智能索敌。
- 状态间互斥/转化规则（如冰冻打断燃烧）目前不存在，规则表需要设计。

---

## 3. 路径与预判射击 —— 本项目数学含量最高的部分

**文件**：`Scripts/Map/PathData.cs`、`Scripts/Map/EnemyMovement.cs`、`Scripts/Tower/TowerBase.cs`（GetPredictedAimPoint）

### 3.1 贝塞尔路径（PathData）
- 数据 = 主点 + 相对切线偏移（钢笔工具式），相邻两点构成三次贝塞尔：`P0=本点, P1=本点+outTangent, P2=下一点+inTangent, P3=下一点`。
- `GetSampledPath` 采样为折线：直线段只输出端点，曲线段按 `segmentsPerCurve` 细分；切线工具内置 **Catmull-Rom → Bezier 控制点换算**（`tangent = (next-prev)/6`）一键平滑。
- 旧直线数据经 `ISerializationCallbackReceiver` 无感迁移（`OnAfterDeserialize` 转 points，保存后清旧字段）。

### 核心代码

```csharp
// PathData.cs —— 采样为折线：直线段只输出端点，曲线段按 segmentsPerCurve 细分
public List<Vector3> GetSampledPath(int segmentsPerCurve = 12)
{
    var result = new List<Vector3>();
    if (points == null || points.Count == 0) return result;

    result.Add(points[0].position);
    for (int i = 0; i < points.Count - 1; i++)
    {
        var a = points[i];
        var b = points[i + 1];
        if (a.outTangent == Vector3.zero && b.inTangent == Vector3.zero)
        {
            result.Add(b.position);                      // 直线段
        }
        else
        {
            for (int s = 1; s <= segmentsPerCurve; s++)  // 曲线段细分
            {
                float t = s / (float)segmentsPerCurve;
                result.Add(EvaluateBezier(
                    a.position, a.position + a.outTangent,
                    b.position + b.inTangent, b.position, t));
            }
        }
    }
    return result;
}

/// <summary>三次贝塞尔求值</summary>
public static Vector3 EvaluateBezier(Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3, float t)
{
    float u = 1f - t;
    return u * u * u * p0
         + 3f * u * u * t * p1
         + 3f * u * t * t * p2
         + t * t * t * p3;
}

/// <summary>按 Catmull-Rom 样条推算全部切线（一键平滑整条路径）：
/// tangent = (next - prev) / 6 即 Catmull-Rom → Bezier 控制点换算</summary>
public void SmoothAllTangents()
{
    if (points == null || points.Count < 2) return;
    for (int i = 0; i < points.Count; i++)
    {
        Vector3 prev = points[Mathf.Max(0, i - 1)].position;
        Vector3 next = points[Mathf.Min(points.Count - 1, i + 1)].position;
        Vector3 tangent = (next - prev) / 6f;
        points[i].outTangent = tangent;
        points[i].inTangent = -tangent;
    }
}
```

### 3.2 移动与进度（EnemyMovement）
- **弧长进度**：`walkedLength` 按每帧实际位移累计（而非按参数 t），`PathProgress = walked/total`，供"最先到达"索敌与漏拦判定使用——**进度必须和真实位移一致**，否则索敌排序会抖。
- **暂停引用计数** `pauseRequests`：多个暂停源（士兵拦截/冰冻/眩晕）各自独立 Pause/Resume 配对调用，计数归零才复走。解决的是"被拦后再被冰冻，冰冻到期 Resume 会不会让怪在拦截中复走"这类叠加冲突。`ResumeMovement` 钳 0 防多减。
- **沿路径外推预判** `PredictPositionAlongPath(time)`：从当前位置沿剩余航点前进 `speed×time` 距离。**弯道精确**——替代了"按当前方向直线外推"的旧方案（拐弯处必打偏）。

### 核心代码

```csharp
// EnemyMovement.cs —— 暂停引用计数：多暂停源各自配对调用，计数归零才复走
/// <summary>
/// 移动暂停计数：多个暂停源（交战拦截/冰冻/眩晕…）各自独立 Pause/Resume 配对调用、互不踩踏——
/// 例：被拦截（Pause）后再被冰冻，冰冻到期（Resume）不会让怪在被拦着时复走；计数归零才恢复移动。
/// </summary>
private int pauseRequests = 0;

public bool IsMoving => pauseRequests == 0;

public void PauseMovement() => pauseRequests++;                                  // 暂停源 +1（调用方配对调用）
public void ResumeMovement() => pauseRequests = Mathf.Max(0, pauseRequests - 1); // 暂停源解除 -1（防多减钳 0）

// 路径进度：walkedLength 按每帧实际位移累计（非参数 t），保证索敌排序稳定
public float PathProgress => totalLength > 0.001f ? Mathf.Clamp01(walkedLength / totalLength) : 0f;

/// <summary>沿路径外推：从当前位置沿剩余路径点前进 speed×time 距离后的位置（弯道预判精确）</summary>
public Vector3 PredictPositionAlongPath(float time)
{
    if (waypoints == null || waypoints.Count == 0 || currentIndex >= waypoints.Count || time <= 0f)
        return transform.position;

    float remain = moveSpeed * time; // 需要前进的距离
    Vector3 pos = transform.position;
    int i = currentIndex;
    while (remain > 0f && i < waypoints.Count)
    {
        Vector3 target = waypoints[i];
        float d = Vector3.Distance(pos, target);
        if (d >= remain) { pos = Vector3.MoveTowards(pos, target, remain); break; }
        pos = target;
        remain -= d;
        i++;
    }
    return pos; // remain 用尽或走完路径
}

void Update()
{
    if (!IsMoving || waypoints == null || currentIndex >= waypoints.Count) return;
    Vector3 target = waypoints[currentIndex];
    Vector3 before = transform.position;
    transform.position = Vector2.MoveTowards(transform.position, target, moveSpeed * Time.deltaTime);
    Vector3 delta = transform.position - before;
    if (delta.sqrMagnitude > 0.000001f) MoveDirection = delta.normalized;
    walkedLength += Vector3.Distance(before, transform.position); // 进度按实际步长累计
    if (Vector2.Distance(transform.position, target) < 0.01f)
    {
        currentIndex++;
        if (currentIndex >= waypoints.Count) onReachEnd?.Invoke();
    }
}
```

### 3.3 预判射击（TowerBase.GetPredictedAimPoint）
- **两轮迭代收敛**：飞行时间依赖"命中点距离"，命中点又依赖飞行时间（循环依赖）。先 `dist/弹速` 算一轮预判点，再用预测点距离重算一轮——射程外沿误差显著降低。
- **命中率误差模型**：误差量 = 预判位移量 × (1-命中率)，方向沿预判位移轴随机 ±（打前/打后）。命中率=1 必中；命中率低时 AOE 可能没打满——把"命中率"设计成**位移比例误差**而非盲区随机点，是手感与公平性的平衡。
- 目标静止时直接返回当前位置（命中率无影响）。

### 核心代码

```csharp
// TowerBase.cs —— 预判落点：两轮迭代收敛飞行时间的循环依赖 + 命中率沿预判位移轴加误差
public Vector2 GetPredictedAimPoint(EnemyBase target, float projectileSpeed)
{
    Vector2 targetPos = target != null ? target.transform.position : transform.position;
    if (target == null || projectileSpeed <= 0.01f) return targetPos;

    // 弹丸飞行时间 ≈ 距离 / 弹速——两轮迭代收敛
    //（消除"飞行中目标继续走远"的循环依赖误差，射程外沿显著）
    float dist = Vector2.Distance(transform.position, targetPos);
    float flightTime = dist / projectileSpeed;
    Vector2 predicted = target.GetPredictedPosition(flightTime);
    float dist2 = Vector2.Distance(transform.position, predicted);
    Vector2 predicted2 = target.GetPredictedPosition(dist2 / projectileSpeed);

    // 理想预判位移：沿路径外推（弯道精确——远处/拐弯处不再因直线外推而打偏）
    Vector2 lead = predicted2 - targetPos;

    // 命中率误差：误差量 = 预判位移量 × (1 - 命中率)，方向沿预判位移轴 ±1（靠前/靠后）
    float accuracy = Mathf.Clamp01(HitAccuracy);
    Vector2 error = Vector2.zero;
    if (accuracy < 0.999f && lead.sqrMagnitude > 0.0001f)
    {
        float sign = Random.value < 0.5f ? -1f : 1f;
        error = lead.normalized * (lead.magnitude * (1f - accuracy) * sign);
    }

    return targetPos + lead + error;
}
```

### 难在哪 / 可深挖
- **曲线段等参数采样 ≠ 等弧长**：`segmentsPerCurve` 均匀细分导致曲率大处点距短、敌人实际速度不均。深挖方向：按弧长等距重采样（建累计弧长表 + 二分查表）。
- 预判与 `CurrentSpeed=0`（暂停中）的交互已处理；多路径汇合点的预判仍按单条路径外推，汇合前目标换路会导致miss（可接受）。

---

## 4. 士兵拦截与围攻 —— 玩法差异化核心（KU 式近战）

**文件**：`Scripts/Unit/Soldier.cs`、`Scripts/Unit/UnitMelee.cs`、`Enemy/EnemyBase.cs`（Blocker 注册）、`Scripts/Unit/RallySource.cs`

### 设计要点
- **状态机** `Patrol → Chase → Engaging → Return`，四个状态各有一组精巧规则（源码注释 A/B/C/D 标号）：
  - **A 选中即登记**：索敌命中立刻 `RegisterBlocker`（敌人原地停走），士兵还在走位——所以敌人反击只挑 `IsEngaging`（已站定）的拦截者，走位途中不挨打。
  - **B 围攻随机站位**：以目标为心、角度均匀随机、半径 [min,max] 且**钳到 meleeRange 内**（教训：旧固定槽位 1.7 > 出手距离 1.5，站定打不着）。站位点是静止点（目标已被登记停走），走到位即交战。
  - **C 漏拦优先分兵**：交战中非首席（`blockers[0]` 留守挨打）成员，若存在路径进度更大且够得着的敌人就前压转移，自迭代收敛为"火力团压最前漏怪"。**刻意不要求新目标未被拦截**——否则退化为每次漏怪只走一人；被拦怪进度冻结使"谁更靠前"判定稳定无振荡。
  - **D 召回不接敌**：集结点变更（拖拽/IRallyFollower）行军途中不接敌，到位才恢复巡逻；回家索敌以集结点为圆心（消除杀敌回家盲区），且回防半径外的闸门防"选中后立刻放弃→敌人被反复登记/释放走走停停"的抖动。
- **UnitMelee 目标外部喂入**：组件不索敌。士兵用 `SetTarget`；敌人反击用 `SetTargetProvider(() => CounterTarget)` 闭包每帧取——拦截者更替自动换人，一处组件敌我复用。
- **RallySource 通用集结**：RangeLimited（兵营，半径=当前等级塔射程经 `SetRadiusProvider` 注入实时求值）/ Global（英雄预留）；编队槽位 `SoldierFormation.GetSlot`（正 N 边形）；`ValidatePoint`（预览钳制）与 `SetRallyPoint`（生效）分离，超半径钳到圆边界交点。

### 核心代码

```csharp
// Soldier.cs —— C：漏拦优先分兵（交战态轮询）
void UpdateEngaging()
{
    if (target == null || !target.IsAlive) { GiveUp(); return; }

    melee.SetTarget(target); // 持续交战（出手间隔/距离由 UnitMelee 把关）

    // 交战也可能被拖离集结点：超回防半径即放弃（敌人恢复移动）
    if (Vector2.Distance(transform.position, rallyPoint) > data.returnRange)
    {
        GiveUp();
        return;
    }

    // C：漏拦优先分兵——本目标有多名拦截者且自己不是 lead（lead = blockers[0] 留守挨打）时，
    // 若存在更靠前（路径进度更大）且够得着的敌人，非 lead 成员一起前压转移（自迭代收敛为火力团压最前）
    scanTimer -= Time.deltaTime;
    if (scanTimer > 0f) return;
    scanTimer = Config.soldierScanInterval;

    if (target.BlockerCount > 1 && !target.IsLeadBlocker(this))
    {
        var leak = FindLeakTarget();
        if (leak != null)
        {
            Disengage();      // 不回家：单帧原子转移到新目标
            EngageTarget(leak);
        }
    }
}

/// <summary>索敌：优先 aggroRange 内最近的「移动中」敌人；无未交战目标时补位增援任意已被拦停的敌人（B：围攻不限量）</summary>
EnemyBase FindTarget(Vector3 scanCenter)
{
    EnemyBase fresh = null, reinforce = null;
    float bestFresh = float.MaxValue, bestReinforce = float.MaxValue;

    foreach (var hit in Physics2D.OverlapCircleAll(scanCenter, data.aggroRange, EnemyLayerMask))
    {
        var e = hit.GetComponent<EnemyBase>();
        if (e == null || !e.IsAlive) continue;
        float d = Vector2.Distance(scanCenter, e.Position);
        if (e.IsMovingOnPath)
        {
            if (d < bestFresh) { bestFresh = d; fresh = e; }
        }
        else if (d < bestReinforce)
        {
            bestReinforce = d; reinforce = e; // 已被拦停（或被冰冻）：直接加入围攻
        }
    }
    return fresh != null ? fresh : reinforce;
}

/// <summary>漏拦检测（C）：路径进度比当前目标更大且距集结点 ≤ returnRange 的敌人，取进度最大者。
/// 刻意不要求新目标「未被拦截」——首个转移者登记停走后，其余成员仍要能看到它并继续转移；
/// 被拦怪进度冻结，"谁更靠前"判定稳定无振荡。</summary>
EnemyBase FindLeakTarget()
{
    EnemyBase leak = null;
    float bestProgress = target.GetPathProgress();
    foreach (var hit in Physics2D.OverlapCircleAll(rallyPoint, data.returnRange, EnemyLayerMask))
    {
        var e = hit.GetComponent<EnemyBase>();
        if (e == null || !e.IsAlive) continue;
        float p = e.GetPathProgress();
        if (p > bestProgress && Vector2.Distance(e.Position, rallyPoint) <= data.returnRange)
        {
            bestProgress = p;
            leak = e;
        }
    }
    return leak;
}

/// <summary>随机围攻站位（B）：半径上限钳到 meleeRange 内——站定点必须落在出手距离里
///（教训：旧固定槽位 1.7 &gt; 1.5 站定打不着）。</summary>
void RerollStandOffset()
{
    var cfg = Config;
    float maxR = Mathf.Min(cfg.standOffsetRadiusMax, data.meleeRange);
    float radius = Random.Range(Mathf.Min(cfg.standOffsetRadiusMin, maxR), maxR);
    float angle = Random.Range(0f, Mathf.PI * 2f);
    standOffset = new Vector3(Mathf.Cos(angle), Mathf.Sin(angle), 0f) * radius;
}

/// <summary>解除交战：停拳 + 注销拦截登记（漏注销会让敌人永久 Paused 卡在路上）</summary>
void Disengage()
{
    melee.SetTarget(null);
    if (target != null) target.UnregisterBlocker(this);
    target = null;
}
```

```csharp
// UnitMelee.cs —— 敌我共用：目标外部喂入（士兵 SetTarget / 敌人 SetTargetProvider 每帧取）
void Update()
{
    var t = targetProvider != null ? targetProvider() : target;
    if (t == null || !t.IsAlive) return;

    timer -= Time.deltaTime;
    if (timer > 0f) return;
    if (Vector2.Distance(transform.position, t.Position) > meleeRange) return;

    timer = 1f / Mathf.Max(0.01f, attackSpeed);
    DamageSystem.ApplyDamage(t, new DamageInfo
    {
        baseDamage = Random.Range(damageMin, damageMax + 1),
        damageType = damageType,
        kind = DamageSourceKind.Normal,
        sourcePos = transform.position,
        hasSource = true, // 飘字淡出方向：由攻击方位置决定
    }, attackerStats);
    OnAttack?.Invoke();
}
```

### 难在哪
- **登记泄漏 = 卡怪**：`RegisterBlocker` 后任何路径（死亡/召回/转移/外部回收）漏 `UnregisterBlocker`，敌人就永久 Paused 停在路上。代码在 `Disengage`/`Die`/`OnDespawn` 三处防御，新增退出路径时必须沿用此纪律。
- **登记竞态**：登记同步完成（EngageTarget 内联），后扫描的士兵读到的 `BlockerCount` 已含在途友军——若改异步会出现围攻人数判断错乱。
- **物理层隔离**：士兵无 Enemy 层碰撞体（防被塔索敌/弹体误击），点击判定用 Soldier 层独立小碰撞体，索敌查询全部显式 Enemy mask。

### 可深挖
- 飞行单位目前同样被拦停（按现行策划），"单方面攻击"变体待实装。
- `IsLeadBlocker` 的 lead 是插入序而非位置序——多方向漏怪时 lead 不一定站在最危险方向，可讨论按路径进度排序 lead。
- 护盾/格挡类士兵变体：拦截者的减伤轴需要管线新阶段（见 §1）。

---

## 5. 对象池与池化纪律 —— 全项目反复出现的主题

**文件**：`Scripts/Core/ObjectPool.cs`、各 `IPoolable` 实现

### 设计要点
- **instanceToPool 映射**：活跃对象→池 ID 精确记录，避免按名字匹配串池（同名 prefab 场景）；名字匹配仅作未走 Spawn 的兜底。
- **分帧预载** `Preload(prefab, count, perFrame)`：配合 `PoolPrewarmable` 由 `LevelPrewarmController` 逐帧驱动，单帧实例化预算防加载期大卡。
- **池化清场清单**（每个 IPoolable 必答的四个问题）：
  1. 事件订阅清了吗？（`Soldier.OnDespawn` 清 OnDied/OnDamaged，防旧兵营残留引用）
  2. 引用清了吗？（OwningSource/target/OwningSource=null）
  3. 状态复位了吗？（pauseRequests=0、护盾=0、State=Patrol——"上一世残留"是池化头号 bug 源）
  4. 表现摘干净了吗？（血条 `Detach`、悬停外观 `RestoreHoverVisual`）

### 核心代码

```csharp
// ObjectPool.cs —— Spawn/Despawn：instanceToPool 映射精确记账，防同名 prefab 串池
public GameObject Spawn(GameObject prefab, Vector3 position, Quaternion rotation)
{
    int id = prefab.GetInstanceID();
    if (!pools.ContainsKey(id)) Register(prefab);

    GameObject obj;
    if (pools[id].Count > 0)
    {
        obj = pools[id].Dequeue();
        obj.transform.SetPositionAndRotation(position, rotation);
    }
    else
    {
        obj = Instantiate(prefab, position, rotation, parents[id]);
    }

    instanceToPool[obj] = id;

    obj.SetActive(true);
    IPoolable poolable = obj.GetComponent<IPoolable>();
    if (poolable != null) poolable.OnSpawn();
    return obj;
}

public void Despawn(GameObject obj)
{
    if (obj == null) return;
    IPoolable poolable = obj.GetComponent<IPoolable>();
    if (poolable != null) poolable.OnDespawn(); // 清场钩子先于失活
    obj.SetActive(false);

    int id = GetPoolId(obj);
    if (id != 0 && pools.ContainsKey(id))
        pools[id].Enqueue(obj);
    else
        Destroy(obj);
}

/// <summary>分帧预载（关卡就绪系统）：perFrame 控制单帧实例化预算，避免加载期单帧大卡</summary>
public IEnumerator Preload(GameObject prefab, int count, int perFrame = 3)
{
    int id = prefab.GetInstanceID();
    if (!pools.ContainsKey(id)) Register(prefab, 0);

    perFrame = Mathf.Max(1, perFrame);
    while (pools[id].Count < count)
    {
        for (int i = 0; i < perFrame && pools[id].Count < count; i++)
        {
            GameObject obj = Instantiate(prefab, parents[id]);
            obj.SetActive(false);
            pools[id].Enqueue(obj);
        }
        if (pools[id].Count < count) yield return null;
    }
}
```

### 已踩过的坑（代码注释中有完整教训）
- **Setup vs OnSpawn**：塔 prefab 被多个 TowerData 共用时，`OnSpawn` 用的是"取出瞬间残留的 data"，会初始化成别人的数值（症状：名字/弹体正常，伤害/射程是旧塔的）。必须走 `TowerBase.Setup(data)` 强制以本次传入数据初始化。
- **LayerMask 惰性初始化**：`LayerMask.GetMask` 不能放字段初始化器——Unity 编辑器重置脚本对象时会提前触发 .cctor 抛 `TypeInitializationException`。全项目统一 `static int _mask = -1` + 属性惰性取。

```csharp
// TowerBase.cs —— 必须走 Setup 而非裸赋 data：OnSpawn 用的是"取出瞬间塔身上残留的 data"，
// 同一 prefab 被多个 TowerData 共用时会初始化成别人的数值
public void Setup(TowerData towerData)
{
    if (towerData == null)
    {
        Debug.LogError($"[TowerBase] {name} Setup 收到空 TowerData，塔已禁用");
        data = null;
        enabled = false;
        return;
    }
    data = towerData;
    InitializeRuntime();
    OnTowerBuilt?.Invoke(this);
}

// Soldier.cs —— 池化清场清单的标准实现（事件/引用/状态/表现逐项清）
public void OnDespawn()
{
    Disengage();         // 防御：被外部直接回收（卖塔/清场/召回点变更）时也要解除拦截登记
    OnDied = null;       // 清订阅（旧兵营引用不残留）
    OnDamaged = null;    // 清订阅（信息栏等受击刷新方不残留）
    OwningSource = null; // 池化防御：回池不带旧集结源引用（复用出兵时重新赋值）
    State = SoldierState.Patrol;
    isRecalling = false;
    UnitHealthBarSystem.Instance?.Detach(this); // 血条即时摘除：池化复用不串条
}
```

```csharp
// LayerMask 惰性初始化范式（全项目统一，TowerBase/Soldier 同款）
// 注释原文：不能写成 static readonly 字段初始化器——Unity 禁止在构造/字段初始化器上下文调用 GetMask，
// 编辑器重置脚本对象（加载塔预制体）时会提前触发 .cctor 报 TypeInitializationException
private static int _enemyLayerMask = -1;
private static int EnemyLayerMask => _enemyLayerMask == -1
    ? (_enemyLayerMask = LayerMask.GetMask("Enemy"))
    : _enemyLayerMask;
```

---

## 6. 关卡就绪系统 —— 加载体验的工程化

**文件**：`Scripts/Prewarm/LevelPrewarmController.cs`、`Scripts/Transition/LevelLoader.cs`

### 设计要点
- **External 进度模式**：场景激活后（黑幕/进度条仍在），Controller 收集全部 `IPrewarmable`（含失活物体，`FindObjectsInactive.Include`），按 Priority + Weight 排序分帧预热，聚合进度回报 `LevelLoader.SetExternalProgress`；显示进度 = MAX(真实加载映射, 外部报告, 虚拟时间线兜底) **只升不降**。
- **异常隔离**：手动驱动枚举器（`routine.MoveNext()` 包 try/catch），单项预热失败仅跳过该项，最终 100% 兜底上报必达——转场永不因单项卡死（externalTimeout 是最后保险）。
- **防视觉尖峰**：场景激活帧（UI 创建 + 首发渲染 spike）全部藏在纯黑画面后；Controller Start 先 `yield return null` 等各面板"双保险强制失活"执行完，避免同帧竞争。

### 核心代码

```csharp
// LevelPrewarmController.cs —— 收集 → 排序 → 手动驱动枚举器（单项异常隔离）
IEnumerator Start()
{
    // 等一帧：让各面板控制器 Start 的"双保险强制失活"先执行完，避免预热激活与其同帧竞争
    yield return null;

    // 收集场景内所有 IPrewarmable（含失活物体上的组件）
    var items = new List<IPrewarmable>();
    foreach (var mb in FindObjectsByType<MonoBehaviour>(FindObjectsInactive.Include, FindObjectsSortMode.None))
        if (mb is IPrewarmable prewarmable)
            items.Add(prewarmable);
    items.Sort((a, b) =>
    {
        int c = a.Priority.CompareTo(b.Priority);
        return c != 0 ? c : string.CompareOrdinal(a.DisplayName, b.DisplayName);
    });

    float totalWeight = 0f;
    foreach (var item in items) totalWeight += Mathf.Max(0.0001f, item.Weight);

    float doneWeight = 0f;
    foreach (var item in items)
    {
        float weight = Mathf.Max(0.0001f, item.Weight);
        var reporter = new ItemReporter(f => ReportTotal(doneWeight + weight * Mathf.Clamp01(f), totalWeight));

        // 手动驱动枚举器：单项异常只跳过该项（异常隔离），不中断整体流程与最终 100% 兜底
        var routine = item.Prewarm(reporter);
        while (true)
        {
            bool moved;
            try { moved = routine.MoveNext(); }
            catch (System.Exception ex)
            {
                Debug.LogError($"[Prewarm] {item.DisplayName} 预热失败，跳过该项：{ex.Message}\n{ex.StackTrace}", this);
                break;
            }
            if (!moved) break;
            yield return routine.Current;
        }

        doneWeight += weight;
        ReportTotal(doneWeight, totalWeight);
    }

    // 兜底：无论有无预热项，最终必须上报 100%（LevelLoader External 依赖此放行；externalTimeout 是最后保险）
    ReportTotal(1f, 1f);
}
```

### 可深挖
- Prewarm 项目前手工登记；可深挖自动收集（Addressables 依赖分析 / 预制体扫描）。
- 池预载量目前按关卡配置静态估；可按波次峰值统计自动校准。

---

## 7. 表现层 —— 订阅式解耦的两个样板

**文件**：`Scripts/UI/DamageNumber/DamageNumberSystem.cs`、`Scripts/UI/UnitHealthBar/UnitHealthBarSystem.cs`

- **DamageNumberSystem**：订阅 `DamageEvents` 总线，四档显示模式（Off/Minimal/Default/All，设置页改枚举即时生效）；**DoT 聚合**是难点——同一目标所有持续伤害合并为一条跟随飘字，按 `dotFlushInterval` 刷新累计值（弹跳放大+按累计值重算字号），末次受击 linger 后淡出；同屏 `maxActive` 上限立即淘汰最旧。
- **UnitHealthBarSystem**：对象池血条 + `IHealthInfo` 接口读敌我血量，单位 `Register/Detach` 即挂即摘（原"0.5s 全场扫描"方案已退役），池化复用不串条。
- 共同模式：**战斗逻辑零调用表现层**，一切经接口/事件——加新表现（音效/震屏）不需要动战斗代码。

### 核心代码

```csharp
// DamageNumberSystem.cs —— 总线订阅入口：致命一击冻结跟随 + DoT 分流
void OnDamageApplied(DamageAppliedEventArgs e)
{
    // 致命一击（扣血先行：CurrentHealth<=0 必然同帧 Die→回池）：立即冻结该目标所有在飞飘字的跟随。
    // 仅靠 Item 的轮询观察失活，存在"死亡与池复用同帧"时观察不到的竞态；事件侧冻结彻底关闭该窗口
    if (e.victim is EnemyBase eb && eb.CurrentHealth <= 0f)
        FreezeFollowers(e.victim.transform);

    if (!ShouldShow(e)) return;
    if (numberPrefab == null) return;

    if (e.kind == DamageSourceKind.DamageOverTime) AggregateDot(e);
    else SpawnNormal(e);
}

/// <summary>模式过滤：Off 全灭 / All 全显；敌方 Minimal 起：暴击必显、非暴击高额显；Default 额外：敌方属性/DoT、己方全部</summary>
bool ShouldShow(DamageAppliedEventArgs e)
{
    switch (displayMode)
    {
        case DamageNumberMode.Off: return false;
        case DamageNumberMode.All: return true;

        case DamageNumberMode.Minimal:
            if (e.isAlly) return false;
            if (e.isCritical) return true;
            return e.amount > highDamageThreshold;

        case DamageNumberMode.Default:
            if (e.isAlly) return true;
            if (e.isCritical) return true;
            if (e.amount > highDamageThreshold) return true;
            return e.kind == DamageSourceKind.Elemental
                || e.kind == DamageSourceKind.DamageOverTime;

        default: return false;
    }
}

// DoT 聚合：同一目标所有持续伤害合并为一条跟随飘字，追加数值（重置消失计时）
void AggregateDot(DamageAppliedEventArgs e)
{
    // 已有该目标的聚合飘字且仍在显示 → 追加数值
    if (dotItems.TryGetValue(e.victim, out var item) && item != null && item.IsDotActive)
    {
        item.AppendDamage(e.amount, PickColor(e), FadeDirFor(e));
        return;
    }
    // 首条：EvictIfNeeded 淘汰检查 → 池取飘字 → 挂入 dotItems 跟随目标（详见源码 AggregateDot 后半段）
}
```

```csharp
// UnitHealthBarSystem.cs —— 按模板分桶的字典池：不同皮肤（Boss 定制条）互不混用、互不污染
// 桶键 = 模板条组件（全局默认模板 / 各 EnemyData.barPrefab 解析结果）
readonly Dictionary<UnitHealthBarItem, Stack<UnitHealthBarItem>> barPools
    = new Dictionary<UnitHealthBarItem, Stack<UnitHealthBarItem>>();

// GameObject→条组件解析缓存（含"无效预制体"负缓存：缺组件的预制体只告警一次，不反复刷错误）
readonly Dictionary<GameObject, UnitHealthBarItem> templateResolveCache
    = new Dictionary<GameObject, UnitHealthBarItem>();

/// <summary>单位条模板：EnemyData.barPrefab 有定制则解析它（根/子级找 UnitHealthBarItem），否则回退全局默认</summary>
UnitHealthBarItem TemplateFor(Component victim)
{
    if (victim is EnemyBase e && e.data != null && e.data.barPrefab != null)
    {
        var go = e.data.barPrefab;
        if (!templateResolveCache.TryGetValue(go, out var tpl))
        {
            tpl = go.GetComponentInChildren<UnitHealthBarItem>(true);
            if (tpl == null)
                Debug.LogError($"[UnitHealthBarSystem] EnemyData「{e.data.name}」的 barPrefab「{go.name}」上未找到 UnitHealthBarItem 组件（根/子级均可），回退全局默认样式");
            templateResolveCache[go] = tpl; // 负缓存：同一无效预制体只告警一次
        }
        if (tpl != null) return tpl;
    }
    return BarTemplate;
}
```

---

## 附：全项目设计约定速查（改代码前必读）

1. **SO 资产只读**：运行时数值更新只改组件字段（`CurrentDamage*`），禁止写回 TowerData/EnemyData。
2. **暂停源配对调用**：`PauseMovement/ResumeMovement` 必须成对，异常路径也要保证配对（见 §4 卡怪教训）。
3. **池化四问**（§5 清单）——新增 IPoolable 实现时逐条过。
4. **索敌/物理查询显式 mask** + 惰性 LayerMask 缓存，热路径复用 List 不分配。
5. **战斗↔表现解耦**：逻辑侧只 Raise 事件/实现接口，表现侧订阅。
6. **UI 全代码 AddListener**、独立 Canvas、MSYH SDF 字体（见 project memory 约定）。
7. **DOTween 清理**：`tween?.Kill()` + OnDisable 清理；暂停期间 UI 动画 `SetUpdate(true)`。
