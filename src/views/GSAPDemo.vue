<template>
  <div class="gsap-demo-page">
    <v-container class="video-page py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <!-- 左侧主时间轴和內容容器 -->
        <div class="content-wrapper">
          <!-- 左侧主时间轴（深紫色） -->
          <div class="main-timeline"></div>
          
          <!-- 右侧内容 -->
          <div class="right-content">
            <!-- 第一组：FNN-Prime News α -->
            <div id="fnn-prime-news" class="group-wrapper">
              <!-- 浅紫色分组线 -->
              <div class="group-line"></div>
              
              <div class="group-content">
                <!-- 上方标题卡片 -->
                <v-card 
                  elevation="2" 
                  rounded="lg" 
                  class="pa-4 title-card"
                  color="surface"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon color="primary" size="small" class="mr-3">mdi-television-classic</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">FNN-Prime News α</span>
                    </div>
                    <v-btn
                      size="small"
                      variant="tonal"
                      color="primary"
                      rounded="pill"
                      @click="scrollToSection('fnn-prime-news')"
                    >
                      <v-icon start size="small">mdi-align-vertical-center</v-icon>
                      适应位置
                    </v-btn>
                  </div>
                </v-card>

                <!-- 下方视频卡片 -->
                <v-card 
                  elevation="3" 
                  rounded="xl" 
                  class="pa-2 video-card"
                  color="surface"
                >
                  <div class="video-wrapper">
                    <video 
                      controls 
                      class="local-video"
                      preload="metadata"
                    >
                      <source :src="fnnVideoUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                </v-card>
              </div>
            </div>

            <!-- 第二组：News Watch 9 背景音乐的放松属性体现 -->
            <div id="news-watch-9" class="group-wrapper">
              <!-- 浅紫色分组线 -->
              <div class="group-line"></div>
              
              <div class="group-content">
                <!-- 上方标题卡片 -->
                <v-card 
                  elevation="2" 
                  rounded="lg" 
                  class="pa-4 title-card"
                  color="surface"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon color="secondary" size="small" class="mr-3">mdi-music-note</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">News Watch 9 背景音乐的放松属性体现</span>
                    </div>
                    <v-btn
                      size="small"
                      variant="tonal"
                      color="secondary"
                      rounded="pill"
                      @click="scrollToSection('news-watch-9')"
                    >
                      <v-icon start size="small">mdi-align-vertical-center</v-icon>
                      适应位置
                    </v-btn>
                  </div>
                </v-card>

                <!-- 下方视频卡片 -->
                <v-card 
                  elevation="3" 
                  rounded="xl" 
                  class="pa-2 video-card"
                  color="surface"
                >
                  <div class="video-wrapper">
                    <video 
                      controls 
                      class="local-video"
                      preload="metadata"
                    >
                      <source :src="newsWatch9VideoUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                </v-card>
              </div>
            </div>

            <!-- 第三组：Close Up 现代 -->
            <div id="closeup-modern" class="group-wrapper">
              <!-- 浅紫色分组线 -->
              <div class="group-line"></div>
              
              <div class="group-content">
                <!-- 上方标题卡片 -->
                <v-card 
                  elevation="2" 
                  rounded="lg" 
                  class="pa-4 title-card"
                  color="surface"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon color="pink" size="small" class="mr-3">mdi-television-classic</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">Close Up 现代</span>
                    </div>
                    <v-btn
                      size="small"
                      variant="tonal"
                      color="pink"
                      rounded="pill"
                      @click="scrollToSection('closeup-modern')"
                    >
                      <v-icon start size="small">mdi-align-vertical-center</v-icon>
                      适应位置
                    </v-btn>
                  </div>
                </v-card>

                <!-- 下方视频卡片 -->
                <v-card 
                  elevation="3" 
                  rounded="xl" 
                  class="pa-2 video-card"
                  color="surface"
                >
                  <div class="video-wrapper">
                    <video 
                      controls 
                      class="local-video"
                      preload="metadata"
                    >
                      <source :src="closeUpVideoUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                </v-card>
              </div>
            </div>

            <!-- 第四组：NHK-News Watch 7经典包装 -->
            <div id="news-watch-7-classic" class="group-wrapper">
              <!-- 浅紫色分组线 -->
              <div class="group-line"></div>
              
              <div class="group-content">
                <!-- 上方标题卡片 -->
                <v-card 
                  elevation="2" 
                  rounded="lg" 
                  class="pa-4 title-card"
                  color="surface"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon color="blue" size="small" class="mr-3">mdi-television-classic</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">NHK-News Watch 7经典包装</span>
                    </div>
                    <v-btn
                      size="small"
                      variant="tonal"
                      color="blue"
                      rounded="pill"
                      @click="scrollToSection('news-watch-7-classic')"
                    >
                      <v-icon start size="small">mdi-align-vertical-center</v-icon>
                      适应位置
                    </v-btn>
                  </div>
                </v-card>

                <!-- 下方视频卡片 -->
                <v-card 
                  elevation="3" 
                  rounded="xl" 
                  class="pa-2 video-card"
                  color="surface"
                >
                  <div class="video-wrapper">
                    <video 
                      controls 
                      class="local-video"
                      preload="metadata"
                    >
                      <source :src="newsWatch7ClassicUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                </v-card>
              </div>
            </div>

            <!-- 第五组：News Watch 9经典包装 -->
            <div id="news-watch-9-classic" class="group-wrapper">
              <!-- 浅紫色分组线 -->
              <div class="group-line"></div>
              
              <div class="group-content">
                <!-- 上方标题卡片 -->
                <v-card 
                  elevation="2" 
                  rounded="lg" 
                  class="pa-4 title-card"
                  color="surface"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon color="indigo" size="small" class="mr-3">mdi-television-classic</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">News Watch 9经典包装</span>
                    </div>
                    <v-btn
                      size="small"
                      variant="tonal"
                      color="indigo"
                      rounded="pill"
                      @click="scrollToSection('news-watch-9-classic')"
                    >
                      <v-icon start size="small">mdi-align-vertical-center</v-icon>
                      适应位置
                    </v-btn>
                  </div>
                </v-card>

                <!-- 下方视频卡片 -->
                <v-card 
                  elevation="3" 
                  rounded="xl" 
                  class="pa-2 video-card"
                  color="surface"
                >
                  <div class="video-wrapper">
                    <video 
                      controls 
                      class="local-video"
                      preload="metadata"
                    >
                      <source :src="newsWatch9ClassicUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import closeUpVideo from '@/assets/videos/closeUP-OP.mp4'
import fnnVideo from '@/assets/videos/FNN-Prime News α.mp4'
import newsWatch9Video from '@/assets/videos/News Watch 9 Full-2022.mp4'
import newsWatch7ClassicVideo from '@/assets/videos/News Watch 7-OP.mp4'
import newsWatch9ClassicVideo from '@/assets/videos/News Watch 9-FULL.mp4'

const route = useRoute()

// FNN-Prime News α 视频 URL
const fnnVideoUrl = ref(fnnVideo)

// News Watch 9 视频 URL
const newsWatch9VideoUrl = ref(newsWatch9Video)

// Close Up 现代视频 URL
const closeUpVideoUrl = ref(closeUpVideo)

// NHK-News Watch 7经典包装视频 URL
const newsWatch7ClassicUrl = ref(newsWatch7ClassicVideo)

// News Watch 9经典包装视频 URL
const newsWatch9ClassicUrl = ref(newsWatch9ClassicVideo)

// 滚动到指定部分
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // 计算目标位置，减去顶栏高度
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - 80
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// 处理滚动到锚点
const scrollToHash = () => {
  if (route.hash) {
    // 等待页面切换动画完成后再滚动
    setTimeout(() => {
      const element = document.querySelector(route.hash)
      if (element) {
        // 计算目标位置，减去顶栏高度
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - 80
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 200) // 等待页面动画完成（动画 0.15s + 缓冲）
  }
}

// 组件挂载时检查是否有 hash
onMounted(() => {
  scrollToHash()
})

// 监听路由变化，处理 hash 变化
watch(
  () => route.hash,
  (newHash) => {
    if (newHash) {
      scrollToHash()
    }
  }
)

// 组件卸载时清理资源
onUnmounted(() => {
  // 停止所有视频播放
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
    video.pause()
    video.currentTime = 0
  })
})
</script>

<style scoped>
.gsap-demo-page {
  position: relative;
  width: 100%;
  min-height: 100%;
}

.video-page {
  min-height: calc(100vh - 64px);
  padding-top: 32px;
}

.content-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
}

/* 左侧主时间轴（深紫色） */
.main-timeline {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #7b4a8a 0%, #5a366a 100%);
  border-radius: 2px;
  flex-shrink: 0;
}

.right-content {
  flex: 1;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 0;
}

/* 分组包装器 */
.group-wrapper {
  position: relative;
  display: flex;
  gap: 0;
}

/* 浅紫色分组线 */
.group-line {
  position: absolute;
  left: -2px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #c9a8d4 0%, #b080b5 50%, #c9a8d4 100%);
  border-radius: 2px;
  opacity: 0.5;
  flex-shrink: 0;
}

.group-content {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.title-card {
  transition: all 0.3s ease;
}

.video-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  border-radius: 12px;
  overflow: hidden;
}

.video-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

/* 本地视频样式 */
.local-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: contain;
  background-color: #000;
}

/* 响应式调整 */
@media (max-width: 960px) {
  .content-wrapper {
    align-items: flex-start;
  }
  
  .main-timeline,
  .group-line {
    display: none;
  }
  
  .group-content {
    margin-left: 0;
  }
  
  .right-content {
    margin-left: 0;
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .video-page {
    padding-top: 16px;
  }
  
  .title-card {
    padding: 12px !important;
  }
}
</style>
