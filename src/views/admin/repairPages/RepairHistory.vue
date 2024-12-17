<template>
  <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
    <!-- Header  -->
    <div class="px-4 py-3 mb-0 border-0 rounded-t">
      <div class="text-center text-3xl font-bold mb-4">
        ประวัติการซ่อม <i class="fa-solid fa-tools"></i>
      </div>
      <div class="flex flex-wrap items-center">
        <div class="w-full px-4 font-bold text-md md:w-2/12">
          จำนวน {{ total }} รายการ
        </div>

        <div class="w-full px-4 py-4 md:w-6/12">
          <form @submit.prevent="handleSearch">
            <input
              v-model="keyword"
              class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
              type="text"
              placeholder="ป้อนคำที่ต้องการค้นหา"
              aria-label="Search"
            />
          </form>
        </div>

        <div class="w-full px-4 text-center md:w-4/12">
          <button
            @click="handleSearch"
            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
            type="button"
          >
            <i class="fas fa-search"></i> ค้นหา
          </button>
          <button
            @click="resetData"
            class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
            type="button"
          >
            <i class="fas fa-broom"></i> ล้าง
          </button>
        </div>
      </div>
    </div>

    <!-- Repair Table -->
    <div class="w-full overflow-hidden overflow-x-auto rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-blueGray-500 border-b-2 border-blueGray-500">
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                รหัสครุภัณฑ์
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                ชื่อครุภัณฑ์
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                ชื่อผู้ซ่อม / บริษัท
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                สถานะการซ่อม
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-center uppercase align-middle whitespace-nowrap"
              >
                ดูรายละเอียด
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b"
              v-for="(log, index) in repairLogs"
              :key="index"
            >
              <td class="px-4 py-3 text-sm align-middle whitespace-nowrap">
                <span v-if="log.equip_id !== null">
                  {{ log.equip_id }}
                </span>
                <span v-else class="text-red-500"> ไม่มีรหัสครุภัณฑ์ </span>
              </td>
              <td class="px-4 py-3 text-sm align-middle whitespace-nowrap">
                {{ log.equip_name }}
              </td>
              <td class="px-4 py-3 text-sm align-middle whitespace-nowrap">
                <span v-if="log.log !== null">{{
                  log.log.repairman_name
                }}</span>
                <span v-else class="text-red-500">ถูกยกเลิก</span>
              </td>
              <td class="px-4 py-3 text-sm align-middle whitespace-nowrap">
                <span
                  v-if="log.is_repaired === 'success'"
                  class="text-emerald-500"
                  >ซ่อมแล้ว</span
                >
                <span v-else class="text-red-500">ถูกยกเลิก</span>
              </td>
              <td
                class="py-3 px-4 text-xs text-center align-middle whitespace-nowrap"
              >
                <button
                  @click="handleRead(log.id)"
                  class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded-full shadow outline-none hover:shadow-md focus:outline-none"
                  :class="[
                    log.is_repaired !== 'success'
                      ? 'bg-blueGray-600 cursor-normal'
                      : 'bg-yellow-500 active:bg-yellow-600',
                  ]"
                  type="button"
                  :disabled="log.is_repaired !== 'success'"
                >
                  <i class="fa-solid fa-file"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Paginate -->
      <VueTailwindPagination
        :current="currentPage"
        :total="total"
        :per-page="perPage"
        @page-changed="onPageClick($event)"
      />
    </div>
  </div>
</template>

<script>
//? API
import http from "@/services/APIService";
//? Package
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  components: { VueTailwindPagination },

  data() {
    return {
      //? Data
      repairLogs: [],

      //? Search
      keyword: "",

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,
    };
  },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getRepairLogs(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getRepairLogs(this.currentPage);
  },

  methods: {
    //? Get Repair Logs History
    async getRepairLogs(page) {
      try {
        const response = await http(`equipment/repair/logs?page=${page}`);
        if (response.data.data.length > 0) {
          this.repairLogs = response.data.data;
          this.currentPage = response.data.current_page;
          this.perPage = response.data.per_page;
          this.total = response.data.total;
        } else {
          this.repairLogs = [];
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Get Repair Logs History By Keyword
    async searchRepairLogs(page) {
      try {
        let data = new FormData();
        data.append("keyword", this.keyword);
        const response = await http.post(
          `equipment/repair/log/search?page=${page}`,
          data
        );
        if (response.data.data.length > 0) {
          this.repairLogs = response.data.data;
          this.currentPage = response.data.current_page;
          this.perPage = response.data.per_page;
          this.total = response.data.total;
        } else {
          this.repairLogs = [];
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Handle Read
    handleRead(id) {
      this.$router.push({ name: "RepairHistoryDetail", params: { id: id } });
    },

    //? Handle Search
    handleSearch() {
      if (this.keyword !== "") {
        this.currentPage = 1;
        this.searchRepairLogs(this.currentPage);
      }
    },

    //? Reset Data
    resetData() {
      this.keyword = "";
      this.currentPage = 1;
      this.getRepairLogs(this.currentPage);
    },

    //? Pagination
    onPageClick(page) {
      if (this.keyword !== "") {
        this.searchRepairLogs(page);
      } else {
        this.getRepairLogs(page);
      }
    },
  },
};
</script>
