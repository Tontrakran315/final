<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/equipment/recovery">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>

            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">บันทึกข้อมูลคืนครุภัณฑ์</h1>
            </div>

            <br class="shadow-xl" />

            <!-- Recovery info -->
            <div class="w-full py-2">
              <div class="text-start md:border-l rounded-lg px-4">
                <div
                  class="pb-4 text-center md:text-left flex flex-col md:flex-row items-center"
                >
                  <span class="text-xl font-bold md:text-2xl"
                    >ข้อมูลการยืมครุภัณฑ์</span
                  >
                </div>

                <div class="flex flex-wrap md:pb-2">
                  <div class="w-full md:w-6/12">
                    <label class="block text-gray-700 text-md"
                      >ชื่อผู้ยืมครุภัณฑ์
                    </label>
                    <input
                      type="text"
                      v-model="borrower"
                      class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                      placeholder="ชื่อผู้ยืมครุภัณฑ์"
                      disabled
                    />
                  </div>

                  <div class="w-full md:pl-4 md:w-6/12">
                    <label class="block text-gray-700 text-md"
                      >เบอร์โทรติดต่อ
                    </label>
                    <input
                      type="text"
                      v-model="telNumber"
                      class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                      placeholder="เบอร์โทรติดต่อ"
                      disabled
                    />
                  </div>
                </div>

                <div class="flex flex-wrap md:pb-2">
                  <div class="w-full md:w-6/12">
                    <label class="block text-gray-700 text-md"
                      >วันที่ยืม
                    </label>
                    <input
                      type="text"
                      v-model="dateUseStart"
                      class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                      placeholder="วันที่ยืม"
                      disabled
                    />
                  </div>

                  <div class="w-full md:pl-4 md:w-6/12" v-if="dateUseEnd">
                    <label class="block text-gray-700 text-md"
                      >วันที่สิ้นสุดการยืม
                    </label>
                    <input
                      type="text"
                      v-model="dateUseEnd"
                      class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                      placeholder="วันที่สิ้นสุดการยืม"
                      disabled
                    />
                  </div>
                </div>

                <div class="flex flex-wrap">
                  <div class="w-full">
                    <label class="block text-gray-700 text-md"
                      >รายละเอียดการยืม
                    </label>
                    <textarea
                      v-model="useFor"
                      class="w-full px-3 leading-tight text-gray-700 bg-blueGray-200 border-none rounded-md"
                      rows="2"
                      placeholder="รายละเอียดการยืม"
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table recoverie list -->
            <div class="flex flex-wrap items-center text-xl font-bold mb-4">
              <span>รายการครุภัณฑ์ที่ถูกยืม</span>
            </div>
            <div
              class="w-full mb-12 overflow-hidden overflow-x-auto rounded-lg shadow-xs"
            >
              <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      class="text-blueGray-500 border-b-2 border-blueGray-500"
                    >
                      <th
                        class="px-4 py-3 w-1/12 text-sm font-semibold text-center align-middle whitespace-nowrap"
                      >
                        ลำดับ
                      </th>
                      <th
                        class="px-4 py-3 w-2/12 text-sm font-semibold text-left align-middle whitespace-nowrap"
                      >
                        ครุภัณฑ์
                      </th>
                      <th
                        class="px-4 py-3 w-2/12 text-sm font-semibold text-center align-middle whitespace-nowrap"
                      >
                        จำนวนที่ยืม
                      </th>
                      <th
                        class="px-4 py-3 w-4/12 text-sm font-semibold text-left align-middle whitespace-nowrap"
                      >
                        รายละเอียด
                      </th>
                      <th
                        class="px-4 py-3 w-2/12 text-sm font-semibold text-left align-middle whitespace-nowrap"
                      >
                        ตรวจสอบครุภัณฑ์
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b"
                      v-for="(item, index) in recoveryList"
                      :key="index"
                    >
                      <td
                        class="px-4 py-3 text-sm text-center align-middle whitespace-nowrap"
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm align-middle whitespace-nowrap"
                      >
                        {{ item.equip_list }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm text-center align-middle whitespace-nowrap"
                      >
                        {{ item.quantity }}
                      </td>
                      <td
                        class="px-4 py-3 text-sm align-middle whitespace-nowrap"
                      >
                        <span v-if="item.note">{{ item.note }}</span>
                        <span v-else>-</span>
                      </td>
                      <td
                        class="px-4 py-3 text-xs align-middle whitespace-nowrap"
                      >
                        <button
                          @click="handleEditNote(index, item.id)"
                          class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-500 rounded-full shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                          type="button"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Recovery return button -->
            <div
              class="flex flex-wrap justify-center mt-12 mb-6"
              v-if="!status"
            >
              <button
                class="px-4 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                type="button"
                @click="handleReturn"
              >
                <i class="fas fa-save"></i>
                คืนครุภัณฑ์
              </button>
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
export default {
  data() {
    return {
      id: null,
      borrower: "",
      telNumber: "",
      dateUseStart: null,
      dateUseEnd: null,
      useFor: "",
      recoveryList: [],
      status: false,
    };
  },

  async mounted() {
    this.id = this.$route.params.id;
    await this.getEquipmentRecovery(this.id);
  },

  methods: {
    //? Get data
    async getEquipmentRecovery(id) {
      try {
        const res = await http.get(`equipment/borrow/${id}`);
        if (res.data.success) {
          let data = res.data.data;
          this.telNumber = data?.tel_number;
          this.dateUseStart = data?.date_use_start;
          this.dateUseEnd = data?.date_use_end;
          this.useFor = data?.use_for;
          this.recoveryList = data?.recovery_list;
          this.status = data?.status;
          if (!data.pn_citizen_id) {
            //? Student is borrower
            this.borrower = data?.borrower?.name_th;
          } else {
            //? Personnel is borrower
            this.borrower = data?.borrower?.name_title + data.borrower?.name_th;
          }
        } else {
          //! Not found data
        }
      } catch (e) {}
    },

    //? Handle edit note
    handleEditNote(index, id) {
      const Swal = this.$swal.mixin({
        customClass: {
          title: "custom text-2xl font-bold",
          inputLabel: "custom text-lg",
          input: "custom text-gray-700 rounded-lg",
          confirmButton:
            "custom px-2 py-2 mr-2 text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none rounded-lg",
          cancelButton:
            "custom px-2 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg",
        },
        buttonsStyling: false,
      });

      Swal.fire({
        title: "แก้ไขรายละเอียด",
        input: "textarea",
        inputValue: this.recoveryList[index].note,
        inputPlaceholder: "รายละเอียด",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "บันทึก",
        cancelButtonText: "ยกเลิก",
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage(`กรุณากรอกรายละเอียด`);
          }
        },
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateNote(id, result.value);
        } else {
          Swal.fire({
            title: "ยกเลิกการแก้ไข",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
          });
        }
      });
    },

    //? Handle return
    handleReturn() {
      //? User from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const data = user?.data;
      let name = data?.name_title + data?.name_th;

      const Swal = this.$swal.mixin({
        customClass: {
          title: "custom text-2xl font-bold",
          inputLabel: "custom text-lg",
          input: "custom text-gray-700 rounded-lg",
          confirmButton:
            "custom px-2 py-2 mr-2 text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none rounded-lg",
          cancelButton:
            "custom px-2 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg",
        },
        buttonsStyling: false,
      });

      Swal.fire({
        title: "ยืนยันการคืนครุภัณฑ์",
        inputLabel: "ชื่อผู้รับคืนครุภัณฑ์",
        input: "text",
        inputValue: name,
        inputPlaceholder: "ระบุชื่อผู้รับคืนครุภัณฑ์",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        preConfirm: (value) => {
          if (value === "") {
            Swal.showValidationMessage("กรุณาระบุชื่อผู้รับคืนครุภัณฑ์");
          }
        },
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          //? Call send return api
          this.sendReturn(result.value);
        } else {
          Swal.fire({
            title: "ยกเลิกการคืนครุภัณฑ์",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
          });
        }
      });
    },

    //? Update note
    async updateNote(id, value) {
      const Swal = this.$swal.mixin({
        customClass: {
          title: "custom text-2xl font-bold",
          text: "custom text-lg",
          confirmButton:
            "custom px-2 py-2 mr-2 text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none rounded-lg",
          cancelButton:
            "custom px-2 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg",
        },
        buttonsStyling: false,
      });

      try {
        let data = new FormData();
        data.append("note", value);
        const res = await http.post(`equipment/borrow/list/note/${id}`, data);
        if (res.data.success) {
          Swal.fire({
            title: "แก้ไขรายละเอียดสำเร็จ",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "แก้ไขรายละเอียดไม่สำเร็จ",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
          });
        }
      } catch (error) {
        let errMsg = error?.response?.data?.message;
        if (errMsg) {
          Swal.fire({
            icon: "error",
            title: errMsg,
            timer: 1500,
          });
          return;
        }

        Swal.fire({
          icon: "error",
          title: "ขออภัย ทำรายการไม่สำเร็จ",
          timer: 1500,
        });
      }
    },

    //? Send return
    async sendReturn(value) {
      const Swal = this.$swal.mixin({
        customClass: {
          title: "custom text-2xl font-bold",
          text: "custom text-lg",
          confirmButton:
            "custom px-2 py-2 mr-2 text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none rounded-lg",
          cancelButton:
            "custom px-2 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg",
        },
        buttonsStyling: false,
      });

      try {
        let data = new FormData();
        data.append("returnee", value);
        const res = await http.post(`equipment/borrow/return/${this.id}`, data);
        if (res.data.success) {
          Swal.fire({
            title: "คืนครุภัณฑ์สำเร็จ",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/admin/equipment/recovery");
            }
          });
        } else {
          Swal.fire({
            title: "คืนครุภัณฑ์ไม่สำเร็จ",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
          });
        }
      } catch (error) {
        let errMsg = error?.response?.data?.message;
        if (errMsg) {
          Swal.fire({
            icon: "error",
            title: errMsg,
            timer: 1500,
          });
          return;
        }

        Swal.fire({
          icon: "error",
          title: "ขออภัย ทำรายการไม่สำเร็จ",
          timer: 1500,
        });
      }
    },
  },
};
</script>
