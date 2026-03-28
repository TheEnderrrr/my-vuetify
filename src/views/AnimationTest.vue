<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4">
          <v-card-title class="text-h4 font-weight-bold text-center py-6">
            动画测试
          </v-card-title>
          
          <v-card-text class="pa-4">
            <div class="video-container">
              <iframe 
                src="//player.bilibili.com/player.html?isOutside=true&aid=853794374&bvid=BV1QL4y1c7F8&cid=712327964&p=1" 
                scrolling="no" 
                border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true"
                class="bilibili-player"
              ></iframe>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 动画测试页面 - 用于测试各种动画效果
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px);
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
}

.bilibili-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
