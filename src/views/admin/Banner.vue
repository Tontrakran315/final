<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-2">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto p-5">
          <div class="px-2">
            <!-- Title -->
            <div class="mt-6 text-center">
              <h1 class="py-6 text-xl md:text-3xl font-bold">
                CSMJU | การแสดงรูปภาพเคลื่อนไหว
              </h1>
            </div>

            <br class="shadow-xl" />

            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header -->
              <div class="flex flex-wrap">
                <div
                  class="font-bold text-md w-full pt-2 text-center md:text-left md:w-8/12"
                >
                  จำนวน {{ total }} รายการ
                </div>
                <div class="w-full py-2 text-center md:text-right md:w-4/12">
                  <router-link
                    to="/admin/banneradd"
                    class="px-4 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                  >
                    <i class="fas fa-plus"></i> เพิ่ม
                  </router-link>
                </div>
              </div>

              <!-- Simulator  -->
              <div class="w-full">
                <div class="md:border-l pl-4">
                  <label
                    class="block mt-4 mb-2 text-gray-700 text-lg font-semibold text-center md:text-left"
                    for="image"
                    >การแสดงรูปภาพเคลื่อนไหว</label
                  >
                  <div class="flex flex-wrap mb-4">
                    <div
                      v-for="image in banners"
                      :key="image.id"
                      class="w-full px-2 mb-4 border rounded-lg pt-2 pb-4 bg-blueGray-100 md:w-6/12 lg:w-4/12"
                    >
                      <div class="p-2 text-sm mx-2">
                        วันที่เผยแพร่ :
                        {{ image.created_at.substring(0, 10) }}
                      </div>

                      <div class="p-2 text-sm mx-2">
                        สถานะการแสดง :
                        <i
                          :class="
                            image.is_show
                              ? 'fas fa-eye text-emerald-500'
                              : 'fas fa-eye-slash text-red-500'
                          "
                        ></i>
                      </div>

                      <div class="p-2 text-sm mx-2">
                        <a
                          v-if="image.link != null"
                          :href="image.link"
                          target="_blank"
                          class="block font-normal mb-4 pb-2 text-gray-700 text-md text-left truncate"
                        >
                          URL : {{ image.link }}</a
                        >
                        <p
                          v-else
                          class="block font-normal mb-4 pb-2 text-gray-700 text-md text-left"
                        >
                          URL : ไม่มี
                        </p>
                      </div>

                      <div class="mb-4">
                        <img
                          :src="image.banner"
                          class="h-200-px center-img rounded-lg shadow-lg border-blueGray-300 border"
                          alt=""
                        />
                      </div>
                      <div class="text-center mt-4">
                        <button
                          @click="updateBanner(image.id)"
                          class="px-4 py-2 mr-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                          type="button"
                        >
                          <i class="fas fa-trash-alt"></i>
                          แก้ไข
                        </button>

                        <button
                          @click="deleteBanner(image.id)"
                          class="px-4 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-red-600 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                          type="button"
                        >
                          <i class="fas fa-trash-alt"></i>
                          ลบรูปภาพ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
</template>

<script>
//? Package
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
//? API
import http from "@/services/APIService";
export default {
  data() {
    return {
      banners: null,

      currentPage: null,
      total: null,
      perPage: null,
    };
  },

  components: {
    VueTailwindPagination,
  },

  mounted() {
    this.currentPage = 1;
    this.getBanners(this.currentPage);
  },

  methods: {
    //? Get Banners
    async getBanners(currentPage) {
      let banners = await http.get(`/banners/private?page=${currentPage}`);
      if (banners) {
        this.banners = banners.data.data;
        this.currentPage = banners.data.current_page;
        this.total = banners.data.total;
        this.perPage = banners.data.per_page;
      }
    },

    //? Paginate
    onPageClick(event) {
      this.currentPage = event;
      this.getBanners(this.currentPage);
    },

    updateBanner(id) {
      this.$router.push({ name: "BannerEdit", params: { id: id } });
    },

    //? Delete Banner
    deleteBanner(id) {
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
          title: "ยืนยันการลบรูปภาพ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            http
              .post(`banner/delete/${id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("ลบรูปภาพเรียบร้อย!", "", "success")
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
          } else {
            swalWithBootstrapButtons.fire(
              "ยกเลิกการลบรูปภาพเรียบร้อย!",
              "",
              "error"
            );
          }
        });
    },
  },
};
</script>
