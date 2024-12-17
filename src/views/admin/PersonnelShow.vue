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
                CSMJU | ระบบจัดการข้อมูลบุคลากร
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
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อ หรือตำแหน่งของบุคลากร"
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
                      @click="resetSearchForm"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                    <router-link
                      to="personneladd"
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Personal table -->
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
                          ประเภท
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          การศึกษา
                        </th>

                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ติดต่อ
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          สถานะการทำงาน
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          การจัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="personnel in personnels"
                        :key="personnel.id"
                        class="border-b"
                      >
                        <td
                          class="p-4 px-6 text-xs align-middle whitespace-nowrap"
                        >
                          <div
                            class="flex items-center text-xs text-left align-middle whitespace-nowrap"
                          >
                            <img
                              :src="
                                personnel.image_profile == null
                                  ? User
                                  : personnel.image_profile
                              "
                              alt="profile"
                              class="w-10 h-10 border-2 rounded-full shadow border-blueGray-50"
                            />
                            <span class="ml-3 text-sm font-semiBold">
                              {{ personnel.name_title }}{{ personnel.name_th }}
                              <div class="text-xs font-normal">
                                {{ personnel.name_en }}
                              </div>
                            </span>
                          </div>
                        </td>
                        <td
                          class="w-5 p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <div>
                            <p class="w-20 font-normal">
                              {{ personnel.personnel_type }}
                            </p>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-wrap"
                        >
                          <div>
                            <p class="w-20 font-normal truncate-3">
                              {{ personnel.education }}
                            </p>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <div class="w-48">
                            <p class="font-normal truncate-3">
                              อีเมล : {{ personnel.email }}
                            </p>
                            <p class="font-normal truncate-3">
                              โทร. : {{ personnel.tel_number }}
                            </p>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-wrap"
                        >
                          <div>
                            <p class="w-20 font-normal truncate-3">
                              {{ personnel.status }}
                            </p>
                          </div>
                        </td>

                        <td
                          class="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <button
                            @click="onUpdate(personnel.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(personnel.id)"
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
//? Image
import User from "@/assets/images/user_null.svg";
export default {
  data() {
    return {
      //? Image
      User,

      //? Data
      personnels: null,

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,

      //? Search
      keyword: "",
    };
  },

  components: {
    VueTailwindPagination,
  },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getPersonnels(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getPersonnels(this.currentPage);
  },

  methods: {
    //? Get data
    async getPersonnels(pageNumber) {
      let personnels = await http.get(`personnels?page=${pageNumber}`);
      if (personnels) {
        let data = personnels.data;
        this.personnels = data.data;
        this.perPage = data.per_page;
        this.total = data.total;
        this.currentPage = data.current_page;
      }
    },

    //? Submit search form
    onSearch() {
      if (this.keyword != "") {
        this.currentPage = 1;
        this.getPersonnelsSearch(this.currentPage);
      }
    },

    //? Get personnels by search
    async getPersonnelsSearch(pageNumber) {
      let personnels = await http.get(
        `personnel/search/${this.keyword}?page=${pageNumber}`
      );
      if (personnels) {
        let data = personnels.data;
        this.personnels = data.data;
        this.perPage = data.per_page;
        this.total = data.total;
        this.currentPage = data.current_page;
      }
    },

    //? Reset search form
    resetSearchForm() {
      this.currentPage = 1;
      this.getPersonnels(this.currentPage);
      this.keyword = "";
    },

    //? Paginate
    onPageClick(event) {
      this.currentPage = event;
      this.keyword == ""
        ? this.getPersonnels(this.currentPage)
        : this.getPersonnelsSearch(this.currentPage);
    },

    //? Update function
    onUpdate(id) {
      this.$router.push({ name: "PersonnelEdit", params: { id: id } });
    },

    //? Delete function
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
              .post(`personnel/delete/${id}`)
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
