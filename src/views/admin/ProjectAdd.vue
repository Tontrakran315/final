<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/projectshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลโครงงาน
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.stop.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Line 1 -->
              <div class="flex flex-wrap mb-4">
                <!-- Project code -->
                <div class="w-full px-4 md:w-4/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ปีการศึกษา
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="projectYear"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      projectYear == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>Project years</option>
                    <!-- Year is back 10 years -->
                    <option
                      class="text-gray-700"
                      v-for="year in 10"
                      :key="year"
                      :value="years + 543 + 1 - year"
                    >
                      {{ years + 543 + 1 - year }}
                    </option>
                  </select>
                  <div
                    v-if="v$.projectYear.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.projectYear.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 2 -->
              <div class="flex flex-wrap mb-4">
                <!-- Project code -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รหัสโครงงาน
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="projectCode"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Project code"
                  />
                  <div
                    v-if="v$.projectCode.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.projectCode.$errors[0].$message }}
                  </div>
                </div>

                <!-- Project name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อโครงงาน
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="projectName"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Project name"
                  />
                  <div
                    v-if="v$.projectName.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.projectName.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 3 -->
              <div class="flex flex-wrap mb-4">
                <!-- Name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อผู้ทำโครงงานคนที่ 1
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="editorName1"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="First name"
                  />
                  <div
                    v-if="v$.editorName1.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.editorName1.$errors[0].$message }}
                  </div>
                </div>

                <!-- Last name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุลผู้ทำโครงงานคนที่ 1
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="editorLastName1"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Last name"
                  />
                  <div
                    v-if="v$.editorLastName1.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.editorLastName1.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 4 -->
              <div class="flex flex-wrap mb-4">
                <!-- Name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อผู้ทำโครงงานคนที่ 2
                  </label>
                  <input
                    v-model="editorName2"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <!-- Last name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุลผู้ทำโครงงานคนที่ 2
                    <span class="text-red-500" v-if="editorName2 !== ''"
                      >*</span
                    >
                  </label>
                  <input
                    v-model="editorLastName2"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Last name"
                  />
                  <div
                    v-if="v$.editorLastName2.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.editorLastName2.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 5 -->
              <div class="flex flex-wrap mb-4">
                <!-- Name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อผู้ทำโครงงานคนที่ 3
                  </label>
                  <input
                    v-model="editorName3"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <!-- Last name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุลผู้ทำโครงงานคนที่ 3
                    <span class="text-red-500" v-if="editorName3 !== ''"
                      >*</span
                    >
                  </label>
                  <input
                    v-model="editorLastName3"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Last name"
                  />
                  <div
                    v-if="v$.editorLastName3.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.editorLastName3.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 6 -->
              <div class="flex flex-wrap mb-4">
                <!-- Chairman -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ประธานกรรมการโครงงาน
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="chairman"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      chairman == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>Chairman</option>
                    <option
                      class="text-gray-700"
                      v-for="teacher in teachers"
                      :key="teacher.id"
                      :value="teacher.id"
                    >
                      {{ teacher.name_title }}{{ teacher.name_th }}
                    </option>
                  </select>
                  <div
                    v-if="v$.chairman.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.chairman.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 7 -->
              <div class="flex flex-wrap mb-4">
                <!-- Director 1 -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >กรรมการโครงงานคนที่ 1
                  </label>
                  <select
                    v-model="director1"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      director1 == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected>Director 1st</option>
                    <option
                      class="text-gray-700"
                      v-for="teacher in teachers"
                      :key="teacher.id"
                      :value="teacher.id"
                    >
                      {{ teacher.name_title }}{{ teacher.name_th }}
                    </option>
                  </select>
                </div>

                <!-- Director 2 -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >กรรมการโครงงานคนที่ 2
                  </label>
                  <select
                    v-model="director2"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      director2 == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected>Director 2nd</option>
                    <option
                      class="text-gray-700"
                      v-for="teacher in teachers"
                      :key="teacher.id"
                      :value="teacher.id"
                    >
                      {{ teacher.name_title }}{{ teacher.name_th }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Line 8 -->
              <div class="flex flex-wrap mb-4">
                <!-- Detail -->
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="Detail"
                    >รายละเอียด <span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="detail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Project detail"
                  ></textarea>
                  <div
                    v-if="v$.detail.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.detail.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 9 -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
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
                    >เอกสารโครงงาน <span class="text-red-500">*</span></label
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

      //? Data
      years: new Date().getFullYear(),
      teachers: null,

      //? Form
      projectYear: "",
      projectCode: "",
      projectName: "",
      editorName1: "",
      editorLastName1: "",
      editorName2: "",
      editorLastName2: "",
      editorName3: "",
      editorLastName3: "",
      chairman: "",
      director1: "",
      director2: "",
      detail: "",
      file: null,

      //? PDF Preview
      pdf: null,
    };
  },

  mounted() {
    this.getTeachers();
  },

  methods: {
    //? Get teacher
    async getTeachers() {
      let res = await http.get("personnel/filter/teacher");
      if (res) {
        this.teachers = res.data.data;
      }
    },

    //? Upload file
    onFileChange(e) {
      this.file = e.target.files[0];
      this.pdf = URL.createObjectURL(this.file);
    },

    //? Reset form
    onResetForm() {
      this.v$.$reset();
      this.projectYear = "";
      this.projectCode = "";
      this.projectName = "";
      this.editorName1 = "";
      this.editorLastName1 = "";
      this.editorName2 = "";
      this.editorLastName2 = "";
      this.editorName3 = "";
      this.editorLastName3 = "";
      this.chairman = "";
      this.director1 = "";
      this.director2 = "";
      this.detail = "";
      this.file = null;
      this.pdf = null;
      this.$refs.fileupload.value = null;
    },

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("years", this.projectYear);
        data.append("project_code", this.projectCode);
        data.append("name", this.projectName);
        data.append("chairman", this.chairman);
        data.append("detail", this.detail);
        data.append("file", this.file);
        let editor1 = `${this.editorName1} ${this.editorLastName1}`;
        data.append("editor_1", editor1);

        if (this.editorName2 != "" && this.editorLastName2 != "") {
          let editor2 = `${this.editorName2} ${this.editorLastName2}`;
          data.append("editor_2", editor2);
        } else {
          data.append("editor_2", "");
        }

        if (this.editorName3 != "" && this.editorLastName3 != "") {
          let editor3 = `${this.editorName3} ${this.editorLastName3}`;
          data.append("editor_3", editor3);
        } else {
          data.append("editor_3", "");
        }

        if (this.director1 != "") {
          data.append("director_1", this.director1);
        } else {
          data.append("director_1", "");
        }

        if (this.director2 != "") {
          data.append("director_2", this.director2);
        } else {
          data.append("director_2", "");
        }

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        //? Send data
        http
          .post("project/new", data)
          .then((res) => {
            if (res.data.success) {
              let msg = res.data.message;
              Toast.fire({
                icon: "success",
                title: msg,
              }).then(() => {
                window.location.reload();
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
  },

  validations() {
    return {
      projectYear: {
        required: helpers.withMessage("กรุณาเลือกปีการศึกษา", required),
      },
      projectCode: {
        required: helpers.withMessage("กรุณากรอกรหัสโครงงาน", required),
      },
      projectName: {
        required: helpers.withMessage("กรุณากรอกชื่อโครงงาน", required),
      },
      editorName1: {
        required: helpers.withMessage("กรุณากรอกชื่อผู้จัดทำ", required),
      },
      editorLastName1: {
        required: helpers.withMessage("กรุณากรอกนามสกุลผู้จัดทำ", required),
      },
      editorLastName2: {
        required: helpers.withMessage(
          "กรุณากรอกนามสกุลผู้จัดทำ",
          () => this.editorName2 == "" || this.editorLastName2 != ""
        ),
      },
      editorLastName3: {
        required: helpers.withMessage(
          "กรุณากรอกนามสกุลผู้จัดทำ",
          () => this.editorName3 == "" || this.editorLastName3 != ""
        ),
      },
      chairman: {
        required: helpers.withMessage(
          "กรุณาเลือกประธานกรรมการโครงงาน",
          required
        ),
      },
      detail: {
        required: helpers.withMessage("กรุณากรอกรายละเอียด", required),
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
