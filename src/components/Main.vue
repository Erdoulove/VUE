<template>
  <div class="main-container">
    <el-row class="main-zone">
      <el-col :span="6" class="left-info-zone"> <div><InfoLeft/></div></el-col>
      <el-col :span="12" class="chart-zone"> <div><PieChart/></div></el-col>
      <!-- <el-col :span="6" class="right-info-zone"> <div><InfoRight/></div></el-col> -->
    </el-row>
    <el-row class="warn-zone">
      <div><Table/></div>
    </el-row>
  </div>
</template>

<script>
import * as simpleheat from "simpleheat/simpleheat.js";
import * as echarts from "echarts";
import axios from "axios";
import PieChart from "./PieChart.vue";
import InfoLeft from "./InfoLeft.vue";
// import InfoRight from "./InfoRight.vue";
import Table from "./Table.vue"

export default {
  components: {
    PieChart,
    InfoLeft,
    // InfoRight,
    Table,
  },

  data() {
    return {};
  },

  methods: {},

  mounted() {
    window.console.log(simpleheat);
    window.console.log(echarts);
    window.console.log(axios);
  },

  beforeDestroy() {},
};
</script>

<style scoped>
.main-container {
  height: 100%;
  width: 100%;
  /* background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); */
  /* background-color: rgb(33,119,184) */
}
.main-zone {
  height: 70%;
  width: 100%;
}
.left-info-zone {
  height: 100%;
  /* background-color: rgb(255, 0, 0); */
}
.chart-zone {
  height: 100%;
  /* background-color: yellow; */
}
.right-info-zone {
  height: 100%;
  /* background-color: blue; */
}
.warn-zone {
  height: 30%;
  width: 100%;
  /* background-color: rgb(33,119,184) */
}
.warn-ip-zone {
  height: 100%;
  /* background-color: green; */
}
.warn-time-zone {
  height: 100%;
  /* background-color: purple; */
}
.warn-action-zone {
  height: 100%;
  /* background-color: pink; */
}
.warn-type-zone {
  height: 100%;
  /* background-color: gray; */
}
</style>
