import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import './uni.promisify.adaptor'

Vue.config.productionTip = false

// 注册 uView，全局组件 u-xxx 由 pages.json 的 easycom 自动引入
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
