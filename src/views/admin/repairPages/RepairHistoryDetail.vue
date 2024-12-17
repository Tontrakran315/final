<template>
  <div class="min-h-screen w-full px-5">
    <div class="relative flex flex-col">
      <!-- Header -->
      <div class="w-full">
        <div
          class="pb-4 px-4 mr-auto text-2xl text-center font-semibold md:text-3xl"
        >
          <span class="mr-2">รายละเอียดการซ่อม</span>
          <i class="fa-solid fa-cookie-bite"></i>
        </div>
      </div>

      <!-- Content -->

      <div class="flex flex-wrap items-center text-xl font-bold mb-4">
        <span class="mr-2">ข้อมูลแจ้งซ่อม</span>
        <span class="text-sm text-red-500">
          วันที่แจ้ง {{ new Date(repairData.created_at).toLocaleDateString() }}
        </span>
      </div>

      <div class="flex flex-wrap mb-4">
        <div class="w-full md:w-6/12">
          <label class="block text-gray-700 text-md">รหัสครุภัณฑ์ </label>
          <input
            type="text"
            v-model="repairData.equip_id"
            class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
            placeholder="รหัสของครุภัณฑ์"
            disabled
          />
        </div>
        <div class="w-full md:pl-4 md:w-6/12">
          <label class="block text-gray-700 text-md">ชื่อครุภัณฑ์ </label>
          <input
            type="text"
            v-model="repairData.equip_name"
            class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
            placeholder="ชื่อของครุภัณฑ์"
            disabled
          />
        </div>
      </div>

      <div class="flex flex-wrap mb-4">
        <div class="w-full md:w-6/12">
          <label class="block text-gray-700 text-md">ชื่อผู้แจ้ง </label>
          <input
            type="text"
            v-model="repairData.notifier_name"
            class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
            placeholder="ชื่อผู้แจ้ง"
            disabled
          />
        </div>
        <div class="w-full md:pl-4 md:w-6/12">
          <label class="block text-gray-700 text-md"
            >ห้องที่จัดเก็บครุภัณฑ์
          </label>
          <input
            type="text"
            v-model="repairData.room_name_th"
            class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
            placeholder="ห้องที่จัดเก็บครุภัณฑ์"
            disabled
          />
        </div>
      </div>

      <div class="flex flex-wrap mb-4">
        <div class="w-full">
          <label class="block text-gray-700 text-md">รายละเอียด </label>
          <textarea
            v-model="repairData.initial_symptoms"
            class="w-full px-3 leading-tight text-gray-700 bg-blueGray-200 border-none rounded-md"
            rows="4"
            placeholder="อาการชำรุดเบื้องต้น"
            disabled
          ></textarea>
        </div>
      </div>

      <!-- Image equipment before fixed if had -->
      <div v-if="repairData.image" class="flex flex-wrap justify-center mb-4">
        <div class="w-full md:w-4/12">
          <img
            :src="repairData.image"
            alt="Image of equipment before fixed"
            class="rounded-lg break-words duration-150 ease-linear hover:zoom"
          />
          <span class="flex justify-center text-md mt-4"
            >รูปภาพครุภัณฑ์ที่ชำรุด ({{ repairData.equip_name }})</span
          >
        </div>
      </div>

      <template v-if="repairData.log">
        <div class="flex flex-wrap items-center text-xl font-bold mb-4">
          <span class="mr-2">บันทึกการซ่อม</span>
          <span class="text-sm text-red-500">
            วันที่บันทึก
            {{ new Date(repairData.log.created_at).toLocaleDateString() }}
          </span>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full md:w-6/12">
            <label class="block text-gray-700 text-md">ผู้ซ่อม </label>
            <input
              type="text"
              v-model="repairData.log.repairman_name"
              class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
              placeholder="ผู้ซ่อมครุภัณฑ์"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full">
            <label class="block text-gray-700 text-md">รายการแก้ไข </label>
            <textarea
              v-model="repairData.log.log"
              class="w-full px-3 leading-tight text-gray-700 bg-blueGray-200 border-none rounded-md"
              rows="4"
              placeholder="รายการแก้ไข"
              disabled
            ></textarea>
          </div>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full">
            <label class="block text-gray-700 text-md">หมายเหตุ </label>
            <textarea
              v-model="repairData.log.note"
              class="w-full px-3 leading-tight text-gray-700 bg-blueGray-200 border-none rounded-md"
              rows="4"
              placeholder="หมายเหตุ"
              disabled
            ></textarea>
          </div>
        </div>

        <!-- Table -->
        <div
          class="flex flex-wrap items-center text-xl font-bold mb-4"
          v-if="repairData.log.spare_parts"
        >
          <span>อะไหล่ที่ใช้ในการซ่อม</span>
        </div>
        <div
          class="w-full overflow-hidden overflow-x-auto rounded-lg shadow-xs"
          v-if="repairData.log.spare_parts"
        >
          <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-blueGray-500 border-b-2 border-blueGray-500">
                  <th
                    class="px-4 py-3 w-1/12 text-sm font-semibold text-center align-middle whitespace-nowrap"
                  >
                    ลำดับ
                  </th>
                  <th
                    class="px-4 py-3 w-42 text-sm font-semibold text-left align-middle whitespace-nowrap"
                  >
                    รูปภาพ
                  </th>
                  <th
                    class="px-4 py-3 w-auto text-sm font-semibold text-left align-middle whitespace-nowrap"
                  >
                    อะไหล่
                  </th>
                  <th
                    class="px-4 py-3 w-2/12 text-sm font-semibold text-center align-middle whitespace-nowrap"
                  >
                    ราคา/ชิ้น
                  </th>
                  <th
                    class="px-4 py-3 w-2/12 text-sm font-semibold text-center align-middle whitespace-nowrap"
                  >
                    จำนวน
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b"
                  v-for="(spare, index) in repairData.log.spare_parts"
                  :key="index"
                >
                  <td
                    class="px-4 py-3 text-sm text-center align-middle whitespace-nowrap"
                  >
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-3 align-middle whitespace-nowrap">
                    <img
                      :src="spare.image ?? imageSrc"
                      alt="Image of spare part"
                      class="rounded-lg"
                    />
                  </td>
                  <td class="px-4 py-3 text-sm align-middle whitespace-nowrap">
                    {{ spare.spare_part }}
                  </td>
                  <td
                    class="px-4 py-3 text-sm text-center align-middle whitespace-nowrap"
                  >
                    {{ spare.price }}
                  </td>
                  <td
                    class="px-4 py-3 text-sm text-center align-middle whitespace-nowrap"
                  >
                    {{ spare.quantity }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- Back button -->
      <div class="w-full pt-12 pb-6 flex justify-center">
        <router-link
          to="/admin/repairshow/history"
          class="py-2 px-2 bg-emerald-400 text-white rounded-lg hover:bg-emerald-600"
          >ย้อนกลับ</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
//? API
import http from "@/services/APIService";
//? Image preview
import image from "@/assets/images/logo.png";
export default {
  data() {
    return {
      //? Get id from url
      id: this.$route.params.id,

      //? Data
      repairData: [],

      //? Image preview
      imageSrc: image,
    };
  },

  mounted() {
    this.getRepairHistoryDetail();
  },

  methods: {
    //? Get data
    async getRepairHistoryDetail() {
      try {
        const response = await http.get(`equipment/repair/log/show/${this.id}`);
        if (response.data.success) {
          this.repairData = response.data.data;
        } else {
          const Swal = this.$swal.mixin({
            position: "center",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            customClass: {
              title:
                "custom font-semibold text-4xl text-center text-blueGray-500 mb-2",
              text: "custom font-normal text-lg text-center text-blueGray-500 ",
            },
          });

          Swal.fire({
            title: "ไม่พบข้อมูล",
            text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
            icon: "error",
          }).then(() => {
            this.$router.push("/admin/repairshow/history");
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
