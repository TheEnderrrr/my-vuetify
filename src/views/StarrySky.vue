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

    <!-- 项目截图 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
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