<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-vector-polyline</v-icon>
        <h1 class="text-h4 font-weight-bold">一笔画小游戏《星空》</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">
        <v-icon start>mdi-calendar-range</v-icon>
        2026.8 - 2026.9
      </v-chip>
      <v-chip color="primary" variant="tonal" class="mr-2">程序 · 独立开发</v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Unity 2D</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">一笔画 · 欧拉路径</v-chip>
      <v-chip color="warning" variant="tonal" class="mr-2">乡村公益</v-chip>
      <v-chip color="info" variant="tonal">PC 课堂投屏</v-chip>
    </div>

    <!-- GitHub链接 -->
    <v-btn
      href="https://github.com/TheEnderrrr/public_welfare_GJ-StarrySky"
      target="_blank"
      color="primary"
      prepend-icon="mdi-github"
      class="mb-6"
    >
      查看源代码
    </v-btn>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        《星空》是一款基于 Unity 2D 的乡村公益教学益智小游戏，核心玩法为经典的一笔画（欧拉路径），
        单场景多关卡，以相机运镜与火箭升空串联关卡叙事。
        我担任本项目的<b>程序</b>：游戏所有脚本的编写、Unity 引擎内的调试、资源导入与整理，
        以及其他所有涉及程序、UI 和客户端开发方面的内容，均由我个人独立完成。
      </p>
    </v-card>

    <!-- 项目截图 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-image</v-icon>
        项目截图
      </h2>
      <v-row>
        <v-col cols="12" md="6" v-for="(screenshot, index) in screenshots" :key="index">
          <v-card
            variant="outlined"
            class="screenshot-card cursor-pointer"
            @click="openImage(screenshot)"
            hover
          >
            <v-img
              :src="screenshot"
              :alt="`项目截图 ${index + 1}`"
              cover
              class="screenshot-image"
              aspect-ratio="16/9"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <v-card-text class="text-center text-caption py-2">
              截图 {{ index + 1 }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 项目背景 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-school-outline</v-icon>
        项目背景
      </h2>
      <v-list bg-color="transparent">
        <v-list-item v-for="(bg, index) in backgrounds" :key="index">
          <template v-slot:prepend>
            <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
          </template>
          <v-list-item-title class="text-body-1">{{ bg }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 我的职责 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-account-check</v-icon>
        我的职责
      </h2>
      <p class="text-body-1">
        担任本游戏的<b>程序</b>：所有脚本编写、Unity 引擎内调试、资源导入与整理，
        以及其他所有涉及程序、UI 和客户端开发方面的内容，均由我个人独立完成。
      </p>
    </v-card>

    <!-- 代码亮点精选 -->
    <CodeHighlightSection
      class="mb-6"
      title="代码亮点精选"
      subtitle="以下为若干处核心实现细节，代码默认折叠，点击标题栏展开查看。"
      :items="codeHighlights"
    />

    <!-- 职责详情 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-code-braces</v-icon>
            全部脚本开发
          </h3>
          <ul class="feature-list">
            <li>独立编写游戏全部脚本：玩法、关卡、相机、火箭、音频、UI 等所有子系统</li>
            <li>一笔画玩法系统：无向图构建、轨迹采样吸附、进度续画与死路判定</li>
            <li>GameManager 关卡流转中枢：单场景多关卡的调度与时序控制</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-tools</v-icon>
            引擎内调试与工具开发
          </h3>
          <ul class="feature-list">
            <li>承担全部 Unity 引擎内调试：场景搭建验证、参数调优、演出时序联调</li>
            <li>自研编辑器工具：LitLayer 一键批量生成、节点直径统一设置</li>
            <li>相机 / 火箭机位编辑器：一键捕获机位 + 路径 Gizmos 可视化</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-monitor</v-icon>
            UI 与客户端开发
          </h3>
          <ul class="feature-list">
            <li>独立开发全部 UI 面板：开始、暂停、失败重开、通关、对话提示</li>
            <li>自研 AudioManager：BGM 交叉淡入淡出 + FX 音频池</li>
            <li>客户端体验打磨：DOTween 补间动效、弹窗动画、点击拦截问题修复</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-database-import-outline</v-icon>
            资源导入与整理
          </h3>
          <ul class="feature-list">
            <li>负责贴图、序列帧特效、BGM 与音效、字体等全部资源的导入与设置</li>
            <li>规范 Prefab 与目录结构，编写项目文档与子系统使用文档</li>
            <li>PC 课堂投屏适配与发布配置，保证一线教师即开即用</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 图片预览对话框 -->
    <v-dialog v-model="imageDialog" max-width="90vw" persistent>
      <v-card>
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title>项目截图预览</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeImage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <v-img
            :src="currentImage"
            contain
            max-height="80vh"
            class="preview-image"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 技术亮点 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
        技术亮点
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="error" variant="tonal" class="ma-1"><v-icon start>mdi-account-check</v-icon>程序 · 独立完成</v-chip>
        <v-chip color="primary" variant="tonal" class="ma-1"><v-icon start>mdi-code-braces</v-icon>Unity + C#</v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1"><v-icon start>mdi-vector-polyline</v-icon>一笔画算法</v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1"><v-icon start>mdi-camera-wireless</v-icon>相机运镜</v-chip>
        <v-chip color="info" variant="tonal" class="ma-1"><v-icon start>mdi-rocket-launch</v-icon>火箭演出</v-chip>
        <v-chip color="success" variant="tonal" class="ma-1"><v-icon start>mdi-music-box</v-icon>音频池</v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1"><v-icon start>mdi-toolbox</v-icon>编辑器工具</v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1"><v-icon start>mdi-database-import-outline</v-icon>资源整理</v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeHighlightSection from '../components/CodeHighlightSection.vue'

const backgrounds = ref([
  '益智数游是已持续多年的乡村教育支持项目，本项目将七巧板、魔方等实体教具的内核电子化、游戏化，开发适合课堂的数字教具。',
  '游戏最终打包进完整的数字资源包，交由一线教师在课堂电脑上直接投屏至白板，带领全班孩子共同参与。'
])

// 项目截图
const screenshots = [
  new URL('@/assets/pictures/StarrtSky/星空1.png', import.meta.url).href,
  new URL('@/assets/pictures/StarrtSky/星空2.png', import.meta.url).href
]

const imageDialog = ref(false)
const currentImage = ref('')

const openImage = (imageUrl) => {
  currentImage.value = imageUrl
  imageDialog.value = true
}

const closeImage = () => {
  imageDialog.value = false
}

// 代码亮点精选（摘自 src/assets/docs/星空GJ代码亮点整理.md #1 / #10）
const codeHighlights = [
  {
    no: 1,
    name: '帧间线段采样防漏判（拖拽判定经典难点）',
    location: 'OneStrokeBoard.cs · SampleStroke / TrySnap',
    points: [
      '指针事件是逐帧上报的，一帧内指针可能扫过整个节点，只在帧末做命中检测，快速甩动必然漏判。这里把上一帧→当前帧的指针位移按 <code>snapRadius × sampleStepFactor</code> 切片、逐点插值采样，把"连续轨迹判定"降级成"离散点判定"且保证不漏——所有拖拽类交互（划线、切水果、连线）的通用解法。',
      '采样步长不是拍脑袋定值：绑定吸附半径 <code>snapRadius</code>，保证相邻采样点间距小于判定区直径，数学上不可能跳过一个节点。',
      '<code>TrySnap</code> 尾部同时是欧拉路径的两个判定出口：全部边走完 → 过关（Completed）；当前节点邻边全部走完 → 死路（Failed）。判定与视图更新、事件广播在一个函数内闭环。',
      '<code>bestDist = snapRadius</code> 把"半径"复用为"最近距离竞标"初值，循环内同时完成命中判定与最近邻选择，避免二次遍历。'
    ],
    codes: [
      {
        label: 'OneStrokeBoard.cs',
        code: `/// <summary>帧间线段采样：快速甩动也不漏判中间节点</summary>
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
}`
      }
    ]
  },
  {
    no: 2,
    name: '零 GC 对象池与切片唯一槽位',
    location: 'BackgroundGalaxies.cs / BackgroundGalaxy.cs / Ring.cs',
    points: [
      '背景星系是"无限重生"的粒子式需求，朴素写法（Instantiate/Destroy + 协程 + DOTween）会持续产生 GC 与 CPU 尖峰。本方案做到<b>全程零分配</b>：对象预生成复用、无协程（Update 手写计时状态机）、无补间（alpha 手动插值）。',
      '<b>切片唯一约束的数据结构解法</b>：槽位与切片 1:1 绑定（<code>_pool[i]</code> 永远只显示第 i 张切片），"该切片是否在场"等价于"下标是否在空闲列表里"——随机取用只需对空闲列表 swap-remove（O(1)、无分配），归还时 Add 回列表，天然不重复。',
      '状态机细节讲究：存活时长加 <code>Random.Range(0.9f, 1.1f)</code> 抖动，避免满场星系同时到期、成批消失的"节拍器效应"；<code>Spawn</code> 首帧 <code>ApplyView(0f)</code> 防闪帧。',
      'Ring 的<b>负数排序位池</b>：每个涟漪环占一个独立 <code>sortingOrder</code>（渲染在基准层级之下、环间互不覆盖），用完回收进队列复用；<code>MinOrder = -30000</code> 预留 sortingOrder 理论下限（-32768）的安全边界，耗尽有降级路径与一次性警告。',
      'HDR × Bloom 链路：基色 × <code>hdrBoost</code> 提亮超过 1.0 的颜色值交给 URP Bloom 拾取泛光——不用自发光贴图、不用额外 Pass，纯数值实现发光。'
    ],
    codes: [
      {
        label: 'BackgroundGalaxies.cs · 对象池',
        code: `private BackgroundGalaxy[] _pool;      // 每个切片一个专属槽位（下标 = 切片下标）
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
}`
      },
      {
        label: 'BackgroundGalaxy.cs · 状态机',
        code: `// BackgroundGalaxy 状态机核心：无协程、无补间、无每帧分配
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
}`
      },
      {
        label: 'Ring.cs · 排序位池',
        code: `// Ring.cs —— 负数排序位池：每个涟漪环占独立排序位，互不串扰
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
}`
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

.screenshot-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.screenshot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(167, 105, 172, 0.2);
  border-color: rgba(167, 105, 172, 0.5);
}

.screenshot-image {
  transition: transform 0.3s ease;
}

.screenshot-card:hover .screenshot-image {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

.preview-image {
  background: #f5f5f5;
}
</style>