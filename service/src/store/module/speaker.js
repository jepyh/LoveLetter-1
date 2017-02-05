import statements from '../../config/statements'

let _io = null

export const init = (io) => {
  _io = io
}

export default {
  connect (player) {
    _io.emit('message', statements.connect(player))
  },
  joinRoom (roomId, player) {
    _io.to(roomId).emit('message', statements.welcome(player))
  },
  out (roomId, player) {
    _io.to(roomId).emit('out', player, statements.out(player))
  }
}
