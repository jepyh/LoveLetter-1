import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Lobby from '../pages/Lobby.vue'
import Room from '../pages/Room.vue'
import Setting from '../pages/Setting.vue'
import Help from '../pages/Help.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: Room
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
})
