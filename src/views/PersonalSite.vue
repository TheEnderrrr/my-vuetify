<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-home-heart</v-icon>
        <h1 class="text-h4 font-weight-bold">个人网站「Ender 的奇妙小窝」（本项目）</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">
        <v-icon start>mdi-calendar-range</v-icon>
        2025.11 - 至今
      </v-chip>
      <v-chip color="primary" variant="tonal" class="mr-2">Vue 3</v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Vuetify 3</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">Vite</v-chip>
      <v-chip color="success" variant="tonal" class="mr-2">GSAP</v-chip>
      <v-chip color="info" variant="tonal">Vue Router</v-chip>
    </div>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        你现在看到的这个网站本身就是该项目。这是一个基于 Vue 3 + Vuetify 3 构建的个人主页与创意实验室，
        集成了个人信息展示、项目作品聚合、图片画廊、审美积累时间轴与多媒体演示等模块。
        全站采用 GSAP 驱动的页面过渡动画与自定义亮/暗双主题系统，
        侧边栏提供实时时钟与多城市天气信息，是学习 Vue 生态与前端动效的综合性实践项目。
      </p>
    </v-card>

    <!-- 核心功能 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-view-dashboard</v-icon>
            多模块页面体系
          </h3>
          <ul class="feature-list">
            <li>首页：个人信息、进行中项目、兴趣与游戏清单、技术栈展示</li>
            <li>项目列表：左侧列表 + 右侧详情的动态组件聚合布局</li>
            <li>画廊：CSS 瀑布流图片墙，支持大图预览与外链跳转</li>
            <li>审美积累：时间轴形式的审美记录，内嵌视频/音频播放器</li>
            <li>动画演示：时间轴布局的新闻台包装视频展示，支持锚点定位</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-animation</v-icon>
            GSAP 动效系统
          </h3>
          <ul class="feature-list">
            <li>全局路由切换动画：页面左右滑入滑出 + 淡入淡出</li>
            <li>侧边栏天气卡片轮播动画（10 秒自动切换）</li>
            <li>卡片悬停位移、图片缩放等微交互</li>
            <li>动画取消时的状态回退保护，避免页面卡在中间态</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-weather-sunny</v-icon>
            主题与动态信息
          </h3>
          <ul class="feature-list">
            <li>Vuetify 自定义亮/暗双主题配色，顶栏一键切换</li>
            <li>侧边栏磨砂玻璃质感（backdrop-filter）设计</li>
            <li>Open-Meteo API 多城市实时天气：温度、湿度、风速轮播展示</li>
            <li>天气代码映射为图标与中文描述的完整转换层</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-cog-outline</v-icon>
            工程化配置
          </h3>
          <ul class="feature-list">
            <li>Vite 7 构建 + vite-plugin-vuetify 按需自动导入组件</li>
            <li>vite-plugin-vue-devtools 集成开发调试</li>
            <li>@ 别名路径解析，本地媒体资源（视频/音频/图片）统一管理</li>
            <li>开发服务器配置 Open-Meteo 天气 API 代理</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 项目亮点 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-star</v-icon>
        项目亮点
      </h2>
      <v-row>
        <v-col cols="12" md="4" v-for="(highlight, index) in highlights" :key="index">
          <v-card variant="tonal" :color="highlight.color" class="pa-3 h-100">
            <v-icon size="36" :color="highlight.color" class="mb-2">{{ highlight.icon }}</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ highlight.title }}</h4>
            <p class="text-body-2">{{ highlight.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 页面清单 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-sitemap</v-icon>
        站点结构
      </h2>
      <v-list bg-color="transparent" density="compact">
        <v-list-item v-for="(page, index) in sitePages" :key="index">
          <template v-slot:prepend>
            <v-icon color="primary" class="mr-2">{{ page.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ page.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ page.description }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 技术栈 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        技术栈
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="success" variant="tonal" class="ma-1">
          <v-icon start>mdi-vuejs</v-icon>
          Vue 3.5（Composition API）
        </v-chip>
        <v-chip color="error" variant="tonal" class="ma-1">
          <v-icon start>mdi-palette</v-icon>
          Vuetify 3.10
        </v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1">
          <v-icon start>mdi-flash</v-icon>
          Vite 7
        </v-chip>
        <v-chip color="info" variant="tonal" class="ma-1">
          <v-icon start>mdi-transit-connection-variant</v-icon>
          Vue Router 4
        </v-chip>
        <v-chip color="success" variant="tonal" class="ma-1">
          <v-icon start>mdi-motion-play-outline</v-icon>
          GSAP 3.14
        </v-chip>
        <v-chip color="primary" variant="tonal" class="ma-1">
          <v-icon start>mdi-weather-partly-cloudy</v-icon>
          Open-Meteo API
        </v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1">
          <v-icon start>mdi-font-awesome</v-icon>
          MDI 图标库
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const highlights = ref([
  {
    title: '动效驱动',
    description: '以 GSAP 为核心的全站过渡与微交互体系，动画细节考虑了中断回退等边界情况',
    icon: 'mdi-motion-outline',
    color: 'primary'
  },
  {
    title: '数据可视化集成',
    description: '天气信息经过 API 数据清洗、代码映射与轮播设计，形成完整的信息展示链路',
    icon: 'mdi-chart-box-outline',
    color: 'secondary'
  },
  {
    title: '持续演进',
    description: '项目列表持续收录新作品（包括本站自身），是个人学习轨迹的活档案',
    icon: 'mdi-file-multiple-outline',
    color: 'accent'
  }
])

const sitePages = ref([
  { icon: 'mdi-home', title: '首页（/）', description: '个人简介、进行中项目、兴趣游戏与技术栈' },
  { icon: 'mdi-folder-multiple', title: '项目列表（/projects）', description: '作品聚合页，即你当前所在的页面' },
  { icon: 'mdi-image-multiple', title: '画廊（/gallery）', description: '瀑布流图片墙与预览' },
  { icon: 'mdi-palette', title: '审美积累（/aesthetic）', description: '时间轴形式的审美记录与媒体展示' },
  { icon: 'mdi-animation', title: '动画演示（/gsap-demo）', description: '新闻台包装视频时间轴展示' },
  { icon: 'mdi-information', title: '关于（/about）', description: '社交媒体链接与版权信息' }
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
