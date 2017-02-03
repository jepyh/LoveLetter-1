import * as types from '../mutation-types'

const state = {
  players: {}
}

const mutations = {
  [types.DEAL] () {
    console.log('OK')
  }
}

export default {
  state,
  mutations
}
