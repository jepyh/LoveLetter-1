<template>
  <div id="room">
    <div class="header">
      等待中
    </div>
    <lh-message-box :messages="messages"></lh-message-box>
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
  let vm
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
        messages: []
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
      vm = this
      if (window.localStorage.messages) {
        this.messages = JSON.parse(window.localStorage.messages)
      }
      this.$socket.emit('join', this.$route.params.roomId)
    },
    beforeDestroy () {
      window.localStorage.setItem('messages', JSON.stringify(vm.messages))
    }
  }
</script>

<style scoped>
  #room {
    height: 100%;
  }
</style>
