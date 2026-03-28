<template>
  <v-container class="py-6">
    <v-row justify="center">
      <!-- 左侧项目列表 -->
      <v-col cols="12" md="4" lg="3">
        <v-card elevation="2" rounded="lg" class="pa-3">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-folder-multiple</v-icon>
            项目列表
          </v-card-title>
          
          <v-list
            v-model:selected="selectedProject"
            bg-color="transparent"
            density="compact"
          >
            <v-list-item
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
              variant="tonal"
              rounded="lg"
              class="mb-2"
              @click="selectProject(project.id)"
            >
              <template v-slot:prepend>
                <v-icon :color="project.color">{{ project.icon }}</v-icon>
              </template>
              
              <v-list-item-title class="font-weight-medium">
                {{ project.title }}
              </v-list-item-title>
              
              <v-list-item-subtitle class="text-caption mt-1">
                {{ project.subtitle }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- 右侧项目详情 -->
      <v-col cols="12" md="8" lg="7">
        <v-card elevation="2" rounded="lg" min-height="500">
          <Prediction v-if="showPrediction" />
          <div v-else class="pa-8 text-center">
            <v-icon size="80" color="grey-lighten-2">mdi-folder-open-outline</v-icon>
            <h3 class="text-h5 mt-4 text-grey">请选择一个项目查看详情</h3>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import Prediction from './Prediction.vue'

// 项目数据
const projects = [
  {
    id: 'prediction',
    title: '电影分类预测系统',
    subtitle: '基于朴素贝叶斯算法',
    icon: 'mdi-chart-box',
    color: 'primary'
  },
  {
    id: 'gsap',
    title: 'GSAP 动画演示',
    subtitle: '前端动画效果展示',
    icon: 'mdi-animation',
    color: 'accent'
  },
  {
    id: 'animation',
    title: '动画测试页面',
    subtitle: '各种动画效果测试',
    icon: 'mdi-play-box',
    color: 'secondary'
  }
]

// 当前选中的项目
const selectedProject = ref('prediction')

// 是否显示预测组件
const showPrediction = ref(true)

// 选择项目的方法
const selectProject = (projectId) => {
  selectedProject.value = projectId
  // 只有选择 prediction 项目时才显示
  showPrediction.value = (projectId === 'prediction')
}
</script>

<style scoped>
.v-list-item--active {
  background-color: rgba(167, 105, 172, 0.08);
}
</style>
