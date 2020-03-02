<template>
  <div class="list">
    <h1>账号列表</h1>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
     
    >
      <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="id" width="50">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="账号" width="400">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
     <el-table-column
      label="用户组"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.userGroup }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column label="创建时间" width="400">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id )">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
   <!-- 分页 -->
    <div class="pag">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
  </div>
    <div class="but">
     <el-button @click="dell" type="danger">全部删除</el-button>
    <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      page: 1,//默认页数
      total:null,//数据条数
      page_sizes:[10]//默认条数
    };
  }
  ,methods: {
    toggleSelection(rows) {
      //单选和多选
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }, //表单
    handleEdit(row) {
      //修改
       this.$router.push("/Admin_ed/"+row)
    },
    handleDelete(index,row) {
      //删除
     
      var tab=this;
      this.$axios.get(tab.$url+`/sell/users.php?a=delete&id=${row.id}`).then((res)=>{
           if(res.data.code == "0"){
                tab.$message({
                        message: res.data.msg,
                        type: 'success'
                       });//单个删除成功提示
                tab.$router.push("/admin_list")//跳转到index
              }else{
                tab.$message.error(res.data.msg);
              }
      })
    }, //分页
    handleSizeChange(val) {
      //显示多少条
        this.page_sizes =val
       this.data()
    },
    handleCurrentChange(val) {
      //页数
        this.page =val
       this.data()
    },
    dell(){
        this.$refs.multipleTable.selection.forEach((v)=>{
        
          //全部删除
          var tab=this;
          this.$axios.get(tab.$url+`/sell/users.php?a=delete&id=${v.id}`).then((res)=>{
           if(res.data.code == "0"){
                tab.$message({
                        message: res.data.msg,
                        type: 'success'
                       });//批量删除成功提示
                tab.$router.push("/admin_list")//跳转到index
              }else{
                tab.$message.error(res.data.msg);
              }
      })
        })
    },
    data(){//获取ajax数据
      var tab=this;
      this.$axios.get(tab.$url+`sell/users.php?a=list&currentPage=${tab.page}&pageSize=${tab.page_sizes}`).then((res)=>{
        var data=res.data.data;
        this.tableData=data
        this.total=parseInt(res.data.total)
      })
    }
},created(){
  this.data()
      }
}
</script>

<style>
.list {
  color: #303133;
  background: #fff;
  border-radius: 12px;

}
.list h1 {
  font-size: 24px;
  color: #303133;
  width: 98%;
  line-height: 50px;
  text-align: left;
  padding-left: 30px;
  border-bottom: 2px solid #eff1f7;
 
}
.list.pag {
  line-height: 20px;
}
.list .pag .el-pagination {
  float: left;
  margin-top: 20px;
  margin-left: 30px;
}
.list .pag .el-button {
  float: left;
  margin-top: 20px;
}
.list .cell {
  line-height: 40px !important;
}
.list .el-table{
  padding: 0 30px;
}
.list .but{
  width: 270px;
  height: 50px;
  margin-top: 60px;
}
</style>