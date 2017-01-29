import * as types from '../mutation-types'

const state = {
  players: {}
}

const mutations = {
  [types.DEAL] (state) {
    console.log('OK')
  }
}

export default {
  state,
  mutations
}
