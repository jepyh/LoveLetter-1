<template>
  <div id="app">
    <router-view></router-view>
    <lh-message-box></lh-message-box>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('pushMessage', '欢迎进入《情书》的游戏大厅，请创建房间或快速加入进行游戏。')
  }
}
</script>

<style>
  #app {
    position: relative;
    height: 100%;
  }

  .wrapper {
    height: 100%;
  }

  .header {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 44px;
    font-size: 18px;
    line-height: 44px;
    box-shadow: 0 0 3px #aaa;
  }

  .main {
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
    min-width: 50%;
  }
</style>
