<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-account-search</v-icon>
        <h1 class="text-h4 font-weight-bold">基于ELK的DMP大数据画像分析系统</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">
        <v-icon start>mdi-calendar-range</v-icon>
        XXXX.XX - XXXX.XX
      </v-chip>
      <v-chip color="primary" variant="tonal" class="mr-2">Elasticsearch</v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Logstash</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">Kibana</v-chip>
      <v-chip color="warning" variant="tonal" class="mr-2">大数据</v-chip>
      <v-chip color="info" variant="tonal">用户画像</v-chip>
    </div>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        这是一个基于 ELK 技术栈构建的 DMP（数据管理平台）用户画像分析系统。通过 Logstash 对海量业务日志与行为数据进行采集清洗，
        利用 Elasticsearch 提供高性能的存储与检索能力，最终借助 Kibana 完成画像的可视化分析。
        系统面向运营与营销场景，从多维度刻画用户特征，辅助精准推荐与决策。
      </p>
    </v-card>

    <!-- 我的职责 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-account-check</v-icon>
        我的职责
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
            <v-icon color="primary" class="mr-2">mdi-database-arrow-down</v-icon>
            数据采集与清洗
          </h3>
          <ul class="feature-list">
            <li>Logstash 多数据源接入与日志采集</li>
            <li>数据的格式化、过滤与字段清洗</li>
            <li>用户行为数据实时解析与入库</li>
            <li>异常数据识别与容错处理</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-database-search</v-icon>
            画像标签构建
          </h3>
          <ul class="feature-list">
            <li>基于行为数据生成基础属性标签</li>
            <li>兴趣偏好与消费能力特征建模</li>
            <li>标签权重计算与画像聚合</li>
            <li>画像数据持久化到 Elasticsearch</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-chart-donut</v-icon>
            可视化分析
          </h3>
          <ul class="feature-list">
            <li>Kibana 仪表盘构建画像看板</li>
            <li>用户群体分布与占比分析</li>
            <li>多维筛选与下钻查询</li>
            <li>画像变化趋势追踪</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-target-account</v-icon>
            应用与服务
          </h3>
          <ul class="feature-list">
            <li>人群圈选与定向推荐支撑</li>
            <li>用户分群与精准营销投放</li>
            <li>画像服务 API 对外提供</li>
            <li>运营决策数据支持</li>
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
        <div class="flow-grid">
          <div class="node node-frontend" style="grid-row: 1; grid-column: 1;">
            <v-icon size="48" color="info">mdi-database-arrow-down</v-icon>
            <div class="node-title">数据源</div>
            <div class="node-desc">业务日志 / 行为数据</div>
          </div>

          <div class="arrow-horizontal arrow-middle arrow-top" style="grid-row: 1; grid-column: 2;">
            <div class="arrow-label arrow-label-up">采集与清洗</div>
            <div class="arrow-space"></div>
          </div>

          <div class="arrow-return arrow-middle arrow-bottom" style="grid-row: 1; grid-column: 2;">
            <div class="arrow-space"></div>
            <div class="arrow-label arrow-label-down">结构化数据</div>
          </div>

          <div class="node node-backend" style="grid-row: 1; grid-column: 3;">
            <v-icon size="48" color="secondary">mdi-database-clock</v-icon>
            <div class="node-title">Logstash</div>
            <div class="node-desc">采集 / 处理管道</div>
          </div>

          <div class="arrow-horizontal arrow-middle arrow-top" style="grid-row: 1; grid-column: 4;">
            <div class="arrow-label arrow-label-up">索引存储</div>
            <div class="arrow-space"></div>
          </div>

          <div class="arrow-return arrow-middle arrow-bottom" style="grid-row: 1; grid-column: 4;">
            <div class="arrow-space"></div>
            <div class="arrow-label arrow-label-down">检索查询</div>
          </div>

          <div class="node node-hadoop" style="grid-row: 1; grid-column: 5;">
            <v-icon size="48" color="primary">mdi-database-search</v-icon>
            <div class="node-title">Elasticsearch</div>
            <div class="node-desc">存储 / 计算</div>
          </div>
        </div>
      </div>

      <!-- 流程说明 -->
      <v-alert type="info" variant="tonal" class="mt-6" border="start">
        <strong>完整数据流:</strong><br>
        采集业务与行为数据 →
        Logstash 清洗与结构化处理 →
        写入 Elasticsearch 构建索引 →
        聚合计算生成用户画像标签 →
        Kibana 可视化看板与检索分析
      </v-alert>

      <!-- 可视化补充卡片 -->
      <v-card variant="tonal" color="accent" class="pa-3 mt-4">
        <div class="d-flex align-center">
          <v-icon size="36" color="accent" class="mr-3">mdi-chart-box</v-icon>
          <div>
            <h4 class="text-subtitle-1 font-weight-bold mb-1">Kibana 可视化</h4>
            <p class="text-body-2 mb-0">基于 Elasticsearch 的聚合结果，构建用户画像仪表盘，辅助运营决策。</p>
          </div>
        </div>
      </v-card>
    </v-card>

    <!-- 技术栈 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        技术栈
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="primary" variant="tonal" class="ma-1">
          <v-icon start>mdi-database</v-icon>
          Elasticsearch
        </v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1">
          <v-icon start>mdi-database-arrow-down</v-icon>
          Logstash
        </v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1">
          <v-icon start>mdi-chart-box</v-icon>
          Kibana
        </v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1">
          <v-icon start>mdi-database-cog</v-icon>
          Beats
        </v-chip>
        <v-chip color="info" variant="tonal" class="ma-1">
          <v-icon start>mdi-chart-timeline-variant</v-icon>
          大数据分析
        </v-chip>
      </div>
    </v-card>

    <!-- 应用场景 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-application-export</v-icon>
        应用场景
      </h2>
      <v-row>
        <v-col cols="12" md="4" v-for="(scene, index) in scenes" :key="index">
          <v-card variant="tonal" :color="scene.color" class="pa-3 h-100 text-center">
            <v-icon size="36" :color="scene.color" class="mb-2">{{ scene.icon }}</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ scene.title }}</h4>
            <p class="text-body-2">{{ scene.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responsibilities = ref([
  'ELK 技术栈环境搭建与配置',
  'Logstash 数据采集管道编写',
  'Elasticsearch 索引设计与数据建模',
  'Kibana 仪表盘与可视化看板构建',
  '用户画像标签体系的规则制定'
])

const scenes = ref([
  {
    title: '精准营销',
    description: '基于用户画像进行人群圈选与定向投放',
    icon: 'mdi-bullseye-arrow',
    color: 'primary'
  },
  {
    title: '个性化推荐',
    description: '根据兴趣标签优化内容与商品推荐',
    icon: 'mdi-thumb-up',
    color: 'secondary'
  },
  {
    title: '运营分析',
    description: '多维洞察用户偏好，辅助运营决策',
    icon: 'mdi-chart-bar',
    color: 'accent'
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

.arrow-label-up {
  margin-bottom: 0.5rem;
}

.arrow-label-down {
  margin-top: 0.5rem;
}

.arrow-space {
  flex: 1;
}

.arrow-return {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
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

  .arrow-label {
    margin-top: 0;
    margin-left: 0.5rem;
  }
}
</style>