<template>
  <v-app>
    <AppBar />
    <Sidebar />
    <v-main style="margin-left: var(--v-sidebar-width);">
      <div ref="pageContainer" class="page-wrapper">
        <router-view v-slot="{ Component }">
          <transition
            name="page-fade"
            mode="out-in"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import AppBar from './components/AppBar.vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const pageContainer = ref(null)

// 监听路由变化，执行页面切换动画
const isAnimating = ref(false)

// 新页面进入前 - 初始状态（隐藏在右侧）
const onBeforeEnter = (el) => {
  // 先将新页面滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  })
  
  gsap.set(el, { 
    x: window.innerWidth * 0.3,
    opacity: 0 
  })
}

// 新页面进入动画 - 从右侧滑入
const onEnter = (el, done) => {
  isAnimating.value = true
  
  const tween = gsap.to(el, {
    x: 0,
    opacity: 1,
    duration: 0.15,
    ease: 'power3.out', // 快速开始，慢慢减速
    force3D: true,
    onComplete: () => {
      isAnimating.value = false
      done()
    }
  })
  
  // 如果动画被取消，确保调用 done
  return () => {
    tween.kill()
    gsap.set(el, { x: 0, opacity: 1 })
    isAnimating.value = false
    done()
  }
}

// 旧页面离开动画 - 向左滑出
const onLeave = (el, done) => {
  const tween = gsap.to(el, {
    x: -window.innerWidth * 0.3,
    opacity: 0,
    duration: 0.15,
    ease: 'power2.in', // 逐渐加速
    force3D: true,
    onComplete: done
  })
  
  // 如果动画被取消，确保调用 done
  return () => {
    tween.kill()
    gsap.set(el, { x: -window.innerWidth * 0.3, opacity: 0 })
    done()
  }
}
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
