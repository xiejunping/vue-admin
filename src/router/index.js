import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import Util from '@/common/lib/util'
import {routers} from './router'

Vue.use(Router)

const router = new Router({
  routes: routers
})

// 路由配置
export default router

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  next()
  // next({
  //   name: 'login'
  // })
})

router.afterEach(to => {
  // Util.openNewPage(router.app, to.name, to.params, to.query);
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
