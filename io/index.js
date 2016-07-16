var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    config = require('./config'),
    client = require('redis').createClient({
      'host': '192.168.99.100'
    });

app.use(express.static(path.join(__dirname)));

// set key definitions
var room_list = function () {
  return 'love-letter:room';
};
var player_token = function (token) {
  return 'love-letter:player:token:' + token;
};
var player_list = function () {
  return 'love-letter:player';
};
// score, games, is_online
var player_info = function (player) {
  return 'love-letter:player:' + player;
};
// is_ready, hand, status
var room_player_list = function (room) {
  return 'love-letter:room:' + room + ':player';
};
// busy or idle
var room_status = function (room) {
  return 'love-letter:room:' + room + ':status'
};
// deck and fold_deck
var room_deck = function (room) {
  return 'love-letter:room:' + room + ':deck'
};

const card_type = {
  '侍卫': '说出一个非侍卫牌名称并选择一名玩家，若此玩家拥有此牌则被淘汰',
  '牧师': '查看另一名玩家的手牌',
  '男爵': '你和另一名玩家比较手牌点数，点数较小的玩家将被淘汰。',
  '侍女': '直到你的下一个回合，忽略其他玩家的卡牌对你的影响。',
  '王子': '选择一名玩家，此玩家弃一张手牌然后摸一张牌。',
  '国王': '选择另一名玩家，将你的手牌与之交换。',
  '女伯爵': '若你手牌中有国王牌或王子牌时，你必须打出女伯爵牌',
  '公主': '若你将公主牌打出或弃置，你将被淘汰。'
};

const deck_template = ['侍卫', '侍卫', '侍卫', '侍卫', '侍卫', '牧师', '牧师', '男爵',
  '男爵', '侍女', '侍女', '王子', '王子', '国王', '女伯爵', '公主'];

const result_template = {
  "result": 0,
  "message": "success",
  "data": null
};

var result = function (result, message, data) {
  var r = result_template;
  r.result = result;
  r.message = message;
  r.data = data;
  return r;
};

// test redis
client.on('error', function (err) {
  console.log('Redis error: ' + err);
});

app.get('/', function(req, res){
  res.send('<h1>Welcome to LoveLetter!</h1>');
});

// get room list
app.get('/rooms', function (req, res) {
  client.smembers(room_list(), function (err, replies) {
    res.send(result(0, "success", replies));
  })
});

// create or join in a room
app.post('/rooms', function (req, res) {
  client.get(player_token(req.query['token']), function (err, player) {
    if (!player) {
      res.send(result(-1, "fail", null));
    }
  });
});

// get player list
app.get('/players', function (req, res) {
  client.smembers(player_list(), function (err, replies) {
    res.send(result(0, "success", replies));
  })
});

const init_player = {
  'score': 0,
  'games': 0,
  'is_online': true
};

// add a player
app.post('/players', function (req, res) {
  var player = req.query['player_name']
  client.get(player, function (err, reply) {
    if (!reply) {
      client.multi()
          .set(player_token(random_str(12)), player)
          .sadd(player_list(), player)
          .hmset(player_info(player), init_player)
          .exec(function (err, reply) {
            if (!err) {
              res.send(result(0, "success", null));
            } else {
              res.send(result(-1, "fail", null));
            }
      });
    }
  });
});

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, 'test.html'));
});

io.on('connection', function (socket) {

  // emit range
  // room: players in room
  // player: self
  socket.join(socket.room);
  socket.join(socket.player);

  // new player join room
  socket.on('join', function (token, room) {
    client.get(player_token(token), function (err, reply) {
      socket.player = reply;
      console.log('Player ' + socket.player + ' join in room ' + room);
      socket.to(socket.room).emit("notification", socket.player + ' has joined in room just now.');
    });
  });

  // play leave room
  socket.on('disconnect', function(){
    console.log('Player ' + socket.player + ' disconnected');
    socket.to(socket.room).emit("notification", socket.player + ' has left just now.');
  });

  // player draw card
  function player_draw_card(player, card, target) {
    socket.to(socket.room).emit("player_draw", player, card, target);
  }

  // player use card
  function player_use_card(player, card, target, extend) {
    socket.to(socket.room).emit("player_use", player, card, target, extend);
  }
  socket.on("player_use", function (player, card, target, extend) {
    // valid player is the right one
  });

  // player fold card
  function player_fold_card(player, card) {
    socket.to(socket.room).emit("player_fold", player, card);
  }

  // player out
  function player_out() {
    socket.to(socket.room).emit("player_out", player);
  }

  // card engine
  // 1. bodyguard
  function card_engine_bodyguard() {
    socket.to(socket.room).emit("card_engine_bodyguard", player)
  }
  // 2. periest
  function card_engine_priest() {
    socket.to(socket.room).emit("card_engine_priest", player, card);
    socket.to(player).emit("card_engine_priest", player, card);
  }

  // game start
  socket.to(socket.room).emit("game_start");

  // game end
  socket.to(socket.room).emit("game_end");

  // next step
  function next() {
    is_game_should_be_ended(function (result) {
      if (result) {

      } else {
        is_should_step_forward(function (cb) {
          if (cb) {
            // next player draw card
          }
        })
      }
    });
  }

  function is_game_should_be_ended(callback) {
    // 1. all players hand.count = 1 and room.deck.count = 0
    // 2. only 1 player.status = alive
    callback(false)
  }

  function is_should_step_forward(callback) {
    // everyone hand.count = 1
    callback(false)
  }

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var random_str = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};