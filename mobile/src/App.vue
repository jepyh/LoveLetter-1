<template>
  <div id="app">
    <router-view class="child-view"></router-view>
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
    height: 100%;
  }

  .child-view {
    width: 100%;
    min-height: 100%;
    background: white;
    overflow: hidden;
    padding-top: 44px;
    padding-bottom: 73px;
  }

  .header {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: fixed;
    background: white;
    left: 0;
    top: 0;
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
    position: fixed;
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
