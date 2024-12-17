<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <a href="javascript:void(0)" @click="forwardPage">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </a>
            </div>

            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">เพิ่มข้อมูล Line Token</h1>
            </div>

            <br class="shadow-xl" />

            <!-- Form -->
            <form @submit.stop.prevent="handleSubmit">
              <!-- Personnel and Role -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >เจ้าของ Line Token
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="personnel"
                    class="w-full px-3 py-2 leading-tight overflow-y-auto"
                    :class="
                      personnel == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>
                      เลือกเจ้าของ Line Token
                    </option>
                    <option
                      v-for="person in personnels"
                      :key="person.id"
                      :value="person.id"
                    >
                      {{ person.name_title + person.name_th }}
                    </option>
                  </select>
                  <div
                    v-if="v$.personnel.$error"
                    class="my-2 text-sm text-red-500"
                  >
                    {{ v$.personnel.$errors[0].$message }}
                  </div>
                </div>

                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >สิทธิ์การใช้งาน
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="role"
                    class="w-full px-3 py-2 leading-tight overflow-y-auto"
                    :class="role == '' ? 'text-placeholder' : 'text-gray-700'"
                  >
                    <option value="" selected disabled>
                      เลือกสิทธิ์การใช้งาน
                    </option>
                    <option
                      v-for="role in roles"
                      :key="role.id"
                      :value="role.id"
                    >
                      {{ role.role_name_th }}
                    </option>
                  </select>
                  <div v-if="v$.role.$error" class="my-2 text-sm text-red-500">
                    {{ v$.role.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line Token -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md" for="Title"
                    >Line Token
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="token"
                    rows="4"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    placeholder="ป้อนข้อมูล Line Token"
                  />
                </div>
                <div
                  v-if="v$.token.$error"
                  class="px-4 my-2 text-sm text-red-500"
                >
                  {{ v$.token.$errors[0].$message }}
                </div>
              </div>

              <div class="w-full text-right text-sm text-emerald-500 px-4">
                <a
                  href="https://gcms.in.th/howto/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD_token_%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A_line_notify.html"
                  target="_blank"
                  >วิธีการขอ Line Tokens
                  <i class="fa-regular fa-circle-question"></i
                ></a>
              </div>

              <!-- Buttons -->
              <div class="pt-16 pb-4 w-full flex flex-wrap justify-center">
                <button
                  @click="handleReset"
                  class="px-4 py-4 mr-2 mb-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-broom"></i> ล้าง
                </button>
                <button
                  class="px-4 py-2 mb-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
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
//? API Service
import http from "@/services/APIService";
//? Pakages
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      //? Validation
      v$: useValidate(),

      //? Data
      personnels: [],
      roles: [],

      //? Form
      personnel: "",
      role: "",
      token: "",
    };
  },

  mounted() {
    this.getPersonnels();
    this.getRoles();
  },

  methods: {
    //? Get personnels
    async getPersonnels() {
      try {
        const response = await http.get("personnels/all");
        if (response.data.success) {
          this.personnels = response.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //? Get roles
    async getRoles() {
      try {
        const response = await http.get("personnel/line-token/roles");
        if (response.data.success) {
          this.roles = response.data.data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Create data
    async createLineToken(data) {
      try {
        const response = await http.post("personnel/line-token/new", data);

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        if (response.data.success) {
          Toast.fire({
            icon: "success",
            title: "สร้างข้อมูลสำเร็จ",
          }).then(() => {
            this.$router.push({ name: "LineTokenShow" });
          });
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      } catch (error) {
        //? Set default sweet alert
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
          title: "เกิดข้อผิดพลาด",
        }).then(() => {
          window.location.reload();
        });
      }
    },

    //? Foward page
    forwardPage() {
      this.$router.go(-1) || this.$router.push("LineTokenShow");
    },

    //? Handle submit
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("personnel_id", this.personnel);
        data.append("line_token", this.token);
        data.append("token_role", this.role);

        //? Call function create data
        this.createLineToken(data);
      }
    },

    //? Handle reset
    handleReset() {
      this.v$.$reset();
      this.personnel = "";
      this.role = "";
      this.token = "";
    },
  },

  validations() {
    return {
      personnel: {
        required: helpers.withMessage("กรุณาเลือกชื่อผู้ใช้งาน", required),
      },
      role: {
        required: helpers.withMessage("กรุณาเลือกสิทธิ์การใช้งาน", required),
      },
      token: {
        required: helpers.withMessage("กรุณาป้อนข้อมูล Line Token", required),
      },
    };
  },
};
</script>
