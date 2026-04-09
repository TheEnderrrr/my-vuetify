<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-subway</v-icon>
        <h1 class="text-h4 font-weight-bold">JavaFX 桌面地铁报站器</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">JavaFX</v-chip>
      <v-chip color="secondary" variant="tonal">桌面应用</v-chip>
    </div>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        这是一个用 JavaFX 实现的简易桌面地铁报站器,通过多个窗口直接展示的形式显示不同的页面信息。
        适用于地铁站、公交枢纽等场景的实时报站显示系统。
      </p>
    </v-card>

    <!-- 项目内容 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目内容
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
            <v-icon color="primary" class="mr-2">mdi-monitor-multiple</v-icon>
            多窗口展示
          </h3>
          <ul class="feature-list">
            <li>主显示窗口: 显示当前站点和下一站信息</li>
            <li>倒计时窗口: 独立显示到站倒计时</li>
            <li>线路图窗口: 展示完整线路和当前位置</li>
            <li>支持同时开启多个窗口,每个窗口显示不同内容</li>
          </ul>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-table-edit</v-icon>
            灵活的数据编辑
          </h3>
          <ul class="feature-list">
            <li>CSV 文件导入: 从 CSV 文件批量导入站点数据</li>
            <li>Excel 文件导入: 支持 .xlsx 格式文件导入</li>
            <li>编辑器窗口: 直接在程序内编辑表格数据</li>
            <li>内置字符串表格数据结构,支持三种数据导入方式</li>
          </ul>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-timer-outline</v-icon>
            智能倒计时
          </h3>
          <ul class="feature-list">
            <li>自动识别时间: 解析时间格式并计算剩余时间</li>
            <li>实时更新: 每秒刷新倒计时显示</li>
            <li>到站提醒: 到达指定时间自动触发提醒</li>
            <li>指定时间列后,系统会自动识别并执行倒计时功能</li>
          </ul>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-volume-high</v-icon>
            自定义语音播报
          </h3>
          <ul class="feature-list">
            <li>报站铃声: 可自定义提示音和背景音乐</li>
            <li>人声语音: 支持 TTS 语音合成或录音文件</li>
            <li>语音队列: 按顺序播放站点语音播报</li>
            <li>支持更改报站铃声和人声语音</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 预设保存与加载 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-content-save-settings</v-icon>
        预设保存与加载
      </h2>
      <p class="text-body-1 mb-3">
        程序整体支持保存预设配置,采用高效的二进制序列化技术:
      </p>
      <v-row>
        <v-col cols="12" md="4" v-for="(feature, index) in presetFeatures" :key="index">
          <v-card variant="tonal" color="primary" class="pa-3 h-100">
            <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ feature.title }}</h4>
            <p class="text-body-2">{{ feature.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 技术栈 -->
    <v-card elevation="1" rounded="lg" class="mt-4 pa-4">
      <v-card-title class="text-h6 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        技术栈
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-wrap gap-2">
          <v-chip color="primary" variant="tonal" class="ma-1">
            <v-icon start>mdi-language-java</v-icon>
            Java
          </v-chip>
          <v-chip color="secondary" variant="tonal" class="ma-1">
            <v-icon start>mdi-desktop-classic</v-icon>
            JavaFX
          </v-chip>
          <v-chip color="accent" variant="tonal" class="ma-1">
            <v-icon start>mdi-database</v-icon>
            对象序列化
          </v-chip>
          <v-chip color="info" variant="tonal" class="ma-1">
            <v-icon start>mdi-file-table</v-icon>
            Apache POI
          </v-chip>
          <v-chip color="warning" variant="tonal" class="ma-1">
            <v-icon start>mdi-volume-source</v-icon>
            Java Sound API
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <!-- 应用场景 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-map-marker-path</v-icon>
        应用场景
      </h2>
      <v-row>
        <v-col cols="12" md="3" v-for="(scene, index) in scenes" :key="index">
          <v-card variant="tonal" :color="scene.color" class="pa-3 h-100 text-center">
            <v-icon size="36" :color="scene.color" class="mb-2">{{ scene.icon }}</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ scene.title }}</h4>
            <p class="text-body-2">{{ scene.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 技术栈 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        技术栈
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="primary" variant="tonal" class="ma-1">
          <v-icon start>mdi-language-java</v-icon>
          Java
        </v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1">
          <v-icon start>mdi-desktop-classic</v-icon>
          JavaFX
        </v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1">
          <v-icon start>mdi-database</v-icon>
          对象序列化
        </v-chip>
        <v-chip color="info" variant="tonal" class="ma-1">
          <v-icon start>mdi-file-table</v-icon>
          Apache POI
        </v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1">
          <v-icon start>mdi-volume-source</v-icon>
          Java Sound API
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responsibilities = ref([
  'JavaFX 桌面应用开发',
  '多窗口管理与布局设计',
  '数据导入导出功能实现',
  '倒计时逻辑与定时器开发',
  '语音播报系统集成',
  '二进制序列化与预设保存'
])

const presetFeatures = ref([
  {
    title: '二进制存储',
    description: '直接将对象序列化为二进制文件,占用空间小,读写速度快'
  },
  {
    title: '快速加载',
    description: '下次启动时直接加载对应文件,立即恢复工作状态'
  },
  {
    title: '完整保存',
    description: '保存所有配置、数据和设置,无需重新配置'
  }
])

const scenes = ref([
  {
    title: '地铁站',
    description: '实时报站显示',
    icon: 'mdi-subway',
    color: 'primary'
  },
  {
    title: '公交枢纽',
    description: '班次信息显示',
    icon: 'mdi-bus',
    color: 'secondary'
  },
  {
    title: '火车站',
    description: '列车时刻提醒',
    icon: 'mdi-train',
    color: 'accent'
  },
  {
    title: '教学演示',
    description: 'JavaFX 学习案例',
    icon: 'mdi-school',
    color: 'success'
  }
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
