import socket from 'socket.io'
import CONFIG from './config'
import store from './store'
import * as actions from './flow/actions'
import * as types from './store/mutation-types'
import * as speakers from './flow/speakers'

const io = socket()

io.on('connection', (client) => {
  let clientId = client.id
  console.log('user ' + clientId + ' connected')

  client.on('join', (roomId) => {
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
    console.log('user ' + clientId + ' disconnected')
  })
})

console.log('server start: 3000')

store.room.mutations[types.DEAL]()

actions.deal(CONFIG.CONSTANTS.DECK.slice(), '100001')

io.listen(3000)
