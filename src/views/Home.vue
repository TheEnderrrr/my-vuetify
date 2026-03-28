<template>
  <div class="home-wrapper">
    <v-container class="py-8">
      <!-- 个人简介区域 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card elevation="4" rounded="xl" class="pa-6 mb-6">
            <div class="text-center">
              <v-avatar size="120" class="mb-4" color="primary">
                <v-icon size="60" color="white">mdi-account-circle</v-icon>
              </v-avatar>
              <h1 class="text-h3 font-weight-bold mb-2">Ender</h1>
              <p class="text-h6 text-medium-emphasis mb-4">大数据与分布式系统学习者</p>
              
              <div class="d-flex justify-center gap-3 flex-wrap">
                <v-chip color="primary" variant="tonal" size="small" class="ma-1">
                  <v-icon start>mdi-language-javascript</v-icon>
                  Vue.js
                </v-chip>
                <v-chip color="secondary" variant="tonal" size="small" class="ma-1">
                  <v-icon start>mdi-database</v-icon>
                  Hadoop
                </v-chip>
                <v-chip color="accent" variant="tonal" size="small" class="ma-1">
                  <v-icon start>mdi-chart-timeline-variant</v-icon>
                  Spark
                </v-chip>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 快速访问链接 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card elevation="2" rounded="lg" class="pa-4 mb-6">
            <v-card-title class="text-h5 font-weight-bold mb-4">
              <v-icon color="primary" class="mr-2">mdi-lightning-bolt</v-icon>
              快速访问
            </v-card-title>
            <v-row>
              <v-col cols="12" sm="6" v-for="link in quickLinks" :key="link.title">
                <v-btn
                  :to="link.to"
                  :color="link.color"
                  variant="outlined"
                  rounded="lg"
                  block
                  class="mb-3 py-3"
                  height="auto"
                >
                  <v-icon start>{{ link.icon }}</v-icon>
                  {{ link.title }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- 项目卡片 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card elevation="2" rounded="lg" class="pa-4 mb-6">
            <v-card-title class="text-h5 font-weight-bold mb-4">
              <v-icon color="primary" class="mr-2">mdi-folder-open</v-icon>
              期末项目：电影分类预测系统
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-4">
                基于朴素贝叶斯算法的电影分类预测系统，运行在 Hadoop 分布式平台上，
                能够处理海量数据并进行高效的电影分类预测。
              </p>
              
              <v-divider class="mb-4"></v-divider>
              
              <div class="text-subtitle-2 font-weight-bold mb-3">核心技术栈</div>
              <div class="d-flex flex-wrap gap-2 mb-4">
                <v-chip size="small" color="primary" class="ma-1">Vue 3</v-chip>
                <v-chip size="small" color="secondary" class="ma-1">Vuetify</v-chip>
                <v-chip size="small" color="accent" class="ma-1">Django</v-chip>
                <v-chip size="small" color="success" class="ma-1">Hadoop</v-chip>
                <v-chip size="small" color="info" class="ma-1">Spark</v-chip>
                <v-chip size="small" color="warning" class="ma-1">Naive Bayes</v-chip>
              </div>

              <v-btn 
                to="/projects" 
                color="primary" 
                rounded="lg"
                prepend-icon="mdi-arrow-right"
              >
                查看项目列表
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 关于我 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card elevation="2" rounded="lg" class="pa-4">
            <v-card-title class="text-h5 font-weight-bold mb-4">
              <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
              关于本站
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-3">
                这是一个学习和展示大数据与分布式系统技术的平台。在这里，你可以：
              </p>
              <v-list density="compact" bg-color="transparent">
                <v-list-item
                  v-for="(item, index) in aboutItems"
                  :key="index"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  :subtitle="item.subtitle"
                ></v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const quickLinks = [
  { title: '项目列表', to: '/projects', icon: 'mdi-folder-multiple', color: 'primary' },
  { title: '动画测试', to: '/animation-test', icon: 'mdi-play-box', color: 'secondary' },
  { title: 'GSAP 演示', to: '/gsap-demo', icon: 'mdi-animation', color: 'accent' },
  { title: '关于我', to: '/about', icon: 'mdi-information', color: 'info' }
]

const aboutItems = [
  { icon: 'mdi-school', title: '学习分享', subtitle: '记录大数据技术学习历程' },
  { icon: 'mdi-code-tags', title: '项目实践', subtitle: '展示期末项目成果与代码' },
  { icon: 'mdi-book-open-page-variant', title: '技术文档', subtitle: '整理相关技术文档和笔记' },
  { icon: 'mdi-account-group', title: '团队协作', subtitle: '小组合作开发的结晶' }
]
</script>