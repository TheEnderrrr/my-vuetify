<template>
  <div class="home-wrapper">
    <v-container class="py-8">
      <!-- 个人简介区域 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card elevation="2" rounded="lg" class="pa-6 mb-4">
            <div class="text-center">
              <v-avatar size="120" class="mb-4">
                <v-img :src="avatarUrl" alt="Ender's avatar" />
              </v-avatar>
              <h1 class="text-h3 font-weight-bold mb-4">Ender</h1>
              
              <!-- 我正在做 -->
              <div class="current-projects mb-6">
                <h2 class="text-h5 font-weight-bold mb-3">
                  <v-icon color="primary" class="mr-2">mdi-briefcase-clock</v-icon>
                  我正在做
                </h2>
                <div class="d-flex justify-center">
                  <v-table density="compact" class="text-left" style="max-width: 500px; width: 100%;">
                    <tbody>
                      <tr v-for="(item, index) in currentProjects" :key="index">
                        <td class="text-body-1">{{ item.name }}</td>
                        <td class="text-right">
                          <v-chip size="small" :color="item.statusColor" variant="tonal">
                            {{ item.status }}
                          </v-chip>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
              </div>
              
              <div class="mt-6">
                <v-btn
                  variant="outlined"
                  rounded="pill"
                  size="small"
                  color="primary"
                  @click="goToAbout"
                >
                  <v-icon start size="small">mdi-link-variant</v-icon>
                  相关链接
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 我的兴趣和游戏 -->
      <v-row justify="center" class="mt-0">
        <v-col cols="12" md="10" lg="10">
          <v-row>
            <!-- 我的兴趣 -->
            <v-col cols="12" md="6">
              <v-card elevation="2" rounded="lg" class="pa-4 mb-4 h-100">
                <v-card-title class="text-h5 font-weight-bold mb-4">
                  <v-icon color="primary" class="mr-2">mdi-heart</v-icon>
                  我的兴趣
                </v-card-title>
                <v-card-text>
                  <v-list density="compact" bg-color="transparent">
                    <v-list-item
                      v-for="(interest, index) in interests"
                      :key="index"
                      :prepend-icon="interest.icon"
                      :title="interest.title"
                      :subtitle="interest.subtitle"
                    ></v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            
            <!-- 爱玩的游戏 -->
            <v-col cols="12" md="6">
              <v-card elevation="2" rounded="lg" class="pa-4 mb-4 h-100">
                <v-card-title class="text-h5 font-weight-bold mb-4">
                  <v-icon color="primary" class="mr-2">mdi-gamepad-variant</v-icon>
                  爱玩的游戏
                </v-card-title>
                <v-card-text>
                  <v-list density="compact" bg-color="transparent">
                    <v-list-item
                      v-for="(game, index) in games"
                      :key="index"
                      :prepend-icon="game.icon"
                      :title="game.title"
                      :subtitle="game.subtitle"
                    ></v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- 技术栈卡片 -->
      <v-row justify="center" class="mt-0">
        <v-col cols="12" md="10" lg="10">
          <v-row>
            <!-- 大数据技术栈 -->
            <v-col cols="12" md="6">
              <v-card elevation="2" rounded="lg" class="pa-4 mb-4 h-100">
                <v-card-title class="text-h5 font-weight-bold mb-4">
                  <v-icon color="primary" class="mr-2">mdi-database</v-icon>
                  开发技术栈
                </v-card-title>
                <v-card-text>
                  <v-list density="compact" bg-color="transparent">
                    <v-list-item
                      v-for="(tech, index) in bigDataTechs"
                      :key="index"
                      :prepend-icon="tech.icon"
                      :title="tech.title"
                      :subtitle="tech.subtitle"
                    ></v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            
            <!-- 游戏开发技术栈 -->
            <v-col cols="12" md="6">
              <v-card elevation="2" rounded="lg" class="pa-4 mb-4 h-100">
                <v-card-title class="text-h5 font-weight-bold mb-4">
                  <v-icon color="primary" class="mr-2">mdi-gamepad-variant</v-icon>
                  游戏开发技术栈
                </v-card-title>
                <v-card-text>
                  <v-list density="compact" bg-color="transparent">
                    <v-list-item
                      v-for="(tech, index) in gameDevTechs"
                      :key="index"
                      :prepend-icon="tech.icon"
                      :title="tech.title"
                      :subtitle="tech.subtitle"
                    ></v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- AI 使用情况 -->
      <v-row justify="center" class="mt-0">
        <v-col cols="12" md="10" lg="10">
          <v-card elevation="2" rounded="lg" class="pa-4 mb-4">
            <v-card-title class="text-h5 font-weight-bold mb-4">
              <v-icon color="primary" class="mr-2">mdi-robot-happy</v-icon>
              AI 使用情况
            </v-card-title>
            <v-card-text>
              <v-list density="compact" bg-color="transparent">
                <v-list-item
                  v-for="(ai, index) in aiUsage"
                  :key="index"
                  :prepend-icon="ai.icon"
                  :title="ai.title"
                  :subtitle="ai.subtitle"
                ></v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>


    </v-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import avatarImage from '@/assets/pictures/touxiang.jpeg'

const router = useRouter()

const avatarUrl = avatarImage

const goToAbout = () => {
  router.push('/about')
}

// 当前进行中的项目
const currentProjects = [
  { name: '学习和实践 ELK 日志处理', status: '进行中', statusColor: 'primary' },
  { name: '新的独立塔防游戏策划', status: '进行中', statusColor: 'primary' }
]

const interests = [
  { icon: 'mdi-gamepad-variant', title: '游戏爱好者', subtitle: 'APEX 狂热粉丝！' },
  { icon: 'mdi-code-braces', title: '编码开发', subtitle: '开发简化流程的小插件和工具' },
  { icon: 'mdi-youtube', title: '内容创作者', subtitle: '小透明 UP 主，记录生活与学习' },
  { icon: 'mdi-music-note', title: '美学欣赏', subtitle: '热爱音乐，追求美感与理解' }
]

const games = [
  { icon: 'mdi-trophy-award', title: 'T0 - 神级作品', subtitle: 'APEX（史上最好玩的游戏）、MC（陪伴童年和少年时期）' },
  { icon: 'mdi-star-four-points', title: 'T1 - 强烈推荐', subtitle: '洛克王国世界、云顶之弈、LOL、弹丸论破系列推理作品' },
  { icon: 'mdi-gamepad-circle', title: 'T2 - 休闲娱乐', subtitle: '各种派对小游戏、王国保卫战等策略塔防游戏' },
  { icon: 'mdi-thumb-down-outline', title: '差评如潮', subtitle: '三国杀移动版' }
]

const bigDataTechs = [
  { icon: 'mdi-language-python', title: 'Python', subtitle: '数据分析与机器学习' },
  { icon: 'mdi-language-lua', title: 'Lua', subtitle: '脚本语言与游戏开发' },
  { icon: 'mdi-language-java', title: 'Java', subtitle: '后端开发基础语言' },
  { icon: 'mdi-language-javascript', title: 'JavaScript/TypeScript', subtitle: '前端开发基础语言' },
  { icon: 'mdi-chart-timeline-variant', title: 'Spark', subtitle: '内存分布式计算' }
]

const gameDevTechs = [
  { icon: 'mdi-language-csharp', title: 'C#', subtitle: 'Unity 引擎主要语言' },
  { icon: 'mdi-code-tags', title: 'C++', subtitle: 'Unreal Engine 核心语言' },
  { icon: 'mdi-puzzle', title: 'Unity', subtitle: '跨平台游戏引擎' },
  { icon: 'mdi-robot', title: 'Unreal Engine', subtitle: '高端游戏开发引擎' },
  { icon: 'mdi-palette', title: 'Blender', subtitle: '3D 建模与动画' }
]

const aiUsage = [
  { icon: 'mdi-code-braces', title: '代码辅助', subtitle: '使用 AI 辅助编程、代码审查和调试' },
  { icon: 'mdi-text-box-outline', title: '文档编写', subtitle: '借助 AI 生成技术文档和笔记整理' },
  { icon: 'mdi-lightbulb-on', title: '学习助手', subtitle: '通过 AI 解答疑问、理解复杂概念' },
  { icon: 'mdi-pen-lock', title: '内容创作', subtitle: '使用 AI 辅助写作和创意生成' }
]

const aboutItems = [
  { icon: 'mdi-school', title: '学习分享', subtitle: '记录大数据技术学习历程' },
  { icon: 'mdi-code-tags', title: '项目实践', subtitle: '展示期末项目成果与代码' },
  { icon: 'mdi-book-open-page-variant', title: '技术文档', subtitle: '整理相关技术文档和笔记' },
  { icon: 'mdi-account-group', title: '团队协作', subtitle: '小组合作开发的结晶' }
]
</script>