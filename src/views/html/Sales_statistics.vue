<template>
  <div class="box0-card">
    <el-card class="box-card">
      <div id="myChart" :style="{width: '900px', height: '400px'}"></div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
     itme:[],
     num:[]
    };
  },
    created(){
    var tab=this;
      this.$axios.get(tab.$url+`/sell/counter.php?a=goods&field=date`).then((res)=>{
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
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['类别']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: this.itme
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '类别',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: this.num
        }
    ]
});
    }
  }
};
</script>
