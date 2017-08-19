import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store/index'

var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$token=localStorage.token;
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

var Bus=new Vue();
window.Bus=Bus;
export default Bus;