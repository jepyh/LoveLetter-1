<template>
  <div class="wrapper">
    <div class="header" style="justify-content: center;">
      <p>设置</p>
    </div>
    <div class="main" style="padding: 10px;">
      仅显示空闲房间
    </div>
    <div class="footer">
      <p class="button"
         style="background: #4485F5;"
         @click="back">返回</p>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
</style>
