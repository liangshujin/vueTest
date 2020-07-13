<template>
  <div class="listBox" :style="height">
    <el-row class="addPart">
      <el-button type="primary" @click="addUserBtn()" :disabled="loading" icon="el-icon-edit" >增加部门</el-button>
    </el-row>
    <el-table :data="tableData" row-key="sortId" border width="100%" default-expand-all v-loading="loading">
      <el-table-column prop="dname"  align="center" label="部门/用户" min-width="100px"></el-table-column>
      <el-table-column prop="departId" align="center" label="部门ID" min-width="100px"></el-table-column>
      <el-table-column prop="" align="center" label="操作" min-width="100px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateVisible = true;handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delVisible = true;handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增部门"
      :visible.sync="addVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="addForm" ref="addForm" :rules="rules" label-width="80px">
        <el-form-item label="部门名称" prop="addDepartName">
          <el-input v-model="addForm.addDepartName" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDepart('addForm')">新增</el-button>
          <el-button @click="addVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="updateVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="upForm" ref="upForm" :rules="upRules">
        <el-form-item label="部门名称" prop="upDepartName">
          <el-input v-model="upForm.upDepartName" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="upDepartData('upForm')">确 定</el-button>
          <el-button @click="updateVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="delVisible"
      width="30%" type="warning"
      :before-close="handleClose">
      <i class="el-icon-warning"></i>
      <span>确定删除部门：{{delName}}？</span>
      <div style="color: #F56C6C;margin: 10px 0 0 18px ">删除部门将同时删除该部门下所有用户！</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            height: {height:''},
            loading:true,
            tableData: [],
            addVisible:false,
            updateVisible:false,
            delVisible:false,
            delName:'',
            delId:'',
            addForm: {
              addDepartName: '',
            },
            rules:{
              addDepartName:[{required: true, message: '请输入部门名称', trigger: 'blur'}]
            },
            upForm: {
              upDepartName: '',
              upDepartId:''
            },
            upRules:{
              upDepartName:[
                {required: true, message: '请输入部门名称', trigger: 'blur'}
              ],
            }

          }
        },
        methods:{
          //点击X号事件
          handleClose(){
            this.addVisible = false;
            this.updateVisible = false;
            this.delVisible = false;
          },
          //新增用户按钮
          addUserBtn(){
            this.addVisible = true;
          },
          //编辑按钮
          handleEdit(index, row) {
            this.upForm.upDepartName = row.dname;
            this.upForm.upDepartId  =row.departId;
            this.oldName = row.dname;
          },
          //删除用户
          handleDelete(index, row) {
            this.delName = row.dname;
            this.delId = row.departId;
          },
          //确认新增用户
          addDepart(addForm){
            this.$refs[addForm].validate((valid) => {
                if (valid) {
                  this.$http.post(
                    this.$httpAddress + '/api/depart/adddepart',
                    {dname:this.addForm.addDepartName},
                    {headers:{"token":this.$cookieStore.getCookie("token")}}
                  ).then((res)=>{
                    if(res.body.success){
                      this.handleClose();
                      this.getdepart();
                      this.successTS("新增成功！");
                      this.$refs[addForm].resetFields();
                    }else{
                      this.errorTS(res.body.msg);
                    }

                  },(res)=>{
                    console.log(res);
                    this.errorTS("操作失败！")
                  })
                }
            })
          },
          // 确认修改
          upDepartData(formVal){
            if(this.oldName == this.upForm.upDepartName){
              this.errorTS("与原部门名称相同！");
              return false;
            }
            this.$refs[formVal].validate((valid) => {
              if (valid) {
                this.$http.post(
                  this.$httpAddress + '/api/depart/updepart',
                  {dname:this.upForm.upDepartName,departId:this.upForm.upDepartId},
                  {headers:{"token":this.$cookieStore.getCookie("token")}}
                ).then((res)=>{
                  if(res.body.success){
                    this.handleClose();
                    this.getdepart();
                    this.successTS("修改成功！");
                    this.$refs[formVal].resetFields();
                  }else{
                    this.errorTS(res.body.msg);
                  }

                },(res)=>{
                  console.log(res);
                  this.errorTS("操作失败！")
                })
              }
            })
          },
          //确认删除用户
          deleteUser(){
            this.$http.post(
              this.$httpAddress+"/api/depart/deldepart",
              { departid:this.delId },
              {headers:{"token":this.$cookieStore.getCookie("token")}}
            ).then( (res) => {
              if(res.body.success){
                this.handleClose();
                this.getdepart();
                this.successTS("部门"+this.delName+"删除成功！");
              }else{
                if(res.body.msg == null){
                  this.errorTS("删除失败！")
                }else{
                  this.errorTS(res.body.msg);
                }
              }
            },(res) =>{
              console.log(res);
              this.errorTS("操作失败！")
            })
          },
          //操作成功提示
          successTS(msg) {
            this.$notify({
              title: '成功',
              message: msg,
              type: 'success'
            });
          },
          //操作失败提示
          errorTS(msg) {
            this.$notify.error({
              title: '错误',
              message: msg
            });
          },
          getdepart(){
            //获取部门列表
            this.$http.get(
              this.$httpAddress+"/api/depart/getdepart",
              {headers:{"token":this.$cookieStore.getCookie("token")}}
            ).then( (res) => {
              this.tableData = res.body;
            },function (res) {
              console.log(res);
            })
          },
        },

        created:function () {
          this.getdepart();
          this.loading = false;
          this.height.height = this.$height;
        }
    }
</script>

<style scoped>
  .addPart{
    margin-bottom: 20px;
  }
</style>
