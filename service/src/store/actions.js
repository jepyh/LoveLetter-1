import * as types from '../mutation-types'

/**
 * 预发牌
 * @param deck
 * @param number
 */
const prepare = (deck, number) => {
  let max = deck.length
  for (let i of deck.keys()) {
    shuffle(deck, i, random(max))
  }
  switch (number) {
    case 2:
      deck.splice(0, 3)
      break
    case 3:
      deck.splice(0, 2)
      break
    case 4:
      deck.splice(0, 1)
      break
    default:
      break
  }
  console.log('prepare => ' + deck)
}

/**
 * 洗牌
 * @param deck
 * @param index1
 * @param index2
 */
const shuffle = (deck, index1, index2) => {
  let tmp = deck[index1]
  deck[index1] = deck[index2]
  deck[index2] = tmp
}

/**
 * 随机数
 * @param max
 * @returns {number}
 */
const random = (max) => {
  return Math.floor(Math.random() * max)
}

/**
 * 发牌
 * @param deck
 * @param roomId
 */
export const deal = () => {
  prepare(deck, 3)
}

const _draw = (player) => {
  let card = this.dispatch('DEAL', this.getPlayerContext(clientId).currentRoom)
  this.dispatch('DRAW', clientId)
}

export const draw = (clientId) => {

}

export const roundStart = (clientId) => {
  this.dispatch('ROUND_START', this.getPlayerContext(clientId).currentRoom)
}

export const deal = (clientId) => {
}

export default {
  types
}
