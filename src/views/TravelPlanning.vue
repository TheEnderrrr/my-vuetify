<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-map-marker-path</v-icon>
        <h1 class="text-h4 font-weight-bold">旅游信息出行规划系统</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">Python</v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Flask</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">Vue 3</v-chip>
      <v-chip color="info" variant="tonal" class="mr-2">MySQL</v-chip>
      <v-chip color="success" variant="tonal">Tailwind CSS</v-chip>
    </div>

    <!-- 基本信息卡片 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        基本信息
      </h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-list bg-color="transparent" density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-calendar</v-icon>
              </template>
              <v-list-item-title><strong>项目时间:</strong></v-list-item-title>
              <v-list-item-subtitle>2025年6月29日</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-file-document</v-icon>
              </template>
              <v-list-item-title><strong>项目名称:</strong></v-list-item-title>
              <v-list-item-subtitle>旅游出行信息系统</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-list bg-color="transparent" density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-tools</v-icon>
              </template>
              <v-list-item-title><strong>开发工具:</strong></v-list-item-title>
              <v-list-item-subtitle>PyCharm, WebStorm</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" class="mr-2">mdi-source-branch</v-icon>
              </template>
              <v-list-item-title><strong>版本控制:</strong></v-list-item-title>
              <v-list-item-subtitle>Git</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>

    <!-- 项目截图 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-image</v-icon>
        项目截图
      </h2>
      <v-row>
        <v-col cols="12" md="6" v-for="(screenshot, index) in screenshots" :key="index">
          <v-card 
            variant="outlined" 
            class="screenshot-card cursor-pointer"
            @click="openImage(screenshot)"
            hover
          >
            <v-img
              :src="screenshot"
              :alt="`项目截图 ${index + 1}`"
              cover
              class="screenshot-image"
              aspect-ratio="16/9"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <v-card-text class="text-center text-caption py-2">
              截图 {{ index + 1 }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 图片预览对话框 -->
    <v-dialog v-model="imageDialog" max-width="90vw" persistent>
      <v-card>
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title>项目截图预览</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeImage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <v-img
            :src="currentImage"
            contain
            max-height="80vh"
            class="preview-image"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 选题背景与意义 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
        选题背景与意义
      </h2>
      <p class="text-body-1">
        满足旅游行业信息化需求，为用户提供旅游产品检索、预订服务，为管理员 / 商家提供管理平台，
        提升行业管理效率与用户体验。通过数字化手段优化旅游资源配置，实现旅游服务的智能化和便捷化。
      </p>
    </v-card>

    <!-- 核心功能 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-4">
        <v-icon color="primary" class="mr-2">mdi-star-circle</v-icon>
        核心功能
      </h2>
      <v-row>
        <v-col cols="12" md="6" v-for="(feature, index) in features" :key="index">
          <v-card variant="tonal" :color="feature.color" class="pa-4 h-100">
            <div class="d-flex align-center mb-3">
              <v-icon size="32" :color="feature.color" class="mr-2">{{ feature.icon }}</v-icon>
              <h3 class="text-h6 font-weight-bold">{{ feature.title }}</h3>
            </div>
            <ul class="feature-list">
              <li v-for="(item, idx) in feature.items" :key="idx">{{ item }}</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 技术选型 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        技术选型
      </h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-3 h-100">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">
              <v-icon color="info" class="mr-2">mdi-server</v-icon>
              后端技术
            </h3>
            <ul class="tech-list">
              <li><strong>Python + Flask:</strong> RESTful API 开发</li>
              <li><strong>MySQL 5.5:</strong> 关系型数据库</li>
              <li><strong>RESTful API:</strong> 前后端通信规范</li>
            </ul>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-3 h-100">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">
              <v-icon color="accent" class="mr-2">mdi-monitor</v-icon>
              前端技术
            </h3>
            <ul class="tech-list">
              <li><strong>Vue 3:</strong> 渐进式 JavaScript 框架</li>
              <li><strong>Tailwind CSS:</strong> 实用优先的 CSS 框架</li>
              <li><strong>Axios:</strong> HTTP 请求库</li>
            </ul>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-3 h-100">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">
              <v-icon color="success" class="mr-2">mdi-wrench</v-icon>
              开发工具
            </h3>
            <ul class="tech-list">
              <li><strong>PyCharm:</strong> Python IDE</li>
              <li><strong>WebStorm:</strong> 前端开发工具</li>
              <li><strong>Git:</strong> 版本控制系统</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 技术难点与解决方案 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-4">
        <v-icon color="primary" class="mr-2">mdi-puzzle-check</v-icon>
        技术难点与解决方案
      </h2>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="(challenge, index) in challenges" :key="index">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon :color="challenge.color" class="mr-2">{{ challenge.icon }}</v-icon>
              <span class="font-weight-bold">{{ challenge.title }}</span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul class="solution-list">
              <li v-for="(solution, idx) in challenge.solutions" :key="idx">{{ solution }}</li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- 本人负责内容 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-account-check</v-icon>
        本人负责内容
      </h2>
      <v-alert type="info" variant="tonal" border="start" class="mb-4">
        <strong>核心完成系统配置与操作说明模块</strong>
      </v-alert>
      <v-list bg-color="transparent">
        <v-list-item v-for="(task, index) in responsibilities" :key="index">
          <template v-slot:prepend>
            <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
          </template>
          <v-list-item-title>{{ task }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 项目问题与解决 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-bug-check</v-icon>
        项目问题与解决
      </h2>
      <v-row>
        <v-col cols="12" md="6" v-for="(problem, index) in problems" :key="index">
          <v-card variant="outlined" class="pa-4 h-100">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">
              <v-icon color="error" class="mr-2">{{ problem.icon }}</v-icon>
              {{ problem.title }}
            </h3>
            <v-alert :type="problem.type" variant="tonal" density="compact">
              <strong>解决方案:</strong> {{ problem.solution }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 个人总结 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-school</v-icon>
        个人总结
      </h2>
      <v-list bg-color="transparent">
        <v-list-item v-for="(summary, index) in summaries" :key="index">
          <template v-slot:prepend>
            <v-icon color="success" class="mr-2">mdi-star</v-icon>
          </template>
          <v-list-item-title>{{ summary }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 其他信息 -->
    <v-card elevation="1" rounded="lg" class="pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-notebook</v-icon>
        其他信息
      </h2>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">参考文献</h3>
          <p class="text-body-2">按规范引用书籍、期刊、电子文献等</p>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">代码结构</h3>
          <ul class="text-body-2">
            <li><strong>basic:</strong> 用户 / 角色信息管理</li>
            <li><strong>sale:</strong> 订单 / 销售统计管理</li>
          </ul>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 导入项目截图
const screenshots = [
  new URL('@/assets/pictures/travel/1.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/2.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/3.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/4.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/5.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/6.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/7.png', import.meta.url).href,
  new URL('@/assets/pictures/travel/8.png', import.meta.url).href
]

const features = ref([
  {
    title: '多角色登录',
    icon: 'mdi-account-group',
    color: 'primary',
    items: [
      '用户权限登录',
      '管理员权限登录',
      '商家权限登录',
      '分权限访问控制'
    ]
  },
  {
    title: '旅游产品管理',
    icon: 'mdi-map-search',
    color: 'secondary',
    items: [
      '产品增删改查',
      '搜索筛选功能',
      '详情查看页面',
      '分类管理'
    ]
  },
  {
    title: '订单管理',
    icon: 'mdi-receipt-text',
    color: 'accent',
    items: [
      '用户下单功能',
      '订单取消处理',
      '管理员/商家处理订单',
      '退款流程管理'
    ]
  },
  {
    title: '用户管理与数据分析',
    icon: 'mdi-chart-bar',
    color: 'info',
    items: [
      '查看用户列表',
      '禁用/启用用户',
      '修改用户权限',
      '生成运营报表与图表'
    ]
  }
])

const challenges = ref([
  {
    title: '前后端联调',
    icon: 'mdi-link-variant',
    color: 'primary',
    solutions: [
      '配置 CORS 跨域资源共享',
      '统一 API 接口规范',
      '使用 Mock 数据进行前期开发'
    ]
  },
  {
    title: '异步与状态管理',
    icon: 'mdi-sync',
    color: 'secondary',
    solutions: [
      'Vuex 统一管理应用状态',
      'Axios 封装 HTTP 请求',
      '实现接口缓存机制'
    ]
  },
  {
    title: '权限控制',
    icon: 'mdi-shield-lock',
    color: 'accent',
    solutions: [
      'Token 身份验证机制',
      '路由守卫保护敏感页面',
      '前端动态渲染权限菜单'
    ]
  },
  {
    title: '性能优化',
    icon: 'mdi-speedometer',
    color: 'success',
    solutions: [
      '压缩静态资源文件',
      '图片懒加载技术',
      '接口分页查询',
      '热点数据缓存策略'
    ]
  }
])

const responsibilities = ref([
  '项目克隆与环境搭建',
  '前后端配置文件设置',
  'MySQL 数据库初始化',
  '编写用户操作流程文档',
  '编写产品管理操作流程文档',
  '编写订单管理操作流程文档',
  '编写管理员后台操作流程文档',
  '按计划完成设计、开发、整合、测试与文档撰写'
])

const problems = ref([
  {
    title: 'jQuery 修改 DOM 状态失效',
    icon: 'mdi-code-braces',
    type: 'warning',
    solution: '使用 prop() 方法替代 attr() 方法修改 DOM 属性'
  },
  {
    title: 'setTimeout 低效问题',
    icon: 'mdi-timer',
    type: 'warning',
    solution: '传入函数而非字符串，提升运行效率和代码安全性'
  }
])

const summaries = ref([
  '掌握 Flask + Vue 前后端分离开发模式',
  '熟练掌握数据库设计与优化',
  '精通 Flask 和 MySQL 数据库交互操作',
  '熟练使用 Git 版本控制系统',
  '提升问题排查与自主学习能力',
  '增强团队协作与沟通能力',
  '深入理解旅游行业信息化管理流程',
  '夯实软件开发实践基础'
])

// 图片预览功能
const imageDialog = ref(false)
const currentImage = ref('')

const openImage = (imageUrl) => {
  currentImage.value = imageUrl
  imageDialog.value = true
}

const closeImage = () => {
  imageDialog.value = false
}
</script>

<style scoped>
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.feature-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #a769ac;
  font-weight: bold;
}

.tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-list li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-size: 0.9rem;
}

.solution-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.solution-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.solution-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

.screenshot-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.screenshot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(167, 105, 172, 0.2);
  border-color: rgba(167, 105, 172, 0.5);
}

.screenshot-image {
  transition: transform 0.3s ease;
}

.screenshot-card:hover .screenshot-image {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

.preview-image {
  background: #f5f5f5;
}
</style>
