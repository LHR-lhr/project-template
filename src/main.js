import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { fetch, post, patch, put, get } from './utils/http'

Vue.config.productionTip = false

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$fetch = fetch
Vue.prototype.$put = put
Vue.prototype.$patch = patch

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
