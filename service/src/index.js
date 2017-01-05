import socket from 'socket.io'
import CONFIG from './config'

const io = socket()

io.on('connection', (socket) => {
  let socketId = socket.client.conn.id
  console.log('user ' + socketId + ' connected')
  console.log(CONFIG.CONSTANTS.DECK)
  socket.on('disconnect', () => {
    console.log('user ' + socketId + ' disconnected')
  })
})

// 洗牌
const preDeal = () => {

}

// 发牌
const deal = () => {

}

console.log('server start: 3000')

io.listen(3000)
