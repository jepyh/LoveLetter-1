import rooms from './module/rooms'
import players from './module/players'

const _getRooms = () => {
  return rooms.rooms
}

const _getPlayers = () => {
  return players.players
}

export default {
  getData () {
    return {
      rooms: _getRooms(),
      players: _getPlayers()
    }
  }
}
