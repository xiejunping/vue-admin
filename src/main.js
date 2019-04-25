import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'

import Util from '@/common/lib/util'
import Model from '@/api'
import * as Filter from '@/common/lib/filters'
import 'iview/dist/styles/iview.css'
import '@/common/styles/index.styl'
import '@/assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.use(iView)

// 数据请求类 - 工具类
Vue.prototype.fetch = Model
Vue.prototype.util = Util

// 全局过滤器
for (let key in Filter) {
  Vue.filter(key, Filter[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
