import card from './module/cards'
import room from './module/rooms'
import user from './module/users'

const dispatch = (name, ...params) => {
  _dispatch(card, name, ...params)
  _dispatch(room, name, ...params)
  _dispatch(user, name, ...params)
}

const _dispatch = (module, name, ...params) => {
  if (module.mutations[name]) {
    module.mutations[name](...params)
  }
}

export default {
  card,
  room,
  user,
  dispatch
}
