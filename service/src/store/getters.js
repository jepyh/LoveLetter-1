import rooms from './module/rooms'
import players from './module/players'

export default {
  getRooms () {
    return rooms.rooms
  },
  getPlayers () {
    return players.players
  }
}
