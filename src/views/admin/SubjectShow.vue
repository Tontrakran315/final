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
                CSMJU | การแสดงข้อมูลหลักสูตรรายวิชา
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
                    <form @submit.stop.prevent="onSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น รหัสวิชา ชื่อรายวิชา หรือกลุ่มรายวิชา"
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
                    <router-link to="/admin/subjectadd">
                      <button
                        class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                        type="button"
                      >
                        <i class="fas fa-plus"></i> เพิ่ม
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Subjects table -->
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
                          รหัสรายวิชา
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อรายวิชา
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          หน่วยกิต
                        </th>

                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          กลุ่มรายวิชา
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
                        v-for="subject in subjects"
                        :key="subject.id"
                        class="border-b"
                      >
                        <td
                          class="w-5 p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <div>
                            <p class="w-12 font-normal">
                              {{ subject.subject_code }}
                            </p>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <div
                            class="flex items-center text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                          >
                            <span class="ml-3 text-sm font-semiBold">
                              {{ subject.name_th }}
                              <div class="text-xs font-normal">
                                {{ subject.name_en }}
                              </div>
                            </span>
                          </div>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <p class="font-normal truncate-3">
                            {{ subject.credit }} ( {{ subject.theory_hour }}-{{
                              subject.practical_hour
                            }}-{{ subject.self_hour }} )
                          </p>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-wrap"
                        >
                          <div class="w-56">
                            <p class="w-48 font-normal">
                              {{ subject.detail }}
                            </p>
                          </div>
                        </td>

                        <td
                          class="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <button
                            @click="onUpdate(subject.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(subject.id)"
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
  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      //? Data
      subjects: null,

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,

      //? Search form
      keyword: "",
    };
  },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getSubjects(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getSubjects(this.currentPage);
  },

  methods: {
    //? Get subjects
    async getSubjects(currentPage) {
      let subjects = await http.get(`subjects?page=${currentPage}`);
      if (subjects) {
        this.subjects = subjects.data.data;
        this.currentPage = subjects.data.current_page;
        this.perPage = subjects.data.per_page;
        this.total = subjects.data.total;
      }
    },

    //? Paginate
    onPageClick(event) {
      this.currentPage = event;
      //? If keyword is empty call getSubjects function else call onSearch function
      if (this.keyword == "") {
        this.getSubjects(this.currentPage);
      } else {
        this.getSubjectsSearch(this.currentPage);
      }
    },

    //? Search function
    onSearch() {
      if (this.keyword != "") {
        this.currentPage = 1;
        this.getSubjectsSearch(this.currentPage);
      }
    },

    //? Get subjects by search
    async getSubjectsSearch(pageNumber) {
      let subjects = await http.get(
        `subject/search/${this.keyword}?page=${pageNumber}`
      );
      if (subjects) {
        this.subjects = subjects.data.data;
        this.currentPage = subjects.data.current_page;
        this.perPage = subjects.data.per_page;
        this.total = subjects.data.total;
      }
    },

    //? Reset search form
    resetSearch() {
      this.keyword = "";
      this.currentPage = 1;
      this.getSubjects(this.currentPage);
    },

    onUpdate(id) {
      this.$router.push({ name: "SubjectEdit", params: { id: id } });
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
              .post(`subject/delete/${id}`)
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
