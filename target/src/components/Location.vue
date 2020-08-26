<template>
  <div class="location" :style="height">

    <el-row :gutter="20">
      <el-col :span="6" :offset="8">
        <div class="locIptCon">
          <el-tabs type="border-card" stretch={{true}} >
            <el-tab-pane label="实时定位">
              <el-form ref="oneForm" :model="form.one" status-icon :rules="rules.one" label-width="80px" size="small">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="form.one.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="IMSI" prop="IMSI">
                  <el-input v-model="form.one.imsi" placeholder="请输入IMSI"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('oneForm')">发送定位请求</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="大数据定位">
              <el-form ref="oneForm" :model="form.one" status-icon :rules="rules.one" label-width="80px" size="small">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="form.one.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="IMSI" prop="IMSI">
                  <el-input v-model="form.one.imsi" placeholder="请输入IMSI"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('oneForm')">发送定位请求</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        height: {height:''},
        form: {
          one:{
            phone: '',
            imsi: '',
          },
          all:{
            phone: '',
            imsi: '',
          }
        },
        rules: {
          one:{
            phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
            ],
            imsi: [
              { required: true, message: '请输入IMSI', trigger: 'blur' }
            ]
          },
          all:{
            phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },

            ],
            imsi: [
              { required: true, message: '请输入IMSI', trigger: 'blur' }
            ]
          }

        }
      }
    },
    methods:{
      onSubmit(formName){
        console.log(formName)
        /*this.$refs[formName].validate((valid) => {
          if (valid) {

          }else{
            console.log('error submit!!');
            return false;
          }

        })*/
      }
    },
    created() {
      this.height.height = window.innerHeight - 120 +'px';
    }
  }
</script>

<style scoped>
  .location{
    width: 100%;
    height: 100%;
    background: url("../assets/img/timg.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .locIptCon{
    margin-top: 20px;
  }
.grid-content{
  height: 10px;
}
</style>
