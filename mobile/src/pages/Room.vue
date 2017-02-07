<template>
  <div id="room">
    <div class="header">
      等待中
    </div>
    <lh-message-box></lh-message-box>
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
    data () {
      return {
      }
    },
    methods: {
      exitRoom () {
        this.$socket.emit('exit')
        this.$router.go(-1)
      },
      ready () {
        this.$socket.emit('ready')
      }
    },
    mounted () {
      this.$socket.emit('join', this.$route.params.roomId)
    }
  }
</script>

<style scoped>
  #room {
    height: 100%;
  }
</style>
