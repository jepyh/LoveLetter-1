import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function format (num) {
  return num >= 10 ? num : '0' + num
}

function datePrefix (msg) {
  let date = new Date()
  return '[' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds()) + '] ' + msg
}

export default new Vuex.Store({
  state: {
    connect: false,
    rooms: [],
    players: 0,
    messages: [],
    settings: {
      isOnlyIdle: false
    }
  },
  mutations: {
    SOCKET_CONNECT: (state) => {
      console.log('连接成功')
      state.connect = true
    },
    SOCKET_data: (state, data) => {
      state.rooms = data.rooms
      state.players = data.players
    },
    SOCKET_enter: (state) => {
      state.players += 1
    },
    SOCKET_leave: (state) => {
      state.players -= 1
    },
    SOCKET_message: (state, msg) => {
      state.messages.unshift({body: datePrefix(msg), type: 'SERVER'})
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
    },
    push: (state, msg) => {
      state.messages.unshift({body: datePrefix(msg), type: 'SYSTEM'})
    },
    toggleSetting: (state, setting) => {
      state.settings[setting.key] = setting.value
    }
  },
  getters: {
    getRooms: (state) => {
      return state.rooms
    },
    getPlayers: (state) => {
      return state.players
    },
    getMessages: (state) => {
      return state.messages
    },
    getSettings: (state) => {
      return state.settings
    },
    isOnlyIdle: (state) => {
      return state.settings.isOnlyIdle
    }
  },
  actions: {
    pushMessage: ({commit}, msg) => {
      commit('push', '系统提示：' + msg)
    }
  }
})
