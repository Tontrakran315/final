<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/feed">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | เพิ่มข้อมูลข่าวสาร
              </h1>
            </div>

            <br class="shadow-xl" />
            <form
              ref="addNewsForm"
              @submit.prevent="onSubmit"
              enctype="multipart/form-data"
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
                      แสดงข่าวสารในหน้าสาธารณะ
                    </span>
                  </label>
                </div>
              </div>

              <!-- Head news and type -->
              <div class="flex flex-wrap mb-4">
                <!-- Head -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >หัวข้อข่าว
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="title"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="News Title"
                  />
                  <div v-if="v$.title.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.title.$errors[0].$message }}
                  </div>
                </div>

                <!-- Type -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Type"
                    >ประเภทข่าว
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="type"
                    class="w-full px-3 py-2 leading-tight"
                    :class="type == '' ? 'text-placeholder' : 'text-gray-700'"
                  >
                    <option value="" selected disabled>News type</option>
                    <option value="ทั่วไป">ทั่วไป</option>
                    <option value="ประกาศ">ประกาศ</option>
                    <option value="รับสมัคร">รับสมัคร</option>
                    <option value="ประชาสัมพันธ์">ประชาสัมพันธ์</option>
                    <option value="ทุนการศึกษา">ทุนการศึกษา</option>
                    <option value="กิจกรรม">กิจกรรม</option>
                    <option value="เร่งด่วน">เร่งด่วน</option>
                  </select>
                  <div v-if="v$.type.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.type.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Datail -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="Detail"
                    >รายละเอียด
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="detail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="News Description"
                  ></textarea>
                  <div
                    v-if="v$.detail.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.detail.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Checkbox for link -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
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
                    placeholder="News Links / Read more (www.example.com)"
                    :disabled="!isLink"
                  />
                  <div v-if="v$.link.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.link.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Feed Poster -->
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

              <!-- Button -->
              <div class="py-6 text-center">
                <button
                  @click="onResetForm"
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
//? Pakages
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      //? Validation
      v$: useValidate(),

      //? Checkbox form
      isShow: true,
      isLink: false,

      //? Form
      title: "",
      detail: "",
      link: "",
      type: "",

      //? File upload
      poster: null,
      previewPoster: "",
      images: null,
      previewImages: [],
    };
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

      //? Check if images is more than 10
      let length = this.images.length;
      if (length > 10) {
        Swal.fire({
          icon: "error",
          title: "อัปโหลดรูปภาพได้ไม่เกิน 10 รูป",
        }).then(() => {
          //? Reset file input
          this.images = null;
          this.previewImages = [];
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

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("title", this.title);
        data.append("detail", this.detail);
        data.append("poster", this.poster);
        data.append("type", this.type);

        //? If isShow is false set data is_show to 0 else 1
        if (!this.isShow) {
          data.append("is_show", 0);
        } else {
          data.append("is_show", 1);
        }

        //? If isLink is true set data link else null
        if (this.isLink) {
          data.append("link", this.link);
        } else {
          data.append("link", "");
        }

        //? If images is not null append poster to data
        if (this.images) {
          const len = this.images.length;
          for (let i = 0; i < len; i++) {
            data.append("images[]", this.images[i]);
          }
        }

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        //? Post data
        http
          .post("news/new", data)
          .then((res) => {
            let msg = res.data.message;
            Toast.fire({
              icon: "success",
              title: msg,
            }).then(() => {
              this.$router.push({ name: "Feed" });
            });
          })
          .catch((error) => {
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

    onResetForm() {
      this.v$.$reset();
      this.isShow = true;
      this.isLink = false;
      this.title = "";
      this.detail = "";
      this.link = "";
      this.type = "";
      this.poster = null;
      this.previewPoster = "";
      this.images = null;
      this.previewImages = [];
      this.$refs.posterupload.value = "";
      this.$refs.imagesupload.value = "";
    },
  },

  validations() {
    return {
      detail: {
        required: helpers.withMessage("ป้อนรายละเอียดข่าวก่อน", required),
      },
      title: {
        required: helpers.withMessage("ป้อนหัวข้อข่าวก่อน", required),
      },
      type: {
        required: helpers.withMessage("ป้อนประเภทข่าวก่อน", required),
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
