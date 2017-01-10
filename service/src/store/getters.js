import room from './module/rooms'
import user from './module/users'
import game from './module/games'

const getContext = (clientId) => {

}

/**
 * 是否结束？
 * @param clientId
 * @returns {boolean}
 */
export const isGameOver = (clientId) => {
  let context = getContext(clientId)
  let players = game.state.players(context)
  let deck = game.state.deck(context)
  return players.length < 2 || deck.length === 0;
}
