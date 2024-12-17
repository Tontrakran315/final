<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/studentshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลนักศึกษา
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Student code and Citizen id-->
              <div class="flex flex-wrap mb-4">
                <!-- Citizen id-->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รหัสประจำตัวประชาชน
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="citizenId"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    maxlength="13"
                    placeholder="Citizen id"
                  />
                  <div
                    v-if="v$.citizenId.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.citizenId.$errors[0].$message }}
                  </div>
                </div>

                <!-- Student code -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รหัสนักศึกษา
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="studentCode"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    maxlength="10"
                    placeholder="Student Code"
                  />
                  <div
                    v-if="v$.studentCode.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.studentCode.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Name thai -->
              <div class="flex flex-wrap mb-4">
                <!-- Frist name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อ (ภาษาไทย)
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="firstName"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Firstname (Thai)"
                  />
                  <div
                    v-if="v$.firstName.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.firstName.$errors[0].$message }}
                  </div>
                </div>

                <!-- Last name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุล (ภาษาไทย)
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="lastName"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Lastname (Thai)"
                  />
                  <div
                    v-if="v$.lastName.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.lastName.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Name English -->
              <div class="flex flex-wrap mb-4">
                <!-- First name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อ (ภาษาอังกฤษ)
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="firstNameEn"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Firstname (English)"
                  />
                  <div
                    v-if="v$.firstNameEn.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.firstNameEn.$errors[0].$message }}
                  </div>
                </div>

                <!-- Last name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุล (ภาษาอังกฤษ)
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="lastNameEn"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Lastname (English)"
                  />
                  <div
                    v-if="v$.lastNameEn.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.lastNameEn.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Phone and email -->
              <div class="flex flex-wrap mb-4 mt-8">
                <!-- Phone number -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >เบอร์ติดต่อ
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="tel"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    maxlength="10"
                    placeholder="Cell Phone without (-)"
                  />
                  <div v-if="v$.tel.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.tel.$errors[0].$message }}
                  </div>
                </div>

                <!-- Email -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >อีเมล (ส่วนตัว)
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="email"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Email"
                  />
                  <div v-if="v$.email.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.email.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Location -->
              <!-- Postcode and sub district -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-2 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >รหัสไปรษณีย์
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <input
                    v-model="postcode"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Postcode"
                    maxlength="5"
                  />
                  <div
                    v-if="v$.postcode.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.postcode.$errors[0].$message }}
                  </div>
                </div>
                <div class="w-full px-2 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >ตำบล
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <select
                    v-model="subDistrict"
                    class="w-full px-3 placeholder-blueGray-300 py-2 leading-tight border"
                    :class="
                      subDistrict == '' ? 'text-gray-500' : 'text-gray-700'
                    "
                    :disabled="subDistricts == null"
                  >
                    <option value="" disabled selected>Sub District</option>
                    <option
                      v-for="item in subDistricts"
                      :key="item.subDistrictId"
                      :value="item.subDistrictName"
                    >
                      {{ item.subDistrictName }}
                    </option>
                  </select>
                  <div
                    v-if="v$.subDistrict.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.subDistrict.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- District and Province -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-2 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >อำเภอ</label
                  >
                  <input
                    v-model="district"
                    class="w-full px-3 placeholder-blueGray-300 bg-blueGray-100 py-2 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="District"
                    readonly
                  />
                </div>
                <div class="w-full px-2 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >จังหวัด</label
                  >
                  <input
                    v-model="province"
                    class="w-full px-3 py-2 placeholder-blueGray-300 bg-blueGray-100 leading-tight text-gray-700 border"
                    type="text"
                    placeholder="Province"
                    readonly
                  />
                </div>
              </div>

              <!-- Address -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ที่อยู่ (สามารถติดต่อได้)
                    <span class="text-ms text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="address"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Address"
                  ></textarea>
                  <div
                    v-if="v$.address.$error"
                    class="mt-0 text-sm text-red-500"
                  >
                    {{ v$.address.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Image profile -->
              <div class="flex flex-wrap mb-2">
                <div class="w-full px-4 md:w-12/12">
                  <div class="mt-4">
                    <img
                      v-if="image"
                      :src="image"
                      class="w-1/2 h-auto rounded-md center-img cropped"
                    />
                  </div>

                  <label class="block my-3 text-gray-700 text-md"
                    >รูปโปรไฟล์
                    <span class="text-red-500 text-sm"
                      >(ขนาดไฟล์ต้องไม่เกิน 8MB)</span
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
//? Packages
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  numeric,
  helpers,
} from "@vuelidate/validators";
import thai from "thai-data";
export default {
  data() {
    return {
      v$: useValidate(),
      citizenId: "",
      studentCode: "",
      firstName: "",
      lastName: "",
      firstNameEn: "",
      lastNameEn: "",
      file: null,
      image: "",
      email: "",
      tel: "",

      province: "",
      district: "",
      subDistrict: "",
      subDistricts: null,
      postcode: "",
      address: "",
    };
  },

  watch: {
    postcode(val) {
      if (val) {
        let lenStr = val.toString().length;
        lenStr == 5 ? this.getSubDistrict() : null;
      }
    },
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
          this.image = "";
          this.$refs.fileupload.value = "";
        });
        return;
      }

      this.file = e.target.files[0];
      this.image = URL.createObjectURL(file);
    },

    //? Get address from postcode
    getSubDistrict() {
      const data = thai.allField(this.postcode);
      this.subDistricts = data.subDistrictList;
      this.district = data.districtList[0].districtName;
      this.province = data.provinceList[0].provinceName;
    },

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        //? Setting data to FormData
        let data = new FormData();
        data.append("citizen_id", this.citizenId);
        data.append("student_code", this.studentCode);
        data.append("name_th", this.firstName + " " + this.lastName);
        data.append(
          "name_en",
          this.firstNameEn.toLowerCase() + " " + this.lastNameEn.toLowerCase()
        );
        data.append("email", this.email.toLowerCase());
        data.append("tel_number", this.tel);
        data.append("province", this.province);
        data.append("district", this.district);
        data.append("sub_district", this.subDistrict);
        data.append("postcode", this.postcode);
        data.append("address", this.address);

        //? Check file
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

        //? Send data to API
        http
          .post("student/new", data)
          .then((res) => {
            if (res.data.success) {
              let msg = res.data.message;
              Toast.fire({
                icon: "success",
                title: msg,
              }).then(() => {
                this.$router.push({ name: "StudentShow" });
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
      this.citizenId = "";
      this.studentCode = "";
      this.firstName = "";
      this.lastName = "";
      this.firstNameEn = "";
      this.lastNameEn = "";
      this.file = null;
      this.image = "";
      this.email = "";
      this.tel = "";
      this.province = "";
      this.district = "";
      this.subDistrict = "";
      this.subDistricts = null;
      this.postcode = "";
      this.address = "";
      this.$refs.fileupload.value = null;
    },
  },

  validations() {
    return {
      citizenId: {
        required: helpers.withMessage("ป้อนหมายเลขบัตรประชาชนก่อน", required),
        minLength: helpers.withMessage(
          ({ $params }) => `รหัสไปรษณีย์ต้องไม่น้อยกว่า ${$params.min} ตัว`,
          minLength(13)
        ),
        numeric: helpers.withMessage(
          "ป้อนหมายเลขบัตรประชาชนเป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      studentCode: {
        required: helpers.withMessage("ป้อนรหัสนักศึกษาก่อน", required),
        numeric: helpers.withMessage(
          "ป้อนรหัสนักศึกษาเป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      firstName: {
        required: helpers.withMessage("ป้อนชื่อภาษาไทยก่อน", required),
      },
      lastName: {
        required: helpers.withMessage("ป้อนนามสกุลภาษาไทยก่อน", required),
      },
      firstNameEn: {
        required: helpers.withMessage("ป้อนชื่อภาษาอังกฤษก่อน", required),
      },
      lastNameEn: {
        required: helpers.withMessage("ป้อนนามสกุลภาษาอังกฤษก่อน", required),
      },
      email: {
        required: helpers.withMessage("ป้อนอีเมลส่วนตัวก่อน", required),
        email: helpers.withMessage("อีเมลไม่ถูกต้อง", email),
      },
      tel: {
        required: helpers.withMessage("ป้อนเบอร์ติดต่อก่อน", required),
        numeric: helpers.withMessage(
          "ป้อนเบอร์ติดต่อเป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      postcode: {
        required: helpers.withMessage("ป้อนรหัสไปรษณีย์ก่อน", required),
        minLength: helpers.withMessage(
          ({ $params }) => `รหัสไปรษณีย์ต้องไม่น้อยกว่า ${$params.min} ตัว`,
          minLength(5)
        ),
        numeric: helpers.withMessage(
          "ป้อนรหัสไปรษณีย์เป็นตัวเลขเท่านั้น",
          numeric
        ),
      },
      subDistrict: {
        required: helpers.withMessage("ป้อนตำบลก่อน", required),
      },
      address: {
        required: helpers.withMessage(
          "ป้อนที่อยู่ที่สามารถติดต่อได้ก่อน",
          required
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
