import players from './module/players'
import rooms from './module/rooms'

export default {
  roundStart (clientId) {
    rooms.roundStart(players.getContext(clientId).currentRoom)
  },
  deal (clientId) {
    let room = rooms.getContext(players.getContext(clientId).currentRoom)
    for (let i of room.players) {
      players.draw(i, rooms.draw(room.id))
    }
  },
  draw (clientId) {
    players.draw(clientId, rooms.draw(players.getContext(clientId).currentRoom))
  },
  discard (clientId, card) {
    players.discard(clientId, card)
  }
}
