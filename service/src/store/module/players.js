import * as rules from '../flow/rules'

const players = {}

export default {
  players,
  /**
   * 获取上下文
   * @param id
   * @returns {*}
   */
  getContext (id) {
    return players[id]
  },
  /**
   * 抽牌
   * @param clientId
   * @param card
   */
  draw (clientId, card) {
    let player = getContext(clientId)
    player.hand.push(card)
  },
  /**
   * 弃牌
   * @param clientId
   * @param card
   * @param targetId
   * @param extra
   */
  discard (clientId, card, targetId, extra) {
    let player = getContext(clientId)
    let index = player.hand.findIndex(i => i === card)
    if (index < 0) {
      return console.log('ERROR.INVALID_DATA === players.js | discard')
    } else {
      player.stack.unshift(player.hand.splice(index, 1))
    }
    switch (card) {
      case '侍卫':
        rules.bodyguard(player, players.getContext(targetId), extra)
        break
      default:
        break
    }
  }
}
