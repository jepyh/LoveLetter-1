import room from './module/rooms'
import player from './module/players'

/**
 * 获取 player 上下文
 * @param clientId
 * @returns {*}
 */
export const getPlayerContext = (clientId) => {
  return player.state.players[clientId]
}

/**
 * 获取 room 上下文
 * @param clientId
 * @returns {*}
 */
export const getRoomContext = (clientId) => {
  return room.state.rooms[getPlayerContext(clientId).currentRoom]
}

/**
 * 是否结束？
 * @param clientId
 * @returns {boolean}
 */
const isGameOver = (clientId) => {
  let roomContext = getRoomContext(clientId)
  return (roomContext.players.length - roomContext.outPlayers.length) < 2 || roomContext.deck.length === 0
}

export default {
  isGameOver
}
