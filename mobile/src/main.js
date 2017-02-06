// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocket from 'vue-socket.io'
import App from './App'
import router from './router'

Vue.use(VueSocket, 'http://192.168.1.5:3000')

import Room from './components/Room.vue'
import MessageBox from './components/MessageBox.vue'

Vue.component('lh-room', Room)
Vue.component('lh-message-box', MessageBox)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
