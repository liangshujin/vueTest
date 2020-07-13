//路由配置
import Vue from 'vue';
import Router from "vue-router";
Vue.use(Router);
//路由配置
const Login = import("../components/Login.vue");
const Index = import("../components/Index.vue");
const UpdataUserPsw = import("../components/UpdataUserPsw.vue");
const UserList = import("../components/UserList.vue");
const CaseList = import("../components/CaseList.vue");
const SystemLog = import("../components/SystemLog.vue");
const Location = import("../components/Location.vue");
const DepartList = import("../components/DepartList.vue");


const route = [
  { path: '/',  redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/index', component: Index ,
      children:[
          {path: '', component: UserList },
          {path: '/upDataUserPsw', component: UpdataUserPsw },
          {path: '/departList', component: DepartList },
          {path: '/userList', component: UserList },
          {path: '/caseList', component: CaseList },
          {path: '/systemLog', component: SystemLog },
          {path: '/location', component: Location },
      ]
  }
]


export default new Router({
    routes: route
});
