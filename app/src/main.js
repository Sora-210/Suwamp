import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.config.productionTip = false

// Install QRCode Reader module
Vue.use(VueQrcodeReader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
