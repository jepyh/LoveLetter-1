import * as types from '../mutation-types'
import constants from '../../config/constants'

const state = {
  rooms: {}
}

const mutations = {
  [types.ROUND_START] (roomId) {
    let room = state.rooms[roomId]
    for (let i of room.outPlayers) {
      room.players.push(i)
    }
    room.currentStage = 'PLAYING'
    room.currentStage = 1
    room.deck = constants.DECK.slice()
  },
  [types.DEAL] (roomId) {

  },
  [types.NEXT_STAGE] (roomId) {
    let room = state.rooms[roomId]
    return room.currentStage >= constants.ROOM_STAGE.length ? room.currentStage = 1 : room.currentStage += 1
  }
}

export default {
  state,
  mutations
}
