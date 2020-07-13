import Vue from 'vue';
// import App from './App';
import App from './App.vue';

//引入Element-UI
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import router from './router/router.js';
import VueResource from 'vue-resource';



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);

//封装Cookie操作
import {setCookie,getCookie,delCookie} from "./assets/js/Cookie";
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}

//声明请求接口
Vue.prototype.$httpAddress = "http://192.168.19.20:8084";
// Vue.prototype.$httpAddress = "http://192.168.20.20:8080";

//同一内容区高度
Vue.prototype.$height = window.innerHeight - 160 +'px';





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
