# -*- coding: utf-8 -*-
import random
import string

from flask import *
app = Flask(__name__)

app.secret_key = 'lhzbxx'

card = {
    "侍卫": "说出一个非侍卫牌名称并选择一名玩家，若此玩家拥有此牌则被淘汰",
    "牧师": "查看另一名玩家的手牌",
    "男爵": "你和另一名玩家比较手牌点数，点数较小的玩家将被淘汰。",
    "侍女": "直到你的下一个回合，忽略其他玩家的卡牌对你的影响。",
    "王子": "选择一名玩家，此玩家弃一张手牌然后摸一张牌。",
    "国王": "选择另一名玩家，将你的手牌与之交换。",
    "女伯爵": "若你手牌中有国王牌或王子牌时，你必须打出女伯爵牌",
    "公主": "若你将公主牌打出或弃置，你将被淘汰。"
}

deck_template = ['侍卫', '侍卫', '侍卫', '侍卫', '侍卫', '牧师', '牧师', '男爵',
                 '男爵', '侍女', '侍女', '王子', '王子', '国王', '女伯爵', '公主']

fold_deck = []

players = {}

public_endpoint = ['home', 'join']

progress_endpoint = ['ready', 'draw', 'fold', 'use', 'show']


@app.before_request
def before_request():
    if request.endpoint not in public_endpoint and request.args.get('player') == '':
        return "Not authorized!"
    if request.endpoint in progress_endpoint and request.args.get('room') == '':
        return "Room not exists!"
    if not session.get('room'):
        session['room'] = []


def random_str(length=8):
    a = list(string.ascii_letters)
    random.shuffle(a)
    return ''.join(a[:length])


@app.route('/join/<room>/<player>')
def join(room, player):
    player_token = random_str()
    init_player(player_token, player)
    if room not in session['room']:
        init_room(room)
    if not is_room_full(room):
        player_join_room(room, player)
    return player_token


def init_player(token, player):
    session['player_token:' + token] = player


def init_room(room):
    session['room'].append(room)
    session['room:' + room + ':player'] = []


def is_room_full(room):
    return len(session['room:' + room + ':player']) >= 4


def player_join_room(room, player):
    session['room:' + room + ':player'].append(player)
    session['room:' + room + ':player:' + player + ':status'] = False
    session['room:' + room + ':player:' + player + ':hand'] = []


@app.route('/ready')
def ready():
    room = request.args.get('room')
    player = session['player_token:' + request.args.get('player')]
    session['room:' + room + ':player:' + player + ':status'] = True
    if len(session['room:' + room + ':player']) > 1 and is_all_player_ready(room):
        game_start(room)


def is_all_player_ready(room):
    for i in session['room:' + room + ':player']:
        if not session['room:' + room + ':player:' + i + ':status']:
            return False
    return True


def game_start(room):
    for i in session['room:' + room + ':player']:
        session['room:' + room + ':player:' + i + ':deck'] = []
    session['room:' + room + ':deck'] = deck_template


def game_end(room):
    for i in session['room:' + room + ':player']:
        session['room:' + room + ':player:' + i + ':status'] = False


@app.route('/room/<room>')
def show_room(room):
    return session['room:' + room + ':player']


@app.route('/draw')
def draw():
    return 'draw'


@app.route('/fold')
def fold():
    return "fold"


@app.route('/use')
def use():
    return 'use'


@app.route('/show')
def show():
    room = request.args.get('room')
    player = session['player_token:' + request.args.get('player')]
    return session['room:' + room + ':player:' + player + ':hand']


@app.route('/')
def home():
    return "Welcome to love letter!"

if __name__ == '__main__':
    app.run()
