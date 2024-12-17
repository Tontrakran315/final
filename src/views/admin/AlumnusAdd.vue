<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/alumnusshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | เพิ่มข้อมูลศิษย์เก่า
              </h1>
            </div>

            <br class="shadow-xl" />

            <!-- Form -->
            <form
              ref="addProductForm"
              @submit.prevent="onSubmit"
              enctype="multipart/form-data"
            >
              <!-- Generation -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-4/12">
                  <label
                    class="block my-3 text-gray-700 text-md"
                    for="generation"
                    >ศิษย์เก่ารุ่นที่
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="generation"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    :class="{ 'text-placeholder': generation == '' }"
                  >
                    <option value="" selected disabled>
                      Alumni generation
                    </option>
                    <option
                      v-for="index in years"
                      :key="index"
                      :value="years + 1 - index"
                    >
                      ศิษย์เก่าวิทย์คอม รุ่นที่ {{ years + 1 - index }}
                    </option>
                  </select>
                  <div
                    v-if="v$.generation.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.generation.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Name -->
              <div class="flex flex-wrap mb-4">
                <!-- First name -->
                <div class="w-full px-4 md:w-6/12">
                  <label
                    class="block my-3 text-gray-700 text-md"
                    for="firstname"
                    >ชื่อ
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="firstname"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Firstname"
                  />
                  <div
                    v-if="v$.firstname.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.firstname.$errors[0].$message }}
                  </div>
                </div>

                <!-- Last name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="lastname"
                    >นามสกุล
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="lastname"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Lastname"
                  />
                  <div
                    v-if="v$.lastname.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.lastname.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Work -->
              <div class="flex flex-wrap mb-4">
                <!-- Walk place -->
                <div class="w-full px-4 md:w-6/12">
                  <label
                    class="block my-3 text-gray-700 text-md"
                    for="workplace"
                    >สังกัดหน่วยงาน / บริษัท
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="workplace"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Workplace"
                  />
                  <div
                    v-if="v$.workplace.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.workplace.$errors[0].$message }}
                  </div>
                </div>

                <!-- Work position -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="position"
                    >ตำแหน่งงาน
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="position"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Position"
                  />
                  <div
                    v-if="v$.position.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.position.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Caption -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="caption"
                    >ประวัติส่วนตัว / คติประจำใจ</label
                  >
                  <textarea
                    v-model="caption"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Caption"
                  ></textarea>
                </div>
              </div>

              <!-- Image -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <div class="mt-4">
                    <img
                      v-if="imgUrl"
                      :src="imgUrl"
                      class="w-48 h-200-px center-img cropped"
                    />
                  </div>

                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >รูปภาพศิษย์เก่า
                    <span class="text-red-500 text-xs"
                      >(ขนาดไฟล์ต้องไม่เกิน 8MB)</span
                    ></label
                  >
                  <input
                    ref="fileupload"
                    @change="onFileChange"
                    accept="image/*"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
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
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      //? Alumni generation
      years: new Date().getFullYear() - 1997,

      //? Form
      firstname: "",
      lastname: "",
      generation: "",
      workplace: "",
      position: "",
      caption: "",
      file: null,

      //? Image preview
      imgUrl: "",
    };
  },
  methods: {
    //? Upload image
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

    //? Reset form
    onResetForm() {
      this.v$.$reset();
      this.firstname = "";
      this.lastname = "";
      this.generation = "";
      this.workplace = "";
      this.position = "";
      this.caption = "";
      this.imgUrl = "";
      this.file = null;
      this.$refs.fileupload.value = null;
    },

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        let name = this.firstname + " " + this.lastname;
        data.append("name", name);
        data.append("generation", this.generation);
        data.append("work_place", this.workplace);
        data.append("job_title", this.position);

        if (this.caption != null) {
          data.append("caption", this.caption);
        } else {
          data.append("caption", "");
        }

        if (this.file != null) {
          data.append("image_profile", this.file);
        }

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        //? Call API
        http
          .post("alumni/new", data)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "เพิ่มข้อมูลใหม่เรียบร้อย",
            }).then(() => {
              this.$router.push({ name: "AlumnusShow" });
            });
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
  },

  validations() {
    return {
      firstname: {
        required: helpers.withMessage("ป้อนชื่อก่อน", required),
      },
      lastname: {
        required: helpers.withMessage("ป้อนนามสกุลก่อน", required),
      },
      generation: {
        required: helpers.withMessage("เลือกรุ่นของศิษย์เก่าก่อน", required),
      },
      workplace: {
        required: helpers.withMessage("ป้อนสังกัด / บริษัทก่อน", required),
      },
      position: {
        required: helpers.withMessage("ป้อนตำแหน่งก่อน", required),
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
