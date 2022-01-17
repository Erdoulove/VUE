<template>
  <!-- <p>网络异常行为汇总</p>
    <p>DOS攻击总数:{{ this.receiveData.dos_sum }}</p>
    <p>端口扫描总数:{{ this.receiveData.port_scan_sum }}</p> -->
  <div class="info-left">
    <el-card class="box-card" align="middle">
      <div slot="header" class="clearfix">
        <span>网络异常行为汇总</span>
      </div>
      <div class="text item">DOS攻击总数:{{ this.receiveData.dos_sum }}</div>
      <div class="text item">
        端口扫描总数:{{ this.receiveData.port_scan_sum }}
      </div>

      <div class="text item">
        下载文件异常总数:{{ this.receiveData.anomaly_file_sum }}
      </div>
      <div class="text item">
        访问网域异常总数:{{ this.receiveData.anomaly_domain_sum }}
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      receiveData: {
        dos_sum: 10,
        port_scan_sum: 17,
        anomaly_file_sum: 5,
        anomaly_domain_sum: 12,
      },
    };
  },

  methods: {
    getData() {
      axios.get("/api/anomaly_summary").then(
        (res) => {
          this.receiveData = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
      setInterval(() => {
        axios.get("/api/anomaly_summary").then(
          (res) => {
            this.receiveData = res.data;
          },
          (error) => {
            console.log(error);
          }
        );
      }, 5000);
    },
  },

  mounted() {
    this.getData();
    window.console.log(axios);
  },

  beforeDestroy() {},
};
</script>

<style>
.text {
  font-size: 20px;
  line-height: 18px;
}

.item {
  margin-bottom: 30px;
}

.clearfix {
  font-size: 24px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 80%;
  text-align: center;
}

/* .info-left {
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
} */
</style>