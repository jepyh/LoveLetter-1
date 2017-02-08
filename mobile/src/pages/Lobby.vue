<template>
  <div class="wrapper">
    <div class="header">
      <img class="icon" src="../assets/setting.png">
      <p>游戏大厅</p>
      <img @click="help" class="icon" src="../assets/help.png">
    </div>
    <div class="main">
      <p style="padding: 10px;">在线人数：{{getPlayers}}</p>
      <p v-show="getRooms.length === 0"
         style="font-weight: bold; line-height: 40px; text-align: center;">
        暂无房间
      </p>
      <div class="rooms">
        <lh-room v-for="room in getRooms"
                 :room="room"></lh-room>
      </div>
    </div>
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
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        rooms: []
      }
    },
    methods: {
      createRoom () {
        this.$socket.emit('create')
        this.$router.push({name: 'room', params: {roomId: 'room_' + this.$socket.id}})
      },
      quickStart () {
        let index = this.getRooms.findIndex(item => item.players.length < 4)
        if (index >= 0) {
          this.$router.push({name: 'room', params: {roomId: this.getRooms[index].id}})
        } else {
          this.$socket.emit('create')
          this.$router.push({name: 'room', params: {roomId: 'room_' + this.$socket.id}})
        }
      },
      help () {
        this.$router.push({name: 'help'})
      }
    },
    computed: {
      ...mapGetters([
        'getRooms',
        'getPlayers'
      ])
    }
  }
</script>

<style scoped>
  .icon {
    height: 30px;
  }
</style>
