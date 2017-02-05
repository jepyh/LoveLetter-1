import rooms from './module/rooms'
import players from './module/players'

/**
 * 获取 player 上下文
 * @param clientId
 * @returns {*}
 */
export const getPlayerContext = (clientId) => {
  return players.players[clientId]
}

/**
 * 获取 room 上下文
 * @param clientId
 * @returns {*}
 */
export const getRoomContext = (clientId) => {
  return rooms.rooms[getPlayerContext(clientId).currentRoom]
}
