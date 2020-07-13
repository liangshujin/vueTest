import Vue from 'vue';
//引入Element-UI
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import App from './App';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

//封装Cookie操作
import {setCookie,getCookie,delCookie} from "./assets/js/Cookie";
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}

//声明请求接口
Vue.prototype.$httpAddress = "http://192.168.19.20:8084";
// Vue.prototype.$httpAddress = "http://192.168.20.20:8080";

//同一内容区高度
Vue.prototype.$height = window.innerHeight - 160 +'px';

//创建组件
import Login from "../src/components/Login.vue";
import Index from "../src/components/Index.vue";
import UpdataUserPsw from "../src/components/UpdataUserPsw.vue";
import UserList from "../src/components/UserList.vue";
import CaseList from "../src/components/CaseList.vue";
import SystemLog from "../src/components/SystemLog.vue";
import Location from "../src/components/Location.vue";
import DepartList from "./components/DepartList";


//配置路由
const routes = [
  { path: '*',  redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/index', component: Index ,children:[
      {path: '', component: UserList },
      {path: '/upDataUserPsw', component: UpdataUserPsw },
      {path: '/departList', component: DepartList },
      {path: '/userList', component: UserList },
      {path: '/caseList', component: CaseList },
      {path: '/systemLog', component: SystemLog },
      {path: '/location', component: Location },
    ]}
]

//实例化路由
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
