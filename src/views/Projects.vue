<template>
  <v-container class="py-6">
    <v-row justify="center">
      <!-- 左侧项目列表 -->
      <v-col cols="12" md="3" lg="3" class="project-list-col">
        <v-card elevation="2" rounded="lg" class="pa-3 sticky-card">
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
      <v-col cols="12" md="9" lg="9">
        <v-card elevation="2" rounded="lg" min-height="500">
          <component 
            v-if="currentComponent" 
            :is="currentComponent"
            :key="selectedProject"
          />
          <div v-else class="pa-4 text-center">
            <v-icon size="80" color="grey-lighten-2">mdi-folder-open-outline</v-icon>
            <h3 class="text-h5 mt-4 text-grey">请选择一个项目查看详情</h3>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import Prediction from './Prediction.vue'
import JavaFXStationAnnouncer from './JavaFXStationAnnouncer.vue'

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
    id: 'javafx-announcer',
    title: 'JavaFX 桌面报站器',
    subtitle: '地铁报站显示系统',
    icon: 'mdi-subway',
    color: 'secondary'
  }
]

// 当前选中的项目
const selectedProject = ref('prediction')

// 根据选中项目动态显示对应组件
const currentComponent = computed(() => {
  const componentMap = {
    'prediction': Prediction,
    'javafx-announcer': JavaFXStationAnnouncer
  }
  return componentMap[selectedProject.value] || null
})

// 选择项目的方法
const selectProject = (projectId) => {
  selectedProject.value = projectId
}
</script>

<style scoped>
.project-list-col {
  position: relative;
}

.sticky-card {
  position: sticky;
  top: 80px;
  z-index: 10;
}

.v-list-item--active {
  background-color: rgba(167, 105, 172, 0.08);
}
</style>
