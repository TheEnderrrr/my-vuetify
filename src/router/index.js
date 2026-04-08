import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Prediction from '../views/Prediction.vue'
import About from '../views/About.vue'
import AnimationTest from '../views/AnimationTest.vue'
import GSAPDemo from '../views/GSAPDemo.vue'
import Aesthetic from '../views/Aesthetic.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/prediction',
    name: 'Prediction',
    component: Prediction
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/animation-test',
    name: 'AnimationTest',
    component: AnimationTest
  },
  {
    path: '/gsap-demo',
    name: '动画演示',
    component: GSAPDemo
  },
  {
    path: '/aesthetic',
    name: '审美积累',
    component: Aesthetic
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），使用保存的位置
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 300)
      })
    }
    // 如果路由有 hash，返回 false 让组件自己处理
    if (to.hash) {
      return false
    }
    // 其他情况不强制滚动，保持当前位置，让页面动画自然进行
    return false
  }
})

export default router