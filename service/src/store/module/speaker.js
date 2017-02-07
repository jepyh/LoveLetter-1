import statements from '../../config/statements'

let _io = null

export const init = (io) => {
  _io = io
}

export default {
  connect (player) {
    _io.emit('message', statements.connect(player))
  },
  disconnect (player) {
    _io.emit('message', statements.disconnect(player))
  },
  createRoom (room) {
    _io.emit('create', room)
    _io.emit('message', statements.createRoom(room.id))
  },
  joinRoom (roomId, player) {
    _io.to(roomId).emit('message', statements.joinRoom(player))
  },
  exitRoom (roomId, player) {
    _io.to(roomId).emit('message', statements.exitRoom(player))
  },
  updateRoom (room) {
    _io.emit('update', room)
  },
  destroyRoom (roomId) {
    _io.emit('destroy', roomId)
  },
  out (roomId, player) {
    _io.to(roomId).emit('out', player)
    _io.to(roomId).emit('message', statements.out(player))
  },
  ready (roomId, player) {
    _io.to(roomId).emit('ready', player)
    _io.to(roomId).emit('message', statements.ready(player))
  },
  cancel (roomId, player) {
    _io.to(roomId).emit('cancel', player)
    _io.to(roomId).emit('message', statements.cancel(player))
  },
  countdown (roomId, count) {
    if (count === 5) {
      _io.to(roomId).emit('start')
    }
    _io.to(roomId).emit('message', statements.countdown(count))
  },
  roundStart (roomId) {
    _io.to(roomId).emit('message', statements.roundStart())
  },
  roundEnd (roomId) {
    _io.to(roomId).emit('message', statements.roundEnd())
  },
  winner (roomId, player) {
    _io.to(roomId).emit('message', statements.winner(player))
  },
  discard (roomId, player1, player2, card, extra) {
    _io.to(roomId).emit('message', statements.discard(player1, player2, card, extra))
  },
  priest (player, card) {
    _io.to(player).emit('message', statements.priest(player, card))
  },
  baron (player1, player2, card1, card2, result) {
    _io.to(player1).emit('message', statements.baron(card2, result))
    _io.to(player2).emit('message', statements.baron(card1, -result))
  },
  myTurn (roomId, player) {
    _io.to(roomId).emit('message', statements.myTurn(player))
    _io.to(player).emit('turn')
  },
  draw (roomId, player, card) {
    _io.to(roomId).emit('message', statements.draw(player))
    _io.to(player).emit('draw', card)
  }
}
