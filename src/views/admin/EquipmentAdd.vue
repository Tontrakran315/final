<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/equipmentshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold border-b">
                CSMJU | เพิ่มข้อมูลครุภัณฑ์
              </h1>
            </div>

            <br class="shadow-xl border-t" />

            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <!-- Line 1 -->
              <div class="flex flex-wrap mb-4">
                <!-- Main type -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ประเภทครุภัณฑ์
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="equipMainType"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      equipMainType == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>Equipment type</option>
                    <option class="text-gray-700" value="ครุภัณฑ์ทางการ (วท.)">
                      ครุภัณฑ์ทางการ (วท.)
                    </option>
                    <option
                      class="text-gray-700"
                      value="ครุภัณฑ์ไม่เป็นทางการ (cs.)"
                    >
                      ครุภัณฑ์ไม่เป็นทางการ (cs.)
                    </option>
                    <option
                      class="text-gray-700"
                      value="ครุภัณฑ์ไม่เป็นทางการ (cs.)"
                    >
                      ครุภัณฑ์ไม่เป็นทางการ (cs.)
                    </option>
                  </select>
                  <div
                    v-if="v$.equipMainType.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.equipMainType.$errors[0].$message }}
                  </div>
                </div>

                <!-- Sub type -->
                <div
                  class="w-full px-4 md:w-6/12"
                  v-if="equipMainType == 'ครุภัณฑ์ทางการ (วท.)'"
                >
                  <label class="block my-3 text-gray-700 text-md"
                    >ประเภทย่อย
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="equipSubType"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      equipSubType == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>
                      Equipment sub type
                    </option>
                    <option class="text-gray-700" value="ครุภัณฑ์ทั่วไป">
                      ครุภัณฑ์ทั่วไป
                    </option>
                    <option class="text-gray-700" value="ครุภัณฑ์ WB">
                      ครุภัณฑ์ WB
                    </option>
                  </select>
                  <div
                    v-if="v$.equipSubType.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.equipSubType.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 2 -->
              <div class="flex flex-wrap mb-4">
                <!-- Equipment id -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md">
                    รหัสครุภัณฑ์
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="equipId"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Equipment id (Ex. วท-xxxx)"
                  />
                  <div
                    v-if="v$.equipId.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.equipId.$errors[0].$message }}
                  </div>
                </div>

                <!-- Serial number -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >หมายเลขครุภัณฑ์
                  </label>
                  <input
                    v-model="serialNumber"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Serial number"
                  />
                </div>
              </div>

              <!-- Line 3 -->
              <div class="flex flex-wrap mb-4">
                <!-- Name -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อครุภัณฑ์
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="equipName"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Equipment name"
                  />
                  <div
                    v-if="v$.equipName.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.equipName.$errors[0].$message }}
                  </div>
                </div>

                <!-- Model -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >แบรนด์ / ยี่ห้อ</label
                  >
                  <input
                    v-model="equipModel"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Equipment model"
                  />
                </div>
              </div>

              <!-- Line 4 -->
              <div class="flex flex-wrap mb-4">
                <!-- Price -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ราคา
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="price"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Price (Baht)"
                  />
                  <div v-if="v$.price.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.price.$errors[0].$message }}
                  </div>
                </div>

                <!-- Quantity -->
                <div class="w-full px-4 md:w-2/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >จำนวน
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="quantity"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    type="text"
                    placeholder="Quantity"
                  />
                  <div
                    v-if="v$.quantity.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.quantity.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 5 -->
              <div class="flex flex-wrap mb-4">
                <!-- Budget -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ที่มาของงบประมาณ
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="budget"
                    class="w-full px-3 py-2 leading-tight"
                    :class="budget == '' ? 'text-placeholder' : 'text-gray-700'"
                  >
                    <option class="text-gray-700" value="" selected disabled>
                      Budget
                    </option>
                    <option class="text-gray-700" value="งบประมาณรายได้">
                      งบประมาณรายได้
                    </option>
                    <option class="text-gray-700" value="งบประมาณแผ่นดิน">
                      งบประมาณแผ่นดิน
                    </option>
                    <option class="text-gray-700" value="งบประมาณบริจาค">
                      งบประมาณบริจาค
                    </option>
                    <option class="text-gray-700" value="งบประมาณ WB">
                      งบประมาณ WB
                    </option>
                  </select>
                  <div
                    v-if="v$.budget.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.budget.$errors[0].$message }}
                  </div>
                </div>

                <!-- Purchase date -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >วันที่จัดซื้อ
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="flex w-full mt-2">
                    <v-date-picker v-model="purchaseDate">
                      <template #default="{ inputValue, inputEvents }">
                        <input
                          class="px-3 py-1 border border-gray-500 text-gray-700 text-md focus:outline-none focus:border-blue-500"
                          :value="inputValue"
                          v-on="inputEvents"
                          placeholder="Purchase date"
                        />
                      </template>
                    </v-date-picker>
                  </div>
                  <div
                    v-if="v$.purchaseDate.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.purchaseDate.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 6 -->
              <div class="flex flex-wrap mb-4">
                <!-- Room -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ห้องเก็บ / ที่อยู่
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="room"
                    class="w-full px-3 py-2 leading-tight"
                    :class="room == '' ? 'text-placeholder' : 'text-gray-700'"
                  >
                    <option value="" selected disabled>Room</option>
                    <option
                      class="text-gray-700"
                      v-for="room in rooms"
                      :key="room.id"
                      :value="room.id"
                    >
                      {{ room.room_name_th }}
                    </option>
                  </select>
                  <div v-if="v$.room.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.room.$errors[0].$message }}
                  </div>
                </div>

                <!-- Care taker -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >ผู้ใช้งาน / รับผิดชอบ
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="careTaker"
                    class="w-full px-3 py-2 leading-tight"
                    :class="
                      careTaker == '' ? 'text-placeholder' : 'text-gray-700'
                    "
                  >
                    <option value="" selected disabled>Care taker</option>
                    <option class="text-gray-700" value="58">-</option>
                    <option
                      class="text-gray-700"
                      v-for="user in careTakers"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.name_title }}{{ user.name_th }}
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

              <!-- Line 7 -->
              <div class="flex flex-wrap mb-4">
                <!-- Status -->
                <div class="w-full px-4 md:w-6/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >สภาพการใช้งาน
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="status"
                    class="w-full px-3 py-2 leading-tight"
                    :class="status == '' ? 'text-placeholder' : 'text-gray-700'"
                  >
                    <option value="" selected disabled>Equipment status</option>
                    <option
                      class="text-gray-700"
                      v-for="status in equipStatus"
                      :key="status.id"
                      :value="status.id"
                    >
                      {{ status.status }}
                    </option>
                  </select>
                  <div
                    v-if="v$.status.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.status.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Line 8 -->
              <div class="flex flex-wrap mb-4">
                <!-- Note -->
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รายละเอียดการซื้อครุภัณฑ์</label
                  >
                  <textarea
                    v-model="purchaseFrom"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Purchase detail"
                  ></textarea>
                </div>
              </div>

              <!-- Line 9 -->
              <div class="flex flex-wrap mb-4">
                <!-- Detail -->
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รายละเอียดครุภัณฑ์</label
                  >
                  <textarea
                    v-model="detail"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Detail"
                  ></textarea>
                </div>
              </div>

              <!-- Line 10 -->
              <div class="flex flex-wrap mb-4">
                <!-- Note -->
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >หมายเหตุ</label
                  >
                  <textarea
                    v-model="note"
                    class="w-full px-3 py-2 leading-tight text-gray-700"
                    rows="5"
                    placeholder="Note"
                  ></textarea>
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
      equipStatus: null,
      careTakers: null,
      rooms: null,

      //? Form
      equipMainType: "",
      equipSubType: "",
      equipId: "",
      serialNumber: "",
      equipName: "",
      equipModel: "",
      price: "",
      quantity: "",
      budget: "",
      purchaseDate: null,
      purchaseFrom: "",
      room: "",
      careTaker: "",
      status: "",
      detail: "",
      note: "",
    };
  },

  mounted() {
    this.getEquipStatus();
    this.getPersonnels();
    this.getRooms();
  },

  methods: {
    //? Get status
    async getEquipStatus() {
      let status = await http.get("equipment/status");
      if (status) {
        this.equipStatus = status.data.data;
      }
    },

    //? Get personnels
    async getPersonnels() {
      let personnels = await http.get("personnels/all");
      if (personnels) {
        this.careTakers = personnels.data.data;
      }
    },

    //? Get rooms
    async getRooms() {
      let rooms = await http.get("rooms/all");
      if (rooms) {
        this.rooms = rooms.data.data;
      }
    },

    //? Reset form
    onResetForm() {
      this.v$.$reset();
      this.equipMainType = "";
      this.equipSubType = "";
      this.equipId = "";
      this.serialNumber = "";
      this.equipName = "";
      this.equipModel = "";
      this.price = "";
      this.quantity = "";
      this.budget = "";
      this.purchaseDate = null;
      this.purchaseFrom = "";
      this.room = "";
      this.careTaker = "";
      this.status = "";
      this.detail = "";
      this.note = "";
    },

    //? Submit form
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();

        if (this.serialNumber != "") {
          data.append("serial_number", this.serialNumber);
        } else {
          data.append("serial_number", "");
        }

        if (this.equipModel != "") {
          data.append("model", this.equipModel);
        } else {
          data.append("model", "");
        }

        if (this.detail != "") {
          data.append("detail", this.detail);
        } else {
          data.append("detail", "");
        }

        if (this.equipSubType != "") {
          data.append("sub_type", this.equipSubType);
        } else {
          data.append("sub_type", "");
        }

        if (this.purchaseFrom != "") {
          data.append("purchase_from", this.purchaseFrom);
        } else {
          data.append("purchase_from", "");
        }

        if (this.note != "") {
          data.append("note", this.note);
        } else {
          data.append("note", "");
        }

        data.append("equip_id", this.equipId);
        data.append("name", this.equipName);
        data.append("price", this.price);
        data.append("quantity", this.quantity);
        data.append("main_type", this.equipMainType);
        //? Format date to Y-m-d
        let date = new Date(this.purchaseDate);
        data.append("purchase_date", date.toISOString().slice(0, 10));
        data.append("budget", this.budget);
        data.append("status_id", this.status);
        data.append("personnel_id", this.careTaker);
        data.append("room_id", this.room);

        //? Set default sweet alert
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        http
          .post("equipment/new", data)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "เพิ่มข้อมูลใหม่เรียบร้อย",
            }).then(() => {
              this.$router.push({ name: "EquipmentShow" });
            });
          })
          .catch((error) => {
            if (error) {
              Toast.fire({
                icon: "error",
                title: "ขออภัย ทำรายการไม่สำเร็จ",
              });
            }
          });
      }
    },
  },

  validations() {
    return {
      equipMainType: {
        required: helpers.withMessage("กรุณาเลือกประเภทครุภัณฑ์", required),
      },
      //? If equipMainType is "ครุภัณฑ์ทางการ (วท.)" required equipSubType
      equipSubType: {
        required: helpers.withMessage(
          "กรุณาเลือกประเภทครุภัณฑ์",
          () =>
            this.equipMainType !== "ครุภัณฑ์ทางการ (วท.)" ||
            this.equipSubType !== ""
        ),
      },
      equipId: {
        required: helpers.withMessage("กรุณากรอกรหัสครุภัณฑ์", required),
      },
      equipName: {
        required: helpers.withMessage("กรุณากรอกชื่อครุภัณฑ์", required),
      },
      price: {
        required: helpers.withMessage("กรุณากรอกราคา", required),
        numeric: helpers.withMessage("ต้องกรอกเป็นตัวเลขเท่านั้น", numeric),
      },
      quantity: {
        required: helpers.withMessage("กรุณากรอกจำนวนของครุภัณฑ์", required),
      },
      budget: {
        required: helpers.withMessage(
          "กรุณาเลือกงบประมาณที่ใช้ในการซื้อครุภัณฑ์",
          required
        ),
      },
      purchaseDate: {
        required: helpers.withMessage("กรุณาเลือกวันที่ซื้อครุภัณฑ์", required),
      },
      room: {
        required: helpers.withMessage("กรุณาเลือกห้อง", required),
      },
      careTaker: {
        required: helpers.withMessage("กรุณาเลือกผู้รับผิดชอบ", required),
      },
      status: {
        required: helpers.withMessage("กรุณาเลือกสถานะ", required),
      },
    };
  },
};
</script>
