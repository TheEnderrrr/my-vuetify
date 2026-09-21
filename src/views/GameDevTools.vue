<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-toolbox</v-icon>
        <h1 class="text-h4 font-weight-bold">2D游戏开发辅助工具</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">
        <v-icon start>mdi-calendar-range</v-icon>
        XXXX.XX - 至今
      </v-chip>
      <v-chip color="error" variant="tonal" class="mr-2">
        <v-icon start>mdi-progress-clock</v-icon>
        开发中
      </v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Python 3.12</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">PySide6 · Qt6</v-chip>
      <v-chip color="info" variant="tonal">桌面 GUI 工具集</v-chip>
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
      <b>开发中版本</b>：本项目正在积极开发中，本页内容为当前阶段的功能快照（文档更新于 2026-09），
      工具集仍在迭代扩充，<b>不代表最终成品</b>。
    </v-alert>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        基于 PySide6 (Qt6) 的桌面 GUI 应用，围绕 2D 游戏开发现场提供一整套实用小工具集合：
        资产整理归档、AI 智能抠图、帧动画切分、精灵图拼合、塔防策划器五大工具，
        并为全部工具提供 AI / 脚本友好的命令行门面（tdcli）。
        工具之间支持跨工具导入，形成「整理 → 抠图 → 切帧 → 拼图 → 进引擎」的完整工作流。
      </p>
    </v-card>

    <!-- 工具详情 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-image-multiple-outline</v-icon>
            图像处理工具
          </h3>
          <ul class="feature-list">
            <li>背景移除：棋盘格检测 + rembg 10 种 AI 模型，单图 / 批量双模式</li>
            <li>帧动画切分：视频采样 → 帧画廊 → 动画制作三页工作流</li>
            <li>动画制作页支持时间轴排序、画布调位、60fps 帧间隔实时预览</li>
            <li>导出 Unity 兼容的透明 PNG 帧序列</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-map-outline</v-icon>
            资产整理与塔防策划器
          </h3>
          <ul class="feature-list">
            <li>资产整理：大图标网格、颜色标记与备注、批量重命名 / 移动 / 打包</li>
            <li>跨工具导入：资产页一键把文件送入抠图 / 精灵图 / 帧切分工</li>
            <li>精灵图拼合：拖拽排序 + 实时预览，导出透明 PNG + JSON 坐标</li>
            <li>塔防策划器：关卡（地图 / 路径 / 波次）与策划案系统双模式编辑</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-sitemap</v-icon>
            架构设计
          </h3>
          <ul class="feature-list">
            <li>逻辑与 UI 严格分离（logic.py + widget.py），纯逻辑可单测、可 CLI</li>
            <li>工具自动发现：tools/ 下新建目录即自动注册进导航栏</li>
            <li>耗时操作全部 QThread 后台执行，Signal 通知 UI 不阻塞</li>
            <li>ConfigManager 单例配置持久化，工具专属色体系快速区分工具</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-console</v-icon>
            CLI 门面与工程质量
          </h3>
          <ul class="feature-list">
            <li>tdcli：JSON 信封输出 + JSONL 事件流 + 完整退出码表，AI / 脚本友好</li>
            <li>CLI 快照测试锁定输出规范，offscreen 模式验证界面可实例化</li>
            <li>自研 Material 波纹、数值框拖拽调值、页面切换淡入等交互细节</li>
            <li>中文路径兼容、QThread 线程安全等工程约定贯穿全项目</li>
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
        <v-chip color="primary" variant="tonal" class="ma-1"><v-icon start>mdi-language-python</v-icon>Python 3.12</v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1"><v-icon start>mdi-widgets</v-icon>PySide6 · qt-material</v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1"><v-icon start>mdi-robot-outline</v-icon>rembg · onnxruntime AI 抠图</v-chip>
        <v-chip color="info" variant="tonal" class="ma-1"><v-icon start>mdi-console</v-icon>typer CLI 门面</v-chip>
        <v-chip color="success" variant="tonal" class="ma-1"><v-icon start>mdi-cog</v-icon>QThread 后台任务</v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1"><v-icon start>mdi-sitemap</v-icon>工具自动发现</v-chip>
        <v-chip color="error" variant="tonal" class="ma-1"><v-icon start>mdi-database</v-icon>配置持久化</v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
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
