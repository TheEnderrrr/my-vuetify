<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    color="surface"
    class="sidebar"
  >
    <div class="d-flex flex-column h-100">
      <!-- 顶部 Logo/标题区域 -->
      <div class="sidebar-header pa-4 text-center">
        <v-avatar size="48" color="primary" class="mb-2">
          <v-icon size="32" color="white">mdi-school</v-icon>
        </v-avatar>
        <div v-if="!rail" class="text-h6 font-weight-bold">学习平台</div>
      </div>

      <!-- 导航菜单区域 -->
      <v-divider class="mx-2"></v-divider>
      
      <v-list density="compact" nav class="flex-grow-1 py-2">
        <!-- 这里稍后添加具体内容 -->
        <v-list-item
          prepend-icon="mdi-home"
          title="首页"
          to="/"
          variant="tonal"
          rounded="lg"
          class="mb-1"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-folder-multiple"
          title="项目列表"
          to="/projects"
          variant="tonal"
          rounded="lg"
          class="mb-1"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-animation"
          title="动画演示"
          to="/gsap-demo"
          variant="tonal"
          rounded="lg"
          class="mb-1"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-play-box"
          title="动画测试"
          to="/animation-test"
          variant="tonal"
          rounded="lg"
          class="mb-1"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-information"
          title="关于"
          to="/about"
          variant="tonal"
          rounded="lg"
          class="mb-1"
        ></v-list-item>
      </v-list>

      <!-- 底部固定区域 -->
      <v-divider class="mx-2"></v-divider>
      
      <div class="sidebar-footer pa-4 text-center">
        <v-btn
          icon
          variant="text"
          size="small"
          @click="toggleRail"
        >
          <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)

const toggleRail = () => {
  rail.value = !rail.value
}
</script>

<style scoped>
.sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.sidebar-header {
  background: linear-gradient(135deg, rgba(167, 105, 172, 0.1) 0%, rgba(167, 105, 172, 0.05) 100%);
  border-radius: 8px;
  margin: 8px;
}

.sidebar-footer {
  background-color: transparent;
}
</style>
