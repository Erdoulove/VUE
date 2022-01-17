import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import axios from "axios";

Vue.config.productionTip = false
// Vue.forceUpdate()

axios.defaults.baseURL = 'http://192.168.2.10:5000/'

new Vue({
  render: h => h(App),
}).$mount('#app')
