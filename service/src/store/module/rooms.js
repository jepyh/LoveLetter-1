import constants from '../../config/constants'

const rooms = {}

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

export default {
  rooms,
  getContext (id) {
    return rooms[id]
  },
  roundStart (roomId) {
    let room = getContext(roomId)
    for (let i of room.outPlayers) {
      room.players.push(i)
    }
    room.currentStage = 'PLAYING'
    room.currentStage = 1
    room.deck = constants.DECK.slice()
    prepare(room.deck, room.players.length)
  },
  draw (roomId) {
    let room = getContext(roomId)
    return room.deck.pop()
  },
  nextStage (roomId) {
    let room = getContext(roomId)
    return room.currentStage >= constants.ROOM_STAGE.length ? room.currentStage = 1 : room.currentStage += 1
  }
}
