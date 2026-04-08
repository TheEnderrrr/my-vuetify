<template>
  <v-card-text class="pa-6">
    <!-- 项目标题 -->
    <div class="text-center mb-6">
      <v-icon size="60" color="primary" class="mb-3">mdi-chart-box</v-icon>
      <h2 class="text-h4 font-weight-bold mb-2">电影情感与流派预测系统</h2>
      <v-chip color="primary" variant="tonal" size="small" class="mr-2">
        <v-icon start>mdi-language-java</v-icon>
        Java
      </v-chip>
      <v-chip color="secondary" variant="tonal" size="small" class="mr-2">
        <v-icon start>mdi-database</v-icon>
        Hadoop
      </v-chip>
      <v-chip color="accent" variant="tonal" size="small" class="mr-2">
        <v-icon start>mdi-code-braces</v-icon>
        Vue 3
      </v-chip>
      <v-chip color="info" variant="tonal" size="small">
        <v-icon start>mdi-flask</v-icon>
        Flask
      </v-chip>
    </div>

    <v-divider class="mb-6"></v-divider>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-4 pa-4" color="primary" variant="tonal">
      <v-card-title class="text-h6 font-weight-bold mb-2">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </v-card-title>
      <v-card-text class="text-body-1">
        这是一个基于 Hadoop 分布式计算框架的电影情感与流派预测系统。通过 HDFS 存储海量电影数据，
        利用 YARN 进行资源调度，结合机器学习算法实现电影情感倾向和流派分类的自动化预测。
        系统采用前后端分离架构，提供完整的 Web 交互界面。
      </v-card-text>
    </v-card>

    <!-- 技术架构 -->
    <v-row>
      <!-- 后端技术栈 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-server</v-icon>
            后端技术架构
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              采用分层架构设计，整合 Hadoop 集群能力：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-language-java" title="Java + Hadoop" subtitle="使用 Java 编写 MapReduce 任务，调用 HDFS 和 YARN API"></v-list-item>
              <v-list-item prepend-icon="mdi-database" title="HDFS 分布式存储" subtitle="存储海量电影数据集和训练模型文件"></v-list-item>
              <v-list-item prepend-icon="mdi-cpu-64-bit" title="YARN 资源调度" subtitle="管理集群计算资源，动态分配任务执行"></v-list-item>
              <v-list-item prepend-icon="mdi-flask" title="Flask Web 服务" subtitle="提供 RESTful API 接口，处理前端请求"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 前端技术栈 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-monitor</v-icon>
            前端技术栈
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              现代化前端技术构建用户界面：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-vuejs" title="Vue 3" subtitle="采用 Composition API 构建响应式界面"></v-list-item>
              <v-list-item prepend-icon="mdi-palette" title="Vuetify 3" subtitle="Material Design 组件库，统一视觉风格"></v-list-item>
              <v-list-item prepend-icon="mdi-api" title="Axios" subtitle="HTTP 客户端，与后端 API 通信"></v-list-item>
              <v-list-item prepend-icon="mdi-chart-bar" title="数据可视化" subtitle="图表展示预测结果和统计分析"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 系统架构图 -->
    <v-card elevation="2" rounded="lg" class="mt-4 pa-4">
      <v-card-title class="text-h6 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-sitemap</v-icon>
        系统工作流程
      </v-card-title>
      <v-card-text>
        <div class="flowchart-container">
          <!-- 流程图 -->
          <v-row align="center" justify="center" class="flowchart">
            <!-- 第 1 层：前端 -->
            <v-col cols="12" class="text-center mb-2">
              <v-card elevation="3" rounded="lg" class="d-inline-block pa-3 flow-step step-frontend">
                <v-icon size="32" color="accent" class="mb-1">mdi-laptop</v-icon>
                <div class="text-subtitle-2 font-weight-bold">前端 (Vue 3)</div>
                <div class="text-caption">用户交互界面</div>
              </v-card>
            </v-col>
            
            <!-- 箭头 -->
            <v-col cols="12" class="text-center my-1">
              <v-icon color="grey" size="24">mdi-arrow-down-thick</v-icon>
              <div class="text-caption text-medium-emphasis">HTTP 请求</div>
            </v-col>

            <!-- 第 2 层：Flask 后端 -->
            <v-col cols="12" class="text-center mb-2">
              <v-card elevation="3" rounded="lg" class="d-inline-block pa-3 flow-step step-backend">
                <v-icon size="32" color="info" class="mb-1">mdi-flask</v-icon>
                <div class="text-subtitle-2 font-weight-bold">Flask 后端</div>
                <div class="text-caption">API 路由 & 业务逻辑</div>
              </v-card>
            </v-col>
            
            <!-- 箭头 -->
            <v-col cols="12" class="text-center my-1">
              <v-icon color="grey" size="24">mdi-arrow-down-thick</v-icon>
              <div class="text-caption text-medium-emphasis">组合 Hadoop 指令</div>
            </v-col>

            <!-- 第 3 层：Java + Hadoop -->
            <v-col cols="12" class="text-center mb-2">
              <v-card elevation="3" rounded="lg" class="d-inline-block pa-3 flow-step step-hadoop">
                <v-icon size="32" color="primary" class="mb-1">mdi-language-java</v-icon>
                <div class="text-subtitle-2 font-weight-bold">Java + Hadoop</div>
                <div class="text-caption">MapReduce 任务执行</div>
              </v-card>
            </v-col>
            
            <!-- 双向箭头 -->
            <v-col cols="12" class="text-center my-1">
              <v-icon color="grey" size="24">mdi-arrow-up-down</v-icon>
              <div class="text-caption text-medium-emphasis">HDFS 读写 & YARN 调度</div>
            </v-col>

            <!-- 第 4 层：Hadoop 集群 -->
            <v-col cols="12" class="text-center">
              <v-card elevation="3" rounded="lg" class="d-inline-block pa-3 flow-step step-cluster">
                <v-icon size="32" color="success" class="mb-1">mdi-database</v-icon>
                <div class="text-subtitle-2 font-weight-bold">Hadoop 集群</div>
                <div class="text-caption">HDFS 存储 + YARN 资源管理</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- 流程说明 -->
          <v-alert type="info" variant="tonal" class="mt-4" border="start">
            <strong>完整数据流：</strong><br>
            前端发送预测请求 →
            Flask 接收并验证参数 →
            Java 程序组合 Hadoop 指令 →
            提交到 YARN 集群执行 →
            从 HDFS 读取数据并计算 →
            返回 JSON 结果给前端展示
          </v-alert>
        </div>
      </v-card-text>
    </v-card>

    <!-- 核心功能 -->
    <v-row class="mt-4">
      <!-- 分布式计算 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-server-network</v-icon>
            分布式计算能力
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              基于 Hadoop 生态实现大规模数据处理：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-check-circle" title="HDFS 数据存储" subtitle="分布式文件系统，高容错性和吞吐量"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="YARN 资源管理" subtitle="统一资源调度，支持多租户隔离"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="MapReduce 计算" subtitle="并行处理海量电影数据，高效训练模型"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="水平扩展" subtitle="轻松增加节点提升计算能力"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 智能预测 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-brain</v-icon>
            智能预测功能
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              双维度预测模型，满足多样化需求：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-emoticon-happy" title="情感倾向预测" subtitle="判断电影情绪是积极还是消极"></v-list-item>
              <v-list-item prepend-icon="mdi-tag-multiple" title="流派分类预测" subtitle="识别电影所属类型（动作、爱情等）"></v-list-item>
              <v-list-item prepend-icon="mdi-chart-line" title="准确率 > 60%" subtitle="在测试集上表现稳定可靠"></v-list-item>
              <v-list-item prepend-icon="mdi-speedometer" title="实时响应" subtitle="毫秒级预测速度，用户体验流畅"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 应用场景 -->
    <v-card elevation="2" rounded="lg" class="mt-4 pa-4" color="success" variant="outlined">
      <v-card-title class="text-h6 font-weight-bold mb-3">
        <v-icon color="success" class="mr-2">mdi-application-export</v-icon>
        应用场景
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-thumb-up</v-icon>
              <div class="text-subtitle-2 font-weight-bold">个性化推荐</div>
              <div class="text-caption text-medium-emphasis">根据用户喜好推荐电影</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-movie-open</v-icon>
              <div class="text-subtitle-2 font-weight-bold">内容创作</div>
              <div class="text-caption text-medium-emphasis">指导电影制作方向</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-chart-box-outline</v-icon>
              <div class="text-subtitle-2 font-weight-bold">市场分析</div>
              <div class="text-caption text-medium-emphasis">研究电影市场趋势</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-school</v-icon>
              <div class="text-subtitle-2 font-weight-bold">教学研究</div>
              <div class="text-caption text-medium-emphasis">大数据课程实践案例</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 技术栈详情 -->
    <v-card elevation="1" rounded="lg" class="mt-4 pa-4">
      <v-card-title class="text-h6 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        完整技术栈
      </v-card-title>
      <v-card-text>
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
      </v-card-text>
    </v-card>
  </v-card-text>
</template>

<script setup>
// 电影情感与流派预测系统详情组件
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.flowchart-container {
  width: 100%;
}

.flowchart {
  max-width: 600px;
  margin: 0 auto;
}

.flow-step {
  min-width: 200px;
}

.step-frontend {
  border-left: 4px solid #9C27B0;
}

.step-backend {
  border-left: 4px solid #2196F3;
}

.step-hadoop {
  border-left: 4px solid #673AB7;
}

.step-cluster {
  border-left: 4px solid #4CAF50;
}
</style>