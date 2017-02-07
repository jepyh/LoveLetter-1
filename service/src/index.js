import socket from 'socket.io'
import store from './store'

const io = socket()

store.initSpeaker(io)

io.on('connection', (client) => {
  let clientId = client.id
  console.log('user ' + clientId + ' connected')
  store.actions.connect(clientId)
  // console.log(store.getters.getData())
  io.to(clientId).emit('data', store.getters.getData())
  client.on('create', () => {
    store.actions.createRoom(clientId)
    client.join('room_' + clientId)
  })
  client.on('join', (roomId) => {
    store.actions.joinRoom(clientId, roomId)
    client.join(roomId)
  })
  client.on('exit', () => {
    store.actions.exitRoom(clientId)
  })
  client.on('ready', () => {
    store.actions.ready(clientId)
  })
  client.on('cancel', () => {
    store.actions.cancel(clientId)
  })
  client.on('discard', (discard) => {
    store.actions.discard(clientId, discard.card, discard.targetId, discard.extra)
  })
  client.on('disconnect', () => {
    store.actions.disconnect(clientId)
    console.log('user ' + clientId + ' disconnected')
  })
})

console.log('server start: 3000')

io.listen(3000)
