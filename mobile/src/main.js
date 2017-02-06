// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocket from 'vue-socket.io'
import App from './App'
import router from './router'

Vue.use(VueSocket, 'http://localhost:3000')

import Room from './components/Room.vue'

Vue.component('lh-room', Room)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
