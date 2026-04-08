<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    color="#FFFFFF50"
    class="sidebar"
  >
    <div class="d-flex flex-column h-100 justify-center">
      <!-- 时间和天气信息区域 -->
      <div v-if="!rail" class="weather-section pa-4 my-2">
        <v-card elevation="2" rounded="lg" class="pa-3 mb-2" color="primary" variant="tonal">
          <div class="text-center">
            <div class="text-h4 font-weight-bold mb-1">
              {{ currentTime }}
            </div>
            <div class="text-caption text-medium-emphasis">
              {{ currentDateString }}
            </div>
          </div>
        </v-card>

        <!-- 城市选择器 -->
        <v-card elevation="2" rounded="lg" class="pa-3 mb-2" color="secondary" variant="outlined">
          <v-select
            v-model="selectedCity"
            :items="cities"
            item-title="name"
            item-value="id"
            label="选择城市"
            density="compact"
            variant="outlined"
            hide-details
            @update:model-value="changeCity"
          >
            <template v-slot:prepend>
              <v-icon size="small" color="secondary">mdi-map-marker</v-icon>
            </template>
          </v-select>
        </v-card>

        <!-- 天气信息轮播 -->
        <v-card
          elevation="2"
          rounded="lg"
          class="pa-3 weather-card"
          color="accent"
          variant="outlined"
          min-height="360"
        >
          <transition
            name="slide-right"
            mode="out-in"
            @leave="onLeave"
            @enter="onEnter"
          >
            <!-- 使用 cityKey 作为唯一标识，确保切换城市时触发动画 -->
            <div v-if="weatherData" :key="`weather-${cityKey}-${currentSlideIndex}`" class="weather-content">
              <!-- 第 1 组：当前天气 + 温度趋势 -->
              <div v-if="currentSlideIndex === 0" class="weather-group">
                <!-- 当前天气 -->
                <div class="text-center mb-4 pb-4 border-bottom">
                  <div class="text-subtitle-2 font-weight-bold mb-2 text-medium-emphasis">当前天气</div>
                  <v-icon size="40" color="primary" class="mb-2">
                    {{ getWeatherIcon(currentWeather.weathercode) }}
                  </v-icon>
                  <div class="text-h5 font-weight-bold mb-1">
                    {{ currentWeather.temperature }}°C
                  </div>
                  <div class="text-caption mb-1">
                    {{ getWeatherDescription(currentWeather.weathercode) }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    <v-icon size="14" start>mdi-windsock</v-icon>
                    {{ currentWeather.windspeed }} km/h
                  </div>
                </div>

                <!-- 今日温度趋势 -->
                <div class="text-center">
                  <div class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">今日温度趋势</div>
                  <div class="d-flex justify-space-around align-center">
                    <div>
                      <v-icon size="32" color="error" class="mb-1">mdi-thermometer-high</v-icon>
                      <div class="text-h6 font-weight-bold">{{ maxTemp }}°C</div>
                      <div class="text-caption">最高</div>
                    </div>
                    <div>
                      <v-icon size="32" color="info" class="mb-1">mdi-thermometer-low</v-icon>
                      <div class="text-h6 font-weight-bold">{{ minTemp }}°C</div>
                      <div class="text-caption">最低</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 第 2 组：湿度 + 风速 -->
              <div v-else-if="currentSlideIndex === 1" class="weather-group">
                <!-- 当前湿度 -->
                <div class="text-center mb-4 pb-4 border-bottom">
                  <div class="text-subtitle-2 font-weight-bold mb-2 text-medium-emphasis">当前湿度</div>
                  <v-icon size="40" color="info" class="mb-2">mdi-water-percent</v-icon>
                  <div class="text-h5 font-weight-bold mb-1">
                    {{ currentHumidity }}%
                  </div>
                  <div class="text-caption mt-2">
                    {{ getHumidityComfort(currentHumidity) }}
                  </div>
                </div>

                <!-- 当前风速 -->
                <div class="text-center">
                  <div class="text-subtitle-2 font-weight-bold mb-2 text-medium-emphasis">当前风速</div>
                  <v-icon size="40" color="secondary" class="mb-2">mdi-weather-windy</v-icon>
                  <div class="text-h5 font-weight-bold mb-1">
                    {{ currentWeather.windspeed }} <span class="text-caption">km/h</span>
                  </div>
                  <div class="text-caption">
                    {{ getWindDescription(currentWeather.windspeed) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
              <div class="text-caption mt-2">加载中...</div>
            </div>
          </transition>
        </v-card>
      </div>

      <!-- 导航菜单区域已移除，顶栏已包含导航功能 -->

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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const drawer = ref(true)
const rail = ref(false)

// 时间相关
const currentTime = ref('')
const currentDateString = ref('')
let timerInterval = null

// 天气相关
const weatherData = ref(null)
const currentSlideIndex = ref(0)
let slideInterval = null

// 城市切换动画的唯一标识
const cityKey = ref('chengdu')

// 城市数据（符合 Open-Meteo API 的经纬度）
const cities = [
  { id: 'chengdu', name: '成都', latitude: 30.57, longitude: 104.07 },
  { id: 'shanghai', name: '上海', latitude: 31.2304, longitude: 121.4737 },
  { id: 'guangzhou', name: '广州', latitude: 23.1291, longitude: 113.2644 },
  { id: 'shenzhen', name: '深圳', latitude: 22.5431, longitude: 114.0579 },
  { id: 'beijing', name: '北京', latitude: 39.9042, longitude: 116.4074 }
]

// 当前选中的城市
const selectedCity = ref('chengdu')

// 根据当前城市构造 API URL
const getApiUrl = () => {
  const city = cities.find(c => c.id === selectedCity.value)
  if (!city) return ''

  // 直接使用模板字符串构造 URL
  return `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
}

const API_URL = ref(getApiUrl())

// 更新当前时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
  currentDateString.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 获取天气图标
const getWeatherIcon = (code) => {
  const icons = {
    0: 'mdi-weather-sunny',      // 晴天
    1: 'mdi-weather-partly-cloudy', // 多云
    2: 'mdi-weather-cloudy',     // 阴天
    3: 'mdi-weather-cloudy',     // 多云
    45: 'mdi-weather-foggy',     // 雾
    48: 'mdi-weather-foggy',     // 雾凇
    51: 'mdi-weather-pouring',   // 毛毛雨
    53: 'mdi-weather-pouring',
    55: 'mdi-weather-pouring',
    61: 'mdi-weather-rainy',     // 下雨
    63: 'mdi-weather-rainy',
    65: 'mdi-weather-rainy',
    71: 'mdi-weather-snowy',     // 下雪
    73: 'mdi-weather-snowy',
    75: 'mdi-weather-snowy',
    80: 'mdi-weather-rainy',     // 阵雨
    81: 'mdi-weather-rainy',
    82: 'mdi-weather-pouring',
    95: 'mdi-weather-lightning', // 雷雨
    96: 'mdi-weather-lightning',
    99: 'mdi-weather-lightning'
  }
  // 转换为数字类型并查找图标
  const numericCode = typeof code === 'string' ? parseInt(code, 10) : code
  return icons[numericCode] || 'mdi-help-circle'
}

// 获取天气描述
const getWeatherDescription = (code) => {
  const descriptions = {
    0: '晴朗',
    1: '晴间多云',
    2: '多云',
    3: '阴天',
    45: '有雾',
    48: '雾凇',
    51: '轻度毛毛雨',
    53: '中度毛毛雨',
    55: '重度毛毛雨',
    61: '小雨',
    63: '中雨',
    65: '大雨',
    71: '小雪',
    73: '中雪',
    75: '大雪',
    80: '阵雨',
    81: '阵雨',
    82: '强阵雨',
    95: '雷雨',
    96: '雷阵雨',
    99: '强雷雨'
  }
  // 转换为数字类型并查找描述
  const numericCode = typeof code === 'string' ? parseInt(code, 10) : code
  return descriptions[numericCode] || '未知'
}

// 获取湿度舒适度描述
const getHumidityComfort = (humidity) => {
  if (humidity < 40) return '干燥'
  if (humidity < 60) return '舒适'
  if (humidity < 70) return '稍潮湿'
  return '潮湿'
}

// 获取风速描述
const getWindDescription = (speed) => {
  if (speed < 5) return '微风'
  if (speed < 15) return '和风'
  if (speed < 30) return '强风'
  return '大风'
}

// 获取当前小时索引
const getCurrentHourIndex = () => {
  const now = new Date()
  const currentHour = now.getHours()

  if (!weatherData.value || !weatherData.value.hourly?.time) return 0

  const times = weatherData.value.hourly.time
  const targetTime = now.toISOString().slice(0, 13) // 获取当前小时的 ISO 格式

  for (let i = 0; i < times.length; i++) {
    if (times[i].startsWith(targetTime)) {
      return i
    }
  }
  return 0
}

// 今日最高温和最低温
const maxTemp = computed(() => {
  if (!weatherData.value?.hourly?.temperature_2m) return 0

  const temps = weatherData.value.hourly.temperature_2m
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // 只考虑今天的数据
  const todayTemps = []
  const times = weatherData.value.hourly.time

  for (let i = 0; i < times.length; i++) {
    const time = new Date(times[i])
    if (time >= today && time < tomorrow) {
      todayTemps.push(temps[i])
    }
  }

  if (todayTemps.length === 0) {
    return temps[0] || 0
  }

  return Math.max(...todayTemps)
})

const minTemp = computed(() => {
  if (!weatherData.value?.hourly?.temperature_2m) return 0

  const temps = weatherData.value.hourly.temperature_2m
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // 只考虑今天的数据
  const todayTemps = []
  const times = weatherData.value.hourly.time

  for (let i = 0; i < times.length; i++) {
    const time = new Date(times[i])
    if (time >= today && time < tomorrow) {
      todayTemps.push(temps[i])
    }
  }

  if (todayTemps.length === 0) {
    return temps[0] || 0
  }

  return Math.min(...todayTemps)
})

// 当前天气数据
const currentWeather = computed(() => {
  if (!weatherData.value?.current_weather) {
    return {
      temperature: 0,
      windspeed: 0,
      weathercode: 0
    }
  }
  return weatherData.value.current_weather
})

// 当前湿度
const currentHumidity = computed(() => {
  if (!weatherData.value?.hourly?.relativehumidity_2m) return 0

  const hourIndex = getCurrentHourIndex()
  return weatherData.value.hourly.relativehumidity_2m[hourIndex] || 0
})

// 获取天气数据
const fetchWeatherData = async () => {
  try {
    console.log('请求 URL:', API_URL.value)
    const response = await fetch(API_URL.value)

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 检查响应头是否为 JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('非 JSON 响应:', text.substring(0, 200))
      throw new Error('API 返回了非 JSON 格式的数据')
    }

    const data = await response.json()
    console.log('获取到的天气数据:', data)
    weatherData.value = data
  } catch (error) {
    console.error('获取天气数据失败:', error.message)
    weatherData.value = null
  }
}

// 切换轮播
const nextSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % 2 // 2 组循环
}

// 开始轮播
const startSlideshow = () => {
  slideInterval = setInterval(nextSlide, 10000) // 10 秒切换一次
}

// 停止轮播
const stopSlideshow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// 旧内容离开动画 - 向左滑出同时淡化
const onLeave = (el, done) => {
  gsap.to(el, {
    x: -50,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    force3D: true,
    onComplete: () => {
      // 离开完成后等待 0.4 秒再进入新内容
      setTimeout(done, 400)
    }
  })
}

// 新内容进入动画 - 从右侧滑入同时淡化
const onEnter = (el, done) => {
  gsap.fromTo(el,
    {
      x: 50,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      force3D: true,
      onComplete: done
    }
  )
}

const toggleRail = () => {
  rail.value = !rail.value
  if (rail.value) {
    stopSlideshow()
  } else {
    startSlideshow()
  }
}

// 切换城市
const changeCity = () => {
  // 先清空数据，触发加载状态并播放离开动画
  weatherData.value = null
  // 重置轮播到第一组
  currentSlideIndex.value = 0
  // 更新城市 key（用于触发唯一的过渡动画）
  cityKey.value = selectedCity.value

  // 等待一小段时间让动画开始，然后再获取数据
  setTimeout(() => {
    // 更新 API URL
    API_URL.value = getApiUrl()
    // 重新获取天气数据
    fetchWeatherData()
  }, 100)
}

// 生命周期钩子
onMounted(() => {
  updateTime()
  timerInterval = setInterval(updateTime, 1000) // 每秒更新时间

  fetchWeatherData() // 初始加载天气数据
  startSlideshow() // 开始轮播
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  stopSlideshow()
})
</script>

<style scoped>
.sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0 16px 16px 0;
  margin: 16px 16px 16px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  height: 680px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
}

.sidebar-header {
  background: linear-gradient(135deg, rgba(167, 105, 172, 0.1) 0%, rgba(167, 105, 172, 0.05) 100%);
  border-radius: 8px;
  margin: 8px;
}

.sidebar-footer {
  background-color: transparent;
}

.weather-section {
  transition: all 0.3s ease;
}

.weather-card {
}

.weather-content {
  display: flex;
  flex-direction: column;
}

.weather-group {
  width: 100%;
}

.border-bottom {
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
