<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">CSMJU | ระบบวัสดุอุปกรณ์</h1>
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
                        placeholder="ป้อนชื่อวัสดุอุปกรณ์ที่ต้องการค้นหา"
                        aria-label="Search"
                      />
                    </form>
                  </div>

                  <div class="w-full px-4 text-center md:w-4/12">
                    <button
                      @click="onSearch"
                      class="px-4 py-2 mb-1 mr-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-search"></i> ค้นหา
                    </button>
                    <button
                      @click="resetSearchForm"
                      class="px-4 py-2 mb-1 mr-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                    <router-link
                      to="materialadd"
                      class="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
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
                    <!-- thead -->
                    <thead>
                      <tr
                        class="text-blueGray-500 border-b-2 border-blueGray-500"
                      >
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          รูปภาพวัสดุอุปกรณ์
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อวัสดุอุปกรณ์
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          จำนวนวัสดุอุปกรณ์
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          สถานะ
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          การจัดการ
                        </th>
                      </tr>
                    </thead>

                    <!-- Body -->
                    <tbody>
                      <tr v-for="(material, index) in materials" :key="index">
                        <td
                          class="py-3 px-4 w-auto align-middle whitespace-nowrap"
                        >
                          <img
                            :src="
                              material.image != null ? material.image : image
                            "
                            width="150"
                            alt="material image"
                            class="rounded"
                          />
                        </td>
                        <td
                          class="py-3 px-4 w-auto text-sm align-middle whitespace-nowrap"
                        >
                          {{ material.name }}
                        </td>
                        <td
                          class="py-3 px-4 w-auto text-sm align-middle whitespace-nowrap"
                        >
                          {{ material.quantity }}
                        </td>
                        <td
                          class="py-3 px-4 w-auto text-sm align-middle whitespace-nowrap"
                        >
                          <i class="fa-solid"></i>
                          <span v-if="material.status" class="text-green-400">
                            <i
                              class="fa-solid fa-boxes-stacked text-xl mr-2"
                            ></i>
                            in stock
                          </span>
                          <span v-else class="text-red-500">
                            <i class="fa-solid fa-pallet text-xl mr-2"></i>
                            out stock
                          </span>
                        </td>
                        <!-- Edit -->
                        <td
                          class="py-3 px-4 w-auto text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="onUpdate(material.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(material.id)"
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
import image from "@/assets/images/logo.png";
export default {
  data() {
    return {
      //? Image
      image,

      //? Data
      materials: null,

      //? Pagination
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
        this.getMaterials(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getMaterials(this.currentPage);
  },

  methods: {
    //? Get data
    async getMaterials(page) {
      try {
        let res = await http.get(`materials/private?page=${page}`);
        if (res) {
          let data = res.data;
          this.materials = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Get data by search
    async getMaterialsSearch(page) {
      try {
        let res = await http.get(
          `material/search/private/${this.keyword}?page=${page}`
        );
        if (res) {
          let data = res.data;
          this.materials = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Pagination
    onPageClick(page) {
      this.currentPage = page;
      if (this.keyword != "") {
        this.getMaterialsSearch(this.currentPage);
      } else {
        this.getMaterials(this.currentPage);
      }
    },

    //? Search handle
    onSearch() {
      if (this.keyword != "") {
        this.currentPage = 1;
        this.getMaterialsSearch(this.currentPage);
      }
    },

    //? Reset search
    resetSearchForm() {
      this.keyword = "";
      this.currentPage = 1;
      this.getMaterials(this.currentPage);
    },

    //? Update
    onUpdate(id) {
      this.$router.push({ name: "MaterialEdit", params: { id: id } });
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

      //? Confirmation from user
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
            //? Call API
            http
              .post(`material/delete/${id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("ลบข้อมูลเรียบร้อย!", "", "success")
                  .then(() => {
                    window.location.reload();
                  });
              })
              .catch((err) => {
                if (err) {
                  swalWithBootstrapButtons.fire({
                    icon: "error",
                    title: "ขออภัย ทำรายการไม่สำเร็จ",
                  });
                }
              });
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "ยกเลิกการลบข้อมูลเรียบร้อย!",
              "",
              "error"
            );
          }
        });
    },
  },
};
</script>
