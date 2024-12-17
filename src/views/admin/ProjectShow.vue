<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">CSMJU | ระบบสืบค้นโครงงาน</h1>
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
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อ รหัสโครงงาน หรือชื่ออาจารย์ที่ปรึกษา"
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
                      to="projectadd"
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
                          class="px-4 py-3 w-auto text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          รหัสโครงงาน
                        </th>
                        <th
                          class="px-4 py-3 w-64 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อโครงงาน (ลิงค์ไฟล์)
                        </th>
                        <th
                          class="px-4 py-3 w-auto text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อผู้ทำโครงงาน
                        </th>
                        <th
                          class="px-4 py-3 w-auto text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่ออาจารย์ที่ปรึกษา
                        </th>
                        <th
                          class="px-4 py-3 w-auto text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          การจัดการ
                        </th>
                      </tr>
                    </thead>

                    <!-- Body -->
                    <tbody>
                      <tr v-for="(project, index) in projects" :key="index">
                        <td
                          class="px-4 w-auto text-sm align-middle whitespace-nowrap"
                        >
                          {{ project.project_code }}
                        </td>
                        <td class="px-4 w-auto text-sm align-middle">
                          <a
                            :href="project.file"
                            target="_blank"
                            class="hover:text-emerald-600 underline decoration-solid"
                          >
                            {{ project.name }}
                          </a>
                        </td>
                        <td
                          class="px-4 w-auto text-sm align-middle whitespace-nowrap"
                        >
                          <p>{{ project.editor_1 }}</p>
                          <p v-if="project.editor_2 != null">
                            {{ project.editor_2 }}
                          </p>
                          <p v-if="project.editor_3 != null">
                            {{ project.editor_3 }}
                          </p>
                        </td>
                        <td
                          class="px-4 w-auto text-sm align-middle whitespace-nowrap"
                        >
                          <p class="text-xs font-bold">ประธาน</p>
                          <p>
                            {{ project.chairman_name_title
                            }}{{ project.chairman_name }}
                          </p>

                          <div
                            v-if="
                              project.director_1_name_title != null &&
                              project.director_1_name != null
                            "
                          >
                            <p class="text-xs font-bold">กรรมการ</p>
                            <p>
                              {{ project.director_1_name_title
                              }}{{ project.director_1_name }}
                            </p>
                          </div>

                          <div
                            v-if="
                              project.director_2_name_title != null &&
                              project.director_2_name != null
                            "
                          >
                            <p class="text-xs font-bold">กรรมการ</p>
                            <p>
                              {{ project.director_2_name_title
                              }}{{ project.director_2_name }}
                            </p>
                          </div>
                        </td>
                        <!-- Edit -->
                        <td
                          class="px-4 w-auto text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="onUpdate(project.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(project.id)"
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
  data() {
    return {
      //? Data
      projects: null,

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
        this.getProjects(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getProjects(this.currentPage);
  },

  methods: {
    //? Get data
    async getProjects(pageNumber) {
      let res = await http.get(`projects?page=${pageNumber}`);
      if (res) {
        let data = res.data;
        this.projects = data.data;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.total = data.total;
      }
    },

    //? Paginate
    onPageClick(pageNumber) {
      this.currentPage = pageNumber;

      if (this.keyword == "") {
        this.getProjects(this.currentPage);
      } else {
        this.getProjectsSearch(this.currentPage);
      }
    },

    //? Search
    onSearch() {
      if (this.keyword != "") {
        this.currentPage = 1;
        this.getProjectsSearch(this.currentPage);
      }
    },

    //? Reset Search
    resetSearchForm() {
      this.keyword = "";
      this.currentPage = 1;
      this.getProjects(this.currentPage);
    },

    //? Get data filter by keyword
    async getProjectsSearch(pageNumber) {
      let data = new FormData();
      data.append("keyword", this.keyword);

      let res = await http.post(`project/search?page=${pageNumber}`, data);
      if (res) {
        let data = res.data;
        this.projects = data.data;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.total = data.total;
      }
    },

    //? Update
    onUpdate(id) {
      this.$router.push({ name: "ProjectEdit", params: { id: id } });
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
              .post(`project/delete/${id}`)
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
