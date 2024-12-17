<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | รายละเอียดการเบิกจ่ายวัสดุอุปกรณ์
              </h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div class="px-4 py-3 mb-0 border-0 rounded-t">
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
                      @click="handleReset"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                  </div>
                </div>
              </div>

              <!-- Table -->
              <div
                class="w-full overflow-hidden overflow-x-auto rounded-lg shadow-xs"
              >
                <div class="w-full overflow-x-auto">
                  <table class="w-full whitespace-no-wrap">
                    <thead>
                      <tr
                        class="text-blueGray-500 border-b-2 border-blueGray-500"
                      >
                        <th
                          class="w-1/12 px-4 py-3 text-sm font-semibold text-center uppercase align-middle whitespace-nowrap"
                        >
                          ลำดับ
                        </th>
                        <th
                          class="w-auto px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          วันที่
                        </th>
                        <th
                          class="w-4/12 px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อวัสดุ
                        </th>
                        <th
                          class="w-2/12 px-4 py-3 text-sm font-semibold text-center uppercase align-middle whitespace-nowrap"
                        >
                          จำนวนที่เบิกจ่าย
                        </th>
                        <th
                          class="w-4/12 px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อผู้เบิกจ่าย
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b"
                        v-for="(item, index) in disbursements"
                        :key="index"
                      >
                        <td
                          class="py-3 px-4 text-sm text-center align-middle whitespace-nowrap"
                        >
                          {{ (currentPage - 1) * perPage + index + 1 }}
                        </td>
                        <td
                          class="flex flex-col py-3 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          <span>{{
                            new Date(item.created_at).toLocaleDateString()
                          }}</span>
                          <span class="text-xs">{{
                            new Date(item.created_at).toLocaleTimeString()
                          }}</span>
                        </td>
                        <td
                          class="py-3 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          {{ item.material_name }}
                        </td>
                        <td
                          class="py-3 px-4 text-sm text-center align-middle whitespace-nowrap"
                        >
                          {{ item.quantity }}
                        </td>
                        <td
                          class="py-3 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          {{ item.disburser }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <VueTailwindPagination
                  :current="currentPage"
                  :total="total"
                  :per-page="perPage"
                  @page-changed="onPageClick($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//? API
import http from "@/services/APIService";
//? Package
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      //? Data
      disbursements: [],

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
        this.getDisbursements(this.currentPage);
      }
    },
  },

  async mounted() {
    this.currentPage = 1;
    await this.getDisbursements(this.currentPage);
  },

  methods: {
    //? get disbursements
    async getDisbursements(page) {
      try {
        const res = await http.get(`materials/disbursals?page=${page}`);
        let data = res?.data;
        this.disbursements = data?.data;
        this.currentPage = data?.current_page;
        this.perPage = data?.per_page;
        this.total = data?.total;
      } catch (e) {}
    },

    //? Search
    async searchDisbursements(page) {
      try {
        let form = new FormData();
        form.append("keyword", this.keyword);
        const res = await http.post(
          `material/disbursal/search?page=${page}`,
          form
        );
        let data = res?.data;
        this.disbursements = data?.data;
        this.currentPage = data?.current_page;
        this.perPage = data?.per_page;
        this.total = data?.total;
      } catch (e) {}
    },

    handleSearch() {
      if (!!this.keyword) {
        this.currentPage = 1;
        this.searchDisbursements(this.currentPage);
      }
    },

    //? Reset
    handleReset() {
      this.keyword = "";
      this.currentPage = 1;
      this.getDisbursements(this.currentPage);
    },

    //? Pagination
    onPageClick(page) {
      this.currentPage = page;
      if (!!this.keyword) {
        this.searchDisbursements(this.currentPage);
      } else {
        this.getDisbursements(this.currentPage);
      }
    },
  },
};
</script>
