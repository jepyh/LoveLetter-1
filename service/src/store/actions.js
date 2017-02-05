import players from './module/players'
import rooms from './module/rooms'
import rules from './module/rules'

/**
 * 是否结束？
 * @param clientId
 * @returns {boolean}
 */
const _isGameOver = (clientId) => {
  let room = rooms.getContext(players.getContext(clientId).currentRoom)
  return (room.players.length - room.outPlayers.length) < 2 || room.deck.length === 0
}

/**
 * 正在游戏中的玩家
 * @param clientId
 * @returns {Array}
 * @private
 */
const _getPlayers = (clientId) => {
  return rooms.getContext(players.getContext(clientId).currentRoom).players
}

export default {
  /**
   * 连接
   * @param clientId
   */
  connect (clientId) {
    players.connect(clientId)
  },
  /**
   * 断开连接
   * @param clientId
   */
  disconnect (clientId) {
    players.disconnect(clientId)
    let roomId = players.players[clientId].currentRoom
    if (roomId) {
      rooms.exitRoom(clientId, roomId)
      rooms.disconnect(roomId)
    }
  },
  /**
   * 加入房间
   * @param clientId
   * @param roomId
   */
  joinRoom (clientId, roomId) {
    players.joinRoom(clientId, roomId)
    rooms.joinRoom(clientId, roomId)
  },
  /**
   * 离开房间
   * @param clientId
   */
  exitRoom (clientId) {
    rooms.exitRoom(clientId, players.exitRoom(clientId))
  },
  /**
   * 玩家准备
   * @param clientId
   */
  ready (clientId) {
    rooms.ready(players.getContext(clientId).currentRoom, clientId)
  },
  /**
   * 回合开始
   * @param clientId
   */
  roundStart (clientId) {
    rooms.roundStart(players.getContext(clientId).currentRoom)
  },
  /**
   * 发牌
   * @param clientId
   */
  deal (clientId) {
    let room = rooms.getContext(players.getContext(clientId).currentRoom)
    for (let i of room.players) {
      players.draw(i, rooms.draw(room.id))
    }
  },
  /**
   * 抽牌
   * @param clientId
   */
  draw (clientId) {
    players.draw(clientId, rooms.draw(players.getContext(clientId).currentRoom))
  },
  /**
   * 弃牌
   * @param clientId
   * @param card
   * @param targetId
   * @param extra
   */
  discard (clientId, card, targetId, extra) {
    players.discard(clientId, card, targetId, extra)
    if (_isGameOver(clientId)) {
      return rules.findWinner(_getPlayers())
    } else {
      return false
    }
  }
}
