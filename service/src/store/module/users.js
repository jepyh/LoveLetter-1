import * as types from '../mutation-types'

const users = []
const state = {
  roomId: null
}

const mutations = {
  [types.DEAL] (state, roomId) {
    console.log('OK')
  }
}

export default {
  state,
  mutations
}
