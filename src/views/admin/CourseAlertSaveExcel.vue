<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/coursealertshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | ระบบแจ้งตกค้างรายวิชา
              </h1>
            </div>
            <br class="shadow-xl" />
            <div class="relative flex flex-col w-full min-w-0 mb-6 break-words">
              <!-- Header  -->
              <div class="px-4 py-3 mb-0 border-0 rounded-t">
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-semibold text-md md:w-2/12">
                    จำนวน {{ this.total }} รายการ
                  </div>

                  <!-- <div class="w-full px-4 py-4 md:w-6/12">
                    <form @submit.prevent="onSearch">
                      <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อ ชื่อ/รหัสนักศึกษา รหัส/ชื่อวิชา"
                        aria-label="Search"
                      />
                    </form>
                  </div>

                  <div class="w-full px-4 md:w-4/12">
                    <button
                      @click="onSearch"
                      class="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-search"></i> ค้นหา
                    </button>
                    <button
                      @click="resetData"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                    <router-link
                      to=""
                      class="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-emerald-500 active:bg-emerald-600 rounded shadow outline-none hover:shadow-md focus:outline-none"
                      >นำรายชื่อออก
                    </router-link>
                  </div> -->
                </div>

                <!-- Sort data by dates -->
                <div class="flex flex-wrap items-center">
                  <div class="w-full px-4 font-semibold text-md md:w-2/12">
                    กรองข้อมูลผ่านวันที่
                  </div>

                  <div class="w-full px-4 py-4 md:w-3/12">
                    <v-date-picker v-model="dateStart" mode="date">
                      <template #default="{ inputValue, inputEvents }">
                        <input
                          class="w-full py-2 px-4 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                          :class="{ 'bg-gray-200': dateStart == null }"
                          :value="inputValue"
                          v-on="inputEvents"
                          placeholder="Date start"
                          readonly
                          :disabled="dateEnd != null"
                        />
                      </template>
                    </v-date-picker>
                  </div>

                  <div class="w-full px-4 py-4 md:w-3/12">
                    <v-date-picker
                      v-model="dateEnd"
                      mode="date"
                      :min-date="dateStart"
                    >
                      <template #default="{ inputValue, inputEvents }">
                        <input
                          class="w-full py-2 px-4 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                          :class="{ 'bg-gray-200': dateEnd == null }"
                          :value="inputValue"
                          v-on="inputEvents"
                          placeholder="Date end"
                          readonly
                          :disabled="dateStart == null"
                        />
                      </template>
                    </v-date-picker>
                  </div>

                  <div class="w-full px-4 md:w-4/12">
                    <button
                      @click="onSortByDates"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                      :disabled="dateStart == null || dateEnd == null"
                    >
                      <i class="fas fa-search"></i> กรองข้อมูล
                    </button>
                    <button
                      @click="resetData"
                      class="px-4 py-2 mb-1 mr-4 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                      type="button"
                    >
                      <i class="fas fa-broom"></i> ล้าง
                    </button>
                    <button
                      @click="downloadExcel"
                      class="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-lightBlue-500 active:bg-lightBlue-600 rounded shadow outline-none hover:shadow-md focus:outline-none"
                    >
                      <i class="fa-solid fa-download"></i> ดาวน์โหลดรายชื่อ
                    </button>
                  </div>
                </div>
              </div>

              <!-- Course alert table -->
              <div class="block w-full overflow-x-auto">
                <table
                  class="items-center w-full bg-transparent border-collapse"
                >
                  <thead>
                    <tr
                      class="text-blueGray-500 border-b-2 border-blueGray-500"
                    >
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        <input
                          type="checkbox"
                          v-model="isSelectAll"
                          :onchange="onSelectAll"
                          class="w-5 h-5 border-none rounded text-blueGray-700 bg-blueGray-200"
                        />
                      </th>
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        วันที่
                      </th>
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        ชื่อ - นามสกุล
                      </th>
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        ชื่อรายวิชา
                      </th>
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        รายยละเอียด
                      </th>
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        ติดต่อ
                      </th>
                      <th
                        class="px-4 py-3 text-sm font-semibold text-left uppercase align-middle whitespace-nowrap"
                      >
                        สถานะ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b"
                      v-for="(residual, index) in residuals"
                      :key="index"
                    >
                      <td
                        class="p-4 px-4 text-sm align-middle whitespace-nowrap text-center"
                      >
                        <input
                          type="checkbox"
                          v-model="residual.isSelected"
                          :onchange="onSelectRow"
                          class="w-5 h-5 border-none rounded text-blueGray-700 bg-blueGray-200"
                        />
                      </td>

                      <td
                        class="p-4 px-4 text-sm align-middle whitespace-nowrap"
                      >
                        {{ new Date(residual.date).toLocaleDateString() }}
                      </td>

                      <td
                        class="p-4 px-4 text-xs align-middle whitespace-nowrap"
                      >
                        <div
                          class="flex items-center text-xs text-left align-middle whitespace-nowrap"
                        >
                          <span class="text-sm">
                            <p class="font-bold">
                              {{ residual.student_name }}
                            </p>

                            <div class="text-xs font-normal">
                              รหัสนักศึกษา : {{ residual.student_code }}
                            </div>
                          </span>
                        </div>
                      </td>

                      <td class="p-4 px-4 text-sm align-middle">
                        <div>
                          <p class="w-auto font-normal">
                            {{ residual.subject_name }}
                          </p>
                          <p
                            class="font-normal text-red-500 text-xs flex flex-col"
                          >
                            <span v-if="residual.subject_type == 1">
                              ประเภท : กลุ่มวิชาใน
                            </span>
                            <span v-else> ประเภท : กลุ่มวิชานอก </span>
                            <span>
                              รหัสรายวิชา : {{ residual.subject_code }}
                            </span>
                          </p>
                        </div>
                      </td>

                      <td class="p-4 px-4 text-sm align-middle">
                        <div>
                          <p class="w-auto font-normal">
                            {{ residual.detail }}
                          </p>
                          <p
                            class="font-normal text-red-500 text-xs flex flex-col"
                          >
                            <span> ผู้รับผิดชอบรายวิชา : </span>
                            <span>{{ residual.advisor }}</span>
                          </p>
                        </div>
                      </td>

                      <td
                        class="p-4 px-4 text-sm align-middle whitespace-nowrap"
                      >
                        <p><b>โทร. :</b> {{ residual.student_tel_number }}</p>
                        <p><b>อีเมล :</b> {{ residual.student_email }}</p>
                      </td>

                      <td
                        class="p-4 px-4 text-sm align-middle whitespace-nowrap text-center"
                      >
                        <span
                          v-if="residual.status == 'waiting'"
                          class="text-yellow-600"
                        >
                          {{ residual.status }}
                        </span>
                        <span
                          v-if="residual.status == 'confirmed'"
                          class="text-emerald-600"
                        >
                          {{ residual.status }}
                        </span>
                        <span
                          v-if="residual.status == 'rejected'"
                          class="text-red-500"
                        >
                          {{ residual.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//? API
import http from "@/services/APIService";
//? Package
import * as XLSX from "xlsx/xlsx.mjs";
//? Script
import "@/scripts/FileSaver";
export default {
  data() {
    return {
      //? Data
      residuals: null,
      total: 0,

      //? Selected
      dataSelected: [],

      //? Form
      dateStart: null,
      dateEnd: null,
      isSelectAll: false,
    };
  },

  watch: {
    dateStart(value) {
      if (!value) {
        this.getResiduals();
      }
    },
    dateEnd(value) {
      if (value) {
        this.onSortByDates();
      }
    },
  },

  mounted() {
    this.getResiduals();
  },

  methods: {
    //? Get Residuals
    async getResiduals() {
      //? Waiting for new api get all residuals not paginate
      try {
        const res = await http.get("residuals/all");
        if (res.data.success) {
          let data = res.data.data;
          this.residuals = data;
          this.total = data.length;
        } else {
          this.residuals = null;
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Dates filter handle
    onSortByDates() {
      if (this.dateStart != null && this.dateEnd != null) {
        let data = new FormData();
        const dateStart = new Date(this.dateStart).toISOString().slice(0, 10);
        //? Add day to dateEnd
        let dateEnd = new Date(this.dateEnd);
        dateEnd.setDate(dateEnd.getDate() + 1);
        dateEnd = new Date(dateEnd).toISOString().slice(0, 10);
        data.append("start_date", dateStart);
        data.append("end_date", dateEnd);

        //? Call getResidualsByDate()
        this.getResidualsByDate(data);
      }
    },

    //? Get Residuals By Dates
    async getResidualsByDate(data) {
      try {
        const res = await http.post("residual/datesfilter/all", data);
        if (res.data.success) {
          let data = res.data.data;
          this.residuals = data;
          this.total = data.length;
        } else {
          this.residuals = null;
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },

    //? Reset filter
    resetData() {
      //? Reset form
      this.dateStart = null;
      this.dateEnd = null;

      //? Get all residuals
      this.getResiduals();
    },

    //? Select All
    onSelectAll() {
      this.residuals.filter((e) => (e.isSelected = this.isSelectAll));
    },

    //? Select in row
    onSelectRow() {
      //? isSelectAll is false
      if (this.isSelectAll) {
        const unSelected = this.residuals.filter((e) => !e.isSelected);
        if (unSelected.length > 0) {
          this.isSelectAll = false;
        }
      } else {
        //? isSelectAll is true if all row is selected
        const selected = this.residuals.filter((e) => e.isSelected);
        if (selected.length == this.residuals.length) {
          this.isSelectAll = true;
        }
      }
    },

    //? Download excel
    downloadExcel() {
      const selected = this.residuals.filter((e) => e.isSelected);
      if (selected.length > 0) {
        //? Excel type and extension
        const TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXTENSION = ".xlsx";

        this.residuals.forEach((e) => {
          if (e.isSelected) {
            //? Set data to download
            let subjectType = "";
            e.subject_type == 1
              ? (subjectType = "กลุ่มวิชาใน")
              : (subjectType = "กลุ่มวิชานอก");
            let data = {
              วันที่: new Date(e.date).toLocaleDateString(),
              รหัสนักศึกษา: e.student_code,
              ชื่อนักศึกษา: e.student_name,
              ประเภท: subjectType,
              รหัสรายวิชา: e.subject_code,
              ชื่อรายวิชา: e.subject_name,
              อาจารย์ผู้รับผิดชอบ: e.advisor,
              รายละเอียด: e.detail,
            };

            //? Push data to array
            this.dataSelected.push(data);
          }
        });

        const ws = XLSX.utils.json_to_sheet(this.dataSelected);

        //? Set workbook
        const wb = {
          Sheets: {
            data: ws,
          },
          SheetNames: ["data"],
        };

        //? Set file name
        const buffer = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
        });

        const excel = new Blob([buffer], { type: TYPE });

        //? Download excel
        saveAs(
          excel,
          "residuals" + "_export_" + new Date().getTime() + EXTENSION
        );
      } else {
        const Swal = this.$swal.mixin({
          customClass: {
            title: "font-weight-bold custom",
            confirmButton:
              "px-6 py-3 ml-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
            cancelButton:
              "px-6 py-3 custom mb-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none",
          },
          buttonsStyling: false,
        });

        Swal.fire({
          title: "กรุณาเลือกข้อมูลที่ต้องการดาวน์โหลดก่อน",
          icon: "warning",
          timer: 1000,
          timerProgressBar: true,
        });
      }
    },
  },
};
</script>
