import common from './common.model'
import user from './user.model'
// import manage from './manage'
// import chat from './chat'
// import open from './open'

let model

model = Object.assign({}, model, common)
model = Object.assign({}, model, user)
// model = Object.assign({}, model, manage)
// model = Object.assign({}, model, chat)
// model = Object.assign({}, model, open)

export default model
