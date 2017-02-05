import socket from 'socket.io'
import speakers from './config/speakers'
import store from './store'

const io = socket()

io.on('connection', (client) => {
  let clientId = client.id
  console.log('user ' + clientId + ' connected')
  store.actions.connect(clientId)
  // console.log(store.getters.getData())
  io.to(clientId).emit('message', store.getters.getData())
  client.on('create', () => {
    store.actions.createRoom(clientId)
    client.join(clientId)
  })
  client.on('join', (roomId) => {
    store.actions.joinRoom(clientId, roomId)
    client.join(roomId)
    io.to(roomId).emit('message', speakers.welcome(clientId))
  })
  client.on('ready', () => {
    io.clients((error, clients) => {
      console.log(clients)
    })
    io.in('100001').clients((error, clients) => {
      console.log(clients)
    })
    io.to('100001').emit('ready', clientId)
  })

  client.on('disconnect', () => {
    store.actions.disconnect(clientId)
    console.log('user ' + clientId + ' disconnected')
  })
})

console.log('server start: 3000')

io.listen(3000)
