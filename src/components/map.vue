<template>
  <div class="map">
    <div ref="mapBox" style="height:800px;width:1000px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import jsonp from "jsonp";

const option = {
  title: {
    text: "新型冠状病毒分布图",
    align: "center"
  },
  series: [
    {
      name: "确诊人数",
      type: "map",
      map: "china", //渲染中国地图
      label: {
        //控制对应地区的汉字
        show: true,
        color: "#333333",
        fontSize: 15
      },
      zoom: 1.2, //控制地图的放大和缩小
      itemStyle: {
        //控制地图板块的颜色和边框
        areaColor: "#ffffff"
        //borderColor:"blue" //地图边框颜色
      },
      emphasis: {
        //控制鼠标滑过之后的背景色和字体颜色
        label: {
          color: "#ffffff",
          fontSize: 15
        },
        itemStyle: {
          areaColor: "#c7fefd"
        }
      },
      data: [] //用来展示后台给的数据
    }
  ],
  visualMap: [
    {
      type: "piecewise",
      show: true,
      pieces: [
        //分段
        { min: 1000 },
        { min: 1000, max: 9999 },
        { min: 100, max: 999 },
        { min: 10, max: 99 },
        { min: 1, max: 9 }
      ],
      //showLabel:false, // 控制分段的字的显示
      inRange: {
        color: ["#ffaa85", "#660408"]
      }
    }
  ],
  tooltip: {
    trugger: "item",
    formatter: function(params) {
      //console.log(params);
      return `
               ${params.data.name}<br/>
              确诊病例:${params.data.value}<br/>
              治愈病例:${params.data.cureNum}<br/>
              死亡病例:${params.data.deathNum}<br/>
                        `;
    }
  }
};
export default {
  name: "map",
  mounted() {
    this.getData(); //为什么不在created的钩子函数执行，
    this.myChart = echarts.init(this.$refs.mapBox);
    this.myChart.setOption(option);
  },
  methods: {
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        {},
        (err, data) => {
          //console.log(data);
          if (!err) {
            let list = data.data.list.map(item => ({
              name: item.name, //省份名称
              value: item.value, //确诊数量
              cureNum: item.cureNum, //疑似数量
              deathNum: item.deathNum //死亡数量
            }));
            option.series[0].data = list;
            this.myChart.setOption(option);
          }
        }
      );
    }
  }
};
</script>

<style>
</style>