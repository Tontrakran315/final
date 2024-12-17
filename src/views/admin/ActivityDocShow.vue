<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 md:text-3xl text-xl font-bold">
                CSMJU | ระบบบันทึกเอกสารการเข้าร่วมกิจกรรม
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
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อเอกสาร หรือ ชื่อกิจกรรม"
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
                      to="/admin/activitydoc/add"
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Table of activity docs -->
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
                          ชื่อกิจกรรม / โครงการ
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ชื่อเอกสาร
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
                        v-for="(doc, index) in activityDocs"
                        :key="index"
                      >
                        <td
                          class="p-4 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          {{ doc.activity_name }}
                        </td>
                        <td
                          class="p-4 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          <a
                            :href="doc.file"
                            target="_blank"
                            class="hover:text-emerald-600 underline decoration-solid"
                          >
                            {{ doc.name }}
                          </a>
                        </td>
                        <td
                          class="p-4 px-4 text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="handleEdit(doc.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="handleDelete(doc.id)"
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
      activityDocs: null,

      //? Search
      keyword: "",

      //? Paginate
      currentPage: 0,
      perPage: 0,
      total: 0,
    };
  },

  components: { VueTailwindPagination },

  watch: {
    keyword(val) {
      if (!val) {
        this.currentPage = 1;
        this.getActivityDocs(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getActivityDocs(this.currentPage);
  },

  methods: {
    //? Get activities
    async getActivityDocs(page) {
      try {
        //? Get data
        const response = await http.get(`activity/docs?page=${page}`);
        if (response.data.data.length > 0) {
          let data = response.data;
          this.activityDocs = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        } else {
          this.activityDocs = null;
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Search handle
    handleSearch() {
      if (this.keyword !== "") {
        this.currentPage = 1;
        this.searchActivityDocs(this.currentPage);
      }
    },

    //? Search activities
    async searchActivityDocs(page) {
      try {
        let data = new FormData();
        data.append("keyword", this.keyword);
        //? Get data
        const response = await http.post(
          `activity/docs/search?page=${page}`,
          data
        );
        if (response.data.data.length > 0) {
          let data = response.data;
          this.activityDocs = data.data;
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.total = data.total;
        } else {
          this.activityDocs = null;
          this.currentPage = 0;
          this.perPage = 0;
          this.total = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Reset handle
    handleReset() {
      this.keyword = "";
      this.currentPage = 1;
      this.getActivityDocs(this.currentPage);
    },

    //? Pagination
    onPageClick(page) {
      this.currentPage = page;
      if (this.keyword !== "") {
        this.searchActivityDocs(this.currentPage);
      } else {
        this.getActivityDocs(this.currentPage);
      }
    },

    //? Edit handle
    handleEdit(id) {
      this.$router.push({ name: "ActivityDocEdit", params: { id: id } });
    },

    //? Delete handle
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
              .delete(`activity/doc/delete/${id}`)
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
