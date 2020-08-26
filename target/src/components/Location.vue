<template>
  <div class="location" :style="height">

    <el-row :gutter="20">
      <el-col :span="6" :offset="8">
        <div class="locIptCon">
          <el-tabs type="border-card" :stretch=true >
            <el-tab-pane label="实时定位">
              <el-form ref="oneForm" :model="form.one" status-icon :rules="rules.one" label-width="100px" size="small">
                <el-form-item label="手机号码" prop="phone">
                  <el-col :span="24"><el-input v-model="form.one.phone" placeholder="请输入手机号码"></el-input></el-col>
                </el-form-item>
                <el-form-item label="IMSI" prop="imsi">
                  <el-col :span="24"><el-input v-model="form.one.imsi" placeholder="请输入IMSI号"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24">
                    <el-button type="primary" @click="onSubmit('oneForm')" :disabled="!form.one.phone">发送定位请求</el-button>
                    <el-button @click="resetForm('oneForm')" :disabled="!form.one.phone">重置</el-button>
                  </el-col>

                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="大数据定位">
              <el-form ref="allForm" :model="form.all" status-icon :rules="rules.all" label-width="100px" size="small" label-position="right" >
                <el-form-item label="手机号码" prop="phone">
                  <el-col :span="24"><el-input v-model="form.all.phone" placeholder="请输入手机号码"></el-input></el-col>
                </el-form-item>
                <el-form-item label="IMSI" prop="imsi">
                  <el-col :span="24"><el-input v-model="form.all.imsi" placeholder="请输入IMSI"></el-input></el-col>
                </el-form-item>
                <el-form-item label="起始时间" required>
                  <el-col :span="11">
                    <el-form-item prop="date1" style="margin-bottom: 0;margin-left: 0">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.all.startDate1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2" style="margin-bottom: 0;" >
                      <el-time-picker placeholder="选择时间" v-model="form.all.startDate2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="截止时间" required>
                  <el-col :span="11">
                    <el-form-item prop="date1" style="margin-bottom: 0;">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.all.endData1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2" style="margin-bottom: 0;">
                      <el-time-picker placeholder="选择时间" v-model="form.all.endData2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24">
                    <el-button type="primary" @click="onSubmit('allForm')"  :disabled="!form.all.imsi">发送定位请求</el-button>
                    <el-button @click="resetForm('allForm')"  :disabled="!form.all.imsi">重置</el-button>
                  </el-col>

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
            submitBtn:true,
            resetBtn:true,
          },
          all:{
            phone: '',
            imsi: '',
            startDate1: '',
            startDate2: '',
            endData1: '',
            endData2: '',
            submitBtn:true,
            resetBtn:true,
          }
        },
        rules: {
          one:{
            phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
            ],
            imsi: [
              { required: false, message: '请输入IMSI', trigger: 'blur' }
            ]
          },
          all:{
            phone: [
              { required: false, message: '请输入手机号码', trigger: 'blur' },
            ],
            imsi: [
              { required: true, message: '请输入IMSI', trigger: 'blur' }
            ],
            startDate1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            startDate2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            endDate1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            endDate2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ]
          }

        }
      }
    },
    methods:{
      onSubmit(formName){
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName === "oneForm"){
              this.form.one.submitBtn = false;
              this.form.one.resetBtn = false;
            }else{
              this.form.all.submitBtn = false;
              this.form.all.resetBtn = false;
            }
          }else{
            console.log('error submit!!');
            return false;
          }

        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
    overflow: hidden;
  }
  .locIptCon{
    margin-top: 20px;
  }

</style>
