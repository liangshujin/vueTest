<template>
    <div class="loginPage">
      <el-row type="flex" class="row-bg loginCont" justify="center" align="middle">
        <el-col :span="6" class="logoBox">
          <img src="../assets/img/Licence_72.png">
          <p>全球定位目标输入平台</p>
        </el-col>
        <el-col :span="16">
          <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名" @keyup.enter.native= "onSubmit('form')"  prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="userPsw">
              <el-input placeholder="请输入密码" v-model="form.userPsw" @keyup.enter.native= "onSubmit('form')" prefix-icon="el-icon-lock" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')" v-loading.fullscreen.lock="fullscreenLoading">立即登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


    </div>

</template>

<script>
    // import "../assets/css/particles.css"
    export default {
        data() {
            return {
                fullscreenLoading:false,
                dialogVisible: false,
                dialogMsg: "",
                form: {
                  userName: '',
                  userPsw: ''
                },
                rules: {
                  userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                  ],
                  userPsw: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                  ]
                }
            }
        },
        components:{

        },
        methods:{
          onSubmit(form) {
            this.$refs[form].validate((valid) => {
              this.fullscreenLoading = true;
              if (valid) {
                let jsonData = {
                  username:this.form.userName,
                  password:this.form.userPsw,
                  type:"1"
                };
                this.$http.post(
                        this.$httpAddress + '/api/users/login',
                        jsonData
                ).then(function(res){
                  let resData = res.body;
                  this.fullscreenLoading = false;
                  if(resData.success){
                    this.$userConfig.userName = this.form.userName;
                    this.$userConfig.userToken = res.body.token;
                    this.$userConfig.userDepartId = res.body.departId;
                    this.$userConfig.userRank = res.body.rank;
                    this.$router.push('/index');
                  }else{
                    let res = resData.reason;
                    let resMsg = "";
                    switch (res) {
                      case 0 :
                        resMsg = "用户名不存在";
                        break;
                      case 1 :
                        resMsg = "密码错误";
                        this.form.userPsw = "";
                        break;
                      case 2 :
                        resMsg = "当前用户已经登录";
                        break;
                      case 3 :
                        resMsg = "审查员无登录权限！";
                        break;
                      default:
                        resMsg = "登录失败！";
                    }

                    this.$alert( resMsg, '提示', {
                      confirmButtonText: '确定',
                      type:"error"
                    });

                  }
                },function(res){
                  this.fullscreenLoading = false;
                  console.log(res.status);
                });
              } else {
                console.log('error submit!!');
                this.fullscreenLoading = false;
                return false;
              }
            });
          }
        },
        created() {
          /*var count_particles, stats, update;
          stats = new Stats;
          stats.setMode(0);
          stats.domElement.style.position = 'absolute';
          stats.domElement.style.left = '0px';
          stats.domElement.style.top = '0px';
          document.body.appendChild(stats.domElement);
          count_particles = document.querySelector('.js-count-particles');
          update = function() {
            stats.begin();
            stats.end();
            if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
              count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
            }
            requestAnimationFrame(update);
          };
          requestAnimationFrame(update);*/
        }
    }
</script>

<style scoped>
  .loginPage{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    background: #4385f5;
  }
  .loginCont{
    width: 560px;
    height: 244px;
    border-radius: 4px;
    background: #dae7fd;
    margin: 10% auto;
    /*box-shadow: #eee 0px 3px 15px;*/
    border: 1px solid #fff;
  }
  .logoBox img{
    display: block;
    width: 96px;
    height: 96px;
    margin: -40px auto 0;
  }
  .logoBox p{
    font-size: 19px;
    font-weight: bold;
    color: #8F4586;
    margin: 10px auto 0;
    text-align: center;
  }
  .row-bg {
    padding: 17px 10px 0 10px;
    background-color: #FFFFFF;
  }
</style>
