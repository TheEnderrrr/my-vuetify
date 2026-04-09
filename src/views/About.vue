<template>
  <div class="about-page">
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="end" class="fill-height">
        <v-col cols="12" class="text-center pb-8">
          <!-- 社交媒体链接 -->
          <div class="footer-links">
            <div class="d-flex justify-center align-center gap-6 flex-wrap">
              <span class="footer-label">我的主页：</span>
              <!-- B站链接 -->
              <a 
                href="https://space.bilibili.com/281216839" 
                target="_blank" 
                rel="noopener noreferrer"
                class="footer-link"
              >
                Bilibili
              </a>
              
              <!-- 抖音链接 -->
              <a 
                href="https://v.douyin.com/dlzpruVW1DA/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="footer-link"
              >
                抖音
              </a>
            </div>
            
            <!-- 版权信息 -->
            <p class="copyright-info mt-4">
              © 2026 Ender 的奇妙小窝。
            </p>
            <p class="copyright-info mt-4">
              本页面的音视频素材来自网络。
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// 关于页面逻辑
</script>

<style scoped>
.about-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-links {
  max-width: 600px;
  margin: 0 auto;
}

.footer-label {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
}

.footer-link {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  padding: 0 8px;
}

.footer-link:hover {
  color: rgba(0, 0, 0, 0.9);
  text-decoration: underline;
}

.copyright-info {
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.75rem;
  margin-top: 16px;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .footer-link {
    font-size: 0.8125rem;
    padding: 0 6px;
  }
}
</style>