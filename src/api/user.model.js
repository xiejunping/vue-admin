import ReqClient from './request.class'
import {handleError} from './handle'

export async function getUserList() {
  const Req = new ReqClient({
    url: '',
    data: params
  })
  try {
    return await Req.reqData()
  } catch (e) {
    handleError(e)
  }
}
