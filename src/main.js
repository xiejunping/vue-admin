import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'

import Model from '@/api'
import * as Filter from '@/common/lib/filters'
import * as Util from '@/common/lib/util'
import 'iview/dist/styles/iview.css'
import '@/assets/font/iconfont.css'
import '@/common/styles/index'

Vue.config.productionTip = false
Vue.use(iView)

// 数据请求类 - 工具类
Vue.prototype.fetch = Model
Vue.prototype.utils = Util

// 全局过滤器
for (let key in Filter) {
  Vue.filter(key, Filter[key])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
