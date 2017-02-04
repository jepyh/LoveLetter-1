import * as types from '../mutation-types'

const players = {}

export default {
  players,
  getContext (id) {
    return players[id]
  },
  [types.DEAL] () {
    console.log('OK')
  }
}
