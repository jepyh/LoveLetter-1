import room from './module/rooms'
import user from './module/players'
import game from './module/games'

const dispatch = (name, ...params) => {
  _dispatch(room, name, ...params)
  _dispatch(user, name, ...params)
  _dispatch(game, name, ...params)
}

const _dispatch = (module, name, ...params) => {
  if (module.mutations[name]) {
    module.mutations[name](...params)
  }
}

export default {
  room,
  user,
  game,
  dispatch
}
