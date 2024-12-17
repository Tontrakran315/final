<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">จัดการสิทธิ์ผู้ดูแลระบบ</h1>
            </div>

            <br class="shadow-xl" />

            <!-- Form -->
            <div
              class="w-full min-h-120-px py-4 mb-12 bg-gray-200 shadow rounded-lg"
            >
              <div class="p-4 text-2xl font-bold">เพิ่มสิทธิ์ผู้ดูแลระบบ</div>
              <form @submit.stop.prevent="handleSubmit">
                <div class="flex flex-wrap mb-4">
                  <div class="w-full px-4 md:w-10/12">
                    <label
                      class="block my-3 text-gray-700 text-md"
                      for="generation"
                      >รายชื่อบุคลากร
                      <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="personnel"
                      class="w-full px-3 py-2 leading-tight text-gray-700"
                      :class="{ 'text-placeholder': personnel == '' }"
                    >
                      <option value="" selected disabled>
                        เลือกรายชื่อบุคลากร
                      </option>
                      <option
                        v-for="user in personnels"
                        :key="user"
                        :value="user.id"
                      >
                        {{ user.name_title }}{{ user.name_th }}
                      </option>
                    </select>
                    <div
                      v-if="v$.personnel.$error"
                      class="mt-2 text-sm text-red-500"
                    >
                      {{ v$.personnel.$errors[0].$message }}
                    </div>
                  </div>
                  <div
                    class="w-full flex items-end justify-center px-4 pt-6 md:w-2/12"
                  >
                    <button
                      class="py-2 px-4 text-white bg-emerald-500 active:bg-emerald-600 rounded-lg shadow-lg ransition-all duration-150 ease-linear focus:outline-none"
                    >
                      เพิ่มสิทธิ์
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- Table -->
            <div class="w-full px-4 text-2xl font-bold">รายชื่อผู้ดูแลระบบ</div>
            <div
              class="w-full overflow-hidden overflow-x-auto rounded-lg shadow-xs mb-12"
            >
              <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      class="text-blueGray-500 border-b-2 border-blueGray-500"
                    >
                      <th
                        class="w-6/12 px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        ชื่อ - นามสกุล
                      </th>
                      <th
                        class="w-4/12 px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        สิทธิ์การเข้าถึง
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b"
                      v-for="(admin, index) in admins"
                      :key="index"
                    >
                      <td class="p-4 text-sm align-middle whitespace-nowrap">
                        {{ admin.name_title }}{{ admin.name_th }}
                      </td>
                      <td class="p-4 text-sm align-middle whitespace-nowrap">
                        <span v-if="admin.role === 'admin'">ผู้ดูแลระบบ</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <VueTailwindPagination
                :current="currentPage"
                :total="total"
                :per-page="perPage"
                @page-changed="onPageClick($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//? Service
import http from "@/services/APIService";
//? Packages
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      v$: useValidate(),

      //? Data
      personnels: [],
      admins: [],

      //? Form
      personnel: "",

      //? Pagination
      currentPage: 0,
      perPage: 0,
      total: 0,
    };
  },

  async mounted() {
    this.currentPage = 1;
    await this.getPersonnels();
    await this.getAdmin(this.currentPage);
  },

  methods: {
    //? Get personnels
    async getPersonnels() {
      try {
        const res = await http.get("personnels/all");
        this.personnels = res?.data?.data;
      } catch (e) {}
    },

    //? Get admins
    async getAdmin(page) {
      try {
        const user = await JSON.parse(localStorage.getItem("user"));
        const res = await http.get(`admin/all?page=${page}`);
        let data = res?.data;
        this.admins = data?.data;
        this.currentPage = data?.current_page;
        this.perPage = data?.per_page;
        this.total = data?.total;
      } catch (e) {}
    },

    //? Create admin
    async createAdmin(data) {
      //? Set default sweet alert
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      try {
        const res = await http.post("auth/signup", data);
        if (res?.data?.success) {
          Toast.fire({
            icon: "success",
            title: "เพิ่มสิทธิ์สำเร็จ",
          }).then(() => {
            window.location.reload();
          });
        } else {
          let msg = res?.data?.message;
          Toast.fire({
            icon: "error",
            title: msg,
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
        }).then(() => {
          window.location.reload();
        });
      }
    },

    //? Handle submit
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("personnel_id", this.personnel);
        data.append("role", "admin");
        this.createAdmin(data);
      }
    },
  },

  validations() {
    return {
      personnel: {
        required: helpers.withMessage("กรุณาเลือกรายชื่อบุคลากร", required),
      },
    };
  },
};
</script>
