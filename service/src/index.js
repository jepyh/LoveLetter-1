import socket from 'socket.io'

const io = socket()

const func1 = () => {
  return '123'
}

const func2 = () => {
  return 'abc'
}

io.on('connection', (socket) => {
  let socketId = socket.client.conn.id
  console.log('user ' + socketId + ' connected')
  socket.on('disconnect', () => {
    console.log('user ' + socketId + ' disconnected')
  })
})

// 洗牌
const preDeal = () => {

}

const deal = () => {

}

console.log('server start: 3000')

io.listen(3000)
