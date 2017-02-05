import rooms from '../../module/rooms'

const _converter = (card) => {

}

const _getLevel = (card) => {

}

export const dispatcher = (card, player1, player2, extra) => {

}

/**
 * 侍卫
 * @param player1
 * @param player2
 * @param card
 */
const bodyguard = (player1, player2, card) => {
  if (player2.stack[0] === '侍女')
    return
  if (player2.hand[0] === card) {
    rooms.out(player2)
  }
}

/**
 * 牧师
 * @param player1
 * @param player2
 * @returns {*}
 */
const priest = (player1, player2) => {
  return player2.hand[0]
}

/**
 * 男爵
 * @param player1
 * @param player2
 */
const baron = (player1, player2) => {

}

/**
 * 侍女
 * @param player
 */
const handmaid = (player) => {

}

/**
 * 王子
 * @param player1
 * @param player2
 */
const prince = (player1, player2) => {

}

/**
 * 国王
 * @param player1
 * @param player2
 */
const king = (player1, player2) => {

}

/**
 * 公主
 * @param player
 */
const princess = (player) => {
  rooms.out(player)
}
