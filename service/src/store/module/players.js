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
   */
  discard (clientId, card) {
    let player = getContext(clientId)
    let index = player.hand.findIndex(i => i === card)
    if (index < 0) {
      console.log('ERROR.INVALID_DATA')
    } else {
      let card = player.hand.splice(index, 1)
      player.stack.splice(0, 0, card)
      return card
    }
  }
}
