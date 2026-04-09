<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-circle-slice-8</v-icon>
        <h1 class="text-h4 font-weight-bold">点击球 - 034GJ 作品</h1>
      </div>
      <v-chip color="secondary" variant="tonal" class="mr-2">Unity</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">3D Game</v-chip>
      <v-chip color="success" variant="tonal" class="mr-2">034GJ</v-chip>
      <v-chip color="warning" variant="tonal">极简几何</v-chip>
    </div>

    <!-- GitHub链接 -->
    <v-btn 
      href="https://github.com/TheEnderrrr/034GJ-MaoDie" 
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
        《点击球》是我在 034GJ 游戏开发挑战中的作品。034GJ 是一个考验团队玩法开发能力的特殊赛事,
        要求开发者仅使用基础几何图形进行创作,限制使用纹理和文字,专注于游戏机制本身的创新与打磨。
        本作在极简的视觉风格下,实现了富有挑战性的点击玩法。
      </p>
    </v-card>

    <!-- 我的职责 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-account-check</v-icon>
        我的职责
      </h2>
      <v-list bg-color="transparent">
        <v-list-item v-for="(duty, index) in responsibilities" :key="index">
          <template v-slot:prepend>
            <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
          </template>
          <v-list-item-title>{{ duty }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 核心功能 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-monitor-dashboard</v-icon>
            UI 与按键配置系统
          </h3>
          <ul class="feature-list">
            <li>完整的用户界面设计与实现</li>
            <li>可自定义的按键配置系统</li>
            <li>支持多种输入方式与设备适配</li>
            <li>设置菜单与游戏选项管理</li>
            <li>界面交互逻辑与状态管理</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-video-3d</v-icon>
            摄像机与碰撞系统
          </h3>
          <ul class="feature-list">
            <li>摄像机控制脚本开发</li>
            <li>碰撞检测与处理逻辑实现</li>
            <li>视角切换与跟随机制</li>
            <li>3D 场景中的物理交互</li>
            <li>性能优化与碰撞层级管理</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-gamepad</v-icon>
            玩法拓展策划
          </h3>
          <ul class="feature-list">
            <li>核心点击玩法设计与迭代</li>
            <li>难度曲线与关卡节奏把控</li>
            <li>游戏机制的创新与验证</li>
            <li>玩家体验优化建议</li>
            <li>平衡性调整与测试反馈</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-volume-high</v-icon>
            音效与背景设定
          </h3>
          <ul class="feature-list">
            <li>游戏音效设计与搭配</li>
            <li>背景音乐风格定位</li>
            <li>游戏世界观与背景故事构思</li>
            <li>视觉风格与音效的协调统一</li>
            <li>氛围营造与沉浸感提升</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 034GJ 规则 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-ruler-square</v-icon>
        034GJ 创作规则
      </h2>
      <v-list bg-color="transparent">
        <v-list-item v-for="(rule, index) in gjRules" :key="index">
          <template v-slot:prepend>
            <v-icon color="secondary" class="mr-2">mdi-numeric-{{ index + 1 }}-circle</v-icon>
          </template>
          <v-list-item-title class="text-body-1">{{ rule }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 技术亮点 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
        技术亮点
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="primary" variant="tonal" class="ma-1">
          <v-icon start>mdi-code-braces</v-icon>
          Unity C#
        </v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1">
          <v-icon start>mdi-mouse</v-icon>
          点击交互
        </v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1">
          <v-icon start>mdi-vector-combine</v-icon>
          碰撞系统
        </v-chip>
        <v-chip color="info" variant="tonal" class="ma-1">
          <v-icon start>mdi-camera</v-icon>
          摄像机控制
        </v-chip>
        <v-chip color="success" variant="tonal" class="ma-1">
          <v-icon start>mdi-geometry</v-icon>
          极简 3D
        </v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1">
          <v-icon start>mdi-keyboard</v-icon>
          按键配置
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responsibilities = ref([
  '完整 UI 系统设计与实现',
  '按键配置功能开发',
  '摄像机控制脚本编写',
  '碰撞检测与处理逻辑实现',
  '玩法拓展策划与迭代',
  '音效设计与背景设定'
])

const gjRules = ref([
  '肉眼可辨的纯色圆形、三角、矩形作为游戏的实例',
  '3D游戏则是纯色球体、圆锥体、棱锥体、正/长方体',
  '可以使用少量纹理、描边、倒角来装饰，但不应过度使用',
  '除游戏标题和成员名单两处外，游戏内其余地方禁止使用任何文字（包括数字、标点符号、象形文字）',
  '在创作过程中不可以使用基础图案以外的实例，且不可以试图以组合、形变的方式来得到其他图形'
])
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

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
</style>
