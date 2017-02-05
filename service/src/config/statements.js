export default {
  connect (player) {
    return '玩家 ' + player + ' 进入大厅'
  },
  joinRoom (player) {
    return '玩家 ' + player + ' 进入房间'
  },
  out (player) {
    return '玩家 ' + player + ' 出局'
  }
}
