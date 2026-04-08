<template>
  <v-app-bar
    app
    color="primary"
    dark
    elevate-on-scroll
  >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    
    <v-toolbar-title 
      @click="goToHome"
      class="cursor-pointer"
    >
      Ender 的奇妙小窝
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <!-- 主题切换按钮 -->
    <v-btn
      icon
      variant="text"
      @click="toggleTheme"
      class="mr-2"
    >
      <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
    
    <v-btn 
      v-for="item in menuItems" 
      :key="item.title"
      :to="item.route"
      :href="item.href"
      :target="item.target"
      variant="text"
      rounded="0"
      class="text-none px-4 py-2"
      height="100%"
      active-class="active-link"
    >
      {{ item.title }}
    </v-btn>
  </v-app-bar>
  
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
  >
    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const theme = useTheme()
const drawer = ref(false)

// 当前主题状态
const isDark = computed(() => theme.current.value.dark)

// 切换主题
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

// 跳转到首页
const goToHome = () => {
  router.push('/')
}

const menuItems = ref([
  { title: '首页', icon: 'mdi-home', route: '/' },
  { title: '项目列表', icon: 'mdi-folder-multiple', route: '/projects' },
  { title: '审美积累', icon: 'mdi-palette', route: '/aesthetic' },
  { title: '动画演示', icon: 'mdi-animation', route: '/gsap-demo' },
  { title: '关于', icon: 'mdi-information', route: '/about' }
])
</script>

<style scoped>
.active-link {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 主题切换按钮悬停效果 */
.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 网页标题可点击样式 */
.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.cursor-pointer:hover {
  opacity: 0.8;
}
</style>