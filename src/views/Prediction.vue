<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">电影情感与流派预测模型</v-card-title>
          <v-card-text>
            <p class="text-body-1">
              该模型基于电影的情感标签和流派数据进行训练，
              可用于预测一部电影的情绪倾向以及它可能属于的流派分类。
            </p>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h5 mb-3">模型原理</h3>
            <p class="text-body-1">
              此预测模型采用监督学习方法，通过对大量已标注电影数据的学习，建立情感标签与电影流派之间的关联关系。
              模型可以回答两个主要问题：
            </p>
            <ul class="mb-4">
              <li class="text-body-1">给定一部电影的情感标签，预测该电影最可能属于哪些流派</li>
              <li class="text-body-1">给定一部电影的流派信息，预测该电影的情绪倾向（积极/消极）</li>
            </ul>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h5 mb-3">应用场景</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-card elevation="2" class="pa-3 h-100">
                  <v-card-title class="text-h6">推荐系统</v-card-title>
                  <v-card-text>
                    根据用户喜好和情绪偏好，推荐符合其口味的电影类型
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card elevation="2" class="pa-3 h-100">
                  <v-card-title class="text-h6">内容创作</v-card-title>
                  <v-card-text>
                    帮助制片人了解不同流派电影的情感倾向，指导创作方向
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h5 mb-3">模型特点</h3>
            <v-chip-group>
              <v-chip 
                v-for="(feature, index) in features" 
                :key="index"
                variant="outlined" 
                color="primary"
                @click="showFeatureExplanation(index)"
              >
                {{ feature.title }}
              </v-chip>
            </v-chip-group>
            
            <v-expand-transition>
              <v-card v-if="selectedFeature !== null" class="mt-4" elevation="4">
                <v-card-title class="text-h6">{{ features[selectedFeature].title }}</v-card-title>
                <v-card-text>
                  <p>{{ features[selectedFeature].explanation }}</p>
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// 定义模型特点及其解释
const features = ref([
  {
    title: "简单易用",
    explanation: "该模型经过精心封装，提供了简洁明了的API接口。用户无需深入了解复杂的机器学习算法细节，只需提供基础的电影数据，即可获得准确的预测结果。即使是非专业人士也能轻松上手使用。"
  },
  {
    title: "实时预测",
    explanation: "模型具备高效的计算能力，能够在毫秒级别完成单次预测任务。无论是在线推荐系统还是实时数据分析，都能满足低延迟的性能要求，为用户提供流畅的体验。"
  },
  {
    title: "可视化结果",
    explanation: "预测结果不仅以数值形式呈现，还通过直观的图表和图形界面进行展示。用户可以清晰地看到各类别概率分布、特征重要性排序等关键信息，便于深入理解和分析预测依据。"
  },
  {
    title: "高准确率",
    explanation: "模型在提供的公开电影数据集上进行了充分训练和优化，在测试集上的准确率超过60%。通过持续的迭代改进和参数调优，确保在实际应用中提供可靠的预测性能。"
  }
])

// 当前选中的特点索引
const selectedFeature = ref(null)

// 显示特点解释的方法
function showFeatureExplanation(index) {
  // 如果点击的是同一个特点，则关闭显示
  if (selectedFeature.value === index) {
    selectedFeature.value = null
  } else {
    selectedFeature.value = index
  }
}
</script>