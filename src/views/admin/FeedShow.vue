<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">CSMJU | ระบบประกาศข่าวสาร</h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div div class="px-4 py-3 mb-0 border-0 rounded-t">
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-bold text-md md:w-2/12">
                    จำนวน {{ total }} รายการ
                  </div>

                  <!-- Search data -->
                  <div class="w-full px-4 py-4 md:w-6/12">
                    <form @submit.stop.prevent="onSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น หัวข้อข่าว เนื้อหาข่าว หรือประเภทข่าว"
                        aria-label="Search"
                      />
                    </form>
                  </div>

                  <!-- Buttons -->
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
                      to="/admin/feedadd"
                      class="px-4 py-2 mb-1 ml-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      <i class="fas fa-plus"></i> เพิ่ม
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- News Feeds table -->
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
                          หัวข้อข่าว
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          สถานะการแสดง
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ประเภท
                        </th>
                        <th
                          class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          รายละเอียด
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
                        v-for="(feed, index) in news"
                        :key="index"
                      >
                        <td
                          class="py-3 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          <h5 class="w-48 font-semibold truncate text-md">
                            {{ feed.title }}
                          </h5>
                          <p>
                            เผยแพร่ :
                            {{ new Date(feed.created_at).toLocaleDateString() }}
                          </p>
                          <p>
                            เวลา :
                            {{
                              new Date(feed.created_at).toString().split(" ")[4]
                            }}
                          </p>
                        </td>

                        <td
                          class="py-3 px-4 text-sm text-center align-middle whitespace-nowrap"
                        >
                          <i
                            :class="
                              feed.is_show
                                ? 'fas fa-eye text-emerald-500'
                                : 'fas fa-eye-slash text-red-500'
                            "
                          ></i>
                        </td>

                        <td
                          class="py-3 px-4 text-sm align-middle whitespace-nowrap"
                        >
                          {{ feed.type }}
                        </td>

                        <td class="py-3 px-4 text-sm align-middle">
                          <div class="w-96">
                            <p class="w-auto font-normal text-truncate-3">
                              {{ feed.detail }}
                            </p>
                          </div>
                        </td>

                        <!-- Edit and Delete buttons -->
                        <td
                          class="py-3 px-4 text-xs align-middle whitespace-nowrap"
                        >
                          <button
                            @click="onUpdate(feed.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            @click="onDelete(feed.id)"
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
  data() {
    return {
      //? Data
      news: null,

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
        this.getNews(this.currentPage);
      }
    },
  },

  mounted() {
    this.currentPage = 1;
    this.getNews(this.currentPage);
  },

  methods: {
    //? Get news
    async getNews(pageNumber) {
      const res = await http.get(`news/private?page=${pageNumber}`);
      if (res) {
        let data = res?.data;
        this.news = data?.data;
        this.currentPage = data?.current_page;
        this.perPage = data?.per_page;
        this.total = data?.total;
      }
    },

    //? Search function
    onSearch() {
      if (this.keyword !== "") {
        this.currentPage = 1;
        this.getNewsSearch(this.currentPage);
      }
    },

    //? Get news by search
    async getNewsSearch(pageNumber) {
      let data = new FormData();
      data.append("keyword", this.keyword);
      const res = await http.post(
        `news/search/private?page=${pageNumber}`,
        data
      );
      if (res) {
        let data = res?.data;
        this.news = data?.data;
        this.currentPage = data?.current_page;
        this.perPage = data?.per_page;
        this.total = data?.total;
      }
    },

    //? Reset search form
    resetSearch() {
      this.currentPage = 1;
      this.getNews(this.currentPage);
      this.keyword = "";
    },

    //? Paginate
    onPageClick(event) {
      this.currentPage = event;
      if (this.keyword === "") {
        this.getNews(this.currentPage);
      } else {
        this.getNewsSearch(this.currentPage);
      }
    },

    //? Update function
    onUpdate(id) {
      this.$router.push({ name: "EditFeed", params: { id: id } });
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
            //? Call API
            http
              .delete(`news/delete/${id}`)
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
