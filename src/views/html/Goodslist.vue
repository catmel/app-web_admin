<template>
<div class="goodslist">
<el-table :data="tableData" style="width: 100%">
    <el-table-column label="商品ID" width="400">
      <template slot-scope="scope">
        <i class="el-icon-arrow-right"></i>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品图片" width="400">
      <template slot-scope="scope">
        <img :src="scope.row.imgUrl" width="80" height="80">
      </template>
    </el-table-column>
    <el-table-column label="商品名称" width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.goodsname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="描述" width="400">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.goodsdesc}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope" width="400">
        <el-button size="mini" @click="handleEdit( scope.row.id)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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

</div>
  

</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: 1,//默认页数
      total:null,//数据条数
      page_sizes:[10]//默认条数
    };
  },
  methods: {
    handleEdit( id) {
      console.log(id);
    },
    handleDelete( id) {
      var tab=this;

      this.$axios.get(tab.$url+`sell/goods.php?a=delete&id=${parseInt(id)}`).then((res)=>{
     if(res.data.code == "0"){
                tab.$message({
                        message: res.data.msg,
                        type: 'success'
                       });//单个删除成功提示
                tab.$router.push("/Goodslist")//跳转到index
              }else{
                tab.$message.error(res.data.msg);
              }
       
       
      })
      
    },
      handleSizeChange(val) {
        this.page_sizes =val
        this.data()
      },
      handleCurrentChange(val) {
        this.page =val
        this.data()
      }, 
      data(){//获取ajax数据
      var tab=this;
      this.$axios.get(tab.$url+`/sell/goods.php?a=list&currentPage=${tab.page}&pageSize=${tab.page_sizes}`).then((res)=>{
        var data=res.data.data;
        this.tableData=data
        this.total=parseInt(res.data.total)
       
       
      })
    }
  },created(){
      this.data()


  }
};
</script>
<style >
.goodslist{
  height: 700px !important;
  background: #fff;
  border-radius: 12px;
}
.goodslist .el-table{
   border-radius: 12px;}
.goodslist.pag {
  height: 20px;
}
.goodslist .pag .el-pagination {
  float: left;
  margin-top: 20px;
  margin-left: 30px;
}
.goodslist .pag .el-button {
  float: left;
  margin-top: 20px;
}
</style>