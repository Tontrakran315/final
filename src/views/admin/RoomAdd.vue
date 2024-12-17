<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/roomshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลห้อง
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.stop.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Room id -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-4/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รหัสห้อง <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="roomId"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Room ID"
                  />
                  <div
                    v-if="v$.roomId.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.roomId.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Room name -->
              <div class="flex flex-wrap mb-4 mt-8">
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อห้องภาษาไทย <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="roomNameTh"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Room Name (Thai)"
                  />
                  <div
                    v-if="v$.roomNameTh.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.roomNameTh.$errors[0].$message }}
                  </div>
                </div>

                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อห้องภาษาอังกฤษ</label
                  >
                  <input
                    v-model="roomNameEn"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Room Name (English)"
                  />
                </div>
              </div>

              <!-- Detail -->
              <div class="flex flex-wrap mb-4">
                <!-- Room type -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ประเภทของห้อง <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="roomType"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      roomType == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" disabled selected>Room type</option>
                    <option
                      class="text-gray-700"
                      v-for="type in roomTypes"
                      :key="type.id"
                      :value="type.id"
                    >
                      {{ type.type_room }}
                    </option>
                  </select>
                  <div
                    v-if="v$.roomType.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.roomType.$errors[0].$message }}
                  </div>
                </div>

                <!-- Amount Seat -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >จำนวนที่นั่ง</label
                  >
                  <input
                    v-model="amountSeat"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Amount Seat"
                  />
                </div>
              </div>

              <!-- Location -->
              <div class="flex flex-wrap mb-4">
                <!-- Building -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ตำแหน่งที่ตั้ง / อาคาร
                    <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="building"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      building == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>Building</option>
                    <option
                      class="text-gray-700"
                      v-for="building in buildings"
                      :key="building.id"
                      :value="building.id"
                    >
                      {{ building.building }}
                    </option>
                  </select>
                  <div
                    v-if="v$.building.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.building.$errors[0].$message }}
                  </div>
                </div>

                <!-- Floor -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชั้นที่ <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="floor"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Floor"
                  />
                  <div v-if="v$.floor.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.floor.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Care taker -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ผู้รับผิดชอบ / ดูแลห้อง
                    <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="careTaker"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      careTaker == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>Care Taker</option>
                    <option class="text-gray-500" value="58">-</option>
                    <option
                      class="text-gray-500"
                      v-for="person in personnels"
                      :key="person.id"
                      :value="person.id"
                    >
                      {{ person.name_title }}{{ person.name_th }}
                    </option>
                  </select>
                  <div
                    v-if="v$.careTaker.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.careTaker.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Image -->
              <div class="flex flex-wrap mb-2">
                <div class="w-full px-4 md:w-12/12">
                  <div class="mt-4">
                    <img
                      v-if="imgUrl"
                      :src="imgUrl"
                      class="h-200-px center-img rounded-lg shadow-md"
                    />
                  </div>

                  <label class="block my-3 text-gray-700 text-md"
                    >รูปภาพห้อง
                    <span class="text-sm text-red-500"
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
import { required, numeric, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      //? Data
      roomTypes: null,
      buildings: null,
      personnels: null,

      //? Form
      roomId: "",
      roomNameTh: "",
      roomNameEn: "",
      roomType: "",
      floor: "",
      building: "",
      careTaker: "",
      amountSeat: "",
      file: null,

      //? Image
      imgUrl: "",
    };
  },

  mounted() {
    this.getBuilding();
    this.getRoomType();
    this.getPersonnels();
  },

  methods: {
    //? Get Buliding
    async getBuilding() {
      let building = await http.get("room/building");
      if (building) {
        this.buildings = building.data.data;
      }
    },

    //? Get Room Type
    async getRoomType() {
      let roomType = await http.get("room/type");
      if (roomType) {
        this.roomTypes = roomType.data.data;
      }
    },

    //? Get Personnels
    async getPersonnels() {
      let personnels = await http.get("personnels/all");
      if (personnels) {
        this.personnels = personnels.data.data;
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
        data.append("room_id", this.roomId);
        data.append("room_name_th", this.roomNameTh);
        data.append("type_room_id", this.roomType);
        data.append("building_id", this.building);
        data.append("floor", this.floor);
        data.append("personnel_id", this.careTaker);

        if (this.roomNameEn !== "") {
          data.append("room_name_en", this.roomNameEn);
        } else {
          data.append("room_name_en", "");
        }

        if (this.amountSeat !== "") {
          data.append("amount_seat", this.amountSeat);
        } else {
          data.append("amount_seat", "");
        }

        if (this.file !== null) {
          data.append("image", this.file);
        } else {
          data.append("image", "");
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
          .post("room/new", data)
          .then((res) => {
            if (res.data.success) {
              let msg = res.data.message;
              Toast.fire({
                icon: "success",
                title: msg,
              }).then(() => {
                this.$router.push({ name: "RoomShow" });
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
      this.roomId = "";
      this.roomNameTh = "";
      this.roomNameEn = "";
      this.roomType = "";
      this.floor = "";
      this.building = "";
      this.careTaker = "";
      this.amountSeat = "";
      this.file = null;
      this.imgUrl = "";
      this.$refs.fileupload.value = null;
    },
  },

  validations() {
    return {
      roomId: {
        required: helpers.withMessage("ป้อนรหัสห้องก่อน", required),
      },

      roomNameTh: {
        required: helpers.withMessage("ป้อนชื่อห้องก่อน", required),
      },

      roomType: {
        required: helpers.withMessage("เลือกประเภทห้องก่อน", required),
      },

      floor: {
        required: helpers.withMessage("ป้อนชั้นก่อน", required),
        numeric: helpers.withMessage("ป้อนตัวเลขเท่านั้น", numeric),
      },

      building: {
        required: helpers.withMessage("เลือกอาคารก่อน", required),
      },

      careTaker: {
        required: helpers.withMessage("เลือกผู้ดูแลก่อน", required),
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
