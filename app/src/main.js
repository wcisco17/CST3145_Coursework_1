import Vue from 'vue'
import App from './App.vue'
require('bulma/css/bulma.css')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
