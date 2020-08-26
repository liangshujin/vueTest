<template>
  <div class="systemList" :style="height">
    <!--头部筛选-->
    <template>
      <el-select class="users" v-model="usersVal" placeholder="查询全部用户">
        <el-option
          v-for="item in users"
          :key="item.username"
          :label="item.username"
          :value="item.username">
        </el-option>
      </el-select>
      <el-select class="types" v-model="typesVal" placeholder="全部操作">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        class="times"
        v-model="timeVal"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span class="">详情：</span>
      <el-input class="detail" v-model="input" placeholder="查找字符串被包含的记录"></el-input>
      <el-select v-model="sortTypeVal" class="sort" placeholder="排序">
        <el-option
          v-for="item in sortType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="sortVal" class="sort" placeholder="排序">
        <el-option
          v-for="item in sort"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchBtn()">搜索</el-button>
    </template>
    <template>
      <el-table border :data="tableData" fit height="665" class="tableList">
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop='type' label="操作类型"></el-table-column>
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="detail" label="详情" width="850"></el-table-column>
      </el-table>
      <!--分页-->
      <div class="pageBox">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="prevClick"
          @next-click="nextClick"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100, 200]"
          :page-size="pageSize"
          layout="sizes, total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </template>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        height: {height:''},
        usersVal: '',
        typesVal: '',
        timeVal: [],
        sortTypeVal:'time',
        sortVal: 'DESC',
        input:'',
        tableData:[],
        total:0,
        pageSize:20,
        pageStart:0,
        currentPage: 1,
        users: [],
        types: [{
          text: '全部操作',
          value: ''
        },{
          text: '登录',
          value: 1
        },{
          text: '登出',
          value: 2
        },{
          text: '增加案件',
          value: 3
        },{
          text: '删除案件',
          value: 4
        },{
          text: '修改案件',
          value: 5
        },{
          text: '增加被定位人',
          value: 6
        },{
          text: '删除被定位人',
          value: 7
        },{
          text: '修改被定位人',
          value: 8
        },{
          text: '实时定位业务',
          value: 10
        },{
          text: '大数据查询业务',
          value: 11
        },{
          text: '外网添加用户',
          value: 12
        },{
          text: '外网删除用户',
          value: 13
        },{
          text: '外网修改用户',
          value: 14
        },{
          text: '定位触发登录',
          value: 15
        },{
          text: '定位触发登出',
          value: 16
        },{
          text: '内网添加用户',
          value: 17
        },{
          text: '内网删除用户',
          value: 18
        },{
          text: '内网修改用户',
          value: 19
        },{
          text: '增加部门',
          value: 20
        },{
          text: '删除部门',
          value: 21
        },{
          text: '修改部门',
          value: 22
        }],
        sortType:[{
          value: 'time',
          label: '时间'
        }],
        sort:[
          {
            value: 'ASC',
            label: '正序'
          }, {
            value: 'DESC',
            label: '倒序'
          }],
      }
    },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val;
        this.getoperalog();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getoperalog();
      },
      prevClick(){
        if(this.pageStart != 0){
          this.pageStart = this.pageStart - 10;
        }
      },
      nextClick(){
          this.pageStart = this.pageStart + 10;
      },
      getusers(){
        //获取用户列表
        this.$http.get(
          this.$httpAddress+"/api/users/getusers",
          {headers:{"token":this.$cookieStore.getCookie("token")}}
        ).then( (res) => {
          if(res.ok){
            let userName = this.$cookieStore.getCookie("userName");
            this.users = res.body.data;
            res.body.data.unshift({username: '查询全部用户', value: ''}, {username: 'admin', value: 'admin'})
            if(userName == "kmd" || userName=="KMD"){
              res.body.data.unshift({username: 'kmd', value: 'kmd'})
            }
          }
        },function (res) {
          console.log(res);
        })
      },
      getoperalog(){
        if(this.usersVal == ""){
          this.usersVal = this.$cookieStore.getCookie("userName")
        }
        let startTime = this.getLocalTime(new Date(this.timeVal[0]));
        let endTime = this.getLocalTime(new Date(this.timeVal[1]));
        //获取系统日志列表
        this.$http.post(
          this.$httpAddress+"/api/opera/getoperalog",
          {
            page: this.currentPage,
            start: this.pageStart,
            limit: this.pageSize,
            username: this.usersVal,
            type:this.typesVal,
            queryStartTime: startTime,
            queryEndTime: endTime,
            sortProperty: this.sortTypeVal,
            sortDirection: this.sortVal,
            filterProperty: 'detail',
            filterValue:this.input,
          },
          {headers:{"token":this.$cookieStore.getCookie("token")}}
        ).then( (res) => {
          if(res.ok){
            let data = res.body.data;
            for (let i = 0; i < data.length; i++){
              data[i].type = this.typesList(data[i].type);
            }
            this.tableData = data;
            this.total = res.body.totalCount;
          }
        },function (res) {
          console.log(res);
        })
      },

      typesList(val){
        var v = val;
        switch (val) {
          case 1:
            v = "登录";
            break;
          case 2:
            v = "登出";
            break;
          case 3:
            v = "增加案件";
            break;
          case 4:
            v = "删除案件";
            break;
          case 5:
            v = "修改案件";
            break;
          case 6:
            v = "增加被定位人";
            break;
          case 7:
            v = "删除被定位人";
            break;
          case 8:
            v = "修改被定位人";
            break;
          case 9:
            v = "查看定位显示";
            break;
          case 10:
            v = "实时位置查询";
            break;
          case 11:
            v = "大数据位置查询";
            break;
          case 12:
            v = "外网添加用户";
            break;
          case 13:
            v = "外网删除用户";
            break;
          case 14:
            v = "外网修改用户";
            break;
          case 15:
            v = "定位触发登录";
            break;
          case 16:
            v = "定位触发登出";
            break;
          case 17:
            v = "内网添加用户";
            break;
          case 18:
            v = "内网删除用户";
            break;
          case 19:
            v = "内网修改用户";
            break;
          case 20:
            v = "增加部门";
            break;
          case 21:
            v = "删除部门";
            break;
          case 22:
            v = "修改部门";
            break;
        }
        return v;
      },

      searchBtn(){
        this.getoperalog()
      },
      getLocalTime(now) {
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
      },

  },
    created:function () {
      // 设置默认选中时间当天0:00:00~23:59：59
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      this.timeVal = [startDate.valueOf(), endDate.valueOf()];

      this.getusers();
      this.getoperalog();

      this.height.height = this.$height;
    }
  }
</script>

<style scoped>
.tableList{
  width: 100%;
  margin-top: 20px;
}
.detail{
  width: 200px;
}
.sort{
  width: 160px;
}
.pageBox{
  margin: 20px 0;
}
</style>
