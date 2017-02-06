import {_discard, _switch, _getContext} from './players'
import rooms from './rooms'
import speaker from './speaker'

const cardWrapper = {
  '侍卫-1': 'bodyguard',
  '侍卫-2': 'bodyguard',
  '侍卫-3': 'bodyguard',
  '侍卫-4': 'bodyguard',
  '侍卫-5': 'bodyguard',
  '牧师-1': 'priest',
  '牧师-2': 'priest',
  '男爵-1': 'baron',
  '男爵-2': 'baron',
  '侍女-1': 'handmaid',
  '侍女-2': 'handmaid',
  '王子-1': 'prince',
  '王子-2': 'prince',
  '国王': 'king',
  '女伯爵': 'countess',
  '公主': 'princess'
}

/**
 * 是否为皇牌
 * @param card
 * @returns {boolean}
 * @private
 */
const _isRoyal = (card) => {
  return ['prince', 'king'].findIndex(i => i === card) >= 0
}

/**
 * 是否生效
 * @param card
 * @returns {boolean}
 * @private
 */
const _isEffective = (card) => {
  return ['bodyguard', 'priest', 'baron', 'prince', 'king'].findIndex(i => i === card) >= 0
}

/**
 * 中文->英文
 * @param card
 * @returns {*}
 * @private
 */
const _converter = (card) => {
  return cardWrapper[card]
}

const level = {
  'bodyguard': 1, 'priest': 2, 'baron': 3, 'handmaid': 4, 'prince': 5, 'king': 6, 'countess': 7, 'princess': 8
}

/**
 * 获取点数
 * @param card
 * @returns {*}
 * @private
 */
const _getLevel = (card) => {
  return level[card]
}

export const dispatcher = (card, player1, player2, extra) => {
  card = _converter(card)
  player1 = _getContext(player1)
  player2 = _getContext(player2)
  if (player1.find(i => i === 'countess') && _isRoyal(card)) {
    console.log('ERROR.INVALID_DATA === rules.js | dispatcher')
  }
  if (_isEffective(card)) {
    if (player2 && _converter(player2.stack[0]) !== 'handmaid') {
      this[card](player1, player2, extra)
    }
  } else {
    this[card](player1)
  }
}

/**
 * 判断获胜者
 * @param players
 */
export const findWinner = (...players) => {
  let winner
  if (players.length === 1) {
    winner = players[0]
  } else {
    let _players = []
    for (let i of players) {
      _players.push(_getContext(i))
    }
    _players.sort((a, b) => _getLevel(_converter(b.hand[0])) - _getLevel(_converter(a.hand[0])))
    winner = _players[0].id
  }
  speaker.winner(_getContext(winner).currentRoom, winner)
  return winner
}

/**
 * 侍卫
 * @param player1
 * @param player2
 * @param card
 */
export const bodyguard = (player1, player2, card) => {
  speaker.discard(player1.currentRoom, player1.id, player2.id, null, card)
  if (player2.hand[0].substr(0, 2) === card.substr(0, 2)) {
    rooms.out(player2)
  }
}

/**
 * 牧师
 * @param player1
 * @param player2
 * @returns {*}
 */
export const priest = (player1, player2) => {
  speaker.discard(player1.currentRoom, player1.id, player2.id, '牧师', null)
  speaker.priest(player1, player2.hand[0])
}

/**
 * 男爵
 * @param player1
 * @param player2
 */
export const baron = (player1, player2) => {
  let card1 = player1.hand[0]
  let level1 = _getLevel(_converter(card1))
  let card2 = player2.hand[0]
  let level2 = _getLevel(_converter(card2))
  speaker.discard(player1.currentRoom, player1.id, player2.id, '牧师', null)
  if (level1 > level2) {
    speaker.baron(player1.id, player2.id, card1, card2, 1)
    rooms.out(player2)
  } else if (level1 < level2) {
    speaker.baron(player1.id, player2.id, card1, card2, 0)
    rooms.out(player1)
  } else {
    speaker.baron(player1.id, player2.id, card1, card2, -1)
  }
}

/**
 * 侍女
 * @param player
 */
export const handmaid = (player) => {
  speaker.discard(player.currentRoom, player.id, null, '侍女', null)
}

/**
 * 王子
 * @param player1
 * @param player2
 */
export const prince = (player1, player2) => {
  speaker.discard(player1.currentRoom, player1.id, player2.id, '王子', null)
  if (_converter(_discard(player2)) === 'princess') {
    rooms.out(player2)
  } else {
    player2.hand.push(rooms.draw(player2.currentRoom))
  }
}

/**
 * 国王
 * @param player1
 * @param player2
 */
export const king = (player1, player2) => {
  speaker.discard(player1.currentRoom, player1.id, player2.id, '国王', null)
  _switch(player1, player2)
}

/**
 * 女伯爵
 * @param player
 */
export const countess = (player) => {
  speaker.discard(player.currentRoom, player.id, null, '女伯爵', null)
}

/**
 * 公主
 * @param player
 */
export const princess = (player) => {
  speaker.discard(player.currentRoom, player.id, null, '公主', null)
  rooms.out(player)
}
