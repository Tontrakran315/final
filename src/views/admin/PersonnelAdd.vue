<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/personnelshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลบุคลากร
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.stop.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Citizen id -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รหัสประจำตัวประชาชน 13 หลัก
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="citizenId"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    maxlength="13"
                    placeholder="Card ID 13 digit"
                  />
                  <div
                    v-if="v$.citizenId.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.citizenId.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Name -->
              <div class="flex flex-wrap mb-4">
                <!-- title name -->
                <div class="w-full px-4 md:w-2/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >คำนำหน้าชื่อ
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="titleName"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Title Name"
                  />
                  <div
                    v-if="v$.titleName.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.titleName.$errors[0].$message }}
                  </div>
                </div>

                <!-- First name -->
                <div class="w-full px-4 md:w-5/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อ (ภาษาไทย)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="firstName"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
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
                <div class="w-full px-4 md:w-5/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุล (ภาษาไทย)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="lastName"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
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

              <!-- Name english -->
              <div class="flex flex-wrap mb-4">
                <!-- First name english -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อ (ภาษาอังกฤษ)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="fistNameEn"
                    class="capitalize w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Lastname (English)"
                  />
                  <div
                    v-if="v$.fistNameEn.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.fistNameEn.$errors[0].$message }}
                  </div>
                </div>

                <!-- Last name english -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >นามสกุล (ภาษาอังกฤษ)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="lastNameEn"
                    class="capitalize w-full px-3 py-2 leading-tight text-gray-700"
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

              <!-- Types -->
              <div class="flex flex-wrap mb-4">
                <!-- Personnel types -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ประเภทของบุคลากร
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="personnelType"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      personnelType == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>
                      Select personnel type
                    </option>
                    <option class="text-gray-700" value="อาจารย์">
                      อาจารย์
                    </option>
                    <option class="text-gray-700" value="เจ้าหน้าที่">
                      เจ้าหน้าที่
                    </option>
                  </select>
                  <div
                    v-if="v$.personnelType.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.personnelType.$errors[0].$message }}
                  </div>
                </div>

                <!-- Academic types -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ประเภททางมหาวิทยาลัย
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="academicType"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      academicType == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>
                      Select academic type
                    </option>
                    <option class="text-gray-700" value="ข้าราชการ">
                      ข้าราชการ
                    </option>
                    <option class="text-gray-700" value="พนักงานมหาวิทยาลัย">
                      พนักงานมหาวิทยาลัย
                    </option>
                  </select>
                  <div
                    v-if="v$.academicType.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.academicType.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Academic position -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >ตำแหน่งวิชาการ
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="academicPosition"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Position in academic"
                  />
                  <div
                    v-if="v$.academicPosition.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.academicPosition.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Manager position -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >ตำแหน่งทางการบริหาร</label
                  >
                  <input
                    v-model="managerPosition"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Position in management"
                  />
                </div>
              </div>

              <!-- Education -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >วุฒิการศึกษาปัจจุบัน
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="education"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Education"
                  />
                  <div
                    v-if="v$.education.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.education.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-4 mt-8">
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >เบอร์ติดต่อ (ทางการ)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="phoneNumber"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Phone ( Ex. 0887776666 ต่อ 01 )"
                  />
                  <div
                    v-if="v$.phoneNumber.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.phoneNumber.$errors[0].$message }}
                  </div>
                </div>

                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >อีเมล (ทางการ)
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="email"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Email"
                  />
                  <div v-if="v$.email.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.email.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-4/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >สถานะการทำงาน
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="statusWork"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      statusWork == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" disabled selected>
                      Select work status
                    </option>
                    <option
                      class="text-gray-700"
                      v-for="status in statusDb"
                      :key="status.id"
                      :value="status.id"
                    >
                      {{ status.status }}
                    </option>
                  </select>
                  <div
                    v-if="v$.statusWork.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.statusWork.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-2">
                <div class="w-full px-4 md:w-12/12">
                  <div class="mt-4">
                    <img
                      v-if="imgUrl"
                      :src="imgUrl"
                      class="w-48 h-200-px center-img cropped"
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
import {
  required,
  email,
  minLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      //? Form
      citizenId: "",
      titleName: "",
      firstName: "",
      lastName: "",
      fistNameEn: "",
      lastNameEn: "",
      personnelType: "",
      academicType: "",
      academicPosition: "",
      managerPosition: "",
      education: "",
      email: "",
      phoneNumber: "",
      statusWork: "",

      //? Data
      statusDb: null,

      //? Image
      imgUrl: "",
      file: null,
    };
  },

  mounted() {
    this.getStatus();
  },

  methods: {
    //? Get status
    async getStatus() {
      let status = await http.get("personnel/status");
      if (status) {
        this.statusDb = status.data.data;
      }
    },

    //? Upload Image
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

    //? Submit Form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("citizen_id", this.citizenId);
        data.append("name_title", this.titleName);
        let name_th = this.firstName + " " + this.lastName;
        let name_en = this.fistNameEn + " " + this.lastNameEn;
        data.append("name_th", name_th);
        data.append("name_en", name_en);
        data.append("personnel_type", this.personnelType);
        data.append("academic_type", this.academicType);
        data.append("position_academic", this.academicPosition);
        data.append("education", this.education);
        data.append("email", this.email);
        data.append("tel_number", this.phoneNumber);
        data.append("work_status", this.statusWork);

        if (this.file !== null) {
          data.append("image_profile", this.file);
        } else {
          data.append("image_profile", "");
        }

        if (this.managerPosition !== "") {
          data.append("position_manager", this.managerPosition);
        } else {
          data.append("position_manager", "");
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
          .post("personnel/new", data)
          .then((res) => {
            if (res.data.success) {
              let msg = res.data.message;
              Toast.fire({
                icon: "success",
                title: msg,
              }).then(() => {
                this.$router.push({ name: "PersonnelShow" });
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

    //? Reset Form
    onResetForm() {
      this.v$.$reset();
      this.citizenId = "";
      this.titleName = "";
      this.firstName = "";
      this.lastName = "";
      this.fistNameEn = "";
      this.lastNameEn = "";
      this.personnelType = "";
      this.academicType = "";
      this.academicPosition = "";
      this.managerPosition = "";
      this.education = "";
      this.email = "";
      this.phoneNumber = "";
      this.statusWork = "";
      this.imgUrl = "";
      this.file = null;
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
      titleName: {
        required: helpers.withMessage("ป้อนคำนำหน้าชื่อภาษาไทยก่อน", required),
      },
      firstName: {
        required: helpers.withMessage("ป้อนชื่อภาษาไทยก่อน", required),
      },
      lastName: {
        required: helpers.withMessage("ป้อนนามสกุลภาษาไทยก่อน", required),
      },
      fistNameEn: {
        required: helpers.withMessage("ป้อนชื่อภาษาอังกฤษก่อน", required),
      },
      lastNameEn: {
        required: helpers.withMessage("ป้อนนามสกุลภาษาอังกฤษก่อน", required),
      },
      personnelType: {
        required: helpers.withMessage("เลือกประเภทของบุคลากรก่อน", required),
      },
      academicType: {
        required: helpers.withMessage(
          "เลือกประเภททางมหาวิทยาลัยก่อน",
          required
        ),
      },
      academicPosition: {
        required: helpers.withMessage("เลือกตำแหน่งวิชาการก่อน", required),
      },
      education: {
        required: helpers.withMessage("ป้อนวุฒิการศึกษาก่อน", required),
      },
      email: {
        required: helpers.withMessage("ป้อนอีเมลก่อน", required),
        email: helpers.withMessage("รูปแบบอีเมลไม่ถูกต้อง", email),
      },
      phoneNumber: {
        required: helpers.withMessage("ป้อนเบอร์โทรศัพท์ก่อน", required),
      },
      statusWork: {
        required: helpers.withMessage("เลือกสถานะการทำงานก่อน", required),
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
