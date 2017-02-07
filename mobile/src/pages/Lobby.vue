<template>
  <div id="lobby">
    <div class="header">
      游戏大厅
    </div>
    <div class="rooms">
      <lh-room v-for="room in rooms"
               :room="room"></lh-room>
    </div>
    <lh-message-box></lh-message-box>
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
        rooms: []
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
      destroy: (roomId) => {
        let index = vm.rooms.findIndex(item => item.id === roomId)
        if (index >= 0) {
          delete vm.rooms[index]
        }
      },
      create: (room) => {
        vm.rooms.push(room)
      },
      data: (data) => {
        console.log(data)
        vm.rooms = data.rooms
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
