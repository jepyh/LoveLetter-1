const CARD_TYPE = {
  '侍卫': '说出一个非侍卫牌名称并选择一名玩家，若此玩家拥有此牌则被淘汰。',
  '牧师': '查看另一名玩家的手牌。',
  '男爵': '你和另一名玩家比较手牌点数，点数较小的玩家将被淘汰。',
  '侍女': '直到你的下一个回合，忽略其他玩家的卡牌对你的影响。',
  '王子': '选择一名玩家，此玩家弃一张手牌然后摸一张牌。',
  '国王': '选择另一名玩家，将你的手牌与之交换。',
  '女伯爵': '若你手牌中有国王牌或王子牌时，你必须打出女伯爵牌。',
  '公主': '若你将公主牌打出或弃置，你将被淘汰。'
}

const ROOM_CONTEXT = {
  id: null,
  players: [],
  currentState: null,
  currentStage: null,
  deck: []
}

const PLAYER_CONTEXT = {
  id: null,
  currentRoom: null,
  hand: [],
  stack: []
}
