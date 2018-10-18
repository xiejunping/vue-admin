import ReqClient from './request.class'

const signIn = async (params) => {
  const Req = new ReqClient({
    url: '/user/login',
    data: params,
    method: 'POST'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
  }
}

const signOut = async () => {
  const Req = new ReqClient({
    url: '/user/logout'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
  }
}

const prefile = async () => {
  const Req = new ReqClient({
    url: '/user/info'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
  }
}

const getUserList = async (params) => {
  const Req = new ReqClient({
    url: '',
    data: params
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
  }
}

export default { signIn, signOut, prefile, getUserList }
