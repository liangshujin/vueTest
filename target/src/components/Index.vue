<template>
  <el-container>
    <el-header class="header">
      <div class="logoName">全球移动定位目标输入</div>
      <div class="navBox">
        <el-menu :default-active="activeIndex" router="router" class="navCont" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item class="navList" index="/upDataUserPsw">登录密码修改</el-menu-item>
          <el-menu-item class="navList" index="/userList">用户管理</el-menu-item>
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
    initWebSocket(){ //初始化weosocket
      const wsurl = this.$webSocketAddress;
      if(typeof(WebSocket) === "undefined"){
        this.$alert( "您的浏览器不支持socket", '提示', {
          confirmButtonText: '确定',
          type:"error"
        });
      }else{
        this.websock = new WebSocket(wsurl);
        this.websock.onopen = this.wsoOpen;
        this.websock.onmessage = this.wsMessage;
        this.websock.onerror = this.wsError;
        this.websock.onclose = this.wsClose;
      }

    },
    wsoOpen(){ //连接建立之后执行send方法发送数据
      //链接成功后，发送token
      let token = {};
      let content = { token: this.$userConfig.userToken };
      token.type = "xyz_sync";
      token.content = JSON.stringify(content);
      this.wsSend(JSON.stringify(token));
      this.startHeart();
    },
    wsError(){//连接建立失败重连
      this.initWebSocket();
    },
    wsMessage(e){ //数据接收
      let wsMsg = e.data;
      // let redata = JSON.parse();
      if(wsMsg != "ok"){
        this.$alert( "WebSocket以断开连接", '提示', {
          confirmButtonText: '确定',
          type:"error"
        });
      }
    },
    wsSend(Data){//数据发送
      this.websock.send(Data);
    },
    wsClose(e){  //关闭
      console.log('断开连接',e);
      this.onSignOut();
    },
    startHeart() {
      // 发送心跳
      clearInterval(this.timeoutObj)
      this.timeoutObj = setInterval(() => {
        this.wsSend("ok");
      }, 2000)
    },
    onSignOut(){
      let jsonData = {
        username:this.$userConfig.userName
      };
      this.$http.post(
        this.$httpAddress + '/api/users/exituser',
        jsonData,
        {headers:{"token":this.$userConfig.userToken}}
        ).then(
function(res){
            if(res.body.success){
              this.$userConfig.userToken = "";
              this.$userConfig.userName = "";
              this.$userConfig.userRank = "";
              this.wsClose();
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
    let token = this.$userConfig.userToken;
    if(token == undefined || token==null || token == ""){
      this.$router.push('/login');
    }
  },
  created:function () {
    this.height.height = window.innerHeight - 120 +'px';
    let userPower = this.$userConfig.userDepartId;
    if(Number(userPower) == 0 || Number(userPower) == -1){
      this.userAdmin = true;
    }
    this.userName = this.$userConfig.userName;
    if (this.$route.path != "/index"){
      this.activeIndex = this.$route.path;
    }
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
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
