import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/js/rem'
import './assets/less/public.less'

import axios from 'axios'
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.$axios = axios;



import Navigation from 'vue-navigation'
Vue.use(Navigation, {
  router
})


// 引入VueLazyload插件
import VueLazyload from 'vue-lazyload'
// 将一张loading图片加载进来
import loading from './common/imgs/loading.gif'


// 引入fastclick并绑定到body 解决移动端点击响应延迟0.3s的问题
import FastClick from 'fastclick'
import './filters'

// 注冊全局组件标签
import {Button} from 'mint-ui'
Vue.component(Button.name, Button) // <mt-button>
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker)


FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
