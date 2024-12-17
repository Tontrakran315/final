<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/materialshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลวัสดุอุปกรณ์
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.stop.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Line 1 -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อวัสดุอุปกรณ์
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="name"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Material name"
                  />
                  <div v-if="v$.name.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.name.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 2 -->
              <div class="flex flex-wrap mb-4 md:w-4/12">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >จำนวนวัสดุอุปกรณ์
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="quantity"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Quantity"
                  />
                  <div
                    v-if="v$.quantity.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.quantity.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 3 -->
              <div class="flex flex-wrap mb-2">
                <div class="w-full px-4 md:w-12/12">
                  <div class="mt-4">
                    <img
                      v-if="imgUrl"
                      :src="imgUrl"
                      class="h-200-px center-img rounded-lg shadow-md"
                    />
                  </div>

                  <label class="block my-3 text-gray-700 text-md"
                    >รูปภาพวัสดุอุปกรณ์
                    <span class="text-red-500 text-xs"
                      >(ไฟล์ที่อัปโหลดต้องมีขนาดไม่เกิน 8MB)</span
                    ></label
                  >
                  <input
                    ref="fileupload"
                    @change="onFileChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700 border-b"
                    type="file"
                  />
                  <div v-if="v$.file.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.file.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Buttons -->
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
//? Packages
import useValidate from "@vuelidate/core";
import { required, numeric, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      //? Form
      name: "",
      quantity: "",
      file: null,

      //? Image preview
      imgUrl: "",
    };
  },

  methods: {
    //? Upload handle
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

      this.file = e.target.files[0];

      let size = this.file?.size / 10 ** 6;
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

      this.imgUrl = URL.createObjectURL(this.file);
    },

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("name", this.name);
        data.append("quantity", this.quantity);

        if (this.file != null) {
          data.append("image", this.file);
        }

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        //? Send data to API
        http
          .post("material/new", data)
          .then((res) => {
            if (res.data.success) {
              let msg = res.data.message;
              Toast.fire({
                icon: "success",
                title: msg,
              }).then(() => {
                this.$router.push({ name: "MaterialShow" });
              });
            }
          })
          .catch((err) => {
            let errMsg = err?.response?.data?.message;
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
      this.name = "";
      this.quantity = "";
      this.file = null;
      this.imgUrl = "";
      this.$refs.fileupload.value = null;
    },
  },

  validations() {
    return {
      name: {
        required: helpers.withMessage("กรุณากรอกชื่อวัสดุอุปกรณ์", required),
      },
      quantity: {
        required: helpers.withMessage("กรุณากรอกจำนวนวัสดุอุปกรณ์", required),
        numeric: helpers.withMessage("กรุณากรอกตัวเลขเท่านั้น", numeric),
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
