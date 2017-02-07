import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connect: false,
    rooms: [],
    messages: []
  },
  mutations: {
    SOCKET_connect: (state) => {
      console.log('连接成功')
      state.connect = true
    },
    SOCKET_message: (state, msg) => {
      let date = new Date()
      function format (num) {
        return num >= 10 ? num : '0' + num
      }
      state.messages.unshift('[' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds()) + '] ' + msg)
    },
    SOCKET_CREATE_ROOM: (state, message) => {
      console.log('fucking create room')
      state.message = message
    }
  },
  actions: {
    otherAction: ({commit, dispatch, state}, type) => {
      return true
    }
  },
  getters: {
    getRooms (state) {
      return state.rooms
    },
    getMessages (state) {
      return state.messages
    }
  }
})
