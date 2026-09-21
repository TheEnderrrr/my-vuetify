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

          <!-- 正在开发 -->
          <template v-if="devProjects.length">
            <div class="section-label text-warning">
              <v-icon size="16">mdi-progress-clock</v-icon>
              正在开发
            </div>
            <v-list
              v-model:selected="selectedProject"
              bg-color="transparent"
              density="compact"
            >
              <v-list-item
                v-for="project in devProjects"
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

                <div class="period-line">
                  <v-icon size="12" class="mr-1">mdi-calendar-range</v-icon>
                  {{ project.period }}
                </div>
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>
          </template>

          <!-- 已完成 -->
          <div class="section-label text-success">
            <v-icon size="16">mdi-check-decagram</v-icon>
            已完成
          </div>
          <v-list
            v-model:selected="selectedProject"
            bg-color="transparent"
            density="compact"
          >
            <v-list-item
              v-for="project in doneProjects"
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

              <div class="period-line">
                <v-icon size="12" class="mr-1">mdi-calendar-range</v-icon>
                {{ project.period }}
              </div>
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
import Huahuozhen from './Huahuozhen.vue'
import ClickBall from './ClickBall.vue'
import TravelPlanning from './TravelPlanning.vue'
import ElkDmp from './ElkDmp.vue'
import PersonalSite from './PersonalSite.vue'
import StarrySky from './StarrySky.vue'
import TowerDefense from './TowerDefense.vue'
import GameDevTools from './GameDevTools.vue'

// 项目数据
// status: 'dev' = 正在开发（显示在侧边栏顶部章节），'done' = 已完成
// period: 项目起止时段（占位符，待填入真实日期）
const projects = [
  {
    id: 'tower-defense',
    title: '塔防乱斗游戏',
    subtitle: '类王国保卫战 2D 塔防',
    icon: 'mdi-castle',
    color: 'error',
    status: 'dev',
    period: 'XXXX.XX - 至今'
  },
  {
    id: 'dev-tools',
    title: '2D游戏开发辅助工具',
    subtitle: 'PySide6 桌面工具集',
    icon: 'mdi-toolbox',
    color: 'warning',
    status: 'dev',
    period: 'XXXX.XX - 至今'
  },
  {
    id: 'personal-site',
    title: '个人网站「Ender 的奇妙小窝」',
    subtitle: 'Vue3 + Vuetify3，即本站',
    icon: 'mdi-home-heart',
    color: 'primary',
    status: 'done',
    period: 'XXXX.XX - 至今'
  },
  {
    id: 'huahuozhen',
    title: '2D横板RPG游戏《花火镇》',
    subtitle: '重剧情2D平台RPG',
    icon: 'mdi-fire',
    color: 'primary',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  },
  {
    id: 'elk-dmp',
    title: '基于ELK的DMP大数据画像分析系统',
    subtitle: 'ELK + 用户画像',
    icon: 'mdi-account-search',
    color: 'warning',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  },
  {
    id: 'prediction',
    title: '电影分类预测系统',
    subtitle: '基于朴素贝叶斯算法',
    icon: 'mdi-chart-box',
    color: 'secondary',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  },
  {
    id: 'javafx-announcer',
    title: 'JavaFX 桌面报站器',
    subtitle: '地铁报站显示系统',
    icon: 'mdi-subway',
    color: 'accent',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  },
  {
    id: 'click-ball',
    title: '点击球 - 034GJ',
    subtitle: '极简几何3D游戏',
    icon: 'mdi-circle-slice-8',
    color: 'success',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  },
  {
    id: 'starry-sky',
    title: '一笔画小游戏《星空》',
    subtitle: '乡村公益教学益智',
    icon: 'mdi-vector-polyline',
    color: 'primary',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  },
  {
    id: 'travel-planning',
    title: '旅游信息出行规划系统',
    subtitle: 'Flask + Vue3 全栈应用',
    icon: 'mdi-map-marker-path',
    color: 'info',
    status: 'done',
    period: 'XXXX.XX - XXXX.XX'
  }
]

// 正在开发 / 已完成 分组
const devProjects = computed(() => projects.filter(p => p.status === 'dev'))
const doneProjects = computed(() => projects.filter(p => p.status === 'done'))

// 当前选中的项目
const selectedProject = ref('prediction')

// 根据选中项目动态显示对应组件
const currentComponent = computed(() => {
  const componentMap = {
    'tower-defense': TowerDefense,
    'dev-tools': GameDevTools,
    'personal-site': PersonalSite,
    'elk-dmp': ElkDmp,
    'huahuozhen': Huahuozhen,
    'prediction': Prediction,
    'javafx-announcer': JavaFXStationAnnouncer,
    'click-ball': ClickBall,
    'starry-sky': StarrySky,
    'travel-planning': TravelPlanning
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

/* 分组小标题 */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0 16px;
  margin-bottom: 4px;
}

/* 列表项内的起止时段 */
.period-line {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin-top: 2px;
  opacity: 0.7;
}
</style>
