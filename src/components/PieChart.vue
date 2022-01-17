<template>
  <div class="main-zone">
    <div id="pie-chart" style="width: 600px; height: 350px"></div>
    <div id="main" style="width: 600px; height: 350px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

var tableData = {
  sum_in_pkts: 10,
  sum_out_pkts: 11,
  sum_conn_num: 5,
  ave_conn_dur: 0.5,
};
var line_flag = false;
var feature_type_name_g = "";
var series_name_g = "";

function getData() {
  axios
    .get("/api/pie_chart", {
      params: {
        device_ip: "192.168.2.11",
      },
    })
    .then(
      (res) => {
        tableData = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
}

function Line_Chart() {
  var feature_type_name = feature_type_name_g;
  var series_name = series_name_g;
  var chartDom = document.getElementById("main"); //折线
  var lineChart = echarts.init(chartDom);
  // if (flag) {
  var newData = {};

  console.log("hh");
  console.log(feature_type_name);
  // console.log(Date());
  axios
    .get("/api/feature_history", {
      params: { feature_type: feature_type_name },
    })
    .then((res) => {
      newData = res.data;
    })
    .then(function () {
      // console.log(Date());

      var option;

      let date = [];
      let data = [];

      for (let i = 0; i < newData.feature.length; i++) {
        var now = new Date();
        now.setDate(newData.time[i][0]);
        now.setHours(newData.time[i][1]);
        now.setMinutes(newData.time[i][2]);
        now.setSeconds(newData.time[i][3]);
        date.push([
          now.getDate() +
            " " +
            now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds(),
        ]);
        data.push(newData.feature[i]);
      }

      option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        series: [
          {
            name: series_name,
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      };

      lineChart.setOption(option);
      // setInterval(lineChart(), 30000);
    });
  // }
}

function My_Chart(myChart) {
  //饼图
  // console.log("hhhhhhh");
  // 绘制图表

  getData();
  var option = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        var temp = params.data.name + "  " + params.data.num;
        return temp;
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "具体数据",
        type: "pie",
        radius: "80%",
        // center: ['50%','60%'],
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        data: [
          {
            value: 25,
            num: tableData.sum_in_pkts,
            name: "发送至设备数据包数",
          },
          {
            value: 25,
            num: tableData.sum_out_pkts,
            name: "发送设备发送出的数据包数",
          },
          {
            value: 25,
            num: tableData.sum_conn_num,
            name: "设备发生的连接数",
          },
          {
            value: 25,
            num: tableData.ave_conn_dur,
            name: "设备发生连接的平均连接时间",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  myChart.on("click", function (params) {
    //单击后获得数据绘制新图

    var series_name = params.name;
    var feature_type_name;
    if (series_name == "发送至设备数据包数") feature_type_name = "in_pkts";
    if (series_name == "发送设备发送出的数据包数")
      feature_type_name = "out_pkts";
    if (series_name == "设备发生的连接数") feature_type_name = "conn_num";
    if (series_name == "设备发生连接的平均连接时间")
      feature_type_name = "conn_dur";
    // flag = true;
    line_flag = true;
    feature_type_name_g = feature_type_name;
    series_name_g = series_name;
    Line_Chart();
  });
  myChart.setOption(option);
}

export default {
  components: {},

  data() {
    return {
      // msg: "啊哈哈哈哈",
      tableData: {
        sum_in_pkts: 10,
        sum_out_pkts: 11,
        sum_conn_num: 5,
        ave_conn_dur: 0.5,
      },
    };
  },

  methods: {
    getChart() {
      var myChart = echarts.init(document.getElementById("pie-chart"));

      My_Chart(myChart);
      setInterval(function () {
        My_Chart(myChart);
        if (line_flag) Line_Chart();
      }, 10000);
    },
  },

  mounted() {
    // this.getData();
    // this.myChart();
    this.getChart();
    window.console.log(echarts);
    window.console.log(axios);
  },

  beforeDestroy() {},
};
</script>

<style>
/* .main-zone {
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
} */
</style>