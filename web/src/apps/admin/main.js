// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/less/common.less'
import URLS from '../../assets/js/urls'
import '../../assets/js/axiosConfig'
import {sendAppMountedTj, asyncSendPerformanceTj, APPS} from '../../assets/js/tj'

asyncSendPerformanceTj(APPS.BLOG_ADMIN)

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.mixin({
  data () {
    return {
      URLS
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    sendAppMountedTj({
      now: Date.now(),
      app: APPS.BLOG_ADMIN
    })
  },
})
