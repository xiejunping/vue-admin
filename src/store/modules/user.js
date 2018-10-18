import Model from '@/api'
import Util from '@/common/lib/util'
import { XSRF_COOKIE } from '@/api/config'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: Util.getCookie(XSRF_COOKIE),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      Util.setCookie(XSRF_COOKIE, token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    async handleLogin ({ commit }, {username, password}) {
      username = username.trim()
      const data = await Model.signIn({
        username,
        password
      })
      if (data) commit('setToken', data.token)
      return data
    },
    // 退出登录
    async handleLogOut ({ state, commit }) {
      const data = await Model.signOut()

      if (data) {
        commit('setToken', '')
        commit('setAccess', [])
      }
      return data
    },
    // 获取用户相关信息
    async getUserInfo ({ state, commit }) {
      const data = await Model.prefile()

      if (data) {
        commit('setAvator', data.avator)
        commit('setUserName', data.name)
        commit('setUserId', data.id)
        commit('setAccess', data.roles || [])
        commit('setHasGetInfo', true)
      }
      return data
    }
  }
}
