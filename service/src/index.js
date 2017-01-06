import socket from 'socket.io'
import CONFIG from './config'
import store from './store'

const io = socket()

io.on('connection', (socket) => {
  let socketId = socket.client.conn.id
  console.log('user ' + socketId + ' connected')
  socket.on('disconnect', () => {
    console.log('user ' + socketId + ' disconnected')
  })
})

/**
 * 洗牌
 * @param deck
 * @param number
 */
const preDeal = (deck, number) => {
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
const deal = (deck, roomId) => {

}

console.log('server start: 3000')

console.log(CONFIG.CONSTANTS.DECK)

console.log(store.room)
console.log(store.user)

preDeal(CONFIG.CONSTANTS.DECK.slice(), 2)

io.listen(3000)
