<template>
  <v-container class="py-6">
    <v-row justify="center">
      <!-- 左侧项目列表 -->
      <v-col cols="12" md="3" lg="3" class="project-list-col">
        <div class="toc-wrap">
          <!-- 滚动容器：与详情列同构——卡片自然高度，超出列范围的部分被直接裁切 -->
          <div
            ref="tocScroll"
            class="toc-scroll-area"
            @scroll="onTocScroll"
            @mousemove="onTocAreaMove"
            @mouseleave="onTocAreaLeave"
          >
            <v-card elevation="2" rounded="lg" class="pa-3">
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
          </div>

          <!-- 隐藏式滚动条：滚动时显示细条；鼠标靠近 1.5s 后展开变宽，便于点击拖拽 -->
          <div
            ref="tocBar"
            class="toc-scrollbar"
            :class="{ show: tocHasOverflow, visible: tocVisible, expanded: tocExpanded }"
            @mousedown="onTocTrackDown"
          >
            <div
              class="toc-thumb"
              :style="tocThumbStyle"
              @mousedown.stop.prevent="onThumbDown"
            ></div>
          </div>
        </div>
      </v-col>

      <!-- 右侧项目详情 -->
      <v-col cols="12" md="9" lg="9" class="project-detail-col">
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
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
    period: '2025.03 - 至今'
  },
  {
    id: 'dev-tools',
    title: '2D游戏开发辅助工具',
    subtitle: 'PySide6 桌面工具集',
    icon: 'mdi-toolbox',
    color: 'warning',
    status: 'dev',
    period: '2026.07 - 至今'
  },
  {
    id: 'personal-site',
    title: '个人网站「Ender 的奇妙小窝」',
    subtitle: 'Vue3 + Vuetify3，即本站',
    icon: 'mdi-home-heart',
    color: 'primary',
    status: 'done',
    period: '2025.11 - 至今'
  },
  {
    id: 'huahuozhen',
    title: '2D横板RPG游戏《花火镇》',
    subtitle: '重剧情2D平台RPG',
    icon: 'mdi-fire',
    color: 'primary',
    status: 'done',
    period: '2026.1 - 2026.2'
  },
  {
    id: 'elk-dmp',
    title: '基于ELK的DMP大数据画像分析系统',
    subtitle: 'ELK + 用户画像',
    icon: 'mdi-account-search',
    color: 'warning',
    status: 'done',
    period: '2026.6 - 2026.7'
  },
  {
    id: 'prediction',
    title: '电影分类预测系统',
    subtitle: '基于朴素贝叶斯算法',
    icon: 'mdi-chart-box',
    color: 'secondary',
    status: 'done',
    period: '2025.4 - 2025.5'
  },
  {
    id: 'javafx-announcer',
    title: 'JavaFX 桌面报站器',
    subtitle: '地铁报站显示系统',
    icon: 'mdi-subway',
    color: 'accent',
    status: 'done',
    period: '2024.4 - 2024.6'
  },
  {
    id: 'click-ball',
    title: '点击球 - 034GJ',
    subtitle: '极简几何3D游戏',
    icon: 'mdi-circle-slice-8',
    color: 'success',
    status: 'done',
    period: '2026.3 - 2026.4'
  },
  {
    id: 'starry-sky',
    title: '一笔画小游戏《星空》',
    subtitle: '乡村公益教学益智',
    icon: 'mdi-vector-polyline',
    color: 'primary',
    status: 'done',
    period: '2026.8 - 2026.9'
  },
  {
    id: 'travel-planning',
    title: '旅游信息出行规划系统',
    subtitle: 'Flask + Vue3 全栈应用',
    icon: 'mdi-map-marker-path',
    color: 'info',
    status: 'done',
    period: '2025.11 - 2025.12'
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

/* ---------------- 目录隐藏式滚动条 ---------------- */
// 滚动时显示细条；鼠标靠近右缘持续 1.5s 后展开变宽便于点击；移开后自动收起隐藏
const tocScroll = ref(null)
const tocBar = ref(null)      // 滚动条轨道元素
const tocVisible = ref(false)    // 细条是否显示
const tocExpanded = ref(false)   // 是否展开（变宽）
const tocHasOverflow = ref(false)
const tocThumbStyle = ref({ height: '0px', transform: 'translateY(0px)' })

const TOC_EDGE_ZONE = 20     // 鼠标靠近右缘多少 px 内算"滚动条附近"
const TOC_HOVER_DELAY = 1500 // 靠近多久后展开
const TOC_HIDE_DELAY = 900  // 停止滚动多久后隐藏
const TOC_COLLAPSE_DELAY = 800 // 移开后多久收起
const TOC_THUMB_MAX = 0.45   // 滑块最长占轨道的比例（目录内容不长，避免滑块几乎占满整条轨道）

let tocHideTimer = null
let tocHoverTimer = null
let tocCollapseTimer = null
let tocRO = null
const tocDrag = { active: false, startY: 0, startScrollTop: 0 }

// 同步滑块高度与位置（位置/长度都基于轨道实际高度映射，滑块有长度上限）
const updateTocThumb = () => {
  const el = tocScroll.value
  const bar = tocBar.value
  if (!el || !bar) return
  tocHasOverflow.value = el.scrollHeight > el.clientHeight + 1
  if (!tocHasOverflow.value) return
  const trackH = bar.clientHeight
  const ratio = el.clientHeight / el.scrollHeight
  const h = Math.min(
    Math.round(trackH * TOC_THUMB_MAX),
    Math.max(36, Math.round(trackH * ratio))
  )
  const maxTop = trackH - h
  const progress = el.scrollTop / (el.scrollHeight - el.clientHeight)
  tocThumbStyle.value = {
    height: h + 'px',
    transform: `translateY(${Math.round(progress * maxTop)}px)`
  }
}

const hideTocBarSoon = (delay) => {
  clearTimeout(tocHideTimer)
  tocHideTimer = setTimeout(() => {
    if (!tocDrag.active) {
      tocVisible.value = false
      tocExpanded.value = false
    }
  }, delay)
}

const onTocScroll = () => {
  updateTocThumb()
  if (tocDrag.active) return
  tocVisible.value = true
  clearTimeout(tocCollapseTimer)
  hideTocBarSoon(TOC_HIDE_DELAY)
}

// 鼠标靠近右缘 → 1.5s 后展开；离开边缘 → 收起
const onTocAreaMove = (e) => {
  if (!tocHasOverflow.value || tocDrag.active) return
  const rect = tocScroll.value.getBoundingClientRect()
  const near = rect.right - e.clientX <= TOC_EDGE_ZONE
  if (near) {
    clearTimeout(tocCollapseTimer)
    clearTimeout(tocHoverTimer)
    tocHoverTimer = setTimeout(() => {
      tocExpanded.value = true
      tocVisible.value = true
    }, TOC_HOVER_DELAY)
  } else if (tocExpanded.value) {
    clearTimeout(tocHoverTimer)
    tocCollapseTimer = setTimeout(() => {
      tocExpanded.value = false
      tocVisible.value = false
    }, TOC_COLLAPSE_DELAY)
  } else {
    clearTimeout(tocHoverTimer)
  }
}

const onTocAreaLeave = () => {
  clearTimeout(tocHoverTimer)
  if (tocExpanded.value && !tocDrag.active) {
    clearTimeout(tocCollapseTimer)
    tocCollapseTimer = setTimeout(() => {
      tocExpanded.value = false
      tocVisible.value = false
    }, TOC_COLLAPSE_DELAY)
  }
}

// 点击轨道空白处：平滑滚动到对应位置
const onTocTrackDown = (e) => {
  if (e.target.closest('.toc-thumb')) return
  const el = tocScroll.value
  const rect = e.currentTarget.getBoundingClientRect()
  const y = e.clientY - rect.top
  el.scrollTo({
    top: (y / rect.height) * el.scrollHeight - el.clientHeight / 2,
    behavior: 'smooth'
  })
}

// 拖拽滑块
const onThumbDown = (e) => {
  tocDrag.active = true
  tocDrag.startY = e.clientY
  tocDrag.startScrollTop = tocScroll.value.scrollTop
  tocVisible.value = true
}

const onDocMouseMove = (e) => {
  if (!tocDrag.active) return
  e.preventDefault()
  const el = tocScroll.value
  const bar = tocBar.value
  const thumbH = parseFloat(tocThumbStyle.value.height) || 36
  const scrollable = el.scrollHeight - el.clientHeight
  const trackMovable = Math.max(1, bar.clientHeight - thumbH)
  const delta = e.clientY - tocDrag.startY
  // 鼠标位移按"轨道可移动距离 → 内容可滚动距离"等比换算
  el.scrollTop = tocDrag.startScrollTop + delta * (scrollable / trackMovable)
}

const onDocMouseUp = () => {
  if (!tocDrag.active) return
  tocDrag.active = false
  if (!tocExpanded.value) hideTocBarSoon(TOC_HIDE_DELAY)
}

onMounted(() => {
  document.addEventListener('mousemove', onDocMouseMove)
  document.addEventListener('mouseup', onDocMouseUp)
  nextTick(updateTocThumb)
  if (typeof ResizeObserver !== 'undefined' && tocScroll.value) {
    tocRO = new ResizeObserver(updateTocThumb)
    tocRO.observe(tocScroll.value)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDocMouseMove)
  document.removeEventListener('mouseup', onDocMouseUp)
  tocRO?.disconnect()
  clearTimeout(tocHideTimer)
  clearTimeout(tocHoverTimer)
  clearTimeout(tocCollapseTimer)
})
</script>

<style scoped>
/* 隐藏式滚动条：默认不占位（仅 ≥ md 的桌面布局显示） */
.toc-scrollbar {
  display: none;
}

/* ≥ md（左右两列并排时）：目录与详情各自独立滚动，互不影响 */
@media (min-width: 960px) {
  /* 高度 = 100vh - 顶栏64px - 容器与栅格上下留白合计24px */
  .project-list-col,
  .project-detail-col {
    height: calc(100vh - 88px);
    min-height: 360px;
  }

  /* 目录：与详情列同构——卡片自然高度（四周留白完整，阴影正常显示），
     超出列范围的部分被直接裁切。wrap 用负外边距扩展到 v-col 的
     padding box（上下各 12px），使裁切边缘与详情列（v-col 自身滚动）一致 */
  .toc-wrap {
    position: relative;
    height: calc(100% + 24px);
    margin: -12px 0;
  }

  /* padding 与 v-col 栅格一致：未滚动时卡片位置与详情侧对齐；
     滚动时内容会穿过 padding 区，直到列边缘才被裁切（与详情列行为相同） */
  .toc-scroll-area {
    height: 100%;
    padding: 12px;
    overflow-y: auto;
    border-radius: 8px; /* 裁切边缘圆角，与详情列一致 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE / Edge */
  }

  .toc-scroll-area::-webkit-scrollbar {
    display: none; /* Chrome / Safari */
  }

  /* 隐藏式滚动条：滚动时显示 3px 细条，靠近 1.5s 后展开为 8px 便于点击拖拽。
     right 与卡片右缘对齐（卡片距列缘 12px）；top/bottom 约束轨道上下范围，
     不顶到列的最上/最下缘 */
  .toc-scrollbar {
    display: block;
    position: absolute;
    top: 20px;
    bottom: 20px;
    right: 12px;
    width: 3px;
    border-radius: 3px;
    opacity: 0;
    visibility: hidden; /* 用 visibility 隐藏：不脱离布局，轨道高度始终可测量 */
    pointer-events: none; /* 未展开时不遮挡卡片内容 */
    transition: opacity 0.25s ease, width 0.2s ease, right 0.2s ease;
  }

  /* 内容溢出时轨道才存在（show），滚动/悬停时才可见（visible） */
  .toc-scrollbar.show {
    visibility: visible;
  }

  .toc-scrollbar.visible {
    opacity: 1;
  }

  /* 展开后变宽、向左多占 1px，保持中心线不动 */
  .toc-scrollbar.expanded {
    width: 8px;
    right: 11px;
    pointer-events: auto; /* 展开后可点击/拖拽 */
  }

  .toc-thumb {
    width: 100%;
    border-radius: 4px;
    background: rgba(167, 105, 172, 0.35);
    transition: background 0.2s ease;
  }

  .toc-scrollbar.expanded .toc-thumb {
    background: rgba(167, 105, 172, 0.5);
    cursor: grab;
  }

  .toc-scrollbar.expanded .toc-thumb:hover {
    background: rgba(167, 105, 172, 0.7);
  }

  /* 详情列：内部滚动 + 细样式滚动条 */
  .project-detail-col {
    overflow-y: auto;
    border-radius: 8px;
    scrollbar-width: thin;
    scrollbar-color: rgba(167, 105, 172, 0.4) transparent;
  }

  .project-detail-col::-webkit-scrollbar {
    width: 6px;
  }

  .project-detail-col::-webkit-scrollbar-track {
    background: transparent;
  }

  .project-detail-col::-webkit-scrollbar-thumb {
    background: rgba(167, 105, 172, 0.35);
    border-radius: 3px;
  }
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
