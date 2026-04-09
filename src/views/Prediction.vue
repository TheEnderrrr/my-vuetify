<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-chart-box</v-icon>
        <h1 class="text-h4 font-weight-bold">电影情感与流派预测系统</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">Java</v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Hadoop</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">Vue 3</v-chip>
      <v-chip color="info" variant="tonal">Flask</v-chip>
    </div>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        这是一个基于 Hadoop 分布式计算框架的电影情感与流派预测系统。通过 HDFS 存储海量电影数据,
        利用 YARN 进行资源调度,结合机器学习算法实现电影情感倾向和流派分类的自动化预测。
        系统采用前后端分离架构,提供完整的 Web 交互界面。
      </p>
    </v-card>

    <!-- 项目内容 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目内容
      </h2>
      <v-list bg-color="transparent">
        <v-list-item v-for="(duty, index) in responsibilities" :key="index">
          <template v-slot:prepend>
            <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
          </template>
          <v-list-item-title>{{ duty }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 核心功能 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-server-network</v-icon>
            后端技术架构
          </h3>
          <ul class="feature-list">
            <li>Java + Hadoop: 编写 MapReduce 任务,调用 HDFS 和 YARN API</li>
            <li>HDFS 分布式存储: 存储海量电影数据集和训练模型文件</li>
            <li>YARN 资源调度: 管理集群计算资源,动态分配任务执行</li>
            <li>Flask Web 服务: 提供 RESTful API 接口,处理前端请求</li>
          </ul>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-monitor</v-icon>
            前端技术栈
          </h3>
          <ul class="feature-list">
            <li>Vue 3: 采用 Composition API 构建响应式界面</li>
            <li>Vuetify 3: Material Design 组件库,统一视觉风格</li>
            <li>Axios: HTTP 客户端,与后端 API 通信</li>
            <li>数据可视化: 图表展示预测结果和统计分析</li>
          </ul>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-server</v-icon>
            分布式计算能力
          </h3>
          <ul class="feature-list">
            <li>HDFS 数据存储: 分布式文件系统,高容错性和吞吐量</li>
            <li>YARN 资源管理: 统一资源调度,支持多租户隔离</li>
            <li>MapReduce 计算: 并行处理海量电影数据,高效训练模型</li>
            <li>水平扩展: 轻松增加节点提升计算能力</li>
          </ul>
        </v-card>
      </v-col>
    
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-brain</v-icon>
            智能预测功能
          </h3>
          <ul class="feature-list">
            <li>情感倾向预测: 判断电影情绪是积极还是消极</li>
            <li>流派分类预测: 识别电影所属类型(动作、爱情等)</li>
            <li>准确率 > 60%: 在测试集上表现稳定可靠</li>
            <li>实时响应: 毫秒级预测速度,用户体验流畅</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 系统工作流程 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-4">
        <v-icon color="primary" class="mr-2">mdi-sitemap</v-icon>
        系统工作流程
      </h2>
      
      <!-- 环形流程图 -->
      <div class="circular-flow">
        <!-- 使用 Grid 布局确保精确对齐 -->
        <div class="flow-grid">
          <!-- 第一行：用户端 -->
          <div class="node node-frontend" style="grid-row: 1; grid-column: 1;">
            <v-icon size="48" color="accent">mdi-laptop</v-icon>
            <div class="node-title">用户端</div>
            <div class="node-desc">Vue 3 前端</div>
          </div>
          
          <!-- 箭头1: 前端 → 后端 (上行) -->
          <div class="arrow-horizontal arrow-middle arrow-top" style="grid-row: 1; grid-column: 2;">
            <div class="arrow-label arrow-label-up">发送预测请求</div>
            <div class="arrow-space"></div>
            <div class="arrow-line"></div>
          </div>
          
          <!-- 箭头3: 后端 → 前端 (下行) -->
          <div class="arrow-return arrow-middle arrow-bottom" style="grid-row: 1; grid-column: 2;">
            <div class="arrow-line arrow-left"></div>
            <div class="arrow-space"></div>
            <div class="arrow-label arrow-label-down">返回计算结果</div>
          </div>
          
          <!-- 第一行：后端 -->
          <div class="node node-backend" style="grid-row: 1; grid-column: 3;">
            <v-icon size="48" color="info">mdi-flask</v-icon>
            <div class="node-title">后端</div>
            <div class="node-desc">Flask API</div>
          </div>
          
          <!-- 箭头2: 后端 → Hadoop (上行) -->
          <div class="arrow-horizontal arrow-middle arrow-top" style="grid-row: 1; grid-column: 4;">
            <div class="arrow-label arrow-label-up">组合 Hadoop 指令</div>
            <div class="arrow-space"></div>
            <div class="arrow-line"></div>
          </div>
          
          <!-- 箭头4: Hadoop → 后端 (下行) -->
          <div class="arrow-return arrow-middle arrow-bottom" style="grid-row: 1; grid-column: 4;">
            <div class="arrow-line arrow-left"></div>
            <div class="arrow-space"></div>
            <div class="arrow-label arrow-label-down">处理为 JSON 并返回</div>
          </div>
          
          <!-- 第一行：Hadoop -->
          <div class="node node-hadoop" style="grid-row: 1; grid-column: 5;">
            <v-icon size="48" color="primary">mdi-database</v-icon>
            <div class="node-title">Hadoop</div>
            <div class="node-desc">HDFS + YARN</div>
          </div>
        </div>
      </div>
      
      <!-- 流程说明 -->
      <v-alert type="info" variant="tonal" class="mt-6" border="start">
        <strong>完整数据流:</strong><br>
        前端发送预测请求 →
        Flask 接收并验证参数 →
        Java 程序组合 Hadoop 指令 →
        提交到 YARN 集群执行 →
        从 HDFS 读取数据并计算 →
        返回 JSON 结果给前端展示
      </v-alert>
    </v-card>

    <!-- 应用场景 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-application-export</v-icon>
        应用场景
      </h2>
      <v-row>
        <v-col cols="12" md="3" v-for="(scene, index) in scenes" :key="index">
          <v-card variant="tonal" :color="scene.color" class="pa-3 h-100 text-center">
            <v-icon size="36" :color="scene.color" class="mb-2">{{ scene.icon }}</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ scene.title }}</h4>
            <p class="text-body-2">{{ scene.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- 技术栈详情 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        完整技术栈
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="primary" variant="tonal" class="ma-1">
          <v-icon start>mdi-language-java</v-icon>
          Java
        </v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1">
          <v-icon start>mdi-database</v-icon>
          Hadoop
        </v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1">
          <v-icon start>mdi-folder-network</v-icon>
          HDFS
        </v-chip>
        <v-chip color="info" variant="tonal" class="ma-1">
          <v-icon start>mdi-cpu-64-bit</v-icon>
          YARN
        </v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1">
          <v-icon start>mdi-flask</v-icon>
          Flask
        </v-chip>
        <v-chip color="success" variant="tonal" class="ma-1">
          <v-icon start>mdi-vuejs</v-icon>
          Vue 3
        </v-chip>
        <v-chip color="error" variant="tonal" class="ma-1">
          <v-icon start>mdi-palette</v-icon>
          Vuetify 3
        </v-chip>
        <v-chip color="grey" variant="tonal" class="ma-1">
          <v-icon start>mdi-api</v-icon>
          RESTful API
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responsibilities = ref([
  '基于 Hadoop 分布式计算框架开发',
  'HDFS 数据存储与管理',
  'YARN 资源调度配置',
  'MapReduce 任务编写与优化',
  'Flask 后端 API 开发',
  'Vue 3 前端界面实现'
])

const scenes = ref([
  {
    title: '个性化推荐',
    description: '根据用户喜好推荐电影',
    icon: 'mdi-thumb-up',
    color: 'primary'
  },
  {
    title: '内容创作',
    description: '指导电影制作方向',
    icon: 'mdi-movie-open',
    color: 'secondary'
  },
  {
    title: '市场分析',
    description: '研究电影市场趋势',
    icon: 'mdi-chart-box-outline',
    color: 'accent'
  },
  {
    title: '教学研究',
    description: '大数据课程实践案例',
    icon: 'mdi-school',
    color: 'success'
  }
])
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.feature-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #a769ac;
  font-weight: bold;
}

/* 环形流程图样式 */
.circular-flow {
  width: 100%;
  display: flex;
  justify-content: center;
}

.flow-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 0.5rem;
  align-items: center;
  justify-items: center;
  max-width: 900px;
  width: 100%;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  flex: 0 0 auto;
}

.node-title {
  font-weight: bold;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.node-desc {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.arrow-horizontal {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.arrow-between {
  justify-content: center;
  height: 100%;
}

.arrow-middle {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.arrow-top {
  justify-content: flex-start;
}

.arrow-bottom {
  justify-content: flex-start;
}

.arrow-middle .arrow-label {
  margin: 0;
}

.arrow-label-up {
  margin-bottom: 0.5rem;
}

.arrow-label-down {
  margin-top: 0.5rem;
}

.arrow-space {
  flex: 1;
}

.arrow-label-top {
  margin-bottom: 0.5rem;
}

.arrow-between .arrow-label {
  order: -1;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.arrow-between .arrow-line {
  order: 1;
}

.arrow-return {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.arrow-return .arrow-label {
  margin-top: 0.5rem;
}

.arrow-return .arrow-label {
  margin-top: 0.5rem;
}

.empty-space {
  flex: 1;
  min-width: 140px;
}

.arrow-line {
  width: 80px;
  height: 3px;
  background-color: #9C27B0 !important;
  position: relative;
  display: block;
  flex-shrink: 0;
}

.arrow-line::before {
  content: '';
  position: absolute;
  height: 3px;
  background-color: #9C27B0 !important;
  z-index: 1;
}

/* 上行箭头：左边线条 */
.arrow-horizontal .arrow-line::before {
  right: 100%;
  width: 40px;
}

/* 下行箭头：右边线条 */
.arrow-return .arrow-line::before {
  left: 100%;
  width: 40px;
}

.arrow-label {
  font-size: 0.7rem;
  color: #666;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 900px) {
  .flow-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1rem;
  }
  
  .arrow-horizontal {
    flex-direction: row;
    min-width: auto;
    min-height: 60px;
    justify-content: center;
  }
  
  .arrow-return {
    flex-direction: row;
    min-width: auto;
  }
  
  .arrow-line {
    width: 3px;
    height: 40px;
    background-color: #9C27B0 !important;
  }
  
  .arrow-line::after {
    right: -6px;
    top: auto;
    bottom: -8px;
    border-top: none;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 10px solid #9C27B0;
  }
  
  .arrow-left::after {
    bottom: auto;
    top: -10px;
    border-bottom: none;
    border-top: 10px solid #9C27B0;
  }
  
  .arrow-label {
    margin-top: 0;
    margin-left: 0.5rem;
  }
  
  .empty-space {
    display: none;
  }
}
</style>