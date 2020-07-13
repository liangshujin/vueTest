<template>
  <div class="listBox" :style="height">
      <el-row class="addPart">
        <el-button type="primary" @click="addUserBtn()" :disabled="loading" icon="el-icon-edit">增加用户</el-button>
      </el-row>
      <el-table :data="tableData" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="sortId"
                border width="100%" height="720" default-expand-all v-loading="loading">
        <el-table-column prop="username"  align="center" label="部门/用户" min-width="100px"></el-table-column>
        <el-table-column label="用户权限" align="center" min-width="400px">
          <el-table-column prop="province" align="center" label="查看案件" min-width="100px">
            <el-checkbox label="" name="1" checked></el-checkbox>
          </el-table-column>
          <el-table-column prop="city" align="center" label="增删改查案件"  min-width="100px">
            <el-checkbox label="" name="2"  checked></el-checkbox>
          </el-table-column>
          <el-table-column prop="address" align="center" label="查看用户"  min-width="100px">
            <el-checkbox label="" name="3"  checked></el-checkbox>
          </el-table-column>
          <el-table-column prop="zip" align="center" label="增删改查用户"  min-width="100px">
            <el-checkbox label="" name="4"  checked></el-checkbox>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="time" align="center" label="创建时间" min-width="100px"></el-table-column>
        <el-table-column prop="" align="center" label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
      title="新增用户"
      :visible.sync="addVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="addForm" ref="addForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="addUserName">
          <el-input v-model="addForm.addUserName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="addUserPsw">
          <el-input v-model="addForm.addUserPsw" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="depart">
          <el-select v-model="addForm.addDepart" placeholder="请选择活动区域">
            <el-option
               v-for="item in depart"
               :key="item.departId"
               :label="item.dname"
               :value="item.departId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户权限" prop="addUserT">
          <el-checkbox-group v-model="addForm.addUserT" >
            <el-checkbox label="查看案件" name="type"></el-checkbox>
            <el-checkbox label="增删改查案件" name="type"></el-checkbox>
            <el-checkbox label="查看用户" name="type"></el-checkbox>
            <el-checkbox label="增删改查用户" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser('addForm')">新增</el-button>
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
          <el-form-item label="用户名" prop="upUserName">
            <el-input v-model="upForm.upUserName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="upUserData('upForm')">确 定</el-button>
            <el-button @click="updateVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
        title="删除"
        :visible.sync="delVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定删除用户：{{delName}}</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleltUser()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        height: {height:''},
        loading:true,
        checked:false,
        tableData: [],
        depart:[],
        users:[],
        addVisible:false,
        updateVisible:false,
        delVisible:false,
        oldName:"",
        delName:"",
        addForm: {
          addUserName: '',
          addUserPsw:'',
          addUserT:[],
          addDepart:'',
        },
        rules:{
          addUserName:[{required: true, message: '请输入用户名', trigger: 'blur'}],
          addUserPsw:[{required: true, message: '请输入密码', trigger: 'blur'}],
          addDepart:[{required: true, message: '请选择部门', trigger: 'change'}],
          addUserT:[{type: 'array', required: true, message: '请至少选择一中权限', trigger: 'change' }],
        },
        upForm: {
          upUserName: '',
        },
        upRules:{
          upUserName:[
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
        }

      }
    },
    methods: {
      //点击X号事件
      handleClose(){
        this.addVisible = false;
        this.updateVisible = false;
        this.delVisible = false;
      },
      //新增用户按钮
      addUserBtn(){
        this.getdepart();
        this.addForm.addDepart = Number(this.$cookieStore.getCookie("departId"));
        this.addVisible = true;
      },
      //编辑按钮
      handleEdit(index, row) {
        this.upForm.upUserName = row.username;
        this.oldName = row.username;
        this.updateVisible = true;
      },
      //删除用户
      handleDelete(index, row) {
        this.delName = row.username;
        this.delVisible = true;
      },
      //确认新增用户
      addUser(addForm){
        this.$refs[addForm].validate((valid) => {
          if (valid) {
            let jsonData = [{
              username:this.addForm.addUserName,
              password:this.addForm.addUserPsw,
              rank:[],
              departId:this.addForm.addDepart
            }];
            for (let i = 0; i < this.addForm.addUserT.length; i++){
              switch (this.addForm.addUserT[i]) {
                case "查看案件":
                  jsonData[0].rank.push(1);
                  break;
                case "增删改查案件":
                  jsonData[0].rank.push(2);
                  break;
                case "查看用户":
                  jsonData[0].rank.push(3);
                  break;
                case "增删改查用户":
                  jsonData[0].rank.push(4);
                  break;
              }
            }

            this.$http.post(
              this.$httpAddress+"/api/users/adduser",
              jsonData,
              {headers:{"token":this.$cookieStore.getCookie("token")}}
            ).then( (res) => {
              if(res.body.success){
                this.handleClose();
                this.getusers();
                this.successTS("修改成功！");
                this.$refs[addForm].resetFields();
              }else{
                this.errorTS(res.body.msg)
              }
            },(res) =>{
              console.log(res);
              this.errorTS("操作失败！")
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 确认修改
      upUserData(formVal){
        if(this.oldName == this.upForm.upUserName){
          this.errorTS("与原用户名相同！");
          return false;
        }
        this.$refs[formVal].validate((valid) => {
            if (valid) {
              this.$http.post(
                this.$httpAddress+"/api/users/updateuser",
                {username:this.oldName,other:[{field:"username",value:this.upForm.upUserName }]},
                {headers:{"token":this.$cookieStore.getCookie("token")}}
              ).then( (res) => {
                if(res.body.success){
                  this.handleClose();
                  this.getusers();
                  this.successTS("修改成功！")
                }else{
                  this.errorTS("操作失败！")
                }
              },(res) =>{
                console.log(res);
                this.errorTS("操作失败！")
              })
            }else {
              this.errorTS("操作失败！")
            }
        })
      },
      //确认删除用户
      deleltUser(){
        this.$http.post(
          this.$httpAddress+"/api/users/deluser",
          [{username:this.delName}],
          {headers:{"token":this.$cookieStore.getCookie("token")}}
        ).then( (res) => {
          if(res.body.success){
            this.handleClose();
            this.getusers();
            this.successTS("用户"+this.delName+"删除成功！")
          }else{
            this.errorTS("操作失败！")
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
      getusers(){
        //获取用户列表
        this.$http.get(
          this.$httpAddress+"/api/users/getusers?_dc=1589871601935",
          {headers:{"token":this.$cookieStore.getCookie("token")}}
        ).then( (res) => {
          if(res.ok){
            this.tableData = res.body.data;
          }else{
            this.errorTS("操作失败！")
          }
        },(res) =>{
          console.log(res);
        })
      },
      getdepart(){
        //获取部门列表
        this.$http.get(
          this.$httpAddress+"/api/depart/getdepart",
          {headers:{"token":this.$cookieStore.getCookie("token")}}
        ).then( (res) => {
          this.depart = res.body;
        },function (res) {
          console.log(res);
        })
      }
    },
    created:function () {
      //获取用户列表
      this.getusers()
      //获取部门
      this.getdepart()

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
