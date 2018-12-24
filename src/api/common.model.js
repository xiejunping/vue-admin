import ReqClient from './request.class'

const authMenu = async () => {
  const Req = new ReqClient({
    url: '/auth/menu'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
  }
}

export default { authMenu }
