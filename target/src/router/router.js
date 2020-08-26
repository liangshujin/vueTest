// import VueRouter from "vue-router";
import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

//路由配置
import Login from "../components/Login.vue";
import Index from "../components/Index.vue";
import UpdataUserPsw from "../components/UpdataUserPsw.vue";
import UserList from "../components/UserList.vue";
import Location from "../components/Location.vue";

const routes = [
    { path: '*',  redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/index', component: Index ,children:[
        {path: '', component: UserList },
        {path: '/upDataUserPsw', component: UpdataUserPsw },
        {path: '/userList', component: UserList },
        {path: '/location', component: Location },
    ]}
]

const router = new VueRouter({
    // mode: 'history',
    routes // (缩写) 相当于 routes: routes
})

export default router;
