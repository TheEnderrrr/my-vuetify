<template>
  <v-container fluid>
    <!-- 主标题部分 -->
    <v-row class="text-center mt-5">
      <v-col cols="12">
        <h1 class="text-h2 font-weight-bold">大数据与分布式基础</h1>
        <p class="text-h5 mt-3">期末电影分类预测系统设计</p>
      </v-col>
    </v-row>

    <!-- 特性卡片 -->
    <v-row class="mt-10">
      <v-col cols="12" md="4">
        <v-card elevation="2" class="pa-5">
          <v-img
            :src="hadoopLogo"
            height="200"
            class="bg-grey-lighten-2"
          ></v-img>
          <v-card-title>大数据处理</v-card-title>
          <v-card-text>
            利用先进的分析工具和技术处理海量数据，发现隐藏在数据背后的洞察和价值。
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="pa-5">
          <v-img
            :src="sparkPng"
            height="200"
            class="bg-grey-lighten-2"
          ></v-img>
          <v-card-title>分布式计算</v-card-title>
          <v-card-text>
            通过分布式系统架构实现高可用性、高扩展性和高性能的计算能力。
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="pa-5">
          <v-img
            :src="flinkPng"
            height="200"
            class="bg-grey-lighten-2"
          ></v-img>
          <v-card-title>实时分析</v-card-title>
          <v-card-text>
            实时处理和分析数据流，快速响应业务变化，支持即时决策。
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 内容介绍 -->
    <v-row class="mt-10">
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4">小组使用的相关技术</v-card-title>
          <v-card-text>
            <p class="text-body-1">
              前端因为电脑性能受限而分开开发，合计使用了Vue、vuetify样式插件、Django等进行开发。
              后端主要和Django集成，以及和算法部分对接结果。
            </p>
            <p class="text-body-1 mt-3">
              算法部分朴素贝叶斯算法是核心，完成了微型模型的训练。
              算法运行在hadoop上，直接计算出结果后交给后端。
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 统计数据 -->
    <v-row class="mt-10">
      <v-col cols="12" md="3" v-for="stat in stats" :key="stat.title">
        <v-card class="text-center pa-5" elevation="2">
          <v-card-title class="text-h3 justify-center">{{ stat.value }}</v-card-title>
          <v-card-text>
            <div class="text-subtitle-1">{{ stat.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import hadoopLogo from '@/assets/pictures/hadoop-logo.jpg'
import sparkPng from '@/assets/pictures/spark.png'
import flinkPng from '@/assets/pictures/flink.png'

const stats = [
  { title: '数据处理能力', value: '能够满足期末要求' },
  { title: '系统正确率', value: '≥60%'},
  { title: '并发处理', value: '支持' },
  { title: '完整的前端', value: '支持' }
]
</script>