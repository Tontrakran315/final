<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/documentshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลเอกสาร
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.stop.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Checkbox -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="isShow"
                      type="checkbox"
                      class="w-5 h-5 ml-1 rounded bg-blueGray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-blueGray-700">
                      แสดงเอกสารในหน้าสาธารณะ
                    </span>
                  </label>
                </div>
              </div>

              <!-- Document name -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อเอกสาร
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="name"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="File name"
                  />
                  <div v-if="v$.name.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.name.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Upload pdf -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <!-- Preview -->
                  <div class="mt-4 mb-4 text-center" v-if="pdf != null">
                    <div class="flex justify-center">
                      <iframe
                        :src="pdf"
                        frameborder="0"
                        class="w-full md:w-8/12 h-600-px rounded shadow-md"
                      ></iframe>
                    </div>
                  </div>

                  <label class="block my-3 text-gray-700 text-md"
                    >เอกสารโครงงาน
                    <span class="text-red-500 text-sm"
                      >* (ขนาดไฟล์ต้องไม่เกิน 15MB)</span
                    ></label
                  >
                  <div
                    class="relative flex items-center justify-center h-32 bg-gray-100 border-b border-blue-700"
                  >
                    <input
                      ref="fileupload"
                      type="file"
                      @change="onFileChange"
                      accept="application/pdf"
                      class="w-full h-50-px opacity-0 p-3 bg-white"
                    />
                  </div>
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
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      isShow: true,

      //? Form
      name: "",
      file: null,

      //? PDF Preview
      pdf: null,
    };
  },

  methods: {
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

      this.file = e.target.files[0];

      let size = this.file?.size / 10 ** 6;
      if (size > 15) {
        Swal.fire({
          icon: "error",
          title: "ไฟล์ที่อัปโหลดต้องมีขนาดไม่เกิน 15MB",
        }).then(() => {
          //? Reset
          this.file = null;
          this.pdf = null;
          this.$refs.fileupload.value = "";
        });
        return;
      }

      this.pdf = URL.createObjectURL(this.file);
    },

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();

        //? if isShow is false it's meam is_show is 0 if true is_show is 1
        if (!this.isShow) {
          data.append("is_show", 0);
        } else {
          data.append("is_show", 1);
        }

        data.append("name", this.name);
        data.append("file", this.file);

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        http
          .post("document/new", data)
          .then((res) => {
            if (res.data.success) {
              let msg = res.data.message;
              Toast.fire({
                icon: "success",
                title: msg,
              }).then(() => {
                this.$router.push({ name: "DocumentShow" });
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
      this.isShow = true;
      this.name = "";
      this.file = null;
      this.pdf = null;
      this.$refs.fileupload.value = null;
    },
  },

  validations() {
    return {
      name: {
        required: helpers.withMessage("กรุณากรอกชื่อเอกสาร", required),
      },
      file: {
        required: helpers.withMessage(
          "กรุณาอัปโหลดไฟล์โครงงาน ต้องเป็นไฟล์ .pdf เท่านั้น",
          () => {
            if (this.file != null) {
              return this.file.type == "application/pdf" ? true : false;
            } else {
              return false;
            }
          }
        ),
      },
    };
  },
};
</script>
