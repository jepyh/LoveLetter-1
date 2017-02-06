<template>
  <div class="room"
       @click="joinRoom">
    <p>房间名：LzBBKmt9z_df1FgbAAAh</p>
    <p>玩家人数：4</p>
    <p>房间类型：无限制</p>
    <p>房间状态：等待中</p>
  </div>
</template>

<script>
  export default {
    props: {
      room: Object
    },
    methods: {
      joinRoom () {
        this.$router.push({name: 'Room', params: {roomId: 1}})
      }
    }
  }
</script>

<style scoped>
  .room {
    margin: 8px 0;
    height: 90px;
    padding: 5px 10px;
    box-shadow: 0 0 3px green;
  }

  .room.busy {
    box-shadow: 0 0 3px red;
  }

  p {
    line-height: 20px;
  }
</style>
