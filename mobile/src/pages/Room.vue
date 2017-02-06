<template>
  <div id="room">
    <div class="header">
      等待中
    </div>
    <div class="footer">
      <p class="button"
         style="background: #D74937;"
         @click="exitRoom">离开</p>
      <p class="button"
         style="background: #4485F5;"
         @click="ready">准备</p>
    </div>
  </div>
</template>

<script>
  export default {
    sockets: {
      connect: () => {
        console.log('connected')
      },
      message: (msg) => {
        console.log('message: ' + msg)
      }
    },
    data () {
      return {
      }
    },
    methods: {
      exitRoom () {
        this.$router.go(-1)
      },
      ready () {
        alert('匹配系统暂未上线')
      }
    }
  }
</script>

<style scoped>
  #room {
    height: 100%;
  }
</style>
