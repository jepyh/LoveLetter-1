# -*- coding: utf-8 -*-
import random
import string
import os

from flask import *
app = Flask(__name__)

app.secret_key = os.urandom(32)

card_type = {
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
    if request.endpoint in progress_endpoint and not session['player_token:' + request.args.get('player')]:
        return "Invalid token!"
    if not session.get('room'):
        session['room'] = []


def random_str(length=8):
    a = list(string.ascii_letters)
    random.shuffle(a)
    return ''.join(a[:length])


@app.route('/join/<room>/<player>')
def join(room, player):
    player_token = random_str()
    if room not in session['room']:
        init_room(room)
    if player in session['room:' + room + ':player']:
        return "Duplicate player!"
    init_player(player_token, player)
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
    return jsonify([{i: session['room:' + room + ':player:' + i + ':status']}
                    for i in session['room:' + room + ':player']])


@app.route('/all')
def display_all():
    print(session)
    return "OK"


def is_all_player_ready(room):
    for i in session['room:' + room + ':player']:
        if not session['room:' + room + ':player:' + i + ':status']:
            return False
    return True


def game_start(room):
    for i in session['room:' + room + ':player']:
        session['room:' + room + ':player:' + i + ':hand'] = []
    session['room:' + room + ':deck'] = deck_template
    session['room:' + room + ':fold_deck'] = []


def game_end(room):
    for i in session['room:' + room + ':player']:
        session['room:' + room + ':player:' + i + ':status'] = False


@app.route('/room/<room>')
def show_room(room):
    return session['room:' + room + ':player']


@app.route('/draw')
def draw():
    room = request.args.get('room')
    player = session['player_token:' + request.args.get('player')]
    player_add_one_card(room, player, draw_one_card_from_deck(room))
    return 'draw'


def draw_one_card_from_deck(room):
    index = random.randint(0, len(session['room:' + room + ':deck']) - 1)
    return session['room:' + room + ':deck'].pop(index)


def player_add_one_card(room, player, card):
    session['room:' + room + ':player:' + player + ':hand'].append(card)


@app.route('/fold')
def fold():
    room = request.args.get('room')
    player = session['player_token:' + request.args.get('player')]
    if not is_player_fold_or_use_card_valid(room, player):
        return 'Invalid card!'
    card_fold_or_use(room, player, request.args.get('card'))
    return redirect(url_for(show, room=room, player=request.args.get('player')))


@app.route('/use')
def use():
    room = request.args.get('room')
    player = session['player_token:' + request.args.get('player')]
    if not is_player_fold_or_use_card_valid(room, player):
        return 'Invalid card!'
    # todo: card using engine to handle!
    card_fold_or_use(room, player, request.args.get('card'))
    return redirect(url_for(show, room=room, player=request.args.get('player')))


def is_player_fold_or_use_card_valid(room, player):
    if not request.args.get('card'):
        return False
    return request.args.get('card') in session['room:' + room + ':player:' + player + ':hand']


def card_fold_or_use(room, player, card):
    request.args.get('card') in session['room:' + room + ':player:' + player + ':hand'].remove(card)
    session['room:' + room + ':fold_deck'].append(card)


@app.route('/show')
def show():
    room = request.args.get('room')
    player = session['player_token:' + request.args.get('player')]
    return jsonify(session['room:' + room + ':player:' + player + ':hand'])


@app.route('/')
def home():
    return "Welcome to love letter!"

if __name__ == '__main__':
    app.run()
