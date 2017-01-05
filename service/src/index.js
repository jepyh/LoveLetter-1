import server from 'http'
import io from 'socket.io'

const func1 = () => {
  return '123'
}

const func2 = () => {
  return 'abc'
}

io.on('message', async () => {
  const some1 = await func1()
  const some2 = await func2()
  io.emit('reply', some1, some2)
})

server.listen(3000)
