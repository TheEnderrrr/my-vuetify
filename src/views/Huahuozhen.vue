<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-fire</v-icon>
        <h1 class="text-h4 font-weight-bold">2D横板RPG游戏《花火镇》</h1>
      </div>
      <v-chip color="secondary" variant="tonal" class="mr-2">Unity</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">2D RPG</v-chip>
      <v-chip color="success" variant="tonal">重剧情</v-chip>
    </div>

    <!-- GitHub链接 -->
    <v-btn 
      href="https://github.com/Aooobi/GJ" 
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
        《花火镇》是一款重剧情的2D平台RPG游戏。故事讲述主角病危后转生到一个全新的世界,经历新手战斗关卡后到达神秘的火花镇。
        在这个世界中,玩家通过与NPC交流了解当地习俗,通过献祭火焰花花瓣或花火向神像许愿。游戏采用瓦片地图构建世界,
        拥有丰富的物品系统、对话系统和战斗机制。
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
            <v-icon color="primary" class="mr-2">mdi-package-variant</v-icon>
            背包与物品系统
          </h3>
          <ul class="feature-list">
            <li>实现背包系统与三个快捷栏功能</li>
            <li>物品属性管理与分类(火焰花花瓣、花火、种子、食物、饰品等)</li>
            <li>物品互动、使用及拾取机制</li>
            <li>数字键快捷使用物品功能</li>
            <li>不同稀有度物品的效果实现</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-animation-play</v-icon>
            动画系统
          </h3>
          <ul class="feature-list">
            <li>动画代码控制与状态机设计</li>
            <li>2D横板角色动画实现</li>
            <li>怪物形象设计与动画制作</li>
            <li>角色移动、攻击、技能释放动画</li>
            <li>动画状态切换逻辑优化</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-palette</v-icon>
            UI界面设计
          </h3>
          <ul class="feature-list">
            <li>背包界面UI实现</li>
            <li>快捷栏UI设计与交互</li>
            <li>菜单页面UI开发</li>
            <li>简约"火花"风格UI素材应用</li>
            <li>对话框、信息面板等界面元素</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-code-braces</v-icon>
            技术亮点
          </h3>
          <ul class="feature-list">
            <li>瓦片地图系统构建游戏世界</li>
            <li>摄像机跟随与场景管理</li>
            <li>对话系统与NPC交互</li>
            <li>神像献祭与许愿机制</li>
            <li>游戏时间过渡与睡眠系统</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 游戏特色 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-star</v-icon>
        游戏特色
      </h2>
      <v-row>
        <v-col cols="12" md="4" v-for="(feature, index) in features" :key="index">
          <v-card variant="tonal" :color="feature.color" class="pa-3 h-100">
            <v-icon size="36" :color="feature.color" class="mb-2">{{ feature.icon }}</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ feature.title }}</h4>
            <p class="text-body-2">{{ feature.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responsibilities = ref([
  '背包系统与快捷栏功能开发',
  '物品属性系统设计与管理',
  '物品互动、使用及拾取机制实现',
  '动画代码控制与动画状态机设计',
  '背包、快捷栏、菜单等页面UI实现'
])

const features = ref([
  {
    title: '丰富剧情',
    description: '主角转生到全新世界,探索火花镇的奥秘,体验层层递进的剧情冲突',
    icon: 'mdi-book-open-page-variant',
    color: 'primary'
  },
  {
    title: '独特玩法',
    description: '通过献祭火焰花花瓣向神像许愿,解放战斗区域,引发村庄变化',
    icon: 'mdi-flame',
    color: 'error'
  },
  {
    title: '精美美术',
    description: '瓦片地图构建世界,简约火花风格UI,丰富的角色与怪物动画',
    icon: 'mdi-palette-swatch',
    color: 'accent'
  },
  {
    title: '深度系统',
    description: '完善的物品系统、对话系统、技能系统与克隆机制',
    icon: 'mdi-cogs',
    color: 'secondary'
  },
  {
    title: '沉浸体验',
    description: '精心配置的音乐音效,关键节点CG与引导,营造沉浸式游戏体验',
    icon: 'mdi-music-note',
    color: 'success'
  },
  {
    title: '隐藏要素',
    description: '包含初的隐藏剧情,等待玩家探索发现',
    icon: 'mdi-eye-outline',
    color: 'warning'
  }
])
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
</style>
