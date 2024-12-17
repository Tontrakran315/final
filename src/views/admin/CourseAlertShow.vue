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
                CSMJU | ระบบแจ้งตกค้างรายวิชา
              </h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div class="px-4 py-3 mb-0 border-0 rounded-t">
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-semibold text-md md:w-2/12">
                    จำนวน {{ this.total }} รายการ
                  </div>

                  <div class="w-full px-4 py-4 md:w-6/12">
                    <form @submit.prevent="onSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อ ชื่อ/รหัสนักศึกษา รหัส/ชื่อวิชา"
                        aria-label="Search"
                      />
                    </form>
                  </div>

                  <div class="w-full px-4 md:w-4/12">
                    <button
                      @click="onSearch"
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
                      to="/admin/coursealert/saveexcel"
                      class="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-emerald-500 active:bg-emerald-600 rounded shadow outline-none hover:shadow-md focus:outline-none"
                    >
                      <i class="fa-solid fa-file-export"></i> นำรายชื่อออก
                    </router-link>
                  </div>
                </div>

                <!-- Sort data by dates -->
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-semibold text-md md:w-2/12">
                    กรองข้อมูลผ่านวันที่
                  </div>

                  <div class="w-full px-4 py-4 md:w-3/12">
                    <v-date-picker v-model="dateStart" mode="date">
                      <template #default="{ inputValue, inputEvents }">
                        <input
                          class="w-full py-2 px-4 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                          :class="{ 'bg-gray-200': dateStart == null }"
                          :value="inputValue"
                          v-on="inputEvents"
                          placeholder="Date start"
                          readonly
                          :disabled="dateEnd != null"
                        />
                      </template>
                    </v-date-picker>
                  </div>

                  <div class="w-full px-4 py-4 md:w-3/12">
                    <v-date-picker
                      v-model="dateEnd"
                      mode="date"
                      :min-date="dateStart"
                    >
                      <template #default="{ inputValue, inputEvents }">
                        <input
                          class="w-full py-2 px-4 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                          :class="{ 'bg-gray-200': dateEnd == null }"
                          :value="inputValue"
                          v-on="inputEvents"
                          placeholder="Date end"
                          readonly
                          :disabled="dateStart == null"
                        />
                      </template>
                    </v-date-picker>
                  </div>

                  <!-- <div class="w-full px-4 md:w-4/12">
                    <button
                      @click="onSortByDates"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                      :disabled="dateStart == null || dateEnd == null"
                    >
                      <i class="fas fa-search"></i> กรองข้อมูล
                    </button>
                  </div> -->
                </div>
              </div>

              <!-- Course alert table -->
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
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          วันที่
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อ - นามสกุล
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อรายวิชา
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          รายยละเอียด
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ติดต่อ
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
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b"
                        v-for="(residual, index) in residuals"
                        :key="index"
                      >
                        <td
                          class="p-4 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          {{ new Date(residual.date).toLocaleDateString() }}
                        </td>

                        <td
                          class="p-4 px-4 text-xs align-middle whitespace-nowrap"
                        >
                          <div
                            class="flex items-center text-xs text-left align-middle whitespace-nowrap"
                          >
                            <span class="text-sm">
                              <p class="font-bold">
                                {{ residual.student_name }}
                              </p>

                              <div class="text-xs font-normal">
                                รหัสนักศึกษา : {{ residual.student_code }}
                              </div>
                            </span>
                          </div>
                        </td>

                        <td class="p-4 px-4 text-sm align-middle">
                          <div>
                            <p class="w-auto font-normal">
                              {{ residual.subject_name }}
                            </p>
                            <p
                              class="font-normal text-red-500 text-xs flex flex-col"
                            >
                              <span v-if="residual.subject_type == 1">
                                ประเภท : กลุ่มวิชาใน
                              </span>
                              <span v-else> ประเภท : กลุ่มวิชานอก </span>
                              <span>
                                รหัสรายวิชา : {{ residual.subject_code }}
                              </span>
                            </p>
                          </div>
                        </td>

                        <td class="p-4 px-4 text-sm align-middle">
                          <div>
                            <p class="w-auto font-normal">
                              {{ residual.detail }}
                            </p>
                            <p
                              class="font-normal text-red-500 text-xs flex flex-col"
                            >
                              <span> ผู้รับผิดชอบรายวิชา : </span>
                              <span>{{ residual.advisor }}</span>
                            </p>
                          </div>
                        </td>

                        <td
                          class="p-4 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          <p><b>โทร. :</b> {{ residual.student_tel_number }}</p>
                          <p><b>อีเมล :</b> {{ residual.student_email }}</p>
                        </td>

                        <td
                          class="p-4 px-4 text-sm align-middle whitespace-nowrap text-center"
                        >
                          <span
                            v-if="residual.status == 'waiting'"
                            class="text-yellow-600"
                          >
                            {{ residual.status }}
                          </span>
                          <span
                            v-if="residual.status == 'confirmed'"
                            class="text-emerald-600"
                          >
                            {{ residual.status }}
                          </span>
                          <span
                            v-if="residual.status == 'rejected'"
                            class="text-red-500"
                          >
                            {{ residual.status }}
                          </span>
                        </td>

                        <td
                          class="p-4 px-4 text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="editHandle(residual.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="deleteHandle(residual.id)"
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
//? Packages
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  components: { VueTailwindPagination },

  data() {
    return {
      //? Data
      residuals: null,

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,

      //? Form
      dateStart: null,
      dateEnd: null,
      keyword: "",
      //? Not show in this page but still use it for update residual status in function
      residualStatus: "",
    };
  },

  watch: {
    keyword(value) {
      if (!value) {
        if (this.dateStart != null && this.dateEnd != null) {
          this.onSortByDates();
        } else {
          //? Reset dates input maybe user input the one of them then search
          this.dateStart = null;
          this.dateEnd = null;

          //? Get all residuals
          this.currentPage = 1;
          this.getResiduals(this.currentPage);
        }
      }
    },
    dateStart(value) {
      if (!value) {
        if (this.keyword != "") {
          //? Call search function
          this.onSearch();
        } else {
          //? Get all residuals
          this.currentPage = 1;
          this.getResiduals(this.currentPage);
        }
      }
    },
    dateEnd(value) {
      if (value) {
        this.onSortByDates();
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getResiduals(this.currentPage);
  },

  methods: {
    //? Get residuals
    async getResiduals(page) {
      const res = await http.get(`residuals?page=${page}`);
      if (res.data.data.length > 0) {
        let data = res.data;
        this.residuals = data.data;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.total = data.total;
      } else {
        this.residuals = null;
        this.currentPage = 0;
        this.perPage = 0;
        this.total = 0;
      }
      try {
      } catch (err) {
        console.log(err);
      }
    },

    //? Sort by dates handle
    onSortByDates() {
      if (this.dateStart != null && this.dateEnd != null) {
        let data = new FormData();
        const dateStart = new Date(this.dateStart).toISOString().slice(0, 10);
        //? Add day to dateEnd
        let dateEnd = new Date(this.dateEnd);
        dateEnd.setDate(dateEnd.getDate() + 1);
        dateEnd = new Date(dateEnd).toISOString().slice(0, 10);
        data.append("start_date", dateStart);
        data.append("end_date", dateEnd);
        if (this.keyword != "") {
          data.append("keyword", this.keyword);
        }
        this.getResidualsByDate(data);
      }
    },

    //? Get residuals by date
    async getResidualsByDate(data) {
      try {
        const res = await http.post("residual/datesfilter", data);
        if (res.data.data.length > 0) {
          let data = res.data;
          this.residuals = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        } else {
          this.residuals = null;
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Search handle
    onSearch() {
      if (this.keyword != "") {
        //? Check dates sort input if not null call onSortByDates()
        if (this.dateStart != null && this.dateEnd != null) {
          this.onSortByDates();
        } else {
          //? Reset dates input maybe user input the one of them then search
          this.dateStart = null;
          this.dateEnd = null;

          //? Call getResidualsByKeyword()
          let data = new FormData();
          data.append("keyword", this.keyword);
          this.getResidualsByKeyword(data);
        }
      }
    },

    //? Get residuals by keyword
    async getResidualsByKeyword(data) {
      try {
        const res = await http.post("residual/search", data);
        if (res.data.data.length > 0) {
          let data = res.data;
          this.residuals = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        } else {
          this.residuals = null;
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Reset
    resetData() {
      //? Reset form
      this.dateStart = null;
      this.dateEnd = null;
      this.keyword = null;

      //? Get all residuals
      this.currentPage = 1;
      this.getResiduals(this.currentPage);
    },

    //? Pagination
    onPageClick(event) {
      this.currentPage = event;
      this.getResiduals(this.currentPage);
    },

    //? Edit handle
    editHandle(id) {
      //? Set defaul sweet alert
      const Swal = this.$swal.mixin({
        customClass: {
          title: "font-weight-bold custom",
          confirmButton:
            "px-6 py-3 ml-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
          denyButton:
            "px-6 py-3 ml-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none",
          cancelButton:
            "px-6 py-3 ml-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none",
        },
        buttonsStyling: false,
      });

      //? Call sweet alert
      Swal.fire({
        title: "อัปเดตข้อมูลสถานะแจ้งตกค้างรายวิชา",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "ยืนยันการแจ้งตกค้าง",
        denyButtonText: "ปฎิเสธการแจ้งตกค้าง",
        cancelButtonText: "ยกเลิก",
      }).then((res) => {
        if (res.isDenied) {
          this.residualStatus = "rejected";
          this.updateResidualStatus(id, this.residualStatus);
        } else if (res.isConfirmed) {
          this.residualStatus = "confirmed";
          this.updateResidualStatus(id, this.residualStatus);
        } else {
          return;
        }
      });
    },

    //? Edit residual status
    async updateResidualStatus(id, status) {
      try {
        let data = new FormData();
        data.append("status", status);
        const res = await http.post(`residual/update/status/${id}`, data);
        if (res.data.success) {
          this.$swal
            .fire({
              title: "อัปเดตสถานะแจ้งตกค้างรายวิชาสำเร็จ",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            })
            .then(() => {
              location.reload();
            });
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Delete
    deleteHandle(id) {
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
              .post(`residual/delete/${id}`)
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
