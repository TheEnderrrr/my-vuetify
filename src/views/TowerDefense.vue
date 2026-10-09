<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-castle</v-icon>
        <h1 class="text-h4 font-weight-bold">塔防乱斗游戏</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">
        <v-icon start>mdi-calendar-range</v-icon>
        2025.03 - 至今
      </v-chip>
      <v-chip color="error" variant="tonal" class="mr-2">
        <v-icon start>mdi-progress-clock</v-icon>
        开发中
      </v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Unity 6 · URP</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">2D 卡通风</v-chip>
      <v-chip color="warning" variant="tonal" class="mr-2">类《王国保卫战》</v-chip>
      <v-chip color="info" variant="tonal">PC / 移动端</v-chip>
    </div>

    <!-- 开发中提示 -->
    <v-alert
      type="warning"
      variant="tonal"
      prominent
      icon="mdi-progress-clock"
      rounded="lg"
      class="mb-6"
    >
      <b>开发中版本</b>：本项目正在积极开发中，本页内容为当前阶段的设计与实现规划（设计文档 v0.4），
      系统与数值可能随开发进度调整，<b>不代表最终成品</b>。
    </v-alert>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        类《王国保卫战》的 2D 手绘风塔防游戏：玩家在地图路径两侧布置防御塔，阻止一波波敌人从起点抵达终点，
        核心乐趣在于<b>策略搭配</b>（塔的类型与位置）与<b>时机把控</b>（技能释放与升级节奏）。
        核心循环：布阵 → 敌人波次进攻 → 塔自动攻击 → 收集金币 → 升级 / 建造新塔 → 下一波。
      </p>
    </v-card>

    <!-- 核心代码亮点 -->
    <CodeHighlightSection
      class="mb-6"
      title="核心代码亮点"
      subtitle="以下为若干处核心实现细节，代码默认折叠，点击标题栏展开查看。"
      :items="codeHighlights"
    />

    <!-- 核心系统设计 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-sword-cross</v-icon>
            战斗与关卡循环
          </h3>
          <ul class="feature-list">
            <li>路径塔防：敌人沿预定义路径进攻，每关 10~20 波逐步增强</li>
            <li>金币 / 生命 / 星星三资源体系，通关按损失评价 1~3 星</li>
            <li>全局技能：召唤援军 / 闪电风暴 / 时间减速 / 金币雨</li>
            <li>普通 / 困难双难度，完整背景图 + 交互层覆盖的地图方案</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-sitemap</v-icon>
            结构化可扩展塔系统
          </h3>
          <ul class="feature-list">
            <li>TowerBase 抽象基类 + ITargetStrategy / IAttackBehavior 策略接口</li>
            <li>内置兵营 / 箭塔 / 法师塔 / 炮塔四类塔，Lv3 后 A / B 分支升级</li>
            <li>目标选择策略可插拔：最近 / 最远 / 血量最低 / 护甲最低</li>
            <li>塔数据全部走 ScriptableObject，新增塔不改核心代码</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-skull-outline</v-icon>
            敌人与状态效果
          </h3>
          <ul class="feature-list">
            <li>普通 / 快速 / 重甲 / 飞行 / Boss 五类敌人，各有护甲与魔抗</li>
            <li>状态效果组件化：减速 / 中毒 / 燃烧 / 眩晕 / 破甲自由组合</li>
            <li>敌人类型 ScriptableObject 配置，支持自定义移动逻辑</li>
            <li>对象池管理敌人与弹幕，Sprite Atlas 合并图集优化性能</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-trophy-outline</v-icon>
            成就与图鉴系统
          </h3>
          <ul class="feature-list">
            <li>成就 = SO 数据 + 独立条件检测器，新增成就零代码侵入</li>
            <li>敌人 / 塔 / 技能 / 关卡四类图鉴，未解锁条目显示剪影</li>
            <li>统一 GameEvent 事件通道，成就与图鉴天然联动</li>
            <li>成就 / 图鉴进度随 PlayerData 统一存档</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 技术亮点 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
        技术亮点
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="primary" variant="tonal" class="ma-1"><v-icon start>mdi-code-braces</v-icon>Unity 6 + C#</v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1"><v-icon start>mdi-file-document-outline</v-icon>ScriptableObject 数据驱动</v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1"><v-icon start>mdi-sitemap</v-icon>策略模式 / 抽象基类</v-chip>
        <v-chip color="info" variant="tonal" class="ma-1"><v-icon start>mdi-database</v-icon>JSON 存档 ISaveSystem</v-chip>
        <v-chip color="success" variant="tonal" class="ma-1"><v-icon start>mdi-movie-open-outline</v-icon>Aseprite 帧动画</v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1"><v-icon start>mdi-tools</v-icon>DOTween 动效</v-chip>
        <v-chip color="error" variant="tonal" class="ma-1"><v-icon start>mdi-cog</v-icon>对象池 / 图集优化</v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import CodeHighlightSection from '../components/CodeHighlightSection.vue'

// 核心代码亮点（摘自 src/assets/docs/TD-TechDeepDive.md #2 / #3 / #5）
const codeHighlights = [
  {
    no: 1,
    name: '状态效果体系 —— 组件式生命周期 + 工厂去重',
    location: 'StatusEffectBase.cs / ElementalAttackRule.cs',
    points: [
      '状态 = <b>运行时挂到敌人身上的 MonoBehaviour 组件</b>：<code>Initialize（施加）→ Update 内 OnTick → 到期 OnRemove → 自毁并注销</code>，随敌人独立运行、互不干扰。',
      '<b>叠加语义</b>：<code>Stack()</code> 未到最大层数 +1 并触发 OnStack，无论如何刷新剩余时间；同名状态重复施加由工厂统一转叠层，不会挂两个同状态组件。',
      '<b>属性攻击链路分离</b>（<code>ElementalAttackRule.RollAndApply</code>）：命中结算成功 → 查目标实时状态 → 按策划公式 roll（冰有 debuff 时概率递增、火已燃烧必叠层）→ 按返回名施加状态；概率公式与状态执行分离，miss 不调。',
      '效果与回池的生命周期交错是隐性 bug 温床：敌人回池必须 <code>ForceRemove</code> 清场，否则减速/燃烧会残留到池复用的下一只怪。'
    ],
    codes: [
      {
        label: 'StatusEffectBase.cs',
        code: `// StatusEffectBase.cs —— 组件式生命周期：Initialize → OnTick → 到期 OnRemove → 自毁注销
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
}`
      },
      {
        label: 'ElementalAttackRule.cs',
        code: `// ElementalAttackRule.cs —— 命中后按策划公式 roll，返回应施加的状态名（空串=不施加）
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
}`
      }
    ]
  },
  {
    no: 2,
    name: '路径与预判射击 —— 本项目数学含量最高的部分',
    location: 'PathData.cs / EnemyMovement.cs / TowerBase.cs',
    points: [
      '<b>贝塞尔路径</b>：数据 = 主点 + 相对切线偏移（钢笔工具式），相邻两点构成三次贝塞尔；切线工具内置 <b>Catmull-Rom → Bezier 控制点换算</b>（<code>tangent = (next - prev) / 6</code>）一键平滑整条路径。',
      '<b>弧长进度</b>：<code>walkedLength</code> 按每帧实际位移累计（而非按参数 t），供"最先到达"索敌与漏拦判定使用——进度必须和真实位移一致，否则索敌排序会抖。',
      '<b>暂停引用计数</b> <code>pauseRequests</code>：多个暂停源（士兵拦截/冰冻/眩晕）各自独立 Pause/Resume 配对调用，计数归零才复走，解决"被拦后再被冰冻，冰冻到期会不会让怪在拦截中复走"的叠加冲突。',
      '<b>预判射击两轮迭代收敛</b>：飞行时间依赖命中点距离、命中点又依赖飞行时间（循环依赖），先算一轮预判点再用预测点距离重算一轮，射程外沿误差显著降低；命中率设计成"沿预判位移轴的比例误差"而非盲区随机点，是手感与公平性的平衡。'
    ],
    codes: [
      {
        label: 'PathData.cs',
        code: `// PathData.cs —— 采样为折线：直线段只输出端点，曲线段按 segmentsPerCurve 细分
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
}`
      },
      {
        label: 'EnemyMovement.cs',
        code: `// EnemyMovement.cs —— 暂停引用计数：多暂停源各自配对调用，计数归零才复走
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
}`
      },
      {
        label: 'TowerBase.cs · GetPredictedAimPoint',
        code: `// TowerBase.cs —— 预判落点：两轮迭代收敛飞行时间的循环依赖 + 命中率沿预判位移轴加误差
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
}`
      }
    ]
  },
  {
    no: 3,
    name: '对象池与池化纪律 —— 全项目反复出现的主题',
    location: 'ObjectPool.cs / 各 IPoolable 实现',
    points: [
      '<b>instanceToPool 映射</b>：活跃对象 → 池 ID 精确记账，避免按名字匹配串池（同名 prefab 场景）；名字匹配仅作未走 Spawn 的兜底。',
      '<b>分帧预载</b> <code>Preload(prefab, count, perFrame)</code>：单帧实例化预算，配合关卡就绪系统逐帧驱动，防加载期大卡。',
      '<b>池化清场四问</b>（每个 IPoolable 必答）：事件订阅清了吗 / 引用清了吗 / 状态复位了吗 / 表现摘干净了吗——"上一世残留"是池化头号 bug 源。',
      '<b>已踩过的坑</b>：塔 prefab 被多个 TowerData 共用时，<code>OnSpawn</code> 用的是"取出瞬间残留的 data"，会初始化成别人的数值，必须走 <code>Setup(data)</code> 强制以本次传入数据初始化；<code>LayerMask.GetMask</code> 不能放字段初始化器（编辑器重置脚本对象会提前触发 .cctor 抛异常），全项目统一惰性缓存。'
    ],
    codes: [
      {
        label: 'ObjectPool.cs',
        code: `// ObjectPool.cs —— Spawn/Despawn：instanceToPool 映射精确记账，防同名 prefab 串池
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
}`
      },
      {
        label: 'TowerBase.cs / Soldier.cs',
        code: `// TowerBase.cs —— 必须走 Setup 而非裸赋 data：OnSpawn 用的是"取出瞬间塔身上残留的 data"，
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
}`
      },
      {
        label: 'LayerMask 惰性初始化范式',
        code: `// LayerMask 惰性初始化范式（全项目统一，TowerBase/Soldier 同款）
// 注释原文：不能写成 static readonly 字段初始化器——Unity 禁止在构造/字段初始化器上下文调用 GetMask，
// 编辑器重置脚本对象（加载塔预制体）时会提前触发 .cctor 报 TypeInitializationException
private static int _enemyLayerMask = -1;
private static int EnemyLayerMask => _enemyLayerMask == -1
    ? (_enemyLayerMask = LayerMask.GetMask("Enemy"))
    : _enemyLayerMask;`
      }
    ]
  }
]
</script>

<style scoped>
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.feature-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #a769ac;
  font-weight: bold;
}

.gap-2 {
  gap: 8px;
}
</style>
