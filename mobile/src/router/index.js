import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Lobby from '../pages/Lobby.vue'
import Room from '../pages/Room.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lobby',
      component: Lobby
    },
    {
      path: '/:roomId',
      name: 'Room',
      component: Room
    }
  ]
})
