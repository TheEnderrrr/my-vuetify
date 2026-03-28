<template>
  <v-container class="animation-demo fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="10" lg="10" class="text-center">
        <h1 class="text-h3 mb-6">GSAP 动画测试</h1>
        
        <!-- 触发按钮 -->
        <v-btn 
          color="primary" 
          size="x-large"
          @click="playWipeAnimation"
          class="mb-4"
        >
          播放全屏擦除动画
        </v-btn>

        <!-- 动画元素 -->
        <div ref="wipeElement" class="wipe-box mt-8">
          <v-card elevation="4" class="pa-8">
            <h2 class="text-h4">这是一个卡片</h2>
            <p class="mt-4">观看它如何被擦除效果覆盖</p>
          </v-card>
        </div>

        <!-- 擦除遮罩层 -->
        <div ref="wipeMask" class="wipe-mask"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const wipeElement = ref(null)
const wipeMask = ref(null)

// 全屏擦除动画
const playWipeAnimation = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      // 动画完成后重置
      setTimeout(() => {
        gsap.set(wipeMask.value, { 
          scaleX: 0, 
          transformOrigin: 'left center' 
        })
      }, 1000)
    }
  })

  // 1. 遮罩从左到右擦除
  tl.to(wipeMask.value, {
    duration: 1.5,
    scaleX: 1,
    transformOrigin: 'left center',
    ease: 'power2.inOut'
  })
  // 2. 同时卡片淡出并缩放
  .to(wipeElement.value, {
    duration: 0.8,
    opacity: 0,
    scale: 0.8,
    ease: 'back.in(1.7)'
  }, '-=1') // 在前一个动画结束前 1 秒开始
}
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px);
}

.wipe-box {
  position: relative;
  z-index: 1;
}

.wipe-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform-origin: left center;
  transform: scaleX(0);
  z-index: 1000;
  pointer-events: none;
}
</style>
