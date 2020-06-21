import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
