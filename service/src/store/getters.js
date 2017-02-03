import room from './module/rooms'
import player from './module/players'
import game from './module/games'

/**
 * 获取 player 上下文
 * @param clientId
 * @returns {*}
 */
const getPlayerContext = (clientId) => {
  return player.state.players[clientId]
}

/**
 * 获取 room 上下文
 * @param clientId
 * @returns {*}
 */
const getRoomContext = (clientId) => {
  return room.state.rooms[getPlayerContext(clientId).currentRoom]
}

/**
 * 是否结束？
 * @param clientId
 * @returns {boolean}
 */
export const isGameOver = (clientId) => {
  let roomContext = getRoomContext(clientId)
  return (roomContext.players.length - roomContext.outPlayers.length) < 2 || roomContext.deck.length === 0
}
