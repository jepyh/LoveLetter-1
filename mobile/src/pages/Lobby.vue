<template>
  <div id="lobby">
    <div class="header">
      游戏大厅
    </div>
    <div class="rooms">
      <lh-room></lh-room>
      <lh-room></lh-room>
      <lh-room></lh-room>
      <lh-room></lh-room>
    </div>
    <lh-message-box :messages="messages"></lh-message-box>
    <div class="footer">
      <p class="button"
         style="background: #D74937;"
         @click="createRoom">创建房间</p>
      <p class="button"
         style="background: #4485F5;"
         @click="quickStart">快速加入</p>
    </div>
  </div>
</template>

<script>
  let vm
  export default {
    data () {
      return {
        rooms: {},
        messages: []
      }
    },
    methods: {
      createRoom () {
        this.$socket.emit('create')
        this.$router.push({name: 'Room', params: {roomId: this.$socket.id}})
      },
      quickStart () {
        alert('匹配系统暂未上线')
      }
    },
    sockets: {
      connect: () => {
        console.log('connected')
      },
      message: (msg) => {
        console.log('message: ' + msg)
        let date = new Date()
        function format (num) {
          return num > 10 ? num : '0' + num
        }
        vm.messages.unshift('[' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds()) + '] ' + msg)
      },
      create: (player, msg) => {
        console.log('message: ' + msg)
      }
    },
    mounted () {
      vm = this
      if (window.localStorage.messages) {
        this.messages = JSON.parse(window.localStorage.messages)
      }
    },
    beforeDestroy () {
      window.localStorage.setItem('messages', JSON.stringify(vm.messages))
    }
  }
</script>

<style scoped>
  #lobby {
    height: 100%;
  }
</style>
