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
  routes
})

export default router