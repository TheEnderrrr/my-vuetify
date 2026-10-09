# 代码亮点与难点整理

> 快照日期：2026-10-09，行号以当前代码版本为准。
> 覆盖 Assets/Scripts/ 下全部 23 个脚本中精选的 10 处代码段，按「为什么难 / 为什么好」分类整理。

## 目录

- 交互判定类
  1. [帧间线段采样防漏判（拖拽判定经典难点）](#1-帧间线段采样防漏判)
  2. [拖拽状态机与预览线残留兜底](#2-拖拽状态机与预览线残留兜底)
- 2D 渲染几何类
  3. [双层贴图几何补偿（全项目数学最密段）](#3-双层贴图几何补偿)
  4. [程序生成占位精灵（PPU 数学）](#4-程序生成占位精灵)
- 流程时序类
  5. [火箭"镜头外瞬移"](#5-火箭镜头外瞬移)
  6. [切关两阶段时序（激活 ≠ 开始可玩）](#6-切关两阶段时序)
  7. [任意姿态直达过渡 PlayTo](#7-任意姿态直达过渡-playto)
- 状态与事件类
  8. [多关卡事件幂等订阅与守卫](#8-多关卡事件幂等订阅与守卫)
  9. [inactive 面板惰性初始化（Unity 经典坑）](#9-inactive-面板惰性初始化)
- 性能类
  10. [零 GC 对象池与切片唯一槽位](#10-零-gc-对象池与切片唯一槽位)

展示/面试级 Top 3 推荐：**#1、#3、#5+#6**——分别代表交互手感、渲染数学、流程时序三类最常翻车的地方。

---

## 交互判定类

### 1. 帧间线段采样防漏判

位置：`Assets/Scripts/OneStroke/OneStrokeBoard.cs` L189-L251

```csharp
/// <summary>帧间线段采样：快速甩动也不漏判中间节点</summary>
private void SampleStroke(Vector3 from, Vector3 to)
{
    float step = Mathf.Max(0.05f, snapRadius * sampleStepFactor);
    int steps = Mathf.Max(1, Mathf.CeilToInt(Vector3.Distance(from, to) / step));
    for (int i = 1; i <= steps; i++)
    {
        if (_phase != Phase.Drawing) return;   // 走完/死路即停
        TrySnap(Vector3.Lerp(from, to, (float)i / steps));
    }
}

/// <summary>在采样点附近找当前节点的未走邻边，命中则走过去</summary>
private void TrySnap(Vector3 p)
{
    if (_currentNode == null) return;

    OneStrokeEdge bestEdge = null;
    OneStrokeNode bestTarget = null;
    float bestDist = snapRadius;
    foreach (var e in _currentNode.Edges)
    {
        if (e.Traversed) continue;
        var other = e.Other(_currentNode);
        if (other == null) continue;
        float d = Vector3.Distance(p, other.transform.position);
        if (d <= bestDist)
        {
            bestDist = d;
            bestEdge = e;
            bestTarget = other;
        }
    }
    if (bestEdge == null) return;

    bestEdge.Traverse();
    onEdgeTraversed.Invoke(bestEdge);
    _traversedCount++;
    HidePreview();   // 吸附成功：预览线由亮起的正式连线取代

    // 离开的节点：起点保留起点标识，普通节点标记已走
    _currentNode.SetState(_currentNode == _startNode
        ? OneStrokeNode.NodeState.Start
        : OneStrokeNode.NodeState.Visited);
    _currentNode = bestTarget;
    _currentNode.SetState(OneStrokeNode.NodeState.Current);
    onNodeReached.Invoke(_currentNode);

    if (_traversedCount >= _edges.Count)
    {
        // 全部边走完（过关）：最后到达的非起点节点也切成已连接态（显示美术资产），
        // 而不是停在"当前=黄色"。起点保留绿色标识；普通中间节点保持黄色供下一步操作。
        if (_currentNode != _startNode)
            _currentNode.SetState(OneStrokeNode.NodeState.Visited);
        _phase = Phase.Completed;
        onComplete.Invoke();
    }
    else if (_currentNode.Edges.TrueForAll(e => e.Traversed))
    {
        _phase = Phase.Failed;
        onDeadEnd.Invoke();
    }
}
```

亮点解析：

- **为什么难**：指针事件是逐帧上报的，一帧内指针可能扫过整个节点。若只在帧末位置做命中检测，快速甩动必然漏判。这里把上一帧→当前帧的指针位移按 `snapRadius × sampleStepFactor` 切片，逐点插值采样，把"连续轨迹判定"降级成"离散点判定"且保证不漏——这是所有拖拽类交互（划线、切水果、连线）的通用解法。
- 采样步长不是拍脑袋定值：绑定 `snapRadius`（吸附半径），保证相邻采样点间距小于判定区直径，数学上不可能跳过一个节点。
- `TrySnap` 尾部同时是欧拉路径的两个判定出口：`_traversedCount >= _edges.Count` → 过关（Completed）；当前节点邻边全部走完 → 死路（Failed）。判定与视图更新、事件广播在一个函数内闭环。
- `bestDist = snapRadius` 的写法把"半径"复用为"最近距离竞标"初值，循环内同时完成命中判定与最近邻选择，避免二次遍历。

### 2. 拖拽状态机与预览线残留兜底

位置：`Assets/Scripts/OneStroke/OneStrokeBoard.cs` L117-L159

```csharp
private void Update()
{
    if (PauseMenu.Instance != null && PauseMenu.Instance.IsOpen) return;   // 暂停时冻结棋盘交互

    var kb = Keyboard.current;
    if (kb != null && resetKey != Key.None && kb[resetKey].wasPressedThisFrame)
        ResetBoard();

    var pointer = Pointer.current;
    if (pointer == null) return;

    var world = ScreenToBoardWorld(pointer.position.ReadValue());

    switch (_phase)
    {
        case Phase.Idle:
            if (_startNode != null && pointer.press.wasPressedThisFrame && HitNode(_startNode, world))
                BeginDraw(_startNode);
            break;

        case Phase.Paused:
            if (_currentNode != null && pointer.press.wasPressedThisFrame && HitNode(_currentNode, world))
                BeginDraw(_currentNode);
            break;

        case Phase.Drawing:
            if (!pointer.press.isPressed)
            {
                _phase = Phase.Paused;   // 松手保留进度，原地可续
                HidePreview();
                break;
            }
            SampleStroke(_lastPointerWorld, world);
            _lastPointerWorld = world;
            // 采样可能触发过关/死路（_phase 被改掉）——若已退出 Drawing 则隐藏预览线，
            // 避免过关后残留一条小尾巴。
            if (_phase == Phase.Drawing)
                UpdatePreview(world);
            else
                HidePreview();
            break;
    }
}
```

亮点解析：

- 五态状态机（Idle / Drawing / Paused / Completed / Failed）职责清晰：**松手不丢进度**，进入 Paused 后从当前节点原地续画，符合"一笔画可分段完成"的宽容设计。
- 最容易漏的边角情况在 L151-L157：采样中途 `_phase` 可能被 `TrySnap` 改成 Completed/Failed，此时若继续画预览线，过关瞬间会残留一条"小尾巴"。代码在采样后二次检查状态再决定是否更新预览——这类"回调改状态后当前帧剩余逻辑怎么办"的问题，是事件驱动代码的典型陷阱。
- 暂停用一行短路 `PauseMenu.Instance.IsOpen` 实现，且暂停时正在拖拽的操作会被冻结而不是丢弃，恢复后继续。

---

## 2D 渲染几何类

### 3. 双层贴图几何补偿

位置：`Assets/Scripts/OneStroke/OneStrokeEdge.cs` L134-L197（OnValidate 安全性说明 L245-L253）

```csharp
/// <summary>
/// 仅做纯几何对齐（位置/角度/主层拉伸/已连接层缩放补偿），不创建任何对象、不改层级。
/// 编辑器 OnValidate 阶段调用是安全的。
/// </summary>
private void ApplyGeometry()
{
    var a = nodeA.transform.position;
    var b = nodeB.transform.position;
    var mid = (a + b) * 0.5f;
    var dir = b - a;
    float len = dir.magnitude;

    transform.position = new Vector3(mid.x, mid.y, transform.position.z);

    var sr = _baseSr != null ? _baseSr : GetComponent<SpriteRenderer>();
    if (sr == null || sr.sprite == null) return;

    // 主层贴图取向：长边在哪条局部轴，决定旋转基线。贴图可能是横长条(X)或竖长条(Y)。
    var size = sr.sprite.bounds.size;
    bool vertBase = size.y > size.x;
    float dirAngle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

    // 旋转：让贴图长边对齐连线方向。长边在 X 沿 dirAngle；长边在 Y 需再转 90°。
    if (len > 0.0001f)
        transform.rotation = Quaternion.Euler(0f, 0f, dirAngle + (vertBase ? -90f : 0f));

    // 主层缩放：长边→len，短边→lineWidth。
    float baseLong = vertBase ? size.y : size.x;     // 贴图长边尺寸
    float baseShort = vertBase ? size.x : size.y;    // 贴图短边尺寸
    float longScale = len / Mathf.Max(0.0001f, baseLong);
    float shortScale = lineWidth / Mathf.Max(0.0001f, baseShort);
    transform.localScale = new Vector3(
        vertBase ? shortScale : longScale,
        vertBase ? longScale : shortScale,
        1f);

    // 已连接层：让其在世界尺寸上也恰好 len × lineWidth，且自身贴图长边对齐连线。
    // 用代数处理，不用矩阵分解（编辑器 OnValidate 阶段也安全）。
    ApplyLitLayerGeometry(longScale, shortScale, dirAngle, len);
}

/// <summary>已连接层几何补偿：使其世界尺寸 = len × lineWidth，且自身贴图长边对齐连线方向。</summary>
private void ApplyLitLayerGeometry(float longScale, float shortScale, float dirAngle, float len)
{
    if (_litSr == null || _litSr.sprite == null) return;

    var lsize = _litSr.sprite.bounds.size;
    bool vertLit = lsize.y > lsize.x;
    if (len < 0.0001f) return;

    // 已连接层自己的旋转基线：长边对齐连线方向（与主层基线求差即可）
    float litWorldRot = dirAngle + (vertLit ? -90f : 0f);
    float parentRot = transform.rotation.eulerAngles.z;
    float localRotZ = Mathf.DeltaAngle(parentRot, litWorldRot);

    // 长边与短边始终沿连线方向 / 垂直方向，故系数固定用 longScale / shortScale。
    // localRotZ 只负责把该层自己的长边也转到连线方向，不改变缩放系数分配。
    float litLong = vertLit ? lsize.y : lsize.x;
    float litShort = vertLit ? lsize.x : lsize.y;

    var litGo = _litSr.transform;
    litGo.localPosition = Vector3.zero;
    litGo.localRotation = Quaternion.Euler(0f, 0f, localRotZ);
    litGo.localScale = new Vector3(
        vertLit ? lineWidth / (shortScale * litShort) : len / (longScale * litLong),
        vertLit ? len / (longScale * litLong) : lineWidth / (shortScale * litShort),
        1f);
}
```

```csharp
#if UNITY_EDITOR
    private void OnValidate()
    {
        // 编辑器里拖节点/改参数时连线实时跟随，摆放所见即所得。
        // 注意：此阶段不能创建/修改子物体（LitLayer），因此只做纯几何对齐。
        if (!Application.isPlaying && nodeA != null && nodeB != null)
            ApplyGeometry();
    }
#endif
```

亮点解析：

- **为什么难**：连线有"未连接层"和"已连接层（LitLayer 子物体）"两张贴图，二者尺寸、横竖取向都可能不同，却要同时满足三个约束：世界尺寸都是 `len × lineWidth`、长边都精确对齐两端节点连线、两层互不拉伸变形。子物体继承父物体的缩放，所以 LitLayer 的 localScale 必须用父缩放的**倒数补偿**（如 `lineWidth / (shortScale * litShort)`），这是嵌套 Transform 下的代数换算，直觉容易出错。
- 旋转基线自适应：贴图长边在局部 X 轴还是 Y 轴决定要不要额外转 90°，两层各自独立求基线再取差值——换任何美术贴图都不用改代码。
- 特意**不用矩阵分解**：注释写明 `OnValidate` 阶段不能创建对象、API 受限，整个函数保证纯几何只读安全，从而换来"编辑器里拖节点，连线实时跟随、所见即所得"的工作流收益。
- 除零防护统一走 `Mathf.Max(0.0001f, ...)`，`DeltaAngle` 处理跨 ±180° 的角度差，都是 2D 变换代码里实际会踩的坑。

### 4. 程序生成占位精灵

位置：`Assets/Scripts/OneStroke/OneStrokeNode.cs` L185-L213（Edge 占位长条同理，OneStrokeEdge.cs L224-L243）

```csharp
private static Sprite PlaceholderCircle
{
    get
    {
        if (_placeholderCircle == null)
        {
            const int size = 128;
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
            var px = new Color32[size * size];
            float radius = size * 0.5f - 2f;                 // 留 2px 抗锯齿边
            var center = new Vector2(size, size) * 0.5f;
            for (int y = 0; y < size; y++)
            {
                for (int x = 0; x < size; x++)
                {
                    float d = Vector2.Distance(new Vector2(x + 0.5f, y + 0.5f), center);
                    float a = Mathf.Clamp01(radius - d + 1f);
                    px[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255f));
                }
            }
            tex.SetPixels32(px);
            tex.Apply();
            // PPU = size → 精灵直径恰为 1 世界单位，缩放即直径
            _placeholderCircle = Sprite.Create(tex, new Rect(0, 0, size, size), new Vector2(0.5f, 0.5f), size);
            _placeholderCircle.name = "OneStrokeNodePlaceholder";
        }
        return _placeholderCircle;
    }
}
```

亮点解析：

- 美术资产未就位时代码自动兜底画圆点/长条，**场景里不落任何运行时纹理**——避免把程序生成的纹理序列化进场景文件（这是"程序占位 vs 真实资源"双轨方案的关键约束）。
- 核心亮点是 **PPU（Pixels Per Unit）数学**：`Sprite.Create` 的 `pixelsPerUnit` 参数恰好取纹理边长 `size`，使精灵天然等于 **1 世界单位**。于是"节点直径 = 0.8"只需 `localScale = 0.8`，长条"长度 = len、线宽 = lineWidth"只需 `scale.x = len、scale.y = lineWidth`，所有下游代码的尺寸语义零换算。
- 逐像素绘制用 `Clamp01(radius - d + 1f)` 做了 1px 软边抗锯齿；`SetPixels32` 一次性提交，避免逐像素调用 `SetPixel` 的开销。
- 静态字段缓存全项目共用一份，多次创建节点不会重复生成纹理。

---

## 流程时序类

### 5. 火箭"镜头外瞬移"

位置：`Assets/Scripts/GameManager.cs` L316-L357（飞出实现 `Assets/Scripts/RocketControl/RocketPathManager.cs` L67-L79）

```csharp
/// <summary>运镜到目标关卡机位：运镜开始时即提前激活目标关（可见但暂不可交互），到位后放开输入。</summary>
private IEnumerator MoveToLevelRoutine(int targetIndex)
{
    ActivateLevel(targetIndex, interactive: false);   // 运镜还没起飞，下一关已就位可见

    int camTarget = CameraStateIndexOf(targetIndex);
    // 运镜 = 关卡切换：相机沿路径运镜；火箭不再沿路径移动，改为沿自身朝向飞出镜头，
    // 在同步位置延迟到达后于镜头外瞬移到该关机位（详见 SyncRocketRoutine）。
    rocketController?.Launch();
    if (rocketPath != null)
    {
        rocketPath.FlyOut();
        if (syncPositionDelay > 0f)
            StartCoroutine(SyncRocketRoutine(camTarget));
        else
            rocketPath.SnapTo(camTarget);
    }

    if (cameraPath != null)
    {
        bool arrived = false;
        cameraPath.PlayTo(camTarget, () => arrived = true);
        yield return new WaitUntil(() => arrived);
    }
    _advanceRoutine = null;

    if (CurrentBoard != null)
        CurrentBoard.enabled = true;   // 到位：放开交互

    // 运镜到位、本关真正可玩时，切本关 BGM 并延迟调起对话提示
    // （interactive 已在 ActivateLevel(false) 阶段略过，此处手动补上本关 BGM 切换）
    ApplyLevelBgm(CurrentLevelIndex);
    ShowLevelDialogue(CurrentLevelIndex);
}

/// <summary>同步位置延迟：火箭已在镜头外飞出，延迟到达后将其瞬移到目标关对应的机位（玩家无感）。</summary>
private IEnumerator SyncRocketRoutine(int camTarget)
{
    if (syncPositionDelay > 0f)
        yield return new WaitForSeconds(syncPositionDelay);
    if (rocketPath != null)
        rocketPath.SnapTo(camTarget);
}
```

```csharp
// RocketPathManager.cs —— 火箭飞出：沿自身朝向恒速飞出镜头
public void FlyOut()
{
    Stop();
    _flying = true;
}

private void Update()
{
    if (!_flying) return;
    var tf = Tf;
    tf.position += tf.up * (flyOutSpeed * Time.deltaTime);
}
```

亮点解析：

- **为什么难**：每个关卡机位处火箭的朝向、位置都不同。若直接从 A 关位置飞到 B 关位置，路径要穿过镜头、还要处理转向，怎么飞都穿帮。这里的解法是演出类游戏的通用手法（Dead Cells 的角色换房、多数 Metroidvania 的门过渡都用）：**飞出一个观众看不到的方向（自身 up 朝向）→ 确认已在镜头外 → 瞬移到下一机位就位**。瞬移永远发生在镜头外，玩家无感。
- `syncPositionDelay` 把"飞出"与"瞬移"解耦成两个独立可调参数：延迟必须 ≥ 火箭完全离开画面的时间，但不需要精确同步，容错空间大。
- 火箭行为（飞出/瞬移）收在 `RocketPathManager`，时序编排收在 `GameManager`，职责边界干净；`RocketKeyState` 每个存点自带旋转，下一次 `FlyOut` 自然沿新朝向飞出。
- 配套的防抖在 `Rocketcontroller.Launch()`（Rocketcontroller.cs L47-L49）：`StopAllCoroutines()` 防止连续切关时上一个"自动隐藏 Penqi"协程误关本次动画。

### 6. 切关两阶段时序

位置：`Assets/Scripts/GameManager.cs` L161-L203

```csharp
/// <summary>
/// 激活指定关卡：曾激活过的关卡保持常驻，未解锁的保持禁用；
/// 当前关被重置到初始状态；interactive=false 时棋盘可见但暂不可交互（运镜途中由运镜到位后放开）。
/// </summary>
public void ActivateLevel(int index, bool interactive = true)
{
    if (!IsValidIndex(index))
    {
        Debug.LogError($"[GameManager] 关卡下标越界: {index}", this);
        return;
    }

    _activatedLevels.Add(index);

    for (int i = 0; i < levels.Count; i++)
    {
        var b = levels[i].board;
        if (b == null) continue;

        bool keepActive = i == index || _activatedLevels.Contains(i);
        if (keepActive && !b.gameObject.activeSelf)
            b.gameObject.SetActive(true);
        else if (!keepActive && b.gameObject.activeSelf)
            b.gameObject.SetActive(false);

        if (i == index)
        {
            b.enabled = interactive;   // 运镜途中提前激活的关：可见但输入不响应，到位后放开
            b.ResetBoard();            // 激活过的棋盘 Start 不会二次执行，手动兜底重置
        }
    }

    EnsureSubscribed(index);

    // 失败弹窗跟随当前关（死路弹窗始终监听当前棋盘）
    if (failPopup != null)
        failPopup.BindTo(levels[index].board);

    CurrentLevelIndex = index;

    // 关卡真正开始可玩时（interactive=true）才弹对话提示 / 切本关 BGM；运镜途中的提前激活（interactive=false）不算开始
    if (interactive)
    {
        ApplyLevelBgm(index);
        ShowLevelDialogue(index);
    }
}
```

亮点解析：

- **为什么难**：切关时"画面就位"和"开始可玩"天然不同步——运镜要几秒，运镜途中如果下一关已可交互，玩家会在镜头还在飞时误操作棋盘；但提示文本、BGM 又希望在镜头到位、玩家真正上手时才出现。**把"激活"拆成 `interactive` 参数的两阶段**是本方案的核心设计：运镜起飞前 `ActivateLevel(next, interactive: false)` 就位可见，`PlayTo` 的 `onArrived` 回调后才 `CurrentBoard.enabled = true` 并补切 BGM、弹提示（见 #5 的 MoveToLevelRoutine 尾部）。
- `_activatedLevels` 集合实现"曾激活过的关卡保持常驻"：已通关的图案保留在画面上构成进度感，只有从未解锁的关卡保持禁用——用 HashSet 差集一行算出 `keepActive`。
- `b.ResetBoard()` 的兜底注释点出 Unity 细节：失活再激活的物体 `Start` 不会二次执行，必须手动重置。
- 失败弹窗随关换绑（`failPopup.BindTo`），死路监听永远指向当前棋盘，避免上一关的 `onDeadEnd` 触发弹窗。

### 7. 任意姿态直达过渡 PlayTo

位置：`Assets/Scripts/Camera/CameraPathManager.cs` L145-L216

```csharp
/// <summary>
/// 从当前相机姿态平滑过渡到指定状态（外部驱动场景，如过关后运镜到下一关卡机位）。
/// 过渡参数沿用「指向目标状态的那一段」的配置（即 states[index-1] 的移动方式/时长/曲线）。
/// index = 0 或该段时长无效时直接瞬移。到达后精确落位、触发 onStateReached 并回调 onArrived。
/// 注：CatmullRom 配置的段在直达过渡中退化为直线插值（样条需要完整前后点，起点未必在路径上）。
/// </summary>
public void PlayTo(int index, System.Action onArrived = null)
{
    if (states.Count == 0) { onArrived?.Invoke(); return; }
    index = Mathf.Clamp(index, 0, states.Count - 1);

    Stop();
    var seg = index > 0 ? states[index - 1] : null;
    if (seg == null || seg.duration <= 0.01f)
    {
        ApplyState(index);
        onStateReached?.Invoke(index);
        onArrived?.Invoke();
        return;
    }

    var tr = Cam != null ? Cam.transform : transform;
    var cam = Cam;
    var to = states[index];

    _directTransition = true;
    _directTarget = index;
    _directSeg = seg;
    _directElapsed = 0f;
    _onDirectArrived = onArrived;
    _directFrom = new CameraKeyState
    {
        position = tr.position,
        rotationEuler = tr.rotation.eulerAngles,
    };
    _directFromOrtho = cam != null ? cam.orthographicSize : 0f;
    _directFromFov = cam != null ? cam.fieldOfView : 0f;
    _directToOrtho = to.orthoSize >= 0f ? to.orthoSize : _directFromOrtho;
    _directToFov = to.fov >= 0f ? to.fov : _directFromFov;
}

private void UpdateDirectTransition()
{
    float dt = Time.deltaTime * Mathf.Max(0f, speedMultiplier);
    _directElapsed += dt;
    float t = Mathf.Clamp01(_directElapsed / Mathf.Max(0.01f, _directSeg.duration));
    float e = EvalEase(_directSeg, t);

    var tr = Cam != null ? Cam.transform : transform;
    var to = states[_directTarget];
    tr.position = Vector3.LerpUnclamped(_directFrom.position, to.position, e);
    tr.rotation = Quaternion.Slerp(
        Quaternion.Euler(_directFrom.rotationEuler),
        Quaternion.Euler(to.rotationEuler), e);
    var cam = Cam;
    if (cam != null)
    {
        cam.orthographicSize = Mathf.LerpUnclamped(_directFromOrtho, _directToOrtho, e);
        cam.fieldOfView = Mathf.LerpUnclamped(_directFromFov, _directToFov, e);
    }

    if (t >= 1f)
    {
        int arrived = _directTarget;
        ApplyState(arrived);            // 精确落位（同步 _cursorIndex）
        _directTransition = false;
        onStateReached?.Invoke(arrived);
        var cb = _onDirectArrived;
        _onDirectArrived = null;
        cb?.Invoke();
    }
}
```

亮点解析：

- **为什么难**：`PlayTo` 的调用时机是"任意时刻"，相机当前位置不一定在路径上（可能刚被手动摆过、或上一次过渡被打断）。样条插值（CatmullRom）需要完整前后四个点，起点不在路径上就没法用——所以注释明确写了**样条段在直达过渡中退化为直线插值**，是权衡后的正确取舍而非遗漏。
- 方案：把起点姿态**快照**进 `_directFrom`（位置/旋转/orthoSize/FOV 全量），插值只在快照与目标态之间进行；缓动参数**沿用"指向目标的那一段"**（`states[index-1]`）的配置，运镜手感与自动播放保持一致。
- 与自动播放状态机完全隔离：`_directTransition` 独立标志位 + `Update` 入口分流（`if (_directTransition) { UpdateDirectTransition(); return; }`），两条驱动路径互不污染。
- 时序细节到位：到达时 `ApplyState` 精确落位（消除浮点误差残留并同步 `_cursorIndex`）、回调先取局部变量再置空防重入、`orthoSize/fov = -1` 语义（"到达时不改变"）在起点/终点两侧都做了回退处理。
- `IsTransitioning` 与 `CurrentStateIndex`（直达中 = 目标状态）两个属性暴露给 GameManager 做"切换中拒绝重开"等保护，是状态机对外语义完整的范例。

---

## 状态与事件类

### 8. 多关卡事件幂等订阅与守卫

位置：`Assets/Scripts/GameManager.cs` L249-L262（守卫 L285-L292）

```csharp
/// <summary>确保该关的完成/死路/走边事件已订阅（幂等；动态加入的关卡激活时同样生效）。</summary>
private void EnsureSubscribed(int index)
{
    if (_subscribed.Contains(index)) return;

    var board = levels[index].board;
    if (board == null) return;

    int i = index;
    board.onComplete.AddListener(() => HandleLevelComplete(i));
    board.onDeadEnd.AddListener(() => HandleLevelDeadEnd(i));
    board.onEdgeTraversed.AddListener(_ => HandleEdgeTraversed(i));
    _subscribed.Add(index);
}
```

```csharp
private void HandleLevelComplete(int index)
{
    if (AllComplete || index != CurrentLevelIndex) return;   // 只认当前关，历史关残留回调直接忽略

    AudioManager.Instance?.PlayFX(levelCompleteSfx);
    // 过关后淡出对话提示（死路以下是失败，维持原样不淡出）
    dialogPanel?.FadeOut();
    onLevelComplete?.Invoke();
    // ...（后续推进逻辑略）
}
```

亮点解析：

- **为什么难**：所有关卡同场景常驻（已通关的也保持激活），每个棋盘的 `onComplete` 都可能随时触发。若不做过滤，重玩旧关、或残留回调都会误触发过关流程。本方案是"**订阅一次，处理时守卫**"：订阅永久有效（幂等，`_subscribed` 集合防重），但 `HandleXxx(index)` 入口统一检查 `index != CurrentLevelIndex` 直接丢弃——比"反复订阅/退订"更不容易出监听泄漏。
- `int i = index` 的显式拷贝体现了对闭包捕获的清醒认识：虽然此处捕获方法参数本就安全，显式拷贝让意图自解释，也防御后续有人把代码改成循环内 Lambda 的经典踩坑场景。
- 配套的 `LevelFailPopup.BindTo()`（LevelFailPopup.cs L82-L99）解决同一问题的另一面：弹窗只监听一个棋盘，切关时先卸旧监听再绑新监听，与 GameManager 的守卫互为双保险。
- 手动跳关（GotoLevel/GotoState）会清除 `AllComplete` 并停止进行中的推进协程，保证任何路径进入的关卡切换都收敛到同一条 `MoveToLevelRoutine`。

### 9. inactive 面板惰性初始化

位置：`Assets/Scripts/UI/DialogPanelUI.cs` L29-L72

```csharp
/// <summary>惰性初始化：确保 text/canvasGroup 已绑定（面板可能始终 inactive，不能用 Awake 分配）。</summary>
private void EnsureInit()
{
    if (_inited) return;
    _inited = true;

    if (text == null) text = GetComponentInChildren<TextMeshProUGUI>();
    if (canvasGroup == null) canvasGroup = GetComponent<CanvasGroup>();
    if (canvasGroup == null) canvasGroup = gameObject.AddComponent<CanvasGroup>();

    // 初始隐藏：关闭交互、透明
    canvasGroup.interactable = false;
    canvasGroup.blocksRaycasts = false;
}

/// <summary>调起对话：设置文本并淡入显示面板。面板若处于 inactive 先激活。</summary>
public void Show(string content)
{
    EnsureInit();
    if (!gameObject.activeSelf) gameObject.SetActive(true);
    if (text != null) text.text = content;
    StopFade();
    if (canvasGroup != null)
        _fadeRoutine = StartCoroutine(FadeTo(1f, canvasGroup.alpha));
}

/// <summary>过关后自动淡出：面板当前没在显示（inactive）则无需淡出，直接返回，避免 inactive 上启停协程报错。</summary>
public void FadeOut()
{
    EnsureInit();
    // 面板未激活 = 没有在显示，无需也没有资格在 inactive 物体上启动淡出协程
    if (!gameObject.activeSelf) return;
    StopFade();
    if (canvasGroup == null) return;
    _fadeRoutine = StartCoroutine(FadeTo(0f, canvasGroup.alpha));
}
```

亮点解析：

- **为什么难**：Unity 的 `Awake` 只在物体**首次激活**时执行一次。对话面板平时 inactive（ GameObject 被禁用），`Awake` 永远不会跑，所有依赖 Awake 的绑定/初始化全部失效——这是 Unity UI 开发最高频的坑之一。方案是把初始化收敛到 `EnsureInit()`，以 `_inited` 标志保证幂等，在每个公开入口（Show / FadeOut / HideInstantly）第一行兜底调用。
- 第二层防御：`FadeOut` 先检查 `activeSelf`——对 inactive 物体调用 `StartCoroutine` 会直接抛异常（"Coroutine couldn't be started because the game object is inactive"），"没显示就不需要淡出"的语义判断顺带规避了运行时错误。
- 状态注入顺序正确：先 `SetActive(true)` 再启动协程，`canvasGroup.blocksRaycasts/interactable` 在初始化即关掉，保证面板透明时不拦截棋盘拖拽的射线。
- GameManager 侧配套（GameManager.cs L130-L131）：查找时用 `FindFirstObjectByType<DialogPanelUI>(FindObjectsInactive.Include)` 显式包含未激活物体——单靠 Find 默认行为也是找不到 inactive 对象的，又一个同名坑。

---

## 性能类

### 10. 零 GC 对象池与切片唯一槽位

位置：`Assets/Scripts/Background/BackgroundGalaxies.cs` L147-L202（单个星系状态机 L281-L335；Ring 排序位池 `Assets/Scripts/Srart/Ring.cs` L171-L191）

```csharp
private BackgroundGalaxy[] _pool;      // 每个切片一个专属槽位（下标 = 切片下标）
private readonly List<int> _free = new List<int>();   // 空闲切片下标（不在列表里 = 该切片正在场上）

/// <summary>从空闲切片里随机取一个，在新随机位置重生</summary>
private void Acquire()
{
    if (_bgRenderer == null || _free.Count == 0 || palette == null || palette.Length == 0)
        return;

    var b = _bgRenderer.bounds;
    var spawnPos = new Vector3(
        Random.Range(b.min.x + edgeMargin, b.max.x - edgeMargin),
        Random.Range(b.min.y + edgeMargin, b.max.y - edgeMargin),
        b.center.z);

    // 随机挑一个空闲切片（swap-remove 随机移除，O(1) 无分配）
    int pick = Random.Range(0, _free.Count);
    int sliceIndex = _free[pick];
    _free[pick] = _free[_free.Count - 1];
    _free.RemoveAt(_free.Count - 1);

    _pool[sliceIndex].Spawn(spawnPos);
}

/// <summary>星系淡出完毕后由自身回调：失活并把切片归还空闲列表（之后才能重生同切片）</summary>
internal void Release(BackgroundGalaxy galaxy)
{
    galaxy.gameObject.SetActive(false);
    _free.Add(galaxy.SliceIndex);
}
```

```csharp
// BackgroundGalaxy 状态机核心：无协程、无补间、无每帧分配
private void Update()
{
    float dt = Time.deltaTime;

    // 漂移：定期随机换向 + 平滑转向
    _wanderTimer -= dt;
    if (_wanderTimer <= 0f)
    {
        _wanderTimer = Random.Range(0.8f, 1.2f) * Mathf.Max(0.1f, _owner.wanderInterval);
        _targetDir = RandomDir();
    }
    _dir = Vector3.Slerp(_dir, _targetDir, dt);
    _tr.position += _dir * (_speed * dt);

    // 生命周期状态机：统一计算透明度，视图一次应用
    float alpha;
    switch (_phase)
    {
        case PhaseFadeIn:
            _phaseTimer -= dt;
            alpha = 1f - _phaseTimer / _owner.fadeIn;
            if (_phaseTimer <= 0f)
            {
                alpha = 1f;
                // 存活时长加少量随机抖动，避免满场星系同时到期、成批消失
                _phase = PhaseHold;
                _phaseTimer = _owner.holdTime * Random.Range(0.9f, 1.1f);
            }
            break;

        case PhaseHold:
            _phaseTimer -= dt;
            alpha = 1f;
            if (_phaseTimer <= 0f)
            {
                _phase = PhaseFadeOut;
                _phaseTimer = Mathf.Max(0.01f, _owner.fadeOut);
            }
            break;

        case PhaseFadeOut:
            _phaseTimer -= dt;
            alpha = _phaseTimer / _owner.fadeOut;
            if (_phaseTimer <= 0f)
            {
                _owner.Release(this);
                return;
            }
            break;

        default:
            return;
    }
    ApplyView(alpha);
}
```

```csharp
// Ring.cs —— 负数排序位池：每个涟漪环占独立排序位，互不串扰
private const int MinOrder = -30000;   // sortingOrder 最小 -32768

private int TakeOrder()
{
    if (_freeOrders.Count > 0) return _freeOrders.Dequeue();
    if (_nextOrder >= MinOrder) return _nextOrder--;

    if (!_orderPoolWarned)
    {
        Debug.LogWarning($"[Ring] 排序位池耗尽（低于 {MinOrder}），复用 {sortingOrderBase - 1}，可能出现排序串扰", this);
        _orderPoolWarned = true;
    }
    return sortingOrderBase - 1;
}

private void ReleaseOrder(GameObject go)
{
    if (_spawnedOrders.TryGetValue(go, out int order))
    {
        _freeOrders.Enqueue(order);
        _spawnedOrders.Remove(go);
    }
}
```

亮点解析：

- **为什么难**：背景星星/星系是"无限重生"的粒子式需求，朴素写法（Instantiate/Destroy + 协程 + DOTween）会持续产生 GC 与 CPU 尖峰。本方案做到**全程零分配**：对象预生成复用、无协程（`Update` 手写计时状态机）、无补间（alpha 手动插值）。
- **切片唯一约束的数据结构解法**是最大亮点：需求是"同一切片全场景同时最多一个"。若用"随机挑切片 → 检查场上是否已有"需要循环重试；这里反过来让**槽位与切片 1:1 绑定**（`_pool[i]` 永远只显示第 i 张切片），"该切片是否在场"就等价于"下标是否在空闲列表里"——随机取用只需对空闲列表 swap-remove（O(1)、无分配），归还时 `Add` 回列表，天然不重复。
- 状态机细节讲究：存活时长加 `Random.Range(0.9f, 1.1f)` 抖动，避免满场同时到期成批消失的"节拍器效应"；`Spawn` 首帧 `ApplyView(0f)` 防闪帧；pivot 不在中心的切片用包围盒中心反推生成点。
- HDR × Bloom 链路：`ApplyView` 里基色 × `hdrBoost` 提亮超过 1.0 的颜色值，交给 URP Bloom 拾取泛光——不用自发光贴图、不用额外 Pass，纯数值实现发光。
- Ring 的**负数排序位池**是同类资源化思路：每个涟漪环占一个独立 `sortingOrder`（渲染在基准层级之下、环间互不覆盖），用完回收进队列复用；`MinOrder = -30000` 预留了 sortingOrder 理论下限（-32768）的安全边界，耗尽时有降级路径和一次性警告。
- 附带的工程细节（BackgroundGalaxies.cs L204-L208）：`HexColor` 转 Linear 色彩空间（`c.linear`），避免项目在 Linear 工作流下直接填 sRGB 色值导致整体偏亮——色彩空间坑在 2D 发光方案里非常隐蔽。
