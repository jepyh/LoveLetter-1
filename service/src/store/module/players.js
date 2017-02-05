const players = {}

export default {
  players,
  getContext (id) {
    return players[id]
  },
  draw (clientId, card) {
    let player = getContext(clientId)
    player.hand.push(card)
  }
}
