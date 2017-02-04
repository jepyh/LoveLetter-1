import constants from '../../config/constants'

const rooms = {}

export default {
  rooms,
  getContext (id) {
    return rooms[id]
  },
  roundStart (roomId) {
    let room = rooms[roomId]
    for (let i of room.outPlayers) {
      room.players.push(i)
    }
    room.currentStage = 'PLAYING'
    room.currentStage = 1
    room.deck = constants.DECK.slice()
  },
  deal (roomId) {
    let room = rooms[roomId]
    return room.deck.pop()
  },
  nextStage (roomId) {
    let room = rooms[roomId]
    return room.currentStage >= constants.ROOM_STAGE.length ? room.currentStage = 1 : room.currentStage += 1
  }
}
