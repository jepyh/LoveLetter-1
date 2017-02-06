<template>
  <div>
    <div class="messages"
         :class="{active: !isClosed}">
      <p v-for="message in messages">
        {{message}}
      </p>
    </div>
    <div class="messages-switch"
         @click="collapse">
      {{isClosed ? '展开' : '收起'}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      messages: Array
    },
    data () {
      return {
        isClosed: true
      }
    },
    methods: {
      collapse () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>

<style scoped>
  .messages {
    height: 0;
    overflow: hidden;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #1fb922;
    position: absolute;
    left: 0;
    bottom: 74px;
    font-size: 13px;
    line-height: 15px;
    transition: height 0.2s ease-in-out;
  }

  .messages.active {
    overflow: scroll;
    padding: 10px;
    height: 50%;
  }

  .messages-switch {
    height: 30px;
    width: 100%;
    position: absolute;
    bottom: 44px;
    background: green;
    font-size: 13px;
    line-height: 30px;
    color: white;
    text-align: center;
  }
</style>
