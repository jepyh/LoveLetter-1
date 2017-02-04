import * as types from '../mutation-types'
import constants from '../../config/constants'

const rooms = {}

export default {
  rooms,
  getContext (id) {
    return rooms[id]
  },
  [types.ROUND_START] (roomId) {
    let room = rooms[roomId]
    for (let i of room.outPlayers) {
      room.players.push(i)
    }
    room.currentStage = 'PLAYING'
    room.currentStage = 1
    room.deck = constants.DECK.slice()
  },
  [types.DEAL] (roomId) {
    let room = rooms[roomId]
    return room.deck.pop()
  },
  [types.NEXT_STAGE] (roomId) {
    let room = rooms[roomId]
    return room.currentStage >= constants.ROOM_STAGE.length ? room.currentStage = 1 : room.currentStage += 1
  }
}
