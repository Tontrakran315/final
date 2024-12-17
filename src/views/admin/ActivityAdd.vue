<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/activityshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>

            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">เพิ่มข้อมูลกิจกรรม</h1>
            </div>

            <br class="shadow-xl" />

            <form
              ref="activityForm"
              enctype="multipart/form-data"
              @submit.stop.prevent="handleSubmit"
            >
              <!-- Checkbox for feed status -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="isShow"
                      type="checkbox"
                      class="w-5 h-5 ml-1 rounded bg-blueGray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-blueGray-700">
                      แสดงกิจกรรมในหน้าสาธารณะ
                    </span>
                  </label>
                </div>
              </div>

              <!-- Radio buttons -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-6/12 mt-2">
                  <div class="block my-3 text-gray-700 text-md">
                    ระยะเวลาการจัดกิจกรรม <span class="text-red-500">*</span>
                  </div>
                  <label
                    class="inline-flex items-center cursor-pointer my-4 mr-4"
                  >
                    <input
                      type="radio"
                      v-model="timePeriod"
                      value="1"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-0 bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      วันเดียว
                    </span>
                  </label>
                  <label class="inline-flex items-center cursor-pointer my-4">
                    <input
                      type="radio"
                      v-model="timePeriod"
                      value="2"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-0 bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      มากกว่า 1 วัน
                    </span>
                  </label>
                </div>
              </div>

              <!-- Single date time period = 1 -->
              <div
                class="flex flex-wrap mb-4"
                :class="{ hidden: !timePeriod || timePeriod === '2' }"
              >
                <div class="w-full px-4 md:w-6/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >วันที่จัดกิจกรรม <span class="text-red-500">*</span></label
                  >
                  <v-date-picker
                    v-model="activityDate"
                    mode="date"
                    :masks="mask"
                  >
                    <template #default="{ inputValue, inputEvents }">
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                        placeholder="Date start"
                        readonly
                      />
                    </template>
                  </v-date-picker>
                  <div
                    v-if="v$.activityDate.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityDate.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Date range time period = 2 -->
              <div
                class="mb-4"
                :class="{ hidden: !timePeriod || timePeriod === '1' }"
              >
                <v-date-picker
                  v-model="activityDates"
                  mode="date"
                  is-range
                  :masks="mask"
                  class="flex flex-wrap"
                >
                  <template v-slot="{ inputValue, inputEvents, isDragging }">
                    <!-- Date start -->
                    <div class="w-full px-4 md:w-6/12 mt-2">
                      <label class="block my-3 text-gray-700 text-md"
                        >วันที่จัดกิจกรรม
                        <span class="text-red-500">*</span></label
                      >
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                        placeholder="Date start"
                        readonly
                      />
                      <div
                        v-if="v$.activityDates.start.$error"
                        class="mt-2 text-sm text-red-500"
                      >
                        {{ v$.activityDates.start.$errors[0].$message }}
                      </div>
                    </div>

                    <!-- Date end -->
                    <div class="w-full px-4 md:w-6/12 mt-2">
                      <label class="block my-3 text-gray-700 text-md"
                        >วันที่จัดกิจกรรม
                        <span class="text-red-500">*</span></label
                      >
                      <input
                        class="w-full px-3 py-2 text-gray-700 focus:outline-none"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                        placeholder="Date end"
                        disabled
                      />
                      <div
                        v-if="v$.activityDates.end.$error"
                        class="mt-2 text-sm text-red-500"
                      >
                        {{ v$.activityDates.end.$errors[0].$message }}
                      </div>
                    </div>
                  </template>
                </v-date-picker>
              </div>

              <!-- Activity title -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-6/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >ชื่อกิจกรรม <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="activityTitle"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Title"
                  />
                  <div
                    v-if="v$.activityTitle.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityTitle.$errors[0].$message }}
                  </div>
                </div>

                <div class="w-full px-4 md:w-6/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >ผู้รับผิดชอบ <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="activityOrganizer"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Organizer"
                  />
                  <div
                    v-if="v$.activityOrganizer.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityOrganizer.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Activity location -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >รูปแบบกิจกรรม <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="activityLocation"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Location / Platform"
                  />
                  <div
                    v-if="v$.activityLocation.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityLocation.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Activity detail -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md"
                    >รายละเอียดกิจกรรม
                    <span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="activityDetail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Description"
                  ></textarea>
                  <div
                    v-if="v$.activityDetail.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityDetail.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Checkbox activity link -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="isLink"
                      type="checkbox"
                      class="w-5 h-5 ml-1 rounded bg-blueGray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-blueGray-700"> เพิ่มลิงค์ </span>
                  </label>
                </div>
              </div>

              <!-- Link -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="links"
                    >ลิงค์ที่เกี่ยวข้อง
                    <span v-if="isLink" class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="link"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    :class="!isLink ? 'bg-gray-200' : ''"
                    type="text"
                    placeholder="Activity Links (https://www.example.com)"
                    :disabled="!isLink"
                  />
                  <div v-if="v$.link.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.link.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Activity Poster -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 md:w-12/12 mt-2">
                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >อัปโหลดรูปภาพโปสเตอร์กิจกรรม
                    <span class="text-red-500 text-xs"
                      >* (ขนาดไฟล์ต้องไม่เกิน 8MB)</span
                    >
                  </label>
                  <input
                    ref="posterupload"
                    @change="onPosterChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="file"
                  />
                  <img
                    v-if="previewPoster"
                    :src="previewPoster"
                    class="mt-2 rounded-lg shadow-lg center-img w-1/2 h-auto cropped bg-emerald-500"
                  />
                </div>
                <div
                  v-if="v$.poster.$error"
                  class="px-4 my-2 text-sm text-red-500"
                >
                  {{ v$.poster.$errors[0].$message }}
                </div>
              </div>

              <!-- Upload images -->
              <div class="flex flex-wrap">
                <div class="w-full px-4 mt-4">
                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >อัปโหลดรูปภาพบรรยากาศกิจกรรม
                    <span class="text-red-500 text-xs">
                      (อัปโหลดได้ไม่เกิน 10 รูปภาพ และขนาดไฟล์ต้องไม่เกิน 8MB)
                    </span>
                  </label>
                  <input
                    ref="imagesupload"
                    @change="onImagesChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="file"
                    multiple
                  />
                </div>
                <div
                  v-if="v$.images.$error"
                  class="px-4 my-2 text-sm text-red-500"
                >
                  {{ v$.images.$errors[0].$message }}
                </div>
              </div>

              <!-- Preview images -->
              <div class="flex flex-wrap" v-if="previewImages">
                <div
                  class="px-4 mt-4 w-full md:w-4/12"
                  v-for="url in previewImages"
                  :key="url"
                >
                  <img
                    :src="url"
                    alt="images"
                    class="cropped-bg-thumbnail rounded-lg"
                  />
                </div>
              </div>

              <!-- Buttons -->
              <div class="py-6 text-center">
                <button
                  @click="handleReset"
                  class="px-6 py-4 mr-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-broom"></i> ล้าง
                </button>
                <button
                  class="px-6 py-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  <i class="fas fa-save"></i>
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
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
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      //? Validation
      v$: useValidate(),

      timePeriod: "1",

      //? Calendar mask
      mask: {
        input: "YYYY-MM-DD",
      },

      //? Form attributes
      isShow: true,
      isLink: false,
      //? Single date
      activityDate: null,
      //? Multiple date
      activityDates: {
        start: null,
        end: null,
      },
      activityTitle: "",
      activityOrganizer: "",
      activityDetail: "",
      activityLocation: "",
      link: "",

      //? File upload
      poster: null,
      previewPoster: "",
      images: null,
      previewImages: [],
    };
  },

  watch: {
    //? Watch time period change and reset date
    timePeriod(val) {
      if (val === "1") {
        this.activityDates = {
          start: null,
          end: null,
        };
      } else {
        this.activityDate = null;
      }
    },
  },

  methods: {
    //? Upload poster
    onPosterChange(e) {
      //? Set default SweetAlert2
      const Swal = this.$swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: {
          title: "font-semibold custom text-blueGray-600",
        },
      });

      this.poster = e.target.files[0];

      let size = this.poster?.size / 10 ** 6;
      if (size > 8) {
        Swal.fire({
          icon: "error",
          title: "ไฟล์ที่อัปโหลดต้องมีขนาดไม่เกิน 8MB",
        }).then(() => {
          //? Reset
          this.poster = null;
          this.previewPoster = "";
          this.$refs.posterupload.value = "";
        });
        return;
      }

      this.previewPoster = URL.createObjectURL(this.poster);
    },

    //? Upload images
    onImagesChange(e) {
      this.images = e.target.files || e.dataTransfer.files;
      //? Set default SweetAlert2
      const Swal = this.$swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: {
          title: "font-semibold custom text-blueGray-600",
        },
      });

      let length = this.images.length;
      //? Check if images is more than 10
      if (length > 10) {
        Swal.fire({
          icon: "error",
          title: "อัปโหลดรูปภาพได้ไม่เกิน 10 รูป",
        }).then(() => {
          //? Reset file input
          this.images = null;
          this.$refs.imagesupload.value = "";
        });
        return;
      }

      for (let i = 0; i < length; i++) {
        let size = this.images[i].size / 10 ** 6;
        if (size > 8) {
          Swal.fire({
            icon: "error",
            title: "ไฟล์ที่อัปโหลดต้องมีขนาดไม่เกิน 8MB",
          }).then(() => {
            //? Reset
            this.images = null;
            this.previewImages = [];
            this.$refs.imagesupload.value = "";
          });
          return;
        }
      }

      //? Call createImage method for each file
      this.createImage(this.images);
    },

    //? Create images and push to previewImages[]
    createImage(files) {
      //? Reset array first
      this.previewImages = [];

      //? Loop through files
      const len = files.length;
      for (let i = 0; i < len; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    //? Reset form
    handleReset() {
      this.v$.$reset();
      this.isShow = true;
      this.isLink = false;
      this.timePeriod = "1";
      this.activityDate = null;
      this.activityDates = {
        start: null,
        end: null,
      };
      this.activityTitle = "";
      this.activityOrganizer = "";
      this.activityLocation = "";
      this.activityDetail = "";
      this.link = "";
      this.poster = null;
      this.previewPoster = "";
      this.images = null;
      this.previewImages = [];
      this.$refs.posterupload.value = "";
      this.$refs.imagesupload.value = "";
    },

    //? Submit form
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        if (this.timePeriod === "1") {
          const dateStart = new Date(this.activityDate)
            .toISOString()
            .slice(0, 10);
          data.append("date_start", dateStart);
          data.append("date_end", "");
        } else {
          const dateStart = new Date(this.activityDates.start)
            .toISOString()
            .slice(0, 10);
          const dateEnd = new Date(this.activityDates.end)
            .toISOString()
            .slice(0, 10);
          data.append("date_start", dateStart);
          data.append("date_end", dateEnd);
        }

        if (this.isShow) {
          //? If isShow is true, set is_show to 1
          data.append("is_show", 1);
        } else {
          //? If isShow is false, set is_show to 0
          data.append("is_show", 0);
        }

        if (this.isLink) {
          //? isLink is true add link to field
          data.append("link", this.link);
        }

        data.append("name", this.activityTitle);
        data.append("organizer", this.activityOrganizer);
        data.append("location", this.activityLocation);
        data.append("detail", this.activityDetail);
        data.append("poster", this.poster);

        if (this.images) {
          const len = this.images.length;
          for (let i = 0; i < len; i++) {
            data.append("images[]", this.images[i]);
          }
        }

        http
          .post(`activity/new`, data)
          .then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: "success",
              title: "เพิ่มข้อมูลใหม่เรียบร้อย",
            }).then(() => {
              this.$router.push({ name: "ActivityShow" });
            });
          })
          .catch((error) => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            let errMsg = error?.response?.data?.message;
            if (errMsg) {
              Toast.fire({
                icon: "error",
                title: errMsg,
              });
              return;
            }
            Toast.fire({
              icon: "error",
              title: "ขออภัย ทำรายการไม่สำเร็จ",
            });
          });
      }
    },
  },

  validations() {
    return {
      activityDate: {
        required: helpers.withMessage(
          "กรุณาป้อนวันที่และเวลาของกิจกรรมก่อน",
          () => {
            if (this.timePeriod === "1") {
              if (this.activityDate) {
                return true;
              } else {
                return false;
              }
            }
            return true;
          }
        ),
      },
      activityDates: {
        start: {
          required: helpers.withMessage(
            "กรุณาป้อนวันที่และเวลาของกิจกรรมก่อน",
            () => {
              if (this.timePeriod === "2") {
                if (this.activityDates.start) {
                  return true;
                } else {
                  return false;
                }
              }
              return true;
            }
          ),
        },
        end: {
          required: helpers.withMessage(
            "กรุณาป้อนวันที่และเวลาของกิจกรรมก่อน",
            () => {
              if (this.timePeriod === "2") {
                if (this.activityDates.end) {
                  return true;
                } else {
                  return false;
                }
              }
              return true;
            }
          ),
        },
      },
      activityOrganizer: {
        required: helpers.withMessage(
          "กรุณาป้อนชื่อผู้จัดกิจกรรมก่อน",
          required
        ),
      },
      activityLocation: {
        required: helpers.withMessage(
          "กรุณาป้อนสถานที่จัดกิจกรรมก่อน",
          required
        ),
      },
      activityDetail: {
        required: helpers.withMessage(
          "กรุณาป้อนรายละเอียดกิจกรรมก่อน",
          required
        ),
      },
      activityTitle: {
        required: helpers.withMessage("กรุณาป้อนชื่อกิจกรรมก่อน", required),
      },
      poster: {
        required: helpers.withMessage(
          "ไฟล์ที่อัปโหลดต้องเป็นไฟล์ .jpeg .jpg หรือ .png เท่านั้น",
          () => {
            if (this.poster != null) {
              //? Check file type
              if (
                this.poster.type == "image/jpeg" ||
                this.poster.type == "image/jpg" ||
                this.poster.type == "image/png"
              ) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        ),
      },
      images: {
        required: helpers.withMessage(
          "กรุณาอัปโหลดรูปภาพ ไฟล์ที่อัปโหลดต้องเป็นไฟล์ .jpeg .jpg หรือ .png เท่านั้น",
          () => {
            if (this.images !== null) {
              const len = this.images.length;
              for (let i = 0; i < len; i++) {
                const file = this.images[i];
                const type = file.type;
                if (
                  type !== "image/jpeg" &&
                  type !== "image/jpg" &&
                  type !== "image/png"
                ) {
                  return false;
                }
              }
              return true;
            } else {
              return true;
            }
          }
        ),
      },
      link: {
        required: helpers.withMessage(
          "ป้อนลิงค์ก่อน",
          () => !this.isLink || this.link != ""
        ),
      },
    };
  },
};
</script>
