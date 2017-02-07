<template>
  <div id="room">
    <div class="header">
      等待中
    </div>
    <lh-message-box></lh-message-box>
    <div class="footer">
      <p class="button"
         v-show="isPlaying"
         style="background: #4485F5;"
         @click="discard">{{myTurn ? '出牌！' : '请等待……'}}</p>
      <p class="button"
         v-show="!isPlaying"
         style="background: #D74937;"
         @click="exitRoom">离开</p>
      <p class="button"
         v-show="!isPlaying"
         style="background: #4485F5;"
         @click="ready">{{isReady ? '取消准备' : '准备'}}</p>
    </div>
  </div>
</template>

<script>
  let vm
  export default {
    data () {
      return {
        isReady: false,
        isPlaying: false,
        myTurn: false
      }
    },
    sockets: {
      start () {
        vm.isPlaying = true
      },
      myTurn () {
        vm.myTurn = true
      }
    },
    methods: {
      exitRoom () {
        this.$socket.emit('exit')
        this.$router.go(-1)
      },
      ready () {
        this.isReady = !this.isReady
        if (this.isReady) {
          this.$socket.emit('ready')
        } else {
          this.$socket.emit('cancel')
        }
      },
      discard () {
        if (this.myTurn) {
          console.log('discard')
        }
      }
    },
    mounted () {
      vm = this
      this.$socket.emit('join', this.$route.params.roomId)
    }
  }
</script>

<style scoped>
  #room {
    height: 100%;
  }
</style>
