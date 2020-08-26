<template>
  <el-container>
    <el-header class="header">
      <div class="logoName">全球移动定位服务平台</div>
      <div class="navBox">
        <el-menu :default-active="activeIndex" router="router" class="navCont" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item class="navList" index="/upDataUserPsw">登录密码修改</el-menu-item>
          <el-menu-item class="navList" index="/departList">部门管理</el-menu-item>
          <el-menu-item class="navList" index="/userList">用户管理</el-menu-item>
          <el-menu-item class="navList" v-if="userAdmin" index="/systemLog">系统审计</el-menu-item>
          <el-menu-item class="navList" index="/caseList">案件管理</el-menu-item>
          <el-menu-item class="navList" index="/location">定位显示</el-menu-item>
        </el-menu>
      </div>
      <p class="signBox"><span>{{userName}}</span><el-button type="warning" size="mini" class="signOut" @click="onSignOut()">退出登录</el-button></p>
    </el-header>
    <el-main :style="height">
      <div class="contBox">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="24">
          北京和峰科技有限公司 版权所有 京ICP备18007772号
          Copyright © 2017 和峰科技 版权所有
        </el-col>
      </el-row>
    </el-footer>
  </el-container>

  <!--<div class="hello">
    <el-row>
      <el-col :span="24">
        <div class="topBox">
          <div class="logoName">全球移动定位服务平台</div>
          <p><span>{{userName}}</span><el-button type="warning" size="mini" class="signOut" @click="onSignOut()">退出登录</el-button></p>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="navBox">
          <el-menu :default-active="activeIndex" router="router" class="navCont" mode="horizontal">
            <el-menu-item class="navList" index="/upDataUserPsw">登录密码修改</el-menu-item>
            <el-menu-item class="navList" index="/departList">部门管理</el-menu-item>
            <el-menu-item class="navList" index="/userList">用户管理</el-menu-item>
            <el-menu-item class="navList" v-if="userAdmin" index="/systemLog">系统审计</el-menu-item>
            <el-menu-item class="navList" index="/caseList">案件管理</el-menu-item>
            <el-menu-item class="navList" index="/location">定位显示</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="contBox">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>-->
</template>

<script>
export default {
  data () {
    return {
      height: {height:''},
      router :true,
      userAdmin : false,
      activeIndex: '/userList',
      userName: 'userName'
    }
  },
  methods:{
    onSignOut(){
      var jsonData = {
        username:this.$cookieStore.getCookie("userName")
      };
      this.$http.post(this.$httpAddress + '/api/users/exituser',jsonData,
        {headers:{"token":this.$cookieStore.getCookie("token")}}).then(function(res){
        if(res.body.success){
          this.$cookieStore.delCookie("userName");
          this.$cookieStore.delCookie("token");
          this.$router.push('/login');
        }else{
          alert("退出失败！请重试")
        }
      },function(res){
        console.log(res);
      });

    }
  },
  beforeCreate(){
    let token = this.$cookieStore.getCookie("token");

    if(token == undefined || token==null || token == ""){
      this.$router.push('/login');
    }
  },
  created:function () {
    this.height.height = window.innerHeight - 120 +'px';
    let userPower = this.$cookieStore.getCookie("departId");
    if(Number(userPower) == 0 || Number(userPower) == -1){
      this.userAdmin = true;
    }
    this.userName = this.$cookieStore.getCookie("userName");
    if (this.$route.path != "/index"){
      this.activeIndex = this.$route.path;
    }
  }
}
</script>

<style scoped>
  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .logoName{
    width: auto;
    height: 100%;
    float: left;
    line-height: 60px;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
  }

  .navBox{
    float: left;
    height: 100%;
    width: auto;
    margin-left: 20px;
    overflow: hidden;
  }

  /*.contBox{
    width: 100%;
    height: auto;
    overflow: hidden;
  }*/

.header{
  background: #545c64;
}
.signBox{
  float: right;
  margin: 0 0;
  line-height: 60px;
  color: #FFFFFF;
}
.signBox p span{
  line-height: 34px;
  float: left;
}
.signBox .signOut{
  margin: 0 0px 0 30px;
}
.el-main{
  padding: 20px;
}
.el-header,.el-footer{
  padding: 0 20px;
}
.el-footer {
  background-color: #545c64;
  color: #EBEEF5;
  text-align: center;
  line-height: 60px;
}

</style>
