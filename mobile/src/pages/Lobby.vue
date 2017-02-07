<template>
  <div id="lobby">
    <div class="header">
      游戏大厅
    </div>
    <p style="padding: 10px;">在线人数：{{getPlayers}}</p>
    <div class="rooms">
      <lh-room v-for="room in getRooms"
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
        this.$router.push({name: 'Room', params: {roomId: this.$socket.id}})
      },
      quickStart () {
        alert('匹配系统暂未上线')
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
  #lobby {
    height: 100%;
  }
</style>
