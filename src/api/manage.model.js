import ReqClient from './request.class'

export async function getMenu () {
  const Req = new ReqClient({
    url: '/menu/'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function addMenu (data) {
  const Req = new ReqClient({
    url: '/menu/add',
    method: 'POST',
    data: data
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function editMenu (data) {
  const Req = new ReqClient({
    url: '/menu/edit',
    method: 'PATCH',
    data: data
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function getMenuInfo (id) {
  const Req = new ReqClient({
    url: `/menu/${id}`
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function delMenu (id) {
  const Req = new ReqClient({
    url: `/menu/del/${id}`,
    method: 'DELETE'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function getAccess () {
  const Req = new ReqClient({
    url: '/access/'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function getAccessInfo (id) {
  const Req = new ReqClient({
    url: `/access/${id}`
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function addAccess (params) {
  const Req = new ReqClient({
    url: '/access/add',
    data: params,
    method: 'POST'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function editAccess (data) {
  const Req = new ReqClient({
    url: '/access/edit',
    data: data,
    method: 'PATCH'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}
