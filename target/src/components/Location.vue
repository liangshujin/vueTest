<template>
  <div class="location">

    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8">
        <div>
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        msg:"asdfasdf"
      }
    }
  }
</script>

<style scoped>
  .el-main{
    padding: 0;
  }
  .location{
    width: 100%;
    height: 100%;
    background: url("../assets/img/timg.jpg") no-repeat;
    background-size: auto ;
  }
.grid-content{
  height: 10px;
}
</style>
