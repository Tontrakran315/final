<template>
  <div>
    <main class="profile-page custom">
      <section class="relative">
        <div class="container px-4 mx-auto">
          <div
            class="relative flex flex-col w-full min-w-0 mt-64 mb-6 break-words bg-white rounded-lg shadow-xl"
          >
            <div class="px-6 mt-6">
              <h1 class="py-6 text-3xl font-bold text-center">
                CSMJU | ระบบครุภัณฑ์
              </h1>

              <br class="shadow-xl" />

              <div class="flex flex-wrap items-center justify-between my-8">
                <div class="w-full md:w-2/12">
                  <h2
                    class="items-center mx-4 text-md font-semibold text-gray-700 md:text-xl"
                  >
                    จำนวน {{ total }} รายการ
                  </h2>
                </div>

                <div class="w-full px-4 md:w-6/12">
                  <div class="relative w-full my-4 mr-2">
                    <form @submit.prevent="onSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อครุภัณฑ์ รหัสครุภัณฑ์ หรือประเภทครุภัณฑ์"
                        aria-label="Search"
                      />
                    </form>
                  </div>
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
                  <router-link to="/admin/equipmentadd">
                    <button
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </button>
                  </router-link>
                </div>
              </div>

              <!-- Equipments Table -->
              <div
                class="w-full overflow-hidden overflow-x-auto rounded-lg shadow-xs"
              >
                <div class="w-full overflow-x-auto">
                  <table class="w-full whitespace-no-wrap">
                    <thead>
                      <tr
                        class="text-sm text-left text-blueGray-500 border-b-2 border-blueGray-500"
                      >
                        <th class="px-4 py-3">ประเภทครุภัณฑ์</th>
                        <th class="px-4 py-3">รหัสครุภัณฑ์</th>
                        <th class="px-4 py-3">ชื่อครุภัณฑ์</th>
                        <th class="px-4 py-3">ราคา (บาท)</th>
                        <th class="px-4 py-3">วันที่จัดซื้อ</th>
                        <th class="px-4 py-3">ที่มาของงบประมาณ</th>
                        <th class="px-4 py-3">แก้ไข / นำออก</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(equip, index) in equipments"
                        :key="index"
                        class="border-b"
                      >
                        <td class="px-4 py-3 text-sm">
                          {{ equip.main_type }}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {{ equip.equip_id }}
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold">
                                {{ equip.name }}
                              </p>
                              <p
                                class="text-xs text-gray-600 dark:text-gray-400"
                                v-if="equip.model !== null"
                              >
                                Brand : {{ equip.model }}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {{
                            equip.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold">
                                {{
                                  new Date(
                                    equip.purchase_date
                                  ).toLocaleDateString()
                                }}
                              </p>
                              <p
                                class="text-xs text-gray-600 dark:text-gray-400"
                                v-if="equip.name_th !== 'no account'"
                              >
                                ผู้รับผิดชอบ :
                                {{ equip.name_title }}{{ equip.name_th }}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {{ equip.budget }}
                        </td>
                        <td class="px-4 py-3 text-sm flex flex-row">
                          <button
                            @click="onUpdate(equip.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(equip.id)"
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
      </section>
    </main>
  </div>
</template>

<script>
//? API
import http from "@/services/APIService";
//? Packages
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import useValidate from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useValidate(),

      //? Data
      equipments: null,

      //? Paginate
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
        this.getEquipments(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getEquipments(this.currentPage);
  },

  methods: {
    //? Get equipments
    async getEquipments(pageNumber) {
      let equipments = await http.get(`equipments?page=${pageNumber}`);
      if (equipments) {
        let data = equipments.data;
        this.equipments = data.data;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.total = data.total;
      }
    },

    //? Search
    onSearch() {
      if (this.keyword != "") {
        this.currentPage = 1;
        this.getEquipmentsSearch(this.currentPage);
      }
    },

    //? Get equipments by search
    async getEquipmentsSearch(pageNumber) {
      let data = new FormData();
      data.append("search", this.keyword);
      let equipments = await http.post(
        `equipment/search?page=${pageNumber}`,
        data
      );
      if (equipments) {
        let data = equipments.data;
        this.equipments = data.data;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.total = data.total;
      }
    },

    //? Reset search
    resetSearch() {
      this.keyword = "";
      this.currentPage = 1;
      this.getEquipments(this.currentPage);
    },

    //? Pagination
    onPageClick(event) {
      this.currentPage = event;

      if (this.keyword == "") {
        this.getEquipments(this.currentPage);
      } else {
        this.getEquipmentsSearch(this.currentPage);
      }
    },

    //? Update function
    onUpdate(id) {
      this.$router.push({ name: "EquipmentEdit", params: { id: id } });
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
            http
              .post(`equipment/delete/${id}`)
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
