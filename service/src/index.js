import socket from 'socket.io'

const io = socket()

const func1 = () => {
  return '123'
}

const func2 = () => {
  return 'abc'
}

io.on('connection', async () => {
  io.emit('hello~')
})

io.on('message', async () => {
  const some1 = await func1()
  const some2 = await func2()
  io.emit('reply', some1, some2)
})

console.log('server start: 3000')

io.listen(3000)
