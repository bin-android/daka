import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

if (!wx.cloud) {
  console.error('请使用 2.2.3 或以上的基础库')
} else {
  wx.cloud.init({
    env: 'cloud1-6gaxy7gsd28dd3f3',
    traceUser: true
  })
}