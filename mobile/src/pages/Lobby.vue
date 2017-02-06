<template>
  <div id="lobby">
    <div class="header">
      游戏大厅
    </div>
    <div class="rooms">
      <lh-room></lh-room>
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
  export default {
    name: 'hello',
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
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      createRoom () {

      },
      quickStart () {
        alert('匹配系统暂未上线')
      }
    }
  }
</script>

<style scoped>
  #lobby {
    height: 100%;
  }

  .header {
    text-align: center;
    height: 44px;
    font-size: 18px;
    line-height: 44px;
    box-shadow: 0 0 3px #aaa;
  }

  .footer {
    display: flex;
    height: 44px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .button {
    text-align: center;
    flex-grow: 1;
    line-height: 44px;
    color: white;
    font-weight: bold;
  }
</style>
