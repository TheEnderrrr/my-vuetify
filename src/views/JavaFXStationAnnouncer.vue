<template>
  <v-card-text class="pa-6">
    <!-- 项目标题 -->
    <div class="text-center mb-6">
      <v-icon size="60" color="primary" class="mb-3">mdi-subway</v-icon>
      <h2 class="text-h4 font-weight-bold mb-2">JavaFX 桌面地铁报站器</h2>
      <v-chip color="primary" variant="tonal" size="small" class="mr-2">
        <v-icon start>mdi-language-java</v-icon>
        JavaFX
      </v-chip>
      <v-chip color="secondary" variant="tonal" size="small">
        <v-icon start>mdi-desktop-classic</v-icon>
        桌面应用
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
        这是一个用 JavaFX 实现的简易桌面地铁报站器，通过多个窗口直接展示的形式显示不同的页面信息。
        适用于地铁站、公交枢纽等场景的实时报站显示系统。
      </v-card-text>
    </v-card>

    <!-- 核心功能 -->
    <v-row>
      <!-- 多窗口展示 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-monitor-multiple</v-icon>
            多窗口展示
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              支持同时开启多个窗口，每个窗口可以显示不同的内容：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-check-circle" title="主显示窗口" subtitle="显示当前站点和下一站信息"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="倒计时窗口" subtitle="独立显示到站倒计时"></v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" title="线路图窗口" subtitle="展示完整线路和当前位置"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 数据编辑 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-table-edit</v-icon>
            灵活的数据编辑
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              内置字符串表格数据结构，支持三种数据导入方式：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-file-csv-box" title="CSV 文件导入" subtitle="从 CSV 文件批量导入站点数据"></v-list-item>
              <v-list-item prepend-icon="mdi-microsoft-excel" title="Excel 文件导入" subtitle="支持 .xlsx 格式文件导入"></v-list-item>
              <v-list-item prepend-icon="mdi-text-box-edit" title="编辑器窗口" subtitle="直接在程序内编辑表格数据"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 智能功能 -->
    <v-row class="mt-2">
      <!-- 自动倒计时 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-timer-outline</v-icon>
            智能倒计时
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              指定时间列后，系统会自动识别并执行倒计时功能：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-clock-outline" title="自动识别时间" subtitle="解析时间格式并计算剩余时间"></v-list-item>
              <v-list-item prepend-icon="mdi-update" title="实时更新" subtitle="每秒刷新倒计时显示"></v-list-item>
              <v-list-item prepend-icon="mdi-bell-ring" title="到站提醒" subtitle="到达指定时间自动触发提醒"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 语音播报 -->
      <v-col cols="12" md="6">
        <v-card elevation="2" rounded="lg" class="pa-4 h-100">
          <v-card-title class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-volume-high</v-icon>
            自定义语音播报
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-2">
              支持更改报站铃声和人声语音：
            </p>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-music-note" title="报站铃声" subtitle="可自定义提示音和背景音乐"></v-list-item>
              <v-list-item prepend-icon="mdi-account-voice" title="人声语音" subtitle="支持 TTS 语音合成或录音文件"></v-list-item>
              <v-list-item prepend-icon="mdi-playlist-music" title="语音队列" subtitle="按顺序播放站点语音播报"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 预设保存 -->
    <v-card elevation="2" rounded="lg" class="mt-4 pa-4 preset-card">
      <v-card-title class="text-h6 font-weight-bold mb-3 text-black">
        <v-icon color="primary" class="mr-2">mdi-content-save-settings</v-icon>
        预设保存与加载
      </v-card-title>
      <v-card-text class="text-black">
        <p class="text-body-1 mb-3">
          程序整体支持保存预设配置，采用高效的二进制序列化技术：
        </p>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-3 feature-sub-card">
              <div class="text-subtitle-1 font-weight-bold mb-1 text-black">二进制存储</div>
              <div class="text-body-2 text-black">直接将对象序列化为二进制文件，占用空间小，读写速度快</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-3 feature-sub-card">
              <div class="text-subtitle-1 font-weight-bold mb-1 text-black">快速加载</div>
              <div class="text-body-2 text-black">下次启动时直接加载对应文件，立即恢复工作状态</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-3 feature-sub-card">
              <div class="text-subtitle-1 font-weight-bold mb-1 text-black">完整保存</div>
              <div class="text-body-2 text-black">保存所有配置、数据和设置，无需重新配置</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 技术栈 -->
    <v-card elevation="1" rounded="lg" class="mt-4 pa-4">
      <v-card-title class="text-h6 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
        技术栈
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-wrap gap-2">
          <v-chip color="primary" variant="tonal" class="ma-1">
            <v-icon start>mdi-language-java</v-icon>
            Java
          </v-chip>
          <v-chip color="secondary" variant="tonal" class="ma-1">
            <v-icon start>mdi-desktop-classic</v-icon>
            JavaFX
          </v-chip>
          <v-chip color="accent" variant="tonal" class="ma-1">
            <v-icon start>mdi-database</v-icon>
            对象序列化
          </v-chip>
          <v-chip color="info" variant="tonal" class="ma-1">
            <v-icon start>mdi-file-table</v-icon>
            Apache POI
          </v-chip>
          <v-chip color="warning" variant="tonal" class="ma-1">
            <v-icon start>mdi-volume-source</v-icon>
            Java Sound API
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <!-- 应用场景 -->
    <v-card elevation="2" rounded="lg" class="mt-4 pa-4">
      <v-card-title class="text-h6 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-map-marker-path</v-icon>
        应用场景
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-subway</v-icon>
              <div class="text-subtitle-2 font-weight-bold">地铁站</div>
              <div class="text-caption text-medium-emphasis">实时报站显示</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-bus</v-icon>
              <div class="text-subtitle-2 font-weight-bold">公交枢纽</div>
              <div class="text-caption text-medium-emphasis">班次信息显示</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-train</v-icon>
              <div class="text-subtitle-2 font-weight-bold">火车站</div>
              <div class="text-caption text-medium-emphasis">列车时刻提醒</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card flat class="text-center pa-3">
              <v-icon size="40" color="primary" class="mb-2">mdi-school</v-icon>
              <div class="text-subtitle-2 font-weight-bold">教学演示</div>
              <div class="text-caption text-medium-emphasis">JavaFX 学习案例</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card-text>
</template>

<script setup>
import { VAlert, VChip, VDivider, VRow, VCol, VCard, VCardText, VCardTitle, VList, VListItem, VIcon } from 'vuetify/components'
// JavaFX 报站器项目详情组件
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.preset-card .feature-sub-card {
  background-color: rgba(167, 105, 172, 0.05) !important;
  border-left: 4px solid #a769ac !important;
  box-shadow: none !important;
}
</style>
