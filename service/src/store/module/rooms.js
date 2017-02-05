import constants from '../../config/constants'

const rooms = {}

/**
 * 预发牌
 * @param deck
 * @param bottom
 * @param number
 */
const prepare = (deck, bottom, number) => {
  let max = deck.length
  for (let i of deck.keys()) {
    shuffle(deck, i, random(max))
  }
  switch (number) {
    case 2:
      bottom = deck.splice(0, 3)
      break
    case 3:
      bottom = deck.splice(0, 2)
      break
    case 4:
      bottom = deck.splice(0, 1)
      break
    default:
      bottom = []
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

export default {
  rooms,
  /**
   * 获取上下文
   * @param id
   * @returns {*}
   */
  getContext (id) {
    return rooms[id]
  },
  /**
   * 回合开始
   * @param roomId
   */
  roundStart (roomId) {
    let room = getContext(roomId)
    for (let i of room.outPlayers) {
      room.players.push(i)
    }
    room.currentStage = 'PLAYING'
    room.currentStage = 1
    room.deck = constants.DECK.slice()
    prepare(room.deck, room.bottom, room.players.length)
  },
  /**
   * 抽牌
   * @param roomId
   * @returns {String}
   */
  draw (roomId) {
    let room = getContext(roomId)
    return room.deck.pop()
  },
  /**
   * 出局
   * @param player
   */
  out (player) {
    let room = getContext(player.currentRoom)
    let index = room.players.findIndex(i => i === player.id)
    if (index < 0) {
      return console.log('ERROR.INVALID_DATA === rooms.js | out')
    } else {
      room.outPlayers.unshift(player.id)
      room.players.splice(index, 1)
    }
  },
  /**
   * 下一阶段
   * @param roomId
   * @returns {number}
   */
  nextStage (roomId) {
    let room = getContext(roomId)
    return room.currentStage >= constants.ROOM_STAGE.length ? room.currentStage = 1 : room.currentStage += 1
  }
}
