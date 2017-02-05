export default {
  connect (player) {
    return '玩家 ' + player + ' 进入大厅'
  },
  joinRoom (player) {
    return '玩家 ' + player + ' 进入房间'
  },
  out (player) {
    return '玩家 ' + player + ' 出局'
  },
  ready (player) {
    return '玩家 ' + player + '  已准备'
  },
  cancel (player) {
    return '玩家 ' + player + '  取消准备'
  },
  countdown (count) {
    return count + '秒后，游戏开始'
  },
  winner (player) {
    return '本局获胜者是：' + player
  },
  discard (player1, card, player2, extra) {
    if (extra) {
      return '玩家 ' + player1 + ' 猜测玩家 ' + player2 + ' 手牌为 ' + extra
    }
    if (player2) {
      if (player1 === player2) {
        return '玩家 ' + player1 + ' 对自己打出了 ' + card
      } else {
        return '玩家 ' + player1 + ' 对玩家 ' + player2 + ' 打出了 ' + card
      }
    }
    return '玩家 ' + player1 + ' 打出了 ' + card
  },
  priest (player, card) {
    return '玩家 ' + player + ' 的手牌是：' + card
  },
  baron (card, result) {
    switch (result) {
      case 1:
        return '对方的手牌是：' + card + '，拼点成功'
      case -1:
        return '对方的手牌是：' + card + '，拼点失败'
      case 0:
        return '对方的手牌是：' + card + '，平手'
    }
  }
}
