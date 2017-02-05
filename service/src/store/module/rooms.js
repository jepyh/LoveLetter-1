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
   * 创建房间
   * @param clientId
   */
  createRoom (clientId) {
    let room = constants.ROOM_CONTEXT.slice()
    room.id = clientId
    room.allPlayers.push(clientId)
    room.players.push(clientId)
    room.currentStage = 'IDLE'
    rooms.push(room)
  },
  /**
   * 加入房间
   * @param clientId
   * @param roomId
   * @returns {boolean}
   */
  joinRoom (clientId, roomId) {
    let room = rooms[roomId]
    if (room) {
      room.allPlayers.push(clientId)
      if (room.players.length < 4) {
        room.players.push(clientId)
        return true
      } else {
        return false
      }
    }
  },
  /**
   * 离开房间
   * @param clientId
   * @param roomId
   * @returns {Array.<*>}
   */
  exitRoom (clientId, roomId) {
    let room = rooms[roomId]
    let index1 = room.allPlayers.findIndex(clientId)
    let index2 = room.players.findIndex(clientId)
    if (index2 < 0 && index1 >= 0) {
      return room.allPlayers.splice(index1, 1)
    }
    room.allPlayers.splice(index1, 1)
    room.players.splice(index2, 1)
    if (room.allPlayers.length > room.players.length) {
      room.players.push(room.allPlayers.pop())
    } else {
      if (room.players.length === 1) {
        delete(rooms[roomId])
      }
    }
  },
  /**
   * 回合开始
   * @param roomId
   */
  roundStart (roomId) {
    let room = rooms[roomId]
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
    let room = rooms[roomId]
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
    let room = rooms[roomId]
    return room.currentStage >= constants.ROOM_STAGE.length ? room.currentStage = 1 : room.currentStage += 1
  }
}
