import { createVuetify } from 'vuetify'
import 'vuetify/styles' // ← 必须！

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#ff89f9',    // 主色调 - 粉色
          secondary: '#424242',  // 辅助色调 - 灰色
          accent: '#82B1FF',     // 强调色调 - 浅蓝色
          error: '#FF5252',      // 错误色调 - 红色
          info: '#2196F3',       // 信息色调 - 蓝色
          success: '#4CAF50',    // 成功色调 - 绿色
          warning: '#FFC107',    // 警告色调 - 琥珀色
        }
      },
      dark: {
        colors: {
          primary: '#189f64',    // 主色调 - 绿色
          secondary: '#424242',  // 辅助色调 - 灰色
          accent: '#FF4081',     // 强调色调 - 粉色
          error: '#FF5252',      // 错误色调 - 红色
          info: '#2196F3',       // 信息色调 - 蓝色
          success: '#4CAF50',    // 成功色调 - 绿色
          warning: '#FFC107',    // 警告色调 - 琥珀色
        }
      }
    }
  }
})