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
                CSMJU | ระบบจัดการ Line token
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
                        placeholder="ป้อนชื่อของบุคลากรที่ต้องการค้นหา"
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
                    <router-link
                      to="/admin/linetokenadd"
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </router-link>
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
                          class="px-4 py-3 w-6/12 text-sm font-semibold text-left align-middle whitespace-nowrap"
                        >
                          Token
                        </th>
                        <th
                          class="px-4 py-3 w-auto text-sm font-semibold text-left align-middle whitespace-nowrap"
                        >
                          ชื่อเจ้าของ
                        </th>
                        <th
                          class="px-4 py-3 w-auto text-sm font-semibold text-left align-middle whitespace-nowrap"
                        >
                          สิทธิ์การเข้าถึง
                        </th>
                        <th
                          class="px-4 py-3 w-4/12 text-sm font-semibold text-center align-middle whitespace-nowrap"
                        >
                          จัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b"
                        v-for="(token, index) in lineTokens"
                        :key="index"
                      >
                        <td
                          class="px-4 py-3 text-sm align-middle whitespace-nowrap"
                        >
                          <span class="w-auto truncate-3">
                            {{ token.line_token }}
                          </span>
                        </td>
                        <td
                          class="px-4 py-3 text-sm align-middle whitespace-nowrap"
                        >
                          {{ token.name_title }}{{ token.name_th }}
                        </td>
                        <td
                          class="px-4 py-3 text-sm align-middle whitespace-nowrap"
                        >
                          {{ token.role_name_th }}
                        </td>
                        <td
                          class="py-3 px-4 text-xs text-center align-middle whitespace-nowrap"
                        >
                          <button
                            @click="handleEdit(token.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="handleDelete(token.id)"
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
  components: { VueTailwindPagination },

  data() {
    return {
      //? Data
      lineTokens: [],

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,

      //? Search
      keyword: "",
    };
  },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getLineTokens(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getLineTokens(this.currentPage);
  },

  methods: {
    //? Get Line Token
    async getLineTokens(page) {
      try {
        const response = await http.get(`personnel/line-tokens?page=${page}`);
        if (response.data.data.length > 0) {
          this.lineTokens = response.data.data;
          this.currentPage = response.data.current_page;
          this.perPage = response.data.per_page;
          this.total = response.data.total;
        } else {
          this.lineTokens = [];
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Search Line Token
    async searchLineToken(page) {
      try {
        let data = new FormData();
        data.append("keyword", this.keyword);
        const response = await http.post(
          `personnel/line-token/search?page=${page}`,
          data
        );
        console.log(response.data);
        if (response.data.data.length > 0) {
          this.lineTokens = response.data.data;
          this.currentPage = response.data.current_page;
          this.perPage = response.data.per_page;
          this.total = response.data.total;
        } else {
          this.lineTokens = [];
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Handle search
    handleSearch() {
      if (this.keyword !== "") {
        this.currentPage = 1;
        this.searchLineToken(this.currentPage);
      }
    },

    //? Reset search form
    handleReset() {
      this.currentPage = 1;
      this.getLineTokens(this.currentPage);
      this.keyword = "";
    },

    //? Handle Edit
    handleEdit(id) {
      this.$router.push({ name: "LineTokenEdit", params: { id: id } });
    },

    //? Handle delete
    async handleDelete(id) {
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

      try {
        const result = await swalWithBootstrapButtons.fire({
          title: "ยืนยันการลบข้อมูล",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          const response = await http.delete(
            `personnel/line-token/delete/${id}`
          );
          if (response.data.success) {
            swalWithBootstrapButtons
              .fire("ลบข้อมูลเรียบร้อย!", "", "success")
              .then(() => {
                window.location.reload();
              });
          }
        } else {
          swalWithBootstrapButtons.fire("ยกเลิกการลบข้อมูล", "", "error");
        }
      } catch (error) {
        swalWithBootstrapButtons.fire("ขออภัย ทำรายการไม่สำเร็จ", "", "error");
      }
    },

    //? Pagination
    onPageClick(e) {
      this.currentPage = e;
      if (this.keyword === "") {
        this.getLineTokens(this.currentPage);
      } else {
        this.searchLineToken(this.currentPage);
      }
    },
  },
};
</script>
