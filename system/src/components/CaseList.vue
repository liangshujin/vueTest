<template>
  <div class="listBox">
    <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        defaultProps: {
          children: 'data',
          label: 'departId'
        },
        tableData:[]
      }
    },
    methods:{
      handleNodeClick(data) {
        console.log(data);
      },
      getcases(){
        this.$http.get(
          this.$httpAddress+"/api/cases/getcases",
          {headers:{"token":this.$cookieStore.getCookie("token")}}
        ).then((res) => {
          this.tableData = res.body;
        },(res) =>{
          console.log(res);
        })
      }
    },
    created:function () {
      this.getcases();
    }
  }
</script>

<style scoped>
  .listBox{
    width: auto;
    height: 100%;
    overflow: hidden;
  }
</style>
