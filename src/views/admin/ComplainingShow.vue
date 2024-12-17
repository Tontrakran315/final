<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">CSMJU | แจ้งติดต่อกลับ</h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div class="px-4 py-3 mb-0 border-0 rounded-t">
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-bold text-md md:w-2/12">
                    จำนวน {{ this.total }} รายการ
                  </div>

                  <div class="w-full px-4 py-4 md:w-6/12">
                    <!-- <form @submit.prevent="onSubmit">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนชื่อที่ต้องการค้นหา"
                        aria-label="Search"
                      />
                      <button
                        @click="submitSearchForm"
                        type="submit"
                        class="hidden"
                      >
                        Submit
                      </button>
                    </form> -->
                  </div>

                  <div class="w-full px-4 text-center md:w-4/12">
                    <!-- <button
                      @click="submitSearchForm"
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
                    </button> -->
                  </div>
                </div>
              </div>

              <!-- Complain table -->
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
                          หัวข้อ
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          รายละเอียด
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          ไฟล์แนบ / รูปภาพ
                        </th>

                        <th
                          class="px-6 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                        >
                          สถานะ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b"
                        v-for="(report, index) in complains"
                        :key="index"
                      >
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0"
                        >
                          <h5
                            class="w-48 flex flex-col font-semibold truncate text-md text-green-400"
                          >
                            {{ report.title }}
                            <span class="font-normal text-xs text-black">
                              วันที่ :
                              {{
                                new Date(report.created_at).toLocaleDateString()
                              }}
                            </span>
                            <span class="font-normal text-xs text-black">
                              เวลา :
                              {{
                                new Date(report.created_at).toLocaleTimeString()
                              }}
                            </span>
                          </h5>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0"
                        >
                          <p class="w-48 font-normal truncate-3">
                            {{ report.detail }}
                          </p>
                        </td>
                        <td
                          class="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <!-- Image not null -->
                          <a
                            :href="report.image"
                            target="_blank"
                            v-if="report.image != null"
                          >
                            <img
                              class="w-48 h-auto hover:zoom shadow-lg rounded overflow-hidden"
                              :src="report.image"
                              alt="report image"
                            />
                          </a>

                          <!-- Image null -->
                          <img
                            :src="image"
                            class="w-48 h-auto hover:zoom shadow-lg rounded overflow-hidden"
                            alt="image null"
                            v-else
                          />
                        </td>

                        <td
                          class="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                        >
                          <button
                            @click="onRead(report.id)"
                            class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                            type="button"
                          >
                            <i class="fa-sharp fa-solid fa-book"></i>
                          </button>
                          <button
                            @click="onDelete(report.id)"
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
      complains: null,

      //? Paginate
      currentPage: 0,
      perPage: 0,
      total: 0,
    };
  },

  components: {
    VueTailwindPagination,
  },

  mounted() {
    this.currentPage = 1;
    this.getComplains(this.currentPage);
  },

  methods: {
    //? Get data
    async getComplains(pageNumber) {
      let res = await http.get(`complains?page=${pageNumber}`);
      if (res) {
        let data = res.data;
        this.complains = data.data;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.total = data.total;
      }
    },

    //? Read more
    onRead(id) {
      this.$router.push({ name: "ComplainingRead", params: { id: id } });
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
              .post(`complain/delete/${id}`)
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

    //? Paginate
    onPageClick(event) {
      this.currentPage = event;
      this.getComplains(this.currentPage);
    },
  },
};
</script>
