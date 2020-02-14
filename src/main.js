import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import axios  from 'axios'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
