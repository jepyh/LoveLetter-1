import players from './module/players'
import rooms from './module/rooms'

export default {
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
   */
  discard (clientId, card, targetId, extra) {
    players.discard(clientId, card, targetId, extra)
  }
}
