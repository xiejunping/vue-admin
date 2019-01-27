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

export async function delAccess (id) {
  const Req = new ReqClient({
    url: `/access/del/${id}`,
    method: 'DELETE'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

/* 用户组接口汇集 */
export async function getGroup () {
  const Req = new ReqClient({
    url: '/dept/'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function getGroupInfo (id) {
  const Req = new ReqClient({
    url: `/dept/${id}`
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function addGroup (params) {
  const Req = new ReqClient({
    url: '/dept/add',
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

export async function editGroup (data) {
  const Req = new ReqClient({
    url: '/dept/edit',
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

export async function delGroup (id) {
  const Req = new ReqClient({
    url: `/dept/del/${id}`,
    method: 'DELETE'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}
/* 用户组 End */

/* 角色接口汇集 */
export async function getRole (params) {
  const Req = new ReqClient({
    url: '/role/',
    params
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function getRoleInfo (id) {
  const Req = new ReqClient({
    url: `/role/${id}`
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}

export async function addRole (params) {
  const Req = new ReqClient({
    url: '/role/add',
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

export async function editRole (data) {
  const Req = new ReqClient({
    url: '/role/edit',
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

export async function delRole (id) {
  const Req = new ReqClient({
    url: `/role/del/${id}`,
    method: 'DELETE'
  })
  try {
    return await Req.reqData()
  } catch (e) {
    Req.handleError(e)
    return false
  }
}
/* 角色 End */
