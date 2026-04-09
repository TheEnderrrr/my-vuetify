<template>
  <div class="gallery-page">
    <v-container class="py-8">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold mb-2">
          <v-icon color="primary" class="mr-2">mdi-image-multiple</v-icon>
          画廊
        </h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-2">收集的美好瞬间</p>
        <p class="text-body-2 text-medium-emphasis">部分图片已附加跳转，点击即可前往相关内容本家</p>
      </div>

      <!-- 图片画廊 - lg=10 布局 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <div class="gallery-masonry">
            <div 
              v-for="(image, index) in galleryImages" 
              :key="index"
              class="gallery-item"
            >
              <v-card 
                elevation="2" 
                rounded="lg" 
                class="gallery-card"
                overflow="hidden"
                :class="{ 'gallery-card-clickable': image.href }"
                @click="handleImageClick(image)"
                ripple="false"
              >
                <v-img
                  :src="image.url"
                  :alt="image.name"
                  :aspect-ratio="image.ratio || '16/9'"
                  cover
                  class="gallery-image"
                ></v-img>
                <!-- 跳转图标指示器 -->
                <div v-if="image.href" class="gallery-link-indicator">
                  <v-icon color="white" size="24">mdi-open-in-new</v-icon>
                </div>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 导入画廊图片
import img1 from '@/assets/pictures/gallery/-1879065620.jpg'
import img2 from '@/assets/pictures/gallery/-799710421.jpg'
import img3 from '@/assets/pictures/gallery/006f8wK2gy1h59mbferm5j61hc0u017x02-2ximg-3X.jpg'
import img4 from '@/assets/pictures/gallery/115432414.jpg'
import img5 from '@/assets/pictures/gallery/2022-07-13 07.03.53.jpg'
import img6 from '@/assets/pictures/gallery/7050a62b01b9108f2e51e96832f52e99.jpeg'
import img7 from '@/assets/pictures/gallery/751195.jpg'
import img8 from '@/assets/pictures/gallery/760113.jpg'
import img9 from '@/assets/pictures/gallery/8f4b133bddb766892647a2e4c736617b1463089456.jpg'
import img10 from '@/assets/pictures/gallery/940815bcaae5227eefc6592a575f41cf.suf.jpg'
import img11 from '@/assets/pictures/gallery/FF9$`AM5FVA3)C39`TKT`MG.png'
import img12 from '@/assets/pictures/gallery/IMG_20251108_194146.jpg'
import img13 from '@/assets/pictures/gallery/Image_1772609412623.png'
import img14 from '@/assets/pictures/gallery/Screenshot_20241115_210017.jpg'
import img15 from '@/assets/pictures/gallery/Screenshot_20250622_124633_tv.danmaku.bili.jpg'

const galleryImages = ref([
  { url: img1, name: '-1879065620', ratio: '16/9' },
  { url: img2, name: '-799710421', ratio: '16/9' },
  { url: img3, name: '006f8wK2gy1h59mbferm5j61hc0u017x02-2ximg-3X', ratio: '16/9', href: 'https://lol.qq.com/' },
  { url: img4, name: '115432414', ratio: '16/9' },
  { url: img5, name: '2022-07-13 07.03.53', ratio: '16/9', href: 'https://www.4399.com/flash/210650.htm' },
  { url: img6, name: '7050a62b01b9108f2e51e96832f52e99.jpeg', ratio: '16/9' },
  { url: img7, name: '751195', ratio: '16/9' },
  { url: img8, name: '760113', ratio: '16/9' },
  { url: img9, name: '8f4b133bddb766892647a2e4c736617b1463089456', ratio: '16/9' },
  { url: img10, name: '940815bcaae5227eefc6592a575f41cf.suf', ratio: '4/9' },
  { url: img11, name: 'FF9$`AM5FVA3)C39`TKT`MG', ratio: '16/9' },
  { url: img12, name: 'IMG_20251108_194146', ratio: '16/9' },
  { url: img13, name: 'Image_1772609412623', ratio: '16/9', href: 'https://rocom.qq.com/' },
  { url: img14, name: 'Screenshot_20241115_210017', ratio: '16/9' },
  { url: img15, name: 'Screenshot_20250622_124633_tv.danmaku.bili', ratio: '16/9', href: 'https://www.bilibili.com/opus/1057140486963200037' }
])

// 处理图片点击跳转
const handleImageClick = (image) => {
  if (image.href) {
    window.open(image.href, '_blank')
  }
}
</script>

<style scoped>
.gallery-page {
  min-height: calc(100vh - 64px);
}

/* 瀑布流布局 */
.gallery-masonry {
  columns: 2;
  column-gap: 24px;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: 24px;
}

.gallery-card {
  transition: all 0.3s ease;
  cursor: default;
}

/* 可点击卡片样式 */
.gallery-card-clickable {
  cursor: pointer;
  position: relative;
}

.gallery-card-clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* 普通卡片悬停效果 */
.gallery-card:not(.gallery-card-clickable):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* 跳转指示器 */
.gallery-link-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.gallery-card-clickable:hover .gallery-link-indicator {
  opacity: 1;
}

.gallery-image {
  transition: transform 0.3s ease;
}

.gallery-card:hover .gallery-image {
  transform: scale(1.02);
}

/* 响应式调整 */
@media (max-width: 960px) {
  .gallery-masonry {
    columns: 1;
  }
}
</style>
