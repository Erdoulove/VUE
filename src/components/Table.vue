<template>
  <div class="paginationBox">
    <el-table
      :data="
        tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      stripe
      style="width: 100%"
      row-key="anomaly_id"
      :expand-row-keys="expands"
      @row-click="rowClick"
    >
      <el-table-column type="expand">
        <template>
          <el-table
            class="table-expand"
            :data="
              traffic_list.slice(
                (lcurrentPage - 1) * lPageSize,
                lcurrentPage * lPageSize
              )
            "
          >
            <el-table-column
              prop="time"
              label="流量产生时间"
              :formatter="formatDate1"
            ></el-table-column>
            <el-table-column prop="orig_h" label="源IP地址"></el-table-column>

            <el-table-column prop="resp_h" label="目的IP地址"></el-table-column>
            <el-table-column prop="duration" label="连接持续时间">
              <template slot-scope="scope">
                <el-popover placement="top" trigger="click">
                  <linechart
                    v-if="hackReset0"
                    :feature_type="'duration'"
                    :feature_value="scope.row.duration"
                  />
                  <el-button slot="reference" type="text" @click="dataLoader0">
                    {{ scope.row.duration }}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="orig_pkts" label="源数据包数">
              <template slot-scope="scope">
                <el-popover placement="top" trigger="click">
                  <linechart
                    v-if="hackReset1"
                    :feature_type="'orig_pkts'"
                    :feature_value="scope.row.orig_pkts"
                  />
                  <el-button slot="reference" type="text" @click="dataLoader1">
                    {{ scope.row.orig_pkts }}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="orig_bytes" label="源字节数">
              <template slot-scope="scope">
                <el-popover placement="top" trigger="click">
                  <linechart
                    v-if="hackReset2"
                    :feature_type="'orig_bytes'"
                    :feature_value="scope.row.orig_bytes"
                  />
                  <el-button slot="reference" type="text" @click="dataLoader2">
                    {{ scope.row.orig_bytes }}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="resp_pkts" label="目的数据包数">
              <template slot-scope="scope">
                <el-popover placement="top" trigger="click">
                  <linechart
                    v-if="hackReset3"
                    :feature_type="'resp_pkts'"
                    :feature_value="scope.row.resp_pkts"
                  />
                  <el-button slot="reference" type="text" @click="dataLoader3">
                    {{ scope.row.resp_pkts }}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="resp_bytes" label="目的字节数">
              <template slot-scope="scope">
                <el-popover placement="top" trigger="click">
                  <linechart
                    v-if="hackReset4"
                    :feature_type="'resp_bytes'"
                    :feature_value="scope.row.resp_bytes"
                  />
                  <el-button slot="reference" type="text" @click="dataLoader4">
                    {{ scope.row.resp_bytes }}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="same_ip_conn"
              label="前100个连接中，与当前连接具有相同源IP和目的IP的连接数"
            >
              <template slot-scope="scope">
                <el-popover placement="top" trigger="click">
                  <linechart
                    v-if="hackReset5"
                    :feature_type="'same_ip_conn'"
                    :feature_value="scope.row.same_ip_conn"
                  />
                  <el-button slot="reference" type="text" @click="dataLoader5">
                    {{ scope.row.same_ip_conn }}
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="lhandleSizeChange"
            @current-change="lhandleCurrentChange"
            :current-page="lcurrentPage"
            :page-sizes="lpageSizes"
            :page-size="lPageSize"
            layout="total, sizes, prev, pager, next"
            :total="ltotalCount"
            style="text-align: center"
          >
          </el-pagination>
        </template>
      </el-table-column>
      <el-table-column
        prop="anomaly_device_ip"
        label="异常设备IP"
        width="350"
      ></el-table-column>
      <el-table-column
        prop="anomaly_time"
        label="异常产生时间"
        :formatter="formatDate"
        width="350"
      ></el-table-column>
      <el-table-column
        prop="anomaly_detail"
        label="异常行为"
        width="350"
      ></el-table-column>
      <el-table-column
        prop="anomaly_type"
        label="异常类型"
        width="350"
      ></el-table-column>
      <!-- <el-table-column prop="anomaly_id" label="异常id" width="280"> </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change.="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import linechart from "./LineChartfromTable.vue";
export default {
  components: {
    linechart,
  },

  data() {
    return {
      hackReset0: false,
      hackReset1: false,
      hackReset2: false,
      hackReset3: false,
      hackReset4: false,
      hackReset5: false,
      tableData: [],
      traffic_list: [],
      expands: [],
      expand1: [],
      cnt: 0,
      sign: "",
      //主页面分页
      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 30],
      PageSize: 5,
      //展开页面分页
      lcurrentPage: 1,
      ltotalCount: 1,
      lpageSizes: [5, 10, 20, 30],
      lPageSize: 5,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    lhandleSizeChange(val) {
      this.lPageSize = val;
      this.lcurrentPage = 1;
    },
    lhandleCurrentChange(val) {
      this.lcurrentPage = val;
    },
    getData() {
      setInterval(() => {
        axios.get("/api/anomaly_behavior").then(
          (res) => {
            // console.log(res);
            this.tableData = res.data;
            this.totalCount = this.tableData.length;
          },
          (error) => {
            console.log(error);
          }
        );
      }, 1000);
    },
    dataLoader0() {
      this.hackReset0 = false;
      this.$nextTick(() => {
        this.hackReset0 = true;
      });
    },
    dataLoader1() {
      this.hackReset1 = false;
      this.$nextTick(() => {
        this.hackReset1 = true;
      });
    },
    dataLoader2() {
      this.hackReset2 = false;
      this.$nextTick(() => {
        this.hackReset2 = true;
      });
    },
    dataLoader3() {
      this.hackReset3 = false;
      this.$nextTick(() => {
        this.hackReset3 = true;
      });
    },
    dataLoader4() {
      this.hackReset4 = false;
      this.$nextTick(() => {
        this.hackReset4 = true;
      });
    },
    dataLoader5() {
      this.hackReset5 = false;
      this.$nextTick(() => {
        this.hackReset5 = true;
      });
    },
    rowClick(row) {
      Array.prototype.remove = function (val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.lcurrentPage = 1;

      if (this.expands.indexOf(row.anomaly_id) < 0) {
        axios
          .get("/api/anomaly_traffic", {
            params: {
              anomaly_id: row.anomaly_id,
              anomaly_detail: row.anomaly_detail,
              anomaly_ip: row.anomaly_ip,
            },
          })
          .then((res) => {
            this.traffic_list = res.data;
            this.ltotalCount = this.traffic_list.length;
          })
          .then(() => {
            this.expands = [];
            this.expands.push(row.anomaly_id);
          });
      } else {
        this.expands.remove(row.anomaly_id);
      }
    },
    formatDate(row) {
      let data = row.anomaly_time;
      if (data == null) {
        return null;
      }
      return (
        data[0] + "-" + data[1] + " " + data[2] + ":" + data[3] + ":" + data[4]
      );
    },
    formatDate1(row) {
      let data = row.time;
      if (data == null) {
        return null;
      }
      return (
        data[0] + "-" + data[1] + " " + data[2] + ":" + data[3] + ":" + data[4]
      );
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
.table {
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
