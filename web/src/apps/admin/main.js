// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/less/common.less'
import URLS from '../../assets/js/urls'
import '../../assets/js/axiosConfig'
import {sendAppMountedTj, asyncSendPerformanceTj, APPS} from '../../assets/js/tj'
import {initGlobal} from '../../assets/js/global'

process.env.NODE_ENV === 'production' && asyncSendPerformanceTj(APPS.BLOG_ADMIN)

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.mixin({
  data () {
    return {
      URLS
    }
  }
})

initGlobal({
  router,
  URLS,
  isHashMode: router.mode === 'hash'// Maybe occur to fallback to hash;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    process.env.NODE_ENV === 'production' && sendAppMountedTj({
      now: Date.now(),
      app: APPS.BLOG_ADMIN
    })
  },
})
