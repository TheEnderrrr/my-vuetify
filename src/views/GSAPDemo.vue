<template>
  <v-container class="video-page py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <!-- 左侧主时间轴和內容容器 -->
        <div class="content-wrapper">
          <!-- 左侧主时间轴（深紫色） -->
          <div class="main-timeline"></div>
          
          <!-- 右侧内容 -->
          <div class="right-content">
            <!-- 第一组：动画演示 -->
            <div class="group-wrapper">
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
                  <div class="d-flex align-center">
                    <v-icon color="primary" size="small" class="mr-3">mdi-animation</v-icon>
                    <span class="text-subtitle-1 font-weight-medium">动画演示</span>
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
                    <iframe
                      width="100%"
                      height="100%"
                      :src="videoUrl"
                      title="Video Player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      class="video-frame"
                    ></iframe>
                  </div>
                </v-card>
              </div>
            </div>

            <!-- 第二组：另一个示例 -->
            <div class="group-wrapper">
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
                  <div class="d-flex align-center">
                    <v-icon color="secondary" size="small" class="mr-3">mdi-video</v-icon>
                    <span class="text-subtitle-1 font-weight-medium">视频示例</span>
                  </div>
                </v-card>

                <!-- 下方内容卡片 -->
                <v-card 
                  elevation="3" 
                  rounded="xl" 
                  class="pa-2 video-card"
                  color="surface"
                >
                  <div class="video-wrapper">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/9bZkp7q19f0"
                      title="Video Player 2"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      class="video-frame"
                    ></iframe>
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// 视频 URL - 可以替换为 YouTube、Bilibili 或其他视频平台的嵌入链接
const videoUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ')
</script>

<style scoped>
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
