<template>
  <div class="order">
    <div class="demo-input-suffix demo-input-size">
      订单号
      <el-input placeholder="订单号" v-model="input1" size="mini"></el-input>收货人&nbsp;
      <el-input placeholder="收货人" v-model="input2" size="mini"></el-input>手机号&#160;
      <el-input placeholder="手机号" v-model="input2" size="mini"></el-input>订单状态&#160;
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="block timeChose">
      <span class="demonstration">选择时间&#160;&#160;</span>
      <el-date-picker
        size="mini"
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="2020-2-11 10 : 00"
        end-placeholder="2020-2-12 10 : 00"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button type="primary" size="mini" class="btn">查询</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" class="infoTable">
      <el-table-column prop="city" label="订单号" width="130"></el-table-column>
      <el-table-column prop="province" label="手机号" width="160"></el-table-column>
      <el-table-column fixed prop="date" label="下单时间" width="150"></el-table-column>
      <el-table-column prop="name" label="收货人" width="130"></el-table-column>
      <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="送达时间" width="160"></el-table-column>
      <el-table-column prop="remark" label="用户备注" width="160"></el-table-column>
      <el-table-column prop="money" label="订单金额" width="160"></el-table-column>
      <el-table-column prop="status" label="订单状态" width="160"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block navPage">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      value: "",
      options: [
        {
          value: "选项1",
          label: "订单1"
        },
        {
          value: "选项2",
          label: "订单2"
        }
      ],
      value1: [],
      value2: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: 1555628746,
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          remark: "23333",
          money: "一亿",
          status: "正在配送中"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: 1555628746,
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          remark: "23333",
          money: "一亿",
          status: "正在配送中"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: 1555628746,
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          remark: "23333",
          money: "一亿",
          status: "正在配送中"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: 1555628746,
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          remark: "23333",
          money: "一亿",
          status: "正在配送中"
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },handleClick(val){
      console.log(val)
    }
  }
};
</script>

<style scoped>
.el-main .order{
  background: #fff;
  border-radius: 12px;
}
.order .el-input {
  width: 15%;
  margin-right: 10px;
}
.order .el-input .el-input__inner {
  width: 100%;
}
.order .timeChose {
  margin-top: 20px;
}
.order .block .btn {
  margin-left: 20px;
}
.order .infoTable {
  margin-top: 50px;
}
.order.navPage {
  width: 300px;
  line-height: 20px;
}
.order .navPage .el-pagination {
  float: left;
  margin-top: 20px;
  margin-left: 30px;
}

 
</style>