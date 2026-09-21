<template>
  <div class="pa-6">
    <!-- 项目标题 -->
    <div class="mb-6">
      <div class="d-flex align-center mb-3">
        <v-icon size="40" color="primary" class="mr-3">mdi-castle</v-icon>
        <h1 class="text-h4 font-weight-bold">塔防乱斗游戏</h1>
      </div>
      <v-chip color="primary" variant="tonal" class="mr-2">
        <v-icon start>mdi-calendar-range</v-icon>
        XXXX.XX - 至今
      </v-chip>
      <v-chip color="error" variant="tonal" class="mr-2">
        <v-icon start>mdi-progress-clock</v-icon>
        开发中
      </v-chip>
      <v-chip color="secondary" variant="tonal" class="mr-2">Unity 6 · URP</v-chip>
      <v-chip color="accent" variant="tonal" class="mr-2">2D 卡通风</v-chip>
      <v-chip color="warning" variant="tonal" class="mr-2">类《王国保卫战》</v-chip>
      <v-chip color="info" variant="tonal">PC / 移动端</v-chip>
    </div>

    <!-- 开发中提示 -->
    <v-alert
      type="warning"
      variant="tonal"
      prominent
      icon="mdi-progress-clock"
      rounded="lg"
      class="mb-6"
    >
      <b>开发中版本</b>：本项目正在积极开发中，本页内容为当前阶段的设计与实现规划（设计文档 v0.4），
      系统与数值可能随开发进度调整，<b>不代表最终成品</b>。
    </v-alert>

    <!-- 项目简介 -->
    <v-card elevation="1" rounded="lg" class="mb-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
        项目简介
      </h2>
      <p class="text-body-1">
        类《王国保卫战》的 2D 手绘风塔防游戏：玩家在地图路径两侧布置防御塔，阻止一波波敌人从起点抵达终点，
        核心乐趣在于<b>策略搭配</b>（塔的类型与位置）与<b>时机把控</b>（技能释放与升级节奏）。
        核心循环：布阵 → 敌人波次进攻 → 塔自动攻击 → 收集金币 → 升级 / 建造新塔 → 下一波。
      </p>
    </v-card>

    <!-- 核心系统设计 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-sword-cross</v-icon>
            战斗与关卡循环
          </h3>
          <ul class="feature-list">
            <li>路径塔防：敌人沿预定义路径进攻，每关 10~20 波逐步增强</li>
            <li>金币 / 生命 / 星星三资源体系，通关按损失评价 1~3 星</li>
            <li>全局技能：召唤援军 / 闪电风暴 / 时间减速 / 金币雨</li>
            <li>普通 / 困难双难度，完整背景图 + 交互层覆盖的地图方案</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-sitemap</v-icon>
            结构化可扩展塔系统
          </h3>
          <ul class="feature-list">
            <li>TowerBase 抽象基类 + ITargetStrategy / IAttackBehavior 策略接口</li>
            <li>内置兵营 / 箭塔 / 法师塔 / 炮塔四类塔，Lv3 后 A / B 分支升级</li>
            <li>目标选择策略可插拔：最近 / 最远 / 血量最低 / 护甲最低</li>
            <li>塔数据全部走 ScriptableObject，新增塔不改核心代码</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-skull-outline</v-icon>
            敌人与状态效果
          </h3>
          <ul class="feature-list">
            <li>普通 / 快速 / 重甲 / 飞行 / Boss 五类敌人，各有护甲与魔抗</li>
            <li>状态效果组件化：减速 / 中毒 / 燃烧 / 眩晕 / 破甲自由组合</li>
            <li>敌人类型 ScriptableObject 配置，支持自定义移动逻辑</li>
            <li>对象池管理敌人与弹幕，Sprite Atlas 合并图集优化性能</li>
          </ul>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" rounded="lg" class="pa-4 h-100">
          <h3 class="text-h6 font-weight-bold mb-3">
            <v-icon color="primary" class="mr-2">mdi-trophy-outline</v-icon>
            成就与图鉴系统
          </h3>
          <ul class="feature-list">
            <li>成就 = SO 数据 + 独立条件检测器，新增成就零代码侵入</li>
            <li>敌人 / 塔 / 技能 / 关卡四类图鉴，未解锁条目显示剪影</li>
            <li>统一 GameEvent 事件通道，成就与图鉴天然联动</li>
            <li>成就 / 图鉴进度随 PlayerData 统一存档</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <!-- 技术亮点 -->
    <v-card elevation="1" rounded="lg" class="mt-6 pa-4">
      <h2 class="text-h5 font-weight-bold mb-3">
        <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
        技术亮点
      </h2>
      <div class="d-flex flex-wrap gap-2">
        <v-chip color="primary" variant="tonal" class="ma-1"><v-icon start>mdi-code-braces</v-icon>Unity 6 + C#</v-chip>
        <v-chip color="secondary" variant="tonal" class="ma-1"><v-icon start>mdi-file-document-outline</v-icon>ScriptableObject 数据驱动</v-chip>
        <v-chip color="accent" variant="tonal" class="ma-1"><v-icon start>mdi-sitemap</v-icon>策略模式 / 抽象基类</v-chip>
        <v-chip color="info" variant="tonal" class="ma-1"><v-icon start>mdi-database</v-icon>JSON 存档 ISaveSystem</v-chip>
        <v-chip color="success" variant="tonal" class="ma-1"><v-icon start>mdi-movie-open-outline</v-icon>Aseprite 帧动画</v-chip>
        <v-chip color="warning" variant="tonal" class="ma-1"><v-icon start>mdi-tools</v-icon>DOTween 动效</v-chip>
        <v-chip color="error" variant="tonal" class="ma-1"><v-icon start>mdi-cog</v-icon>对象池 / 图集优化</v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup>
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

.gap-2 {
  gap: 8px;
}
</style>
