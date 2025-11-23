<template>
  <v-app-bar
    app
    color="primary"
    dark
    elevate-on-scroll
  >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    
    <v-toolbar-title>大数据与分布式系统</v-toolbar-title>
    
    <v-spacer></v-spacer>
    
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
import { ref } from 'vue'

const drawer = ref(false)

const menuItems = ref([
  { title: '首页', icon: 'mdi-home', route: '/' },
  { title: 'HDFS', icon: 'mdi-folder-network', href: 'http://10.18.224.100:9870/', target: '_blank' },
  { title: 'HUE', icon: 'mdi-palette', href: 'https://demo.gethue.com/hue/home', target: '_blank' },
  { title: 'YARN', icon: 'mdi-server', href: 'http://10.18.224.100:8088/', target: '_blank' },
  { title: '预测任务', icon: 'mdi-chart-box', route: '/prediction' },
  { title: '关于', icon: 'mdi-information', route: '/about' }
])
</script>

<style scoped>
.active-link {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>