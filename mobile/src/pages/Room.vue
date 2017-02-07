<template>
  <div id="room">
    <div class="header">
      {{isPlaying ? '游戏中' : '等待中'}}
    </div>
    <div class="wrapper">
      <div v-if="stage === 1">
        <p>手牌：</p>
        <span class="selection" v-show="hand.length === 0">空</span>
        <span class="selection"
              :class="{active: index === selected}"
              @click="selected = index"
              v-for="(item, index) in hand">{{item}}</span>
      </div>
      <div v-if="stage === 2">
        <p>玩家：</p>
        <span class="selection"
              :class="{active: index === selected}"
              @click="selected = index"
              v-for="(item, index) in room.players">{{clientId === item ? '你' : item}}</span>
      </div>
      <div v-if="stage === 3">
        <p>猜测：</p>
        <span class="selection"
              :class="{active: index === selected}"
              @click="selected = index"
              v-for="(item, index) in guess">{{item}}</span>
      </div>
    </div>
    <lh-message-box></lh-message-box>
    <div class="footer">
      <p class="button"
         v-show="isPlaying && stage === 1"
         style="background: #4485F5;"
         @click="_discard">{{myTurn ? '出牌！' : '请等待……'}}</p>
      <p class="button"
         v-show="isPlaying && stage === 2"
         style="background: #4485F5;"
         @click="confirm1">确认</p>
      <p class="button"
         v-show="isPlaying && stage === 3"
         style="background: #4485F5;"
         @click="confirm2">确认</p>
      <p class="button"
         v-show="!isPlaying"
         style="background: #D74937;"
         @click="exitRoom">离开</p>
      <p class="button"
         v-show="!isPlaying"
         style="background: #4485F5;"
         @click="ready">{{isReady ? '取消准备' : '准备'}}</p>
    </div>
  </div>
</template>

<script>
  let vm
  //  const cardWrapper = {
  //    '侍卫-1': 'bodyguard',
  //    '侍卫-2': 'bodyguard',
  //    '侍卫-3': 'bodyguard',
  //    '侍卫-4': 'bodyguard',
  //    '侍卫-5': 'bodyguard',
  //    '牧师-1': 'priest',
  //    '牧师-2': 'priest',
  //    '男爵-1': 'baron',
  //    '男爵-2': 'baron',
  //    '侍女-1': 'handmaid',
  //    '侍女-2': 'handmaid',
  //    '王子-1': 'prince',
  //    '王子-2': 'prince',
  //    '国王': 'king',
  //    '女伯爵': 'countess',
  //    '公主': 'princess'
  //  }
  const cardStage = {
    '侍卫-1': 3,
    '侍卫-2': 3,
    '侍卫-3': 3,
    '侍卫-4': 3,
    '侍卫-5': 3,
    '牧师-1': 2,
    '牧师-2': 2,
    '男爵-1': 2,
    '男爵-2': 2,
    '侍女-1': 1,
    '侍女-2': 1,
    '王子-1': 2,
    '王子-2': 2,
    '国王': 2,
    '女伯爵': 1,
    '公主': 1
  }
  //  const _converter = (card) => {
  //    return cardWrapper[card]
  //  }
  //  const _isRoyal = (card) => {
  //    return ['prince', 'king'].findIndex(i => i === card) >= 0
  //  }
  export default {
    data () {
      return {
        room: null,
        isReady: false,
        isPlaying: false,
        myTurn: false,
        hand: [],
        selected: 0,
        guess: ['牧师', '男爵', '侍女', '王子', '国王', '女伯爵', '公主'],
        stage: 1,
        discard: {
          card: null,
          targetId: null,
          extra: null
        },
        clientId: null
      }
    },
    sockets: {
      update_room (room) {
        vm.room = room
      },
      update_player (player) {
        vm.hand = player.hand
      },
      start () {
        vm.isPlaying = true
        vm.isReady = false
      },
      end () {
        vm.isPlaying = false
        vm.stage = 1
        vm.hand = []
      },
      quit () {
        vm.isPlaying = false
        vm.stage = 1
        vm.hand = []
      },
      turn () {
        vm.myTurn = true
      },
      draw (card) {
        vm.hand.push(card)
      }
    },
    methods: {
      exitRoom () {
        this.$socket.emit('exit')
        this.$router.go(-1)
      },
      ready () {
        this.isReady = !this.isReady
        if (this.isReady) {
          this.$socket.emit('ready')
        } else {
          this.$socket.emit('cancel')
        }
      },
      _discard () {
        if (this.myTurn) {
          let card = this.hand[this.selected]
          let stage = cardStage[card]
          this.discard.card = card
          this.discard.targetId = null
          this.discard.extra = null
          this.hand.splice(this.selected, 1)
          if (stage === 1) {
            this.$socket.emit('discard', this.discard)
            this.myTurn = false
          } else {
            this.stage = 2
            this.selected = 0
          }
        }
      },
      confirm1 () {
        this.discard.targetId = this.room.players[this.selected]
        this.selected = 0
        if (cardStage[this.discard.card] === 2) {
          this.$socket.emit('discard', this.discard)
          this.stage = 1
          this.myTurn = false
        } else {
          this.stage = 3
        }
      },
      confirm2 () {
        this.discard.extra = this.guess[this.selected]
        this.$socket.emit('discard', this.discard)
        this.myTurn = false
        this.stage = 1
      }
    },
    mounted () {
      vm = this
      this.$socket.emit('join', this.$route.params.roomId)
      this.clientId = this.$socket.id
    }
  }
</script>

<style scoped>
  #room {
    height: 100%;
  }

  .wrapper {
    padding: 10px;
  }

  .selection {
    border: 1px solid #aaa;
  }

  span.selection {
    display: inline-block;
    padding: 8px 5px;
    line-height: 20px;
    margin-left: 8px;
    margin-top: 8px;
  }

  .selection.active {
    border-color: #4485F5;
  }
</style>
