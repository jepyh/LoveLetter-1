import * as types from '../mutation-types'

const state = {
  // 牌库
  deck: [],
  // 手牌
  hand: [],
  // 底牌
  bottom: [],
  // 当前玩家
  currentPlayer: null
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
