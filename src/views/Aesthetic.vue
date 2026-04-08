<template>
  <v-container class="aesthetic-timeline py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <!-- 页面标题 -->
        <div class="text-center mb-8">
          <h1 class="text-h3 font-weight-bold mb-2">
            <v-icon color="primary" class="mr-2">mdi-palette</v-icon>
            审美积累
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis">记录生活中的美好瞬间与灵感</p>
        </div>

        <!-- 时间轴布局：左侧时间轴，右侧内容 -->
        <div class="timeline-wrapper">
          <v-timeline 
            align-start 
            truncate-line="both" 
            side="end"
            class="custom-timeline"
          >
            <!-- 内容 1: 配色方案 - 莫兰迪色系 -->
            <v-timeline-item
              dot-color="#A769AC"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card morandi" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#A769AC" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-palette-swatch</v-icon>
                      配色方案
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 3 月 28 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">莫兰迪色系 · 温柔高级灰</h3>
                  
                  <p class="text-body-1 mb-4">
                    莫兰迪色系以其低饱和度的特点，营造出温柔、优雅的氛围。这种配色源自意大利画家乔治·莫兰迪的作品，
                    在灰色调中融入淡淡的色彩，呈现出宁静致远的美感。
                  </p>
                  
                  <!-- 配色展示 -->
                  <div class="color-palette mb-4">
                    <div class="color-label text-caption font-weight-bold mb-2">主色调：</div>
                    <div class="color-row d-flex">
                      <div 
                        v-for="(color, index) in morandiColors" 
                        :key="index"
                        class="color-swatch flex-grow-1"
                        :style="{ backgroundColor: color }"
                      >
                      </div>
                    </div>
                    <div class="color-codes mt-2">
                      <v-chip 
                        v-for="(color, index) in morandiColors" 
                        :key="index"
                        size="x-small"
                        variant="outlined"
                        class="mr-1 mb-1"
                      >
                        {{ color }}
                      </v-chip>
                    </div>
                  </div>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">室内设计</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">服装搭配</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">平面设计师</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <!-- 内容 2: 音乐欣赏 - 钢琴曲 -->
            <v-timeline-item
              dot-color="#4CAF50"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card music" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#4CAF50" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-music-note</v-icon>
                      音乐欣赏
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 3 月 25 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="success" class="mr-2">mdi-headphones</v-icon>
                    久石让 - Summer
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    日本作曲家久石让的经典钢琴曲《Summer》，旋律清新明快，仿佛让人置身于夏日的午后。
                    这首曲子是电影《菊次郎的夏天》的主题曲，充满了温暖与治愈的力量。
                  </p>
                  
                  <!-- 音乐信息卡片 -->
                  <v-card 
                    class="music-info mb-4" 
                    elevation="1" 
                    rounded="lg"
                    color="success"
                    variant="tonal"
                  >
                    <v-card-text class="pa-3 d-flex align-center">
                      <v-icon size="40" color="success" class="mr-3">mdi-disc</v-icon>
                      <div>
                        <div class="text-subtitle-2 font-weight-bold">Summer</div>
                        <div class="text-caption text-medium-emphasis">久石让 • Joe Hisaishi</div>
                      </div>
                    </v-card-text>
                  </v-card>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">钢琴曲</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">治愈系</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">电影配乐</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <!-- 内容 3: 摄影作品 - 城市夜景 -->
            <v-timeline-item
              dot-color="#FF9800"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card photography" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#FF9800" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-camera</v-icon>
                      摄影美学
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 3 月 20 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="warning" class="mr-2">mdi-city-variant</v-icon>
                    城市夜景 · 光影交错
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    夜幕降临时的城市，霓虹灯与车流光轨交织成一幅流动的画卷。
                    长曝光捕捉到的不仅是光线，更是时间的痕迹。冷暖色调的对比，
                    展现出都市的独特魅力与现代感。
                  </p>
                  
                  <!-- 配色展示 -->
                  <div class="color-palette mb-4">
                    <div class="color-label text-caption font-weight-bold mb-2">主色调：</div>
                    <div class="color-row d-flex">
                      <div 
                        v-for="(color, index) in nightColors" 
                        :key="index"
                        class="color-swatch flex-grow-1"
                        :style="{ backgroundColor: color }"
                      >
                      </div>
                    </div>
                    <div class="color-codes mt-2">
                      <v-chip 
                        v-for="(color, index) in nightColors" 
                        :key="index"
                        size="x-small"
                        variant="outlined"
                        class="mr-1 mb-1"
                      >
                        {{ color }}
                      </v-chip>
                    </div>
                  </div>
                  
                  <v-alert 
                    type="info" 
                    variant="tonal" 
                    density="compact"
                    class="mb-3"
                    border="start"
                  >
                    <strong>拍摄技巧：</strong>使用三脚架固定相机，ISO 100-400，光圈 f/8-11，快门速度 2-10 秒
                  </v-alert>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">城市摄影</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">长曝光</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">夜景</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <!-- 内容 4: 视频包装 - TBS News23 -->
            <v-timeline-item
              dot-color="#E91E63"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card video" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#E91E63" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-video</v-icon>
                      节目包装
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 4 月 2 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="pink" class="mr-2">mdi-television-classic</v-icon>
                    TBS News23 老包装
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    日本 TBS 电视台 News23 节目的经典片头包装，展现了独特的手绘艺术风格。
                    温暖的水彩质感与流畅的动态设计相结合，体现了传统美术与现代视频技术的完美融合。
                    这种充满人文气息的视觉表达，为新闻节目注入了艺术的温度与情感共鸣。
                  </p>
                  
                  <!-- 视频播放器 -->
                  <div class="video-player mb-4">
                    <video 
                      controls 
                      class="video-element"
                      preload="metadata"
                    >
                      <source src="/src/assets/videos/TBS-news23-OP.mp4" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">电视包装</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">手绘风格</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">动态设计</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// 莫兰迪色系配色
const morandiColors = ref([
  '#D4C5B9',  // 浅米灰
  '#C9B8A8',  // 暖咖色
  '#B8A89A',  // 灰褐色
  '#A8988A',  // 深咖色
  '#9A8B7F'   // 深棕灰
])

// 城市夜景配色
const nightColors = ref([
  '#1A1A2E',  // 深蓝黑
  '#16213E',  // 深蓝
  '#0F3460',  // 宝石蓝
  '#E94560',  // 霓虹红
  '#F39C12'   // 金黄
])
</script>

<style scoped>
.aesthetic-timeline {
  min-height: calc(100vh - 64px);
}

.timeline-wrapper {
  padding-left: 20px;
  width: 100%;
}

.custom-timeline {
  max-width: 100%;
  width: 100%;
}

.timeline-item {
  margin-bottom: 32px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.content-card {
  transition: all 0.3s ease;
  border-left: 4px solid;
  width: 1350px !important;
  max-width: 100%;
}

.content-card.morandi {
  border-left-color: #A769AC;
}

.content-card.music {
  border-left-color: #4CAF50;
}

.content-card.photography {
  border-left-color: #FF9800;
}

.content-card.video {
  border-left-color: #E91E63;
}

.content-card:hover {
  transform: translateX(4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* 配色板样式 */
.color-palette {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 16px;
}

.color-label {
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
}

.color-row {
  gap: 2px;
  border-radius: 6px;
  overflow: hidden;
  height: 60px;
}

.color-swatch {
  height: 100%;
  min-width: 60px;
  transition: transform 0.2s ease;
}

.color-swatch:hover {
  transform: scaleY(1.05);
}

.color-codes {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

/* 音乐信息卡片 */
.music-info {
  background-color: rgba(76, 175, 80, 0.05);
}

/* 视频播放器 */
.video-player {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.02);
  padding: 8px;
}

.video-element {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .timeline-wrapper {
    padding-left: 10px;
  }
  
  .color-row {
    height: 40px;
  }
  
  .color-swatch {
    min-width: 40px;
  }
}
</style>
