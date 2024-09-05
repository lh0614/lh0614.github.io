// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import { autoRem } from '@/space/utils'
import VConsole from 'vconsole'
import { requireVant } from '@/common/vant-require'
requireVant(Vue)
const isDev = process.env.NODE_ENV !== 'production'
if (isDev) {
  new VConsole({ maxLogNumber: 1000 })
}
Es6Promise.polyfill()
Vue.config.productionTip = false
// Vue.config.devtools = isDev

new Vue({
  el: '#app',
  router,
  components: { App },
  mounted() {
    autoRem({
      screenMode: 'portrait',
      baseScreenWidth: 414,
    })
  },
  template: '<App/>',
})
