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
            <!-- 内容 1: 日本各大电视频道包装 -->
            <v-timeline-item
              dot-color="#E91E63"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card tv-packaging" 
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
                      <v-icon start size="small">mdi-television-classic</v-icon>
                      电视包装
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 4 月 8 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="pink" class="mr-2">mdi-broadcast</v-icon>
                    日本各大电视频道包装
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    日本电视台的节目包装以其精致的设计感和独特的视觉语言闻名于世。从 NHK 的新闻节目到各民营电视台的资讯栏目，
                    每一套包装都体现了日本设计美学中对细节的极致追求。无论是动态图形的流畅过渡、配色方案的和谐统一，
                    还是字体排版的精妙布局，都展现出专业电视包装的高水准。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    这些包装不仅仅是视觉装饰，更是品牌形象的重要组成部分。它们通过统一的视觉元素、标志性的动画效果
                    和独特的音乐配乐，为观众建立起对节目的认知和情感连接，成为日本电视文化中不可或缺的一部分。
                  </p>

                  <p class="text-body-1 mb-4">
                    除了包装精美，演播厅的布置亦十分可圈可点，各种不同的风格和UI设计，都使得观看者能快速了解节目内容，同时
                    可以放松身心，提升观看体验。
                  </p>
                  
                  <v-alert 
                    type="info" 
                    variant="tonal" 
                    density="compact"
                    class="mb-4"
                    border="start"
                  >
                    <strong>代表作品：</strong>FNN Prime News α、ANN News、TBS News23、NHK Close Up 现代等
                  </v-alert>
                  
                  <!-- 跳转按钮 -->
                  <div class="d-flex justify-start mb-3">
                    <v-btn
                      color="pink"
                      variant="tonal"
                      size="small"
                      @click="goToFNNPrimeNews"
                    >
                      <v-icon start size="small">mdi-play-circle-outline</v-icon>
                      查看相关演示
                    </v-btn>
                  </div>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">电视包装</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">动态设计</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">品牌视觉</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">日本设计</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <!-- 内容 2: 音乐欣赏 - Jizue brink -->
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
                    Jizue - brink
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    日本 NHK 电视台王牌深度新闻纪录片《クローズアップ現代》（Close-up 现代）的主题音乐。
                    该节目自 1993 年开播以来，以“直刺人心的新闻主义”为宗旨，每期聚焦一个社会热点话题，
                    通过深入的记者调查与专家访谈展现时代切面。Jizue 创作的《brink》巧妙融合现代爵士与电子节拍，
                    以其冷静而充满张力的氛围，完美烘托了深度报道的严肃感与穿透力。
                  </p>
                  
                  <!-- 音乐播放器 -->
                  <v-card 
                    class="music-player-card mb-4" 
                    elevation="2" 
                    rounded="lg"
                  >
                    <v-card-text class="pa-4">
                      <div class="d-flex align-center">
                        <v-icon size="48" color="success" class="mr-3">mdi-disc</v-icon>
                        <div class="flex-grow-1">
                          <div class="text-subtitle-1 font-weight-bold mb-1">brink</div>
                          <div class="text-caption text-medium-emphasis mb-2">Jizue • NHK《クローズアップ現代》定制音乐</div>
                        </div>
                      </div>
                      
                      <audio 
                        ref="audioPlayer"
                        controls 
                        class="audio-player mt-3"
                        preload="metadata"
                        volume="0.5"
                      >
                        <source :src="musicUrl" type="audio/flac">
                        您的浏览器不支持音频播放
                      </audio>
                      
                      <!-- 跳转按钮 -->
                      <div class="d-flex justify-end mt-3">
                        <v-btn
                          color="success"
                          variant="tonal"
                          size="small"
                          @click="goToGSAPDemo"
                        >
                          <v-icon start size="small">mdi-video-outline</v-icon>
                          查看相关视频
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">爵士融合</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">NHK 新闻</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">深度纪录片</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <!-- 内容 3: 澳大利亚国家广播电视台扁平化包装 -->
            <v-timeline-item
              dot-color="#2196F3"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card abc-packaging" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#2196F3" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-television-guide</v-icon>
                      电视包装
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 4 月 8 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="blue" class="mr-2">mdi-broadcast</v-icon>
                    澳大利亚国家广播电视台扁平化包装
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    澳大利亚国家广播电视台（ABC）的节目包装采用了现代扁平化设计理念，以简洁明快的视觉语言著称。
                    这种设计风格摒弃了复杂的渐变和立体效果，转而使用纯色块、清晰的几何图形和大胆的排版，
                    创造出极具辨识度的品牌形象。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    ABC 的包装设计充分体现了澳洲文化的开放与活力。明亮的色彩搭配、流畅的动态过渡以及
                    现代化的字体选择，共同构建出一个既专业又亲和的视觉系统。无论是新闻节目还是纪录片，
                    都能通过这套包装快速传达节目调性，同时保持品牌的一致性。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    扁平化设计不仅提升了视觉清晰度，也适应了多平台传播的需求。从电视屏幕到移动设备，
                    这套包装系统都能保持良好的可读性和美观度，体现了当代媒体设计的实用主义美学。
                  </p>
                  
                  <!-- 视频播放器 -->
                  <div class="video-player mb-4">
                    <video 
                      controls 
                      class="video-element"
                      preload="metadata"
                    >
                      <source :src="abcNewsVideoUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">扁平化设计</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">澳洲媒体</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">品牌视觉</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">现代设计</v-chip>
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

            <!-- 内容 5: 湖南卫视2019扁平化风格包装 -->
            <v-timeline-item
              dot-color="#FF6B35"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card hunan-tv" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#FF6B35" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-television-classic</v-icon>
                      电视包装
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 4 月 8 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="orange" class="mr-2">mdi-broadcast</v-icon>
                    湖南卫视2019扁平化风格包装
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    湖南卫视在 2019 年推出的全新扁平化包装系统，标志着中国省级卫视视觉升级的重要里程碑。
                    这套包装摒弃了传统的立体效果和复杂渐变，采用简洁的几何图形、大胆的色块对比和
                    现代化的动态设计语言，展现出年轻、活力、时尚的品牌形象。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    包装设计充分体现了湖南卫视"快乐中国"的品牌理念。明亮的橙色主色调象征着热情与活力，
                    配合流畅的动画过渡和创新的视觉元素，为观众带来耳目一新的观看体验。无论是综艺节目
                    还是新闻栏目，都能通过这套包装快速建立品牌识别度。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    扁平化设计不仅提升了视觉传达效率，也更好地适应了新媒体时代的传播需求。从传统电视
                    到移动端平台，这套包装系统都能保持一致的视觉效果，体现了当代媒体设计的国际化水准
                    和本土化创新。
                  </p>
                  
                  <!-- 视频播放器 -->
                  <div class="video-player mb-4">
                    <video 
                      controls 
                      class="video-element"
                      preload="metadata"
                    >
                      <source :src="hunanTVVideoUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">扁平化设计</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">湖南卫视</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">品牌升级</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">中国媒体</v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <!-- 内容 6: ANN 2025年新新闻短片片头 -->
            <v-timeline-item
              dot-color="#9C27B0"
              size="large"
              class="timeline-item"
            >
              <v-card 
                class="content-card ann-packaging" 
                elevation="3" 
                rounded="xl"
              >
                <v-card-text class="pa-5">
                  <div class="d-flex align-center mb-3">
                    <v-chip 
                      color="#9C27B0" 
                      size="small" 
                      class="mr-2"
                      variant="tonal"
                    >
                      <v-icon start size="small">mdi-television-guide</v-icon>
                      新闻包装
                    </v-chip>
                    <span class="text-caption text-medium-emphasis">
                      <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                      2026 年 4 月 9 日
                    </span>
                  </div>
                  
                  <h3 class="text-h5 font-weight-bold mb-3">
                    <v-icon color="purple" class="mr-2">mdi-newspaper-variant-multiple</v-icon>
                    ANN 2025年全新新闻短片片头
                  </h3>
                  
                  <p class="text-body-1 mb-4">
                    朝日电视台（ANN）于 2025 年启用的全新新闻短片片头包装，以其高级感十足的音乐配乐和极简主义的视觉设计脱颖而出。
                    背景音乐采用了精心编排的现代电子音乐，旋律舒缓而富有层次感，营造出一种放松且专业的氛围，让观众在获取新闻信息的同时能够保持平静的心态。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    UI 动画部分遵循“少即是多”的设计理念，简洁清晰的动态效果没有过多的装饰元素，每一个转场都流畅自然。
                    字体排版精炼大方，色彩搭配克制而优雅，整体呈现出一种高级的新闻美学。这种设计不仅提升了节目的专业感，
                    也让观众能够快速聚焦于新闻内容本身，而非被繁杂的视觉效果分散注意力。
                  </p>
                  
                  <p class="text-body-1 mb-4">
                    这套包装完美诠释了现代新闻媒体应有的气质——既保持权威性和专业性，又通过细腻的设计细节传递出人文关怀。
                    背景音乐的放松属性与简洁清晰的视觉呈现相得益彰，共同构建出一个舒适、可信的新闻观看环境。
                  </p>
                  
                  <!-- 视频播放器 -->
                  <div class="video-player mb-4">
                    <video 
                      controls 
                      class="video-element"
                      preload="metadata"
                    >
                      <source :src="annNewsVideoUrl" type="video/mp4">
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                  
                  <v-alert 
                    type="success" 
                    variant="tonal" 
                    density="compact"
                    class="mb-4"
                    border="start"
                  >
                    <strong>设计亮点：</strong>高级放松的背景音乐 + 简洁清晰的UI动画 = 现代新闻美学的完美诠释
                  </v-alert>
                  
                  <v-divider class="mb-3"></v-divider>
                  
                  <div class="d-flex align-center">
                    <v-icon color="grey" size="small" class="mr-2">mdi-tag</v-icon>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">极简主义</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">背景音乐</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1" class="mr-1">新闻包装</v-chip>
                    <v-chip size="x-small" color="grey-lighten-1">现代美学</v-chip>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import musicFile from '@/assets/musics/Jizue - brink.flac'
import abcNewsVideo from '@/assets/videos/ABC News-OP.mp4'
import hunanTVVideo from '@/assets/videos/湖南卫视包装2019.mp4'
import annNewsVideo from '@/assets/videos/ANN-OP.mp4'

const router = useRouter()

// 音乐文件 URL
const musicUrl = ref(musicFile)
const audioPlayer = ref(null)

// ABC News 视频 URL
const abcNewsVideoUrl = ref(abcNewsVideo)

// 湖南卫视视频 URL
const hunanTVVideoUrl = ref(hunanTVVideo)

// ANN 新闻视频 URL
const annNewsVideoUrl = ref(annNewsVideo)

// 跳转到动画演示页面并滚动到 FNN Prime News α 部分
const goToFNNPrimeNews = () => {
  router.push({ name: '动画演示', hash: '#fnn-prime-news' })
}

// 跳转到动画演示页面并滚动到 Close Up 现代部分
const goToGSAPDemo = () => {
  router.push({ name: '动画演示', hash: '#closeup-modern' })
}

// 设置默认音量为 50%
const setDefaultVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = 0.5
  }
}

// 组件挂载时设置默认音量
onMounted(() => {
  setDefaultVolume()
})

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

.content-card.tv-packaging {
  border-left-color: #E91E63;
}

.content-card.hunan-tv {
  border-left-color: #FF6B35;
}

.content-card.abc-packaging {
  border-left-color: #2196F3;
}

.content-card.video {
  border-left-color: #E91E63;
}

.content-card.ann-packaging {
  border-left-color: #9C27B0;
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

/* 音乐播放器卡片 */
.music-player-card {
  background-color: rgba(76, 175, 80, 0.05);
}

.audio-player {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  outline: none;
}

.audio-player::-webkit-media-controls-panel {
  background-color: rgba(76, 175, 80, 0.1);
}

/* 旧的音乐信息卡片（保留兼容） */
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
