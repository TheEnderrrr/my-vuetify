import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#a769ac',    // 主色调 - 粉色
          secondary: '#424242',  // 辅助色调 - 灰色
          accent: '#82B1FF',     // 强调色调 - 浅蓝色
          error: '#FF5252',      // 错误色调 - 红色
          info: '#2196F3',       // 信息色调 - 蓝色
          success: '#4CAF50',    // 成功色调 - 绿色
          warning: '#FFC107',    // 警告色调 - 琥珀色
          onPrimary: '#ffffff',  // 主色调背景上的文字（白色）
          onSecondary: '#ffffff', // 辅助色背景上的文字（白色）
          onAccent: '#ffffff',   // 强调色背景上的文字（白色）
          onError: '#ffffff',    // 错误色背景上的文字（白色）
          onInfo: '#ffffff',     // 信息色背景上的文字（白色）
          onSuccess: '#ffffff',  // 成功色背景上的文字（白色）
          onWarning: '#000000',  // 警告色背景上的文字（黑色，因为黄色背景较浅）
          background: '#ffdeb3',     // 背景色（白色）
          surface: '#ffefe5',        // 表面色（卡片等，白色）
        }
      },
      dark: {
        colors: {
          primary: '#b080b5',    // 主色调 - 浅紫色（提亮）
          secondary: '#757575',  // 辅助色调 - 浅灰色（提亮）
          accent: '#FF6094',     // 强调色调 - 亮粉色
          error: '#FF5252',      // 错误色调 - 红色
          info: '#2196F3',       // 信息色调 - 蓝色
          success: '#4CAF50',    // 成功色调 - 绿色
          warning: '#FFC107',    // 警告色调 - 琥珀色
          onPrimary: '#ffffff',  // 主色调背景上的文字（白色）
          onSecondary: '#ffffff', // 辅助色背景上的文字（白色）
          onAccent: '#ffffff',   // 强调色背景上的文字（白色）
          onError: '#ffffff',    // 错误色背景上的文字（白色）
          onInfo: '#ffffff',     // 信息色背景上的文字（白色）
          onSuccess: '#ffffff',  // 成功色背景上的文字（白色）
          onWarning: '#000000',  // 警告色背景上的文字（黑色）
          background: '#121212',     // 背景色（深色）
          surface: '#1E1E1E',        // 表面色（卡片等，深色）
        }
      }
    }
  }
})