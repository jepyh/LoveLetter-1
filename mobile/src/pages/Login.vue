<template>
  <div>
    <div class="header" style="justify-content: center;">
      <p>登录</p>
    </div>
    <div class="main">
      <p class="words" v-show="!isFailed">自动登录中...</p>
      <div v-else>
        <label>
          <input type="text" placeholder="昵称">
        </label>
        <label>
          <input type="password" placeholder="密码">
        </label>
      </div>
    </div>
    <div class="footer">
      <p class="button"
         style="background: #4485F5;"
         @click="login">登录</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        auth: 0,
        isFailed: false
      }
    },
    methods: {
      login () {
        this.$socket.emit('exit')
        this.$router.go(-1)
      }
    },
    computed: {
      mode () {
        switch (this.auth) {
          case 0:
            return '登录'
          case 1:
            return '注册'
        }
      }
    },
    created () {
      let vm = this
      this.$store.dispatch('validToken').then(
        result => {
          if (result) {
            vm.isFailed = true
          } else {
            vm.$router.replace({name: 'home'})
          }
        }
      )
    }
  }
</script>

<style scoped>
  input {
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    margin-top: -1px;
    line-height: 20px;
    font-size: 15px;
    outline: none;
  }
</style>
