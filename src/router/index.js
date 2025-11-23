import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Hdfs from '../views/Hdfs.vue'
import Hue from '../views/Hue.vue'
import Prediction from '../views/Prediction.vue'
import About from '../views/About.vue'
import Yarn from '../views/Yarn.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hdfs',
    name: 'HDFS',
    component: Hdfs
  },
  {
    path: '/hue',
    name: 'HUE',
    component: Hue
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
    path: '/yarn',
    name: 'Yarn',
    component: Yarn
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router