<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/subjectshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลหลักสูตรรายวิชา
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Subject code -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-4/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รหัสรายวิชา
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="code"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    maxlength="8"
                    placeholder="ป้อนรหัสวิชา"
                  />
                  <div v-if="v$.code.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.code.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Subject name thai -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อรายวิชา (ภาษาไทย)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="nameTh"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="ชื่อวิชาภาษาไทย"
                  />
                  <div
                    v-if="v$.nameTh.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.nameTh.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Subject name english -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อรายวิชา (ภาษาอังกฤษ)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="nameEn"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="ชื่อวิชาภาษาอังกฤษ"
                  />
                  <div
                    v-if="v$.nameEn.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.nameEn.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Subject detail -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >กลุ่มรายวิชา
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="detail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                  >
                    <option value="" selected disabled>
                      เลือกกลุ่มรายวิชา
                    </option>
                    <option
                      v-for="detail in details"
                      :key="detail"
                      :value="detail.value"
                    >
                      {{ detail.value }}
                    </option>
                  </select>
                  <div
                    v-if="v$.detail.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.detail.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-4 mt-8">
                <!-- Credit -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >หน่วยกิต
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="credit"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="number"
                    maxlength="4"
                    placeholder="จำนวนหน่วยกิต"
                  />
                  <div
                    v-if="v$.credit.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.credit.$errors[0].$message }}
                  </div>
                </div>

                <!-- Theory Hour -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชั่วโมงเรียนบรรยาย
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="theoryHour"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="number"
                    maxlength="4"
                    placeholder="จำนวนชั่วโมงเรียนบรรยาย"
                  />
                  <div
                    v-if="v$.theoryHour.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.theoryHour.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-4 mt-8">
                <!-- Practical hour -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชั่วโมงเรียนปฏิบัติ
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="practicalHour"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="number"
                    placeholder="จำนวนชั่วโมงเรียนปฏิบัติ"
                  />
                  <div
                    v-if="v$.practicalHour.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.practicalHour.$errors[0].$message }}
                  </div>
                </div>

                <!-- Self Hour -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชั่วโมงเรียนรู้ด้วยตนเอง
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="selfHour"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="number"
                    placeholder="จำนวนชั่วโมงเรียนรู้ด้วยตนเอง"
                  />
                  <div
                    v-if="v$.selfHour.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.selfHour.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-4/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >แสดงรายวิชาในเทอม</label
                  >
                  <select
                    v-model="term"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                  >
                    <option value="" selected disabled>เลือกเทอม</option>
                    <option v-for="i in 8" :key="i" :value="i">
                      ปี
                      <span>{{ Math.ceil(i / 2) }}</span>
                      เทอม
                      <span v-if="i % 2 !== 0">1</span>
                      <span v-else>2</span>
                    </option>
                  </select>
                </div>
              </div>

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

      code: "",
      nameTh: "",
      nameEn: "",
      credit: "",
      theoryHour: "",
      practicalHour: "",
      selfHour: "",
      detail: "",
      term: "",

      details: [
        {
          value:
            "กลุ่มวิชาความรู้พื้นฐานทางวิทยาการคอมพิวเตอร์ (Fundamental Computer Science)",
        },
        {
          value: "กลุ่มวิชาแนวคิดการวิเคราะห์และออกแบบ (System Analysis)",
        },
        {
          value: "กลุ่มวิชาการพัฒนาระบบแอปพลิเคชัน (Application Development)",
        },
        {
          value: "กลุ่มวิชาระบบเครือข่าย (Network System)",
        },
        {
          value: "กลุ่มวิชาวิทยาการข้อมูล (Data Science)",
        },
        {
          value: "กลุ่มวิชาอินเทอร์เน็ตในทุกสิ่ง (Internet of Things)",
        },
        {
          value: "กลุ่มวิชาปัญญาประดิษฐ์  (Artificial Intelligence)",
        },
        {
          value:
            "กลุ่มวิชาการประยุกต์งานด้านธุรกิจ (Computer Science for Business)",
        },
        {
          value: "กลุ่มวิชาหัวข้อพิเศษ (Special Topics)",
        },
      ],
    };
  },

  methods: {
    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();

        if (this.term !== "") {
          data.append("term", this.term);
        }

        data.append("subject_code", this.code);
        data.append("name_th", this.nameTh);
        data.append("name_en", this.nameEn);
        data.append("credit", this.credit);
        data.append("theory_hour", this.theoryHour);
        data.append("practical_hour", this.practicalHour);
        data.append("self_hour", this.selfHour);
        data.append("detail", this.detail);

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
          .post("subject/new", data)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "เพิ่มข้อมูลเรียบร้อย",
            }).then(() => {
              this.$router.push({ name: "SubjectShow" });
            });
          })
          .catch((err) => {
            if (err) {
              Toast.fire({
                icon: "error",
                title: "ขออภัย ทำรายการไม่สำเร็จ",
              });
            }
          });
      }
    },

    //? Reset form
    onResetForm() {
      this.v$.$reset();
      this.code = "";
      this.nameTh = "";
      this.nameEn = "";
      this.credit = "";
      this.theoryHour = "";
      this.practicalHour = "";
      this.selfHour = "";
      this.detail = "";
      this.term = "";
    },
  },

  validations() {
    return {
      code: {
        required: helpers.withMessage("ป้อนรหัสรายวิชาก่อน", required),
      },
      nameTh: {
        required: helpers.withMessage("ป้อนชื่อรายวิชาภาษาไทยก่อน", required),
      },
      nameEn: {
        required: helpers.withMessage(
          "ป้อนชื่อชื่อรายวิชาภาษาอังกฤษก่อน",
          required
        ),
      },
      credit: {
        required: helpers.withMessage("ป้อนหน่วยกิตก่อน", required),
        numeric: helpers.withMessage("หน่วยกิตต้องเป็นตัวเลขเท่านั้น", numeric),
      },
      theoryHour: {
        required: helpers.withMessage(
          "ป้อนจำนวนชั่วโมงเรียนบรรยายก่อน",
          required
        ),
        numeric: helpers.withMessage(
          "จำนวนชั่วโมงเรียนบรรยายต้องเป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      practicalHour: {
        required: helpers.withMessage(
          "ป้อนจำนวนชั่วโมงเรียนปฏิบัติก่อน",
          required
        ),
        numeric: helpers.withMessage(
          "จำนวนชั่วโมงเรียนปฏิบัติต้องเป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      selfHour: {
        required: helpers.withMessage(
          "ป้อนจำนวนชั่วโมงเรียนด้วยตนเองก่อน",
          required
        ),
        numeric: helpers.withMessage(
          "จำนวนชั่วโมงเรียนด้วยตนเองต้องเป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      detail: {
        required: helpers.withMessage("ป้อนกลุ่มรายวิชาก่อน", required),
      },
    };
  },
};
</script>
