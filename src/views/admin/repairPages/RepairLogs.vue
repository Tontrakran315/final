<template>
  <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
    <!-- Header  -->
    <div class="px-4 py-3 mb-0 border-0 rounded-t">
      <div class="text-center text-3xl font-bold mb-4">
        รายการแจ้งซ่อม <i class="fa-solid fa-list-check"></i>
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
          <router-link
            to="/admin/repairadd"
            class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-yellow-500 active:bg-yellow-600 hover:shadow-md focus:outline-none"
          >
            <i class="fas fa-tools"></i> แจ้งซ่อม
          </router-link>
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
                ห้องเก็บ
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                ความเสียหาย / ข้อบกพร่อง
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                ผู้แจ้ง
              </th>
              <th
                class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
              >
                การจัดการ
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
                {{ log.room_name_th }}
              </td>
              <td class="px-4 py-3 text-sm align-middle">
                <p class="w-auto font-normal truncate-3">
                  {{ log.initial_symptoms }}
                </p>
              </td>
              <td class="px-4 py-3 text-sm align-middle whitespace-nowrap">
                {{ log.notifier_name }}
              </td>
              <td class="py-3 px-4 text-xs align-middle whitespace-nowrap">
                <button
                  @click="handleEdit(log.id)"
                  class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="handleDelete(log.id)"
                  class="px-4 py-2 mb-1 mr-1 text-xs font-normal text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-trash-alt"></i>
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
        this.getRepairs(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getRepairs(this.currentPage);
  },

  methods: {
    //? Get data
    async getRepairs(page) {
      try {
        const response = await http.get(`equipment/repairs?page=${page}`);
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
      } catch (error) {
        console.log(error);
      }
    },

    //? Search data
    async searchRepairs(page) {
      try {
        let data = new FormData();
        data.append("keyword", this.keyword);
        const response = await http.post(
          `equipment/repair/search?page=${page}`,
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
      } catch (error) {
        console.log(error);
      }
    },

    //? Handle Search
    handleSearch() {
      if (this.keyword !== "") {
        this.currentPage = 1;
        this.searchRepairs(this.currentPage);
      }
    },

    //? Reset data
    resetData() {
      this.keyword = "";
      this.currentPage = 1;
      this.getRepairs(this.currentPage);
    },

    //? Edit
    handleEdit(id) {
      this.$router.push({ name: "RepairEdit", params: { id: id } });
    },

    //? Delete
    async handleDelete(id) {
      try {
        //? Set default sweet alert
        const swalWithBootstrapButtons = this.$swal.mixin({
          customClass: {
            title: "font-weight-bold custom",
            confirmButton:
              "px-6 py-3 ml-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
            cancelButton:
              "px-6 py-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
          },
          buttonsStyling: false,
        });

        const result = await swalWithBootstrapButtons.fire({
          title: "ยืนยันการลบข้อมูล",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        });

        if (result?.isConfirmed) {
          const res = await http.delete(`equipment/repair/delete/${id}`);
          if (res?.data?.success) {
            swalWithBootstrapButtons
              .fire("ลบข้อมูลเรียบร้อย!", "", "success")
              .then(() => {
                window.location.reload();
              });
          }
        } else {
          swalWithBootstrapButtons.fire("ยกเลิกการลบข้อมูล", "", "error");
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Pagination
    onPageClick(page) {
      this.currentPage = page;
      if (this.keyword !== "") {
        this.searchRepairs(this.currentPage);
      } else {
        this.getRepairs(this.currentPage);
      }
    },
  },
};
</script>
