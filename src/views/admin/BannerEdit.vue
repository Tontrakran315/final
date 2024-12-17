<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/banner">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | แก้ไขข้อมูลการแสดงรูปภาพเคลื่อนไหว
              </h1>
            </div>

            <br class="shadow-xl" />

            <form
              ref="addBanner"
              @submit.prevent="onSubmit"
              enctype="multipart/form-data"
            >
              <!-- Checkbox for banner status -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="isShow"
                      type="checkbox"
                      class="w-5 h-5 ml-1 rounded bg-blueGray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-blueGray-700">
                      แสดงรูปภาพเคลื่อนไหวในหน้าสาธารณะ
                    </span>
                  </label>
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
                  <label class="block my-3 text-gray-700 text-md"
                    >ลิงค์ที่เกี่ยวข้อง
                    <span v-if="isLink" class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="link"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    :class="!isLink ? 'bg-gray-200' : ''"
                    type="text"
                    placeholder="URL"
                    :disabled="!isLink"
                  />
                </div>
              </div>
              <div v-if="v$.link.$error" class="px-4 my-2 text-sm text-red-500">
                {{ v$.link.$errors[0].$message }}
              </div>

              <!-- Upload file -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >อัปโหลดรูปภาพ
                    <span class="text-red-500 text-sm"
                      >(ขนาดไฟล์ต้องไม่เกิน 8MB)</span
                    >
                  </label>
                  <input
                    ref="fileupload"
                    @change="onFileChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="file"
                  />
                  <img
                    v-if="imgUrl"
                    :src="imgUrl"
                    class="mt-2 rounded-lg shadow-lg center-img w-1/2 h-auto cropped bg-emerald-500"
                  />
                </div>
              </div>
              <div v-if="v$.file.$error" class="px-4 my-2 text-sm text-red-500">
                {{ v$.file.$errors[0].$message }}
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
                  <i class="fas fa-edit"></i> แก้ไขข้อมูล
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
import { helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      bannerId: this.$route.params.id,

      isShow: true,
      isLink: false,

      imgUrl: "",
      file: null,
      link: "",
    };
  },

  mounted() {
    this.getBanner();
  },

  methods: {
    //? Get banner data
    getBanner() {
      http
        .get(`banner/show/${this.bannerId}`)
        .then((res) => {
          if (res.data.success) {
            let data = res.data.data;
            this.imgUrl = data.banner;
            this.isShow = data.is_show;

            if (data.link != null) {
              this.isLink = true;
              this.link = data.link;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //? Upload file
    onFileChange(e) {
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

      const file = e.target.files[0];

      let size = file?.size / 10 ** 6;
      if (size > 8) {
        Swal.fire({
          icon: "error",
          title: "ไฟล์ที่อัปโหลดต้องมีขนาดไม่เกิน 8MB",
        }).then(() => {
          //? Reset
          this.file = null;
          this.imgUrl = "";
          this.$refs.fileupload.value = "";
        });
        return;
      }

      this.file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
    },

    //? Update function
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        if (this.file != null) {
          data.append("banner", this.file);
        }

        //? If isLink is true set data link else ''(Null)
        if (this.isLink) {
          data.append("link", this.link);
        } else {
          data.append("link", "");
        }

        //? isShow is false or 0 if true is 1
        if (!this.isShow) {
          data.append("is_show", 0);
        } else {
          data.append("is_show", 1);
        }

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        http
          .post(`banner/update/${this.bannerId}`, data)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "อัปเดตข้อมูลเรียบร้อย",
            }).then(() => {
              this.$router.push({ name: "Banner" });
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

    //? Reset form
    onResetForm() {
      this.v$.$reset();
      this.isShow = true;
      this.isLink = false;
      this.imgUrl = "";
      this.file = null;
      this.link = "";
      this.$refs.fileupload.value = null;
    },
  },

  validations() {
    return {
      link: {
        required: helpers.withMessage(
          "กรุณากรอกลิงค์ก่อน",
          () => !this.isLink || this.link != ""
        ),
      },
      file: {
        required: helpers.withMessage(
          "ไฟล์ที่อัปโหลดต้องเป็นไฟล์ .jpeg .jpg หรือ .png เท่านั้น",
          () => {
            if (this.file != null) {
              //? Check file type
              if (
                this.file.type == "image/jpeg" ||
                this.file.type == "image/jpg" ||
                this.file.type == "image/png"
              ) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          }
        ),
      },
    };
  },
};
</script>
