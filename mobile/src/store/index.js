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
    SOCKET_CONNECT: (state) => {
      console.log('连接成功')
      state.connect = true
    },
    SOCKET_data: (state, data) => {
      state.rooms = data.rooms
    },
    SOCKET_message: (state, msg) => {
      let date = new Date()
      function format (num) {
        return num >= 10 ? num : '0' + num
      }
      state.messages.unshift('[' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds()) + '] ' + msg)
    },
    SOCKET_create: (state, room) => {
      state.rooms.push(room)
    },
    SOCKET_update: (state, room) => {
      let index = state.rooms.findIndex(item => item.id === room.id)
      if (index >= 0) {
        state.rooms.splice(index, 1, room)
      }
    },
    SOCKET_destroy: (state, roomId) => {
      let index = state.rooms.findIndex(item => item.id === roomId)
      if (index >= 0) {
        state.rooms.splice(index, 1)
      }
    }
  },
  getters: {
    getRooms: (state) => {
      return state.rooms
    },
    getMessages: (state) => {
      return state.messages
    }
  },
  actions: {
    otherAction: ({commit, dispatch, state}, type) => {
      return true
    }
  }
})
