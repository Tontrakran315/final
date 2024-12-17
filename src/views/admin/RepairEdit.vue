<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/repairshow">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>

            <div class="text-center">
              <h1 class="py-4 text-3xl font-bold">บันทึกการซ่อม</h1>
            </div>

            <br class="shadow-xl" />

            <!-- Rapair Log -->
            <div class="w-full py-2">
              <div class="text-start md:border-l rounded-lg px-4">
                <div
                  class="pb-4 text-center md:text-left flex flex-col md:flex-row items-center"
                >
                  <span class="text-2xl font-bold pr-2">ข้อมูลแจ้งซ่อม</span>
                  <span class="text-xs text-red-500 font-bold"
                    >( เวลาที่แจ้ง {{ createdAt }} )</span
                  >
                </div>
                <div class="flex flex-wrap items-start justify-center">
                  <!-- Image -->
                  <div :class="imgSrc ? 'w-full md:w-3/12 py-2' : 'hidden'">
                    <img
                      class="rounded-lg w-full"
                      :src="imgSrc"
                      alt="Repair Image"
                    />
                    <span class="text-xs text-red-500"
                      >รูปภาพครุภัณฑ์ที่ชำรุด</span
                    >
                  </div>

                  <!-- Log -->
                  <div class="w-full" :class="{ 'md:pl-4 md:w-9/12': imgSrc }">
                    <div class="flex flex-wrap md:pb-2">
                      <div class="w-full md:w-6/12">
                        <label class="block text-gray-700 text-md"
                          >รหัสครุภัณฑ์
                        </label>
                        <input
                          type="text"
                          v-model="equipId"
                          class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                          placeholder="รหัสของครุภัณฑ์"
                          disabled
                        />
                      </div>

                      <div class="w-full md:pl-4 md:w-6/12">
                        <label class="block text-gray-700 text-md"
                          >ชื่อครุภัณฑ์
                        </label>
                        <input
                          type="text"
                          v-model="equipName"
                          class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                          placeholder="ชื่อของครุภัณฑ์"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="flex flex-wrap md:pb-2">
                      <div class="w-full md:w-6/12">
                        <label class="block text-gray-700 text-md"
                          >ชื่อผู้แจ้ง
                        </label>
                        <input
                          type="text"
                          v-model="notifierName"
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
                          v-model="equipRoom"
                          class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                          placeholder="ห้องที่จัดเก็บครุภัณฑ์"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="flex flex-wrap">
                      <div class="w-full">
                        <label class="block text-gray-700 text-md"
                          >รายละเอียด
                        </label>
                        <textarea
                          v-model="detail"
                          class="w-full px-3 leading-tight text-gray-700 bg-blueGray-200 border-none rounded-md"
                          rows="4"
                          placeholder="อาการชำรุดเบื้องต้น"
                          disabled
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full text-center md:text-left">
              <h1 class="py-4 px-4 text-2xl font-bold">บันทึกการซ่อม</h1>
            </div>

            <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
              <!-- Radio button -->
              <div class="flex flex-wrap mb-4">
                <div class="w-full px-4 md:w-6/12">
                  <div class="block text-gray-700 text-md">
                    ผู้ซ่อม <span class="text-red-500">*</span>
                  </div>
                  <label
                    class="inline-flex items-center cursor-pointer mr-4 mt-4"
                  >
                    <input
                      type="radio"
                      v-model="chooseRepairBy"
                      value="1"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-none bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      ซ่อมเอง
                    </span>
                  </label>

                  <label
                    class="inline-flex items-center cursor-pointer mr-4 mt-4"
                  >
                    <input
                      type="radio"
                      v-model="chooseRepairBy"
                      value="2"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-none bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      ซ่อมโดยบริษัท
                    </span>
                  </label>

                  <label class="inline-flex items-center cursor-pointer mt-4">
                    <input
                      type="radio"
                      v-model="chooseRepairBy"
                      value="3"
                      class="w-5 h-5 transition-all duration-150 ease-linear border-none bg-gray-200 text-blueGray-700"
                    />
                    <span class="ml-2 text-sm text-blueGray-600">
                      ยกเลิกการซ่อม
                    </span>
                  </label>
                </div>
              </div>

              <div class="flex flex-wrap mb-4" v-if="chooseRepairBy !== '3'">
                <div class="w-full px-4 md:w-6/12">
                  <label class="block text-gray-700 text-md"
                    >ผู้ซ่อม <span class="text-red-500">*</span>
                  </label>

                  <!-- Self repair -->
                  <select
                    v-show="chooseRepairBy === '1'"
                    v-model="repairManSelect"
                    class="w-full border-none bg-gray-200 rounded-md mb-2"
                    :class="{ 'text-placeholder': repairManSelect === '' }"
                  >
                    <option value="" disabled selected>เลือกชื่อผู้ซ่อม</option>
                    <option
                      v-for="person in personnels"
                      :key="person.id"
                      :value="person.name_title + person.name_th"
                      class="text-gray-700"
                    >
                      {{ person.name_title + person.name_th }}
                    </option>
                    <option value="notHadName" class="text-gray-700">
                      อื่นๆ
                    </option>
                  </select>

                  <!-- Repair by some company -->
                  <input
                    v-show="
                      chooseRepairBy === '2' || repairManSelect === 'notHadName'
                    "
                    type="text"
                    v-model="repairManInput"
                    class="w-full text-gray-700 bg-gray-200 border-none rounded-md"
                    placeholder="ชื่อผู้ซ่อม"
                  />

                  <!-- Repair man input error -->
                  <div
                    v-if="v$.repairManInput.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.repairManInput.$errors[0].$message }}
                  </div>

                  <!-- Repair man select error -->
                  <div
                    v-if="v$.repairManSelect.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.repairManSelect.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Equipment detail -->
              <div class="flex flex-wrap mb-4" v-if="chooseRepairBy !== '3'">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >รายการแก้ไข <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="log"
                    class="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border-none rounded-md"
                    rows="5"
                    placeholder="บันทึกการแก้ไข"
                  ></textarea>
                  <div v-if="v$.log.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.log.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div
                v-if="chooseRepairBy !== '3'"
                class="flex flex-wrap"
                v-for="(spare, index) in repairSpairPart"
                :key="index"
              >
                <div class="w-full pl-4 pr-4 md:pr-2 md:w-20/100">
                  <label class="block text-gray-700 text-md"
                    >อะไหล่
                    <span
                      class="text-red-500"
                      v-if="
                        index !== 0 ||
                        spare.spare_part ||
                        spare.price ||
                        spare.quantity ||
                        spare.image
                      "
                      >*</span
                    >
                  </label>
                  <input
                    type="text"
                    v-model="spare.spare_part"
                    class="w-full text-gray-700 bg-gray-200 border-none rounded-md"
                    placeholder="อะไหล่ที่ใช้ซ่อม"
                  />
                </div>

                <div class="w-6/12 px-4 md:px-2 md:w-15/100">
                  <label class="block text-gray-700 text-md"
                    >ราคา/ชิ้น
                    <span
                      class="text-red-500"
                      v-if="
                        index !== 0 ||
                        spare.spare_part ||
                        spare.price ||
                        spare.quantity ||
                        spare.image
                      "
                      >*</span
                    >
                  </label>
                  <input
                    type="text"
                    v-model="spare.price"
                    class="w-full text-gray-700 bg-gray-200 border-none rounded-md"
                    placeholder="ราคา"
                  />
                </div>

                <div class="w-6/12 px-4 md:px-2 md:w-15/100">
                  <label class="block text-gray-700 text-md"
                    >จำนวน
                    <span
                      class="text-red-500"
                      v-if="
                        index !== 0 ||
                        spare.spare_part ||
                        spare.price ||
                        spare.quantity ||
                        spare.image
                      "
                      >*</span
                    >
                  </label>
                  <input
                    type="text"
                    v-model="spare.quantity"
                    class="w-full text-gray-700 bg-gray-200 border-none rounded-md"
                    placeholder="จำนวน"
                  />
                </div>

                <div class="w-full px-4 md:px-2 md:w-30/100">
                  <label class="block text-gray-700 text-md"
                    >รูปภาพอะไหล่
                  </label>
                  <input
                    id="image"
                    ref="uploadImage"
                    type="file"
                    accept="image/*"
                    class="w-full text-gray-700 bg-blueGray-200 border-none rounded-md"
                    @change="handleImage($event, index)"
                  />
                </div>

                <div
                  class="w-full py-2 text-center md:py-6 pl-4 pr-4 md:pl-2 md:w-20/100 md:text-left"
                >
                  <button
                    @click="handleAddSparePart(index, spare, repairSpairPart)"
                    class="px-3 py-2 mr-2 text-sm font-bold text-white transition-all duration-150 ease-linear rounded-full shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    v-show="
                      (repairSpairPart.length > 1 && index !== 0) ||
                      spare.spare_part !== '' ||
                      spare.price !== '' ||
                      spare.quantity !== '' ||
                      spare.image !== null
                    "
                    @click="handleRemoveSparePart(index, repairSpairPart)"
                    class="px-3 py-2 text-sm font-bold text-white transition-all duration-150 ease-linear rounded-full shadow-lg outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none"
                    type="button"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <!-- Show error from v$ -->
              <div v-if="v$.repairSpairPart.$error" class="mb-4">
                <div
                  class="px-5 text-sm text-red-500"
                  v-for="index in v$.repairSpairPart.$errors[0].$message.length"
                  :key="index"
                >
                  {{ v$.repairSpairPart.$errors[0].$message[index - 1][0] }}
                </div>
              </div>

              <!-- Images preview -->
              <div
                v-if="imagePreview.length > 0 && chooseRepairBy !== '3'"
                class="mb-4"
              >
                <div class="w-full text-center md:text-left">
                  <h1 class="px-4 text-xl font-bold">
                    Image Preview <i class="fa-solid fa-image"></i>
                  </h1>
                </div>
                <div class="flex flex-wrap my-2">
                  <div
                    class="w-full px-4 md:w-3/12"
                    v-for="img in imagePreview"
                    :key="img"
                  >
                    <img
                      :src="img"
                      alt="Image preview"
                      class="h-120-px w-auto rounded-md duration-150 ease-linear hover:zoom"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap mb-4" v-if="chooseRepairBy !== '3'">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md"
                    >หมายเหตุ <span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="note"
                    class="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border-none rounded-md"
                    rows="5"
                    placeholder="หมายเหตุ"
                  ></textarea>
                  <div v-if="v$.note.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.note.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex flex-wrap justify-center mt-12 mb-6">
                <button
                  @click="handleReset"
                  class="px-4 py-3 mr-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-broom"></i> ล้าง
                </button>
                <button
                  class="px-4 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded-lg shadow-lg outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
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
//? Package
import useValidate from "@vuelidate/core";
import {
  required,
  requiredIf,
  helpers,
  numeric,
  integer,
} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),

      id: this.$route.params.id,

      //? Data
      imgSrc: "",
      equipId: "",
      equipName: "",
      equipRoom: "",
      detail: "",
      notifierName: "",
      createdAt: null,
      personnels: [],

      //? Repiar by
      chooseRepairBy: "1",

      //? Form
      repairManInput: "",
      repairManSelect: "",
      log: "",
      note: "",
      repairSpairPart: [
        {
          spare_part: "",
          price: "",
          quantity: "",
          image: null,
        },
      ],
      imagePreview: [],
    };
  },

  watch: {
    chooseRepairBy(val) {
      //? Val equal 3 it mean cancel this repair
      if (val === "3") {
        this.repairManInput = "";
        this.repairManSelect = "";
        this.log = "";
        this.note = "";
        this.repairSpairPart = [
          {
            spare_part: "",
            price: "",
            quantity: "",
            image: null,
          },
        ];
        this.imagePreview = [];
        this.$refs.uploadImage.forEach((el) => {
          el.value = "";
        });
      } else {
        //? If not 3 but choose has change then reset input repairman
        this.repairManInput = "";
        this.repairManSelect = "";
      }
    },
  },

  mounted() {
    this.getRepair();
    this.getPersonnel();
  },

  methods: {
    //? Get repair
    async getRepair() {
      try {
        const response = await http.get(`equipment/repair/show/${this.id}`);
        if (response?.data?.success) {
          let data = response.data.data;
          this.equipId = data.room;
          this.equipName = data.equip_name;
          this.equipRoom = data.room_name_th;
          this.detail = data.initial_symptoms;
          this.notifierName = data.notifier_name;
          this.createdAt = new Date(data.created_at).toLocaleString();
          data.equip_id
            ? (this.equipId = data.equip_id)
            : (this.equipId = null);
          data.image ? (this.imgSrc = data.image) : (this.imgSrc = null);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //? Get personnel
    async getPersonnel() {
      try {
        const response = await http.get("personnels/all");
        if (response?.data?.success) {
          this.personnels = response.data.data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    //? Handle image
    handleImage(event, index) {
      //? Set alert style
      const Swal = this.$swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        customClass: {
          title: "font-semibold custom text-blueGray-600",
        },
      });

      //? Get file
      let file = event?.target?.files[0];

      //? Check image type if not jpg and png show alert then return
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        this.$refs.uploadImage[index].value = "";
        Swal.fire({
          icon: "error",
          title: "รูปภาพไม่ถูกต้อง",
          text: "รูปภาพต้องเป็นไฟล์ jpg, jpeg หรือ png เท่านั้น",
        });
        return;
      }

      //? Check image size if more than 3MB then return
      if (file.size > 3000000) {
        this.$refs.uploadImage[index].value = "";
        Swal.fire({
          icon: "error",
          title: "รูปภาพใหญ่เกินไป",
          text: "รูปภาพต้องมีขนาดไม่เกิน 3MB",
        });
        return;
      }

      //? Remove old image preview if has update new image
      if (this.imagePreview[index]) {
        this.imagePreview.splice(index, 1);
      }

      //? Push file to image preview to array
      this.repairSpairPart[index].image = file;
      this.imagePreview.push(URL.createObjectURL(file));
    },

    //? Handle add spare part
    handleAddSparePart(index, input, array) {
      //? Touch input to check input error
      this.v$.repairSpairPart.$touch();

      //? Check input error if has error then return
      if (this.v$.repairSpairPart.$errors.length > 0) {
        return;
      }

      //? Check input is not empty then create new object and push to array
      if (input.spare_part && input.price && input.quantity) {
        let obj = {
          spare_part: "",
          price: "",
          quantity: "",
          image: null,
        };
        array.push(obj);
      } else {
        //? Set Alert Style
        const Swal = this.$swal.mixin({
          position: "center",
          customClass: {
            title: "font-semibold custom text-blueGray-600",
          },
        });

        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเพิ่มฟิลด์ได้",
          text: "กรุณากรอกข้อมูลที่กำหนดให้ครบถ้วน",
        });
      }
    },

    //? Handle remove spare part
    handleRemoveSparePart(index, array) {
      //? Array equal 1 clear input and image preview
      if (array.length === 1) {
        array[index].spare_part = "";
        array[index].price = "";
        array[index].quantity = "";
        array[index].image = null;
        this.$refs.uploadImage[index].value = "";
        this.imagePreview.splice(index, 1);
        return;
      }

      //? Remove data from array
      array.splice(index, 1);
      //? Remove image from preview
      this.imagePreview.splice(index, 1);
    },

    //? Fuction to update repair status
    async updateRepairStatus(value) {
      try {
        let data = new FormData();
        data.append("id", this.id);
        data.append("is_repaired", value);
        const response = await http.post(
          "equipment/repair/update-status",
          data
        );
        if (response?.data?.success) {
          return true;
        }
      } catch (error) {
        throw error;
      }
    },

    //? Handle Submit
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        //? Check choose repair by if choose 3 it mean cancel repair
        if (this.chooseRepairBy === "3") {
          this.cancelRepair();
        } else {
          //? Call function to send repair data log
          this.sendRepairData();
        }
      }
    },

    //? Send repair data log
    async sendRepairData() {
      //? Set Alert Style
      const Swal = this.$swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        customClass: {
          title: "font-semibold custom text-blueGray-600",
        },
      });

      try {
        let data = new FormData();
        data.append("repair_id", this.id);
        data.append("log", this.log);
        data.append("note", this.note);

        if (this.chooseRepairBy === "1") {
          data.append("repair_by", "ซ่อมเอง");
          //? Check if repairManSelect is notHadName
          if (this.repairManSelect === "notHadName") {
            data.append("repairman_name", this.repairManInput);
          } else {
            data.append("repairman_name", this.repairManSelect);
          }
        }

        if (this.chooseRepairBy === "2") {
          data.append("repair_by", "ซ่อมโดยบริษัท");
          data.append("repairman_name", this.repairManInput);
        }

        //? spare_parts is array and has image object
        this.repairSpairPart.forEach((item, index) => {
          if (!item.spare_part || !item.price || !item.quantity) return;
          data.append(
            "spare_parts[" + index + "][spare_part]",
            item.spare_part
          );
          data.append("spare_parts[" + index + "][price]", item.price);
          data.append("spare_parts[" + index + "][quantity]", item.quantity);
          if (item.image) {
            data.append("spare_parts[" + index + "][image]", item.image);
          } else {
            data.append("spare_parts[" + index + "][image]", "");
          }
        });

        const response = await http.post("equipment/repair/log/new", data);

        if (response?.data?.success) {
          //? Call function update repair status
          const updateStatus = await this.updateRepairStatus("success");
          if (updateStatus) {
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลสำเร็จ",
              timer: 1500,
            }).then(() => {
              this.$router.push({
                name: "RepairLogs",
              });
            });
          }
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

    //? Cancel repair
    async cancelRepair() {
      //? Set Alert Style
      const Swal = this.$swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        customClass: {
          title: "font-semibold custom text-blueGray-600",
        },
      });

      try {
        const updateStatus = await this.updateRepairStatus("cancel");
        if (updateStatus) {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            timer: 1500,
          }).then(() => {
            this.$router.push({
              name: "RepairLogs",
            });
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

  validations() {
    return {
      repairManInput: {
        requiredIf: helpers.withMessage(
          "กรุณากรอกชื่อบริษัทที่ซ่อม",
          requiredIf(() => {
            if (this.chooseRepairBy !== "3" && this.chooseRepairBy !== "1") {
              return !this.repairManInput;
            } else {
              return false;
            }
          })
        ),
      },

      repairManSelect: {
        //? Use required because has two option of input
        required: helpers.withMessage("กรุณาเลือกหรือกรอกชื่อของช่าง", () => {
          if (this.chooseRepairBy !== "3" && this.chooseRepairBy !== "2") {
            if (this.repairManSelect === "notHadName") {
              return this.repairManInput !== "";
            } else {
              return this.repairManSelect !== "";
            }
          } else {
            return true;
          }
        }),
      },

      log: {
        requiredIf: helpers.withMessage(
          "กรุณากรอกข้อมูล",
          requiredIf(() => {
            return this.chooseRepairBy !== "3";
          })
        ),
      },

      repairSpairPart: {
        $each: helpers.forEach({
          spare_part: {
            requiredIf: helpers.withMessage(
              "กรุณากรอกชื่ออะไหล่",
              requiredIf(() => {
                let dataLen = this.repairSpairPart.length;
                if (dataLen - 1 === 0) {
                  if (
                    !this.repairSpairPart[0].spare_part &&
                    (this.repairSpairPart[0].price ||
                      this.repairSpairPart[0].quantity ||
                      this.repairSpairPart[0].image)
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  return !this.repairSpairPart.spare_part;
                }
              })
            ),
          },

          price: {
            requiredIf: helpers.withMessage(
              "กรุณากรอกราคาอะไหล่",
              requiredIf(() => {
                let dataLen = this.repairSpairPart.length;
                if (dataLen - 1 === 0) {
                  if (
                    !this.repairSpairPart[0].price &&
                    (this.repairSpairPart[0].spare_part ||
                      this.repairSpairPart[0].quantity ||
                      this.repairSpairPart[0].image)
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  return !this.repairSpairPart.price;
                }
              })
            ),
            numeric: helpers.withMessage("ราคาต้องเป็นตัวเลขเท่านั้น", numeric),
          },

          quantity: {
            requiredIf: helpers.withMessage(
              "กรุณากรอกจำนวนอะไหล่",
              requiredIf(() => {
                let dataLen = this.repairSpairPart.length;
                if (dataLen - 1 === 0) {
                  if (
                    !this.repairSpairPart[0].quantity &&
                    (this.repairSpairPart[0].spare_part ||
                      this.repairSpairPart[0].price ||
                      this.repairSpairPart[0].image)
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  return !this.repairSpairPart.quantity;
                }
              })
            ),
            integer: helpers.withMessage(
              "จำนวนอะไหล่ต้องเป็นตัวเลขเท่านั้น",
              integer
            ),
          },
        }),
      },

      note: {
        requiredIf: helpers.withMessage(
          "กรุณากรอกข้อมูล",
          requiredIf(() => {
            return this.chooseRepairBy !== "3";
          })
        ),
      },
    };
  },
};
</script>
