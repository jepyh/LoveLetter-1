import {dispatcher} from './rules'

const players = {}

export const _discard = (clientId) => {
  return players[clientId].hand.pop()
}

export const _switch = (clientId1, clientId2) => {
  let player1 = players[clientId1]
  let player2 = players[clientId2]
  let tmp = player1.hand[0]
  player1.hand[0] = player2.hand[0]
  player2.hand[0] = tmp
}

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
    let player = players[clientId]
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
    let player = players[clientId]
    let index = player.hand.findIndex(i => i === card)
    if (index < 0) {
      return console.log('ERROR.INVALID_DATA === players.js | discard')
    } else {
      player.stack.unshift(player.hand.splice(index, 1))
    }
    dispatcher(card, player, players.getContext(targetId), extra)
  },
  /**
   * 判断获胜者
   * @param players
   */
  findWinner (...players) {
    if (players.length === 1) {
      return players[0]
    } else {
      for (let player of players) {

      }
    }
  }
}
