var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    client = require('redis').createClient({
      "host": "192.168.99.100"
    });

app.use(express.static(path.join(__dirname)));

// 定义
var room_list = function () {
  return "love-letter:room";
};
var player_token = function (player) {
  return "love-letter:player:token:" + player;
};
var player_list = function (room) {
  return "love-letter:room:" + room + ":player";
};
var room_status = function (room) {
  return "love-letter:room:" + room + ":status"
};
var room_deck = function (room) {
  return "love-letter:room:" + room + ":deck"
};
var room_fold_deck = function (room) {
  return "love-letter:room:" + room + ":fold_deck"
};
var player_status = function (room, player) {
  return "love-letter:room" + room + ":player:" + player + ":status";
}
var player_hand = function (room, player) {
  return "love-letter:room" + room + ":player:" + player + ":hand";
};

card_type = {
  "侍卫": "说出一个非侍卫牌名称并选择一名玩家，若此玩家拥有此牌则被淘汰",
  "牧师": "查看另一名玩家的手牌",
  "男爵": "你和另一名玩家比较手牌点数，点数较小的玩家将被淘汰。",
  "侍女": "直到你的下一个回合，忽略其他玩家的卡牌对你的影响。",
  "王子": "选择一名玩家，此玩家弃一张手牌然后摸一张牌。",
  "国王": "选择另一名玩家，将你的手牌与之交换。",
  "女伯爵": "若你手牌中有国王牌或王子牌时，你必须打出女伯爵牌",
  "公主": "若你将公主牌打出或弃置，你将被淘汰。"
};

deck_template = ['侍卫', '侍卫', '侍卫', '侍卫', '侍卫', '牧师', '牧师', '男爵',
  '男爵', '侍女', '侍女', '王子', '王子', '国王', '女伯爵', '公主'];

// test redis
client.on("error", function (err) {
  console.log("Redis error: " + err);
});

app.get('/', function(req, res){
  res.send('<h1>Welcome to LoveLetter!</h1>');
});

app.get('/rooms', function (req, res) {
  res.send(client.get(room_list()))
});

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, 'test.html'));
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('join', function () {
    console.log('player join room');
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});