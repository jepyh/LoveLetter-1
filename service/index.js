import server from 'http'
import io from 'socket.io'

io.on('connection', (client) => {
  client.on('event', (data) => {

  })
  client.on('disconnect', () => {

  })
})

server.listen(3000)
