<template>
  <div class="min-h-screen w-full">
    <div class="flex flex-col">
      <div class="text-3xl text-center font-semibold">สถานะการแจ้งซ่อม</div>
      <div class="w-full">
        <canvas ref="statusChart" height="400" />
      </div>
      <div class="pt-32 text-3xl text-center font-semibold">
        สถิติการแจ้งซ่อมตามปี
      </div>
      <div class="w-full">
        <canvas ref="statisticsLogsChart" height="400" />
      </div>
    </div>
  </div>
</template>

<script>
//? Package
import Chart from "chart.js";
//? API
import http from "@/services/APIService";
export default {
  data() {
    return {
      isRepairLabel: [],
      isRepairStatusInfo: [],
      yearLabel: [
        new Date().getFullYear() - 3,
        new Date().getFullYear() - 2,
        new Date().getFullYear() - 1,
        new Date().getFullYear(),
      ],
      yearInfo: [],
    };
  },

  async mounted() {
    await this.getStatusInfo();
    await this.getYearInfo();
    this.statusChart();
    this.statisticsLogsChart();
  },

  methods: {
    async getStatusInfo() {
      try {
        let year = new Date().getFullYear();
        const res = await http.get(`equipment/repair/status/${year}`);
        if (res?.data?.success) {
          let data = res.data.data;
          data.forEach((item) => {
            this.isRepairLabel.push(item.is_repaired);
            this.isRepairStatusInfo.push(item.count);
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getYearInfo() {
      try {
        let year_now = new Date().getFullYear();
        let year_1 = year_now - 1;
        let year_2 = year_now - 2;
        let year_3 = year_now - 3;

        const res_1 = await http.get(`equipment/repair/yearinfo/${year_now}`);
        const res_2 = await http.get(`equipment/repair/yearinfo/${year_1}`);
        const res_3 = await http.get(`equipment/repair/yearinfo/${year_2}`);
        const res_4 = await http.get(`equipment/repair/yearinfo/${year_3}`);

        if (res_1?.data?.success) {
          // console.log(res_1.data.data);
          this.yearInfo.push(res_1.data.data);
        } else {
          this.yearInfo.push(0);
        }

        if (res_2?.data?.success) {
          // console.log(res_2.data.data);
          this.yearInfo.push(res_2.data.data);
        } else {
          this.yearInfo.push(0);
        }

        if (res_3?.data?.success) {
          // console.log(res_3.data.data);
          this.yearInfo.push(res_3.data.data);
        } else {
          this.yearInfo.push(0);
        }

        if (res_4?.data?.success) {
          // console.log(res_4.data.data);
          this.yearInfo.push(res_4.data.data);
        } else {
          this.yearInfo.push(0);
        }
      } catch (e) {
        console.log(e);
      }
    },

    statusChart() {
      this.statusChart = new Chart(this.$refs.statusChart, {
        type: "doughnut",
        data: {
          labels: this.isRepairLabel,
          datasets: [
            {
              label: "Repair Status",
              data: this.isRepairStatusInfo,
              backgroundColor: [
                "rgba(255, 150, 0, 0.8)",
                "rgba(0, 150, 0, 0.8)",
                "rgba(255, 0, 0, 0.8)",
              ],
              borderColor: [
                "rgba(255, 150, 0, 1)",
                "rgba(0, 150, 0, 1)",
                "rgba(255, 0, 0, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    },

    statisticsLogsChart() {
      this.statisticsLogsChart = new Chart(this.$refs.statisticsLogsChart, {
        type: "bar",
        data: {
          labels: this.yearLabel,
          datasets: [
            {
              label: "รายงานภาพรวม การแจ้งซ่อมตามปี",
              data: this.yearInfo,
              backgroundColor: [
                "rgba(255, 150, 0, 0.8)",
                "rgba(0, 150, 0, 0.8)",
                "rgba(255, 0, 0, 0.8)",
                "rgba(0, 0, 255, 0.8)",
              ],
              borderColor: ["rgba(255, 150, 0, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    },
  },
};
</script>
