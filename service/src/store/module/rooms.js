import constants from '../../config/constants'
import speaker from './speaker'

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
 * 倒计时
 * @param roomId
 * @param count
 * @private
 */
const _countdown = (roomId, count) => {
  if (count === 0) {
    roundStart(roomId)
  } else {
    speaker.countdown(roomId, count)
    setTimeout(_countdown(roomId, count - 1), 1000)
  }
}

/**
 * 回合开始
 * @param roomId
 */
const roundStart = (roomId) => {
  let room = rooms[roomId]
  for (let i of room.outPlayers) {
    room.players.push(i)
  }
  room.currentState = 'PLAYING'
  room.deck = constants.DECK.slice()
  room.readyPlayers = []
  prepare(room.deck, room.bottom, room.players.length)
  room.currentPlayer = room.players[0]
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
    let room = constants.ROOM_CONTEXT
    room.id = clientId
    room.allPlayers.push(clientId)
    room.players.push(clientId)
    room.currentState = 'IDLE'
    rooms[clientId] = room
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
      speaker.joinRoom(roomId, clientId)
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
    let index1 = room.allPlayers.findIndex(i => i === clientId)
    let index2 = room.players.findIndex(i => i === clientId)
    let index3 = room.readyPlayers.findIndex(i => i === clientId)
    speaker.exitRoom(roomId, clientId)
    if (index3 >= 0) {
      room.readyPlayers.splice(index3, 1)
    }
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
   * 断开连接
   * @param roomId
   */
  disconnect (roomId) {
    let room = rooms[roomId]
    if (room) {
      room.currentState = 'IDLE'
    }
  },
  /**
   * 准备
   * @param roomId
   * @param clientId
   */
  ready (roomId, clientId) {
    let room = rooms[roomId]
    speaker.ready(roomId, clientId)
    room.readyPlayers.push(clientId)
    if (room.players.length > 1 && room.readyPlayers.length === room.players.length) {
      setTimeout(_countdown(roomId, 5), 1000)
      return room.currentState = 'COUNTDOWN'
    } else {
      return false
    }
  },
  /**
   * 取消准备
   * @param roomId
   * @param clientId
   */
  cancel (roomId, clientId) {
    let room = rooms[roomId]
    let index = room.players.findIndex(i => i === clientId)
    if (index < 0) {
      return console.log('ERROR.INVALID_DATA === rooms.js | cancel')
    } else {
      speaker.cancel(roomId, clientId)
      room.readyPlayers.splice(index, 1)
      if (room.currentState === 'COUNTDOWN') {
        room.currentState = 'IDLE'
      }
    }
  },
  /**
   * 回合结束
   * @param roomId
   */
  roundEnd (roomId) {
    let room = rooms[roomId]
    room.currentState = 'IDLE'
    room.outPlayers.reverse()
    room.players.concat(room.outPlayers)
    room.outPlayers = []
    speaker.roundEnd()
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
      speaker.out(player.id, room.id)
      room.outPlayers.unshift(player.id)
      room.players.splice(index, 1)
    }
  },
  /**
   * 下一名玩家
   * @param roomId
   * @returns {number}
   */
  nextPlayer (roomId) {
    let room = rooms[roomId]
    let index = room.players.findIndex(i => i === room.currentPlayer)
    if (index === room.players.length - 1) {
      room.currentPlayer = room.players[0]
    } else {
      room.currentPlayer = room.players[index + 1]
    }
    speaker.myTurn(roomId, room.currentPlayer)
  }
}
