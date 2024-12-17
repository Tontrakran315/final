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
                CSMJU | ระบบจัดการข้อมูลศิษย์เก่า
              </h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div class="px-4 py-3 mb-0 border-0 rounded-t">
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-semibold text-md md:w-2/12">
                    จำนวน {{ total }} รายการ
                  </div>

                  <div class="w-full px-4 py-4 md:w-6/12">
                    <form @submit.prevent="onSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อ สถานที่ทำงาน หรือรุ่นของศิษย์เก่า"
                        aria-label="Search"
                      />
                    </form>
                  </div>

                  <div class="w-full px-4 text-center md:w-4/12">
                    <button
                      @click="onSearch"
                      class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-search"></i> ค้นหา
                    </button>
                    <button
                      @click="resetSearch"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                    <router-link
                      to="/admin/alumnusadd"
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Alumnus Table -->
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
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อ - นามสกุล
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ศิษย์เก่า (รุ่นที่)
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          สังกัด / องค์กร
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ตำแหน่ง / หน้าที่
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          การจัดการ
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b"
                        v-for="(alumni, index) in alumnus"
                        :key="index"
                      >
                        <td
                          class="p-4 px-6 text-xs align-middle whitespace-nowrap"
                        >
                          <div
                            class="flex items-center text-xs text-left align-middle whitespace-nowrap"
                          >
                            <img
                              :src="
                                alumni.image_profile == null
                                  ? User
                                  : alumni.image_profile
                              "
                              class="w-10 h-10 rounded-full shadow-lg"
                            />
                            <span class="ml-3 text-sm font-semiBold">
                              {{ alumni.name.split(" ")[0] }}
                              <div class="text-xs font-normal">
                                {{ alumni.name.split(" ")[1] }}
                              </div>
                            </span>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                        >
                          {{ alumni.generation }}
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                        >
                          {{ alumni.work_place }}
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle whitespace-nowrap"
                        >
                          {{ alumni.job_title }}
                        </td>

                        <td
                          class="p-4 px-6 text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="onUpdate(alumni.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(alumni.id)"
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
//? Image null
import User from "@/assets/images/user_null.svg";
export default {
  data() {
    return {
      User,

      //? Data
      alumnus: null,

      //? Paginate
      currentPage: 0,
      perPage: 0,
      total: 0,

      //? Search
      keyword: "",
    };
  },

  components: { VueTailwindPagination },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getAlumnus(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getAlumnus(this.currentPage);
  },

  methods: {
    //? Get alumnus
    async getAlumnus(pageNumber) {
      let alumnus = await http.get(`alumnus?page=${pageNumber}`);
      if (alumnus) {
        let data = alumnus.data;
        this.alumnus = data.data;
        this.total = data.total;
        this.perPage = data.per_page;
        this.currentPage = data.current_page;
      }
    },

    //? Search
    onSearch() {
      if (this.keyword != "") {
        this.currentPage = 1;
        this.getAlumnusSearch(this.currentPage);
      }
    },

    //? Get alumnus by search
    async getAlumnusSearch(pageNumber) {
      let alumnus = await http.get(
        `alumni/search/${this.keyword}?page=${pageNumber}`
      );
      if (alumnus) {
        let data = alumnus.data;
        this.alumnus = data.data;
        this.total = data.total;
        this.perPage = data.per_page;
        this.currentPage = data.current_page;
      }
    },

    //? Reset search
    resetSearch() {
      this.currentPage = 1;
      this.getAlumnus(this.currentPage);
      this.keyword = "";
    },

    //? Paginate
    onPageClick(event) {
      this.currentPage = event;
      if (this.keyword == "") {
        this.getAlumnus(this.currentPage);
      } else {
        this.onSearch(this.currentPage);
      }
    },

    //? Update
    onUpdate(id) {
      this.$router.push({ name: "AlumnusEdit", params: { id: id } });
    },

    //? Delete
    onDelete(id) {
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

      swalWithBootstrapButtons
        .fire({
          title: "ยืนยันการลบข้อมูล",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            http
              .post(`alumni/delete/${id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("ลบข้อมูลเรียบร้อย!", "", "success")
                  .then(() => {
                    window.location.reload();
                  });
              })
              .catch((error) => {
                if (error) {
                  swalWithBootstrapButtons.fire({
                    icon: "error",
                    title: "ขออภัย ทำรายการไม่สำเร็จ",
                  });
                }
              });
          } else {
            swalWithBootstrapButtons.fire("ยกเลิกการลบข้อมูล", "", "error");
          }
        });
    },
  },
};
</script>
