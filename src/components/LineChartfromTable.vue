<template>
  <div :class="className" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  components: {},

  props: {
    className: { type: String, default: "linechart" },
    width: { type: String, default: "350px" },
    height: { type: String, default: "270px" },
    feature_type: { type: String, required: true },
    feature_value: { type: Number, required: true },
  },

  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    initChart() {
      var chartData = {
        distribution_data: [
          [1, 200],
          [2, 560],
          [3, 750],
          [4, 580],
          [5, 250],
          [6, 300],
          [7, 450],
          [8, 300],
          [9, 100],
        ],
        tag_data: 8,
      };
      this.chart = echarts.init(this.$el);
      axios
        .get("/api/feature_distribution", {
          params: {
            feature_type: this.feature_type,
            feature_value: this.feature_value,
          },
        })
        .then((res) => {
          // console.log("h");
          // console.log(this.feature_type,this.feature_value);
          chartData = res.data;
          // console.log(chartData);
          this.setOptions(chartData);
        });
    },

    setOptions(chartData) {

      var sortyData = chartData.distribution_data.sort(function (a, b) {
        return a[1] - b[1];
      });
      var y_min = sortyData[0];
      var y_max = sortyData[sortyData.length - 1];
            var sortData = chartData.distribution_data.sort(function (a, b) {
        return a[0] - b[0];
      });
      chartData.distribution_data = sortData;
      //   chartData.tag_data = chartData.tag_data * (sortData[sortData.length-1]-sortData[0])/(sortData[sortData.length-1]);
      this.chart.setOption({
        animation: false,
        grid: {
          top: 40,
          left: 50,
          right: 40,
          bottom: 50,
        },
        xAxis: {
          name: "x",
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
        },
        yAxis: {
          name: "y",
          min: y_min,
          max: y_max,
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     type: "inside",
        //     filterMode: "none",
        //     xAxisIndex: [0],
        //     startValue: -20,
        //     endValue: 20,
        //   },
        //   {
        //     show: true,
        //     type: "inside",
        //     filterMode: "none",
        //     yAxisIndex: [0],
        //     startValue: -20,
        //     endValue: 20,
        //   },
        // ],
        series: [
          {
            type: "line",
            showSymbol: false,
            clip: true,
            data: chartData.distribution_data,
            markLine: {
              symbol: ["none", "none"],
              label: { show: false },
              data: [{ xAxis: chartData.tag_data }],
              lineStyle: {
                color: "#5470C6",
                width: 5,
              },
            },
          },
        ],
      });
    },
  },
};
</script>
