<template>
  <div class="box0-card">
    <div class="title">
      <div>
        <i class="el-icon-s-order i1"></i>
        <div>
          <p>总订单</p>
          <p class="font2">102,400</p>
        </div>
      </div>
      <div>
        <i class="el-icon-s-data i2"></i>
        <div>
          <p>总销售额</p>
          <p class="font2">102,400</p>
        </div>
      </div>
      <div>
        <i class="el-icon-coin i3"></i>
        <div>
          <p>今日订单数</p>
          <p class="font2">102,400</p>
        </div>
      </div>
      <div>
        <i class="el-icon-s-data i4"></i>
        <div>
          <p>今日销售数</p>
          <p class="font2">102,400</p>
        </div>
      </div>
    </div>
    <el-card class="box-card">
      <div id="myChart" :style="{width: '900px', height: '400px'}"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itme:[],
      num:[]
    };
  },
  
  created(){
    var tab=this;
      this.$axios.get(tab.$url+`/sell/counter.php?a=users&field=date`).then((res)=>{
          var data=res.data.data  
          data.forEach((v)=>{
           this.itme.push(v.ctime)
           this.num.push(parseInt(v.num))
          })
            this.drawLine();
      })
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["管理员人数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.itme
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "管理员人数",
            type: "line",
            stack: "总量",
            data: this.num
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
  align-items: center;
  color: #d1caca;
  i {
    font-size: 5rem;
  }
  & > div {
    flex: 0 0 21%;
    background: #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .i1{
      color: lightgreen;
    }
    .i2{
      color: lightcoral;
    }
    .i3{
      color: lightblue;
    }
    .i4{
      color: greenyellow;
    }
  }
}
.font2{
  font-weight: bold;
  color: black !important
}
</style>