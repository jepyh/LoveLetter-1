const players = {}

export default {
  players,
  getContext (id) {
    return players[id]
  },
  deal () {
    console.log('OK')
  }
}
