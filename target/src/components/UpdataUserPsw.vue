<template>
  <div class="pswBox" :style="height">
    <el-row>
      <el-col :span="5">
        <div class="">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="旧密码" prop="oldPsw">
              <el-input v-model="form.oldPsw" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPsw">
              <el-input v-model="form.newPsw" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="yesPsw">
              <el-input v-model="form.yesPsw" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          height: {height:''},
          form: {
            oldPsw: '',
            newPsw: '',
            yesPsw: ''
          },
          rules: {
            oldPsw: [
              { required: true, message: '请输入旧密码', trigger: 'blur' },
            ],
            newPsw: [
              { required: true, message: '请输入新密码', trigger: 'blur' }
            ],
            yesPsw: [
              { required: true, message: '请确认密码', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
              var jsonData = {
                newPassword: this.form.newPsw,
                password: this.form.oldPsw,
                username: this.$userCofig.userName
              };
              this.$http.post(this.$httpAddress+"/api/users/updateuserall",jsonData).then(function (res) {
                  console.log(res)
              },function (res) {
                  console.log(res)
              })
            }else{
              console.log('error submit!!');
              return false;
            }

          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.pswBox{
  width: auto;
  height: 100%;
  padding: 20px;
  overflow: hidden;
}
</style>
