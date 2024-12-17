<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/activitydoc/show">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>

            <!-- Head -->
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">
                แก้ไขข้อมูลการเข้าร่วมกิจกรรม
              </h1>
            </div>

            <br class="shadow-xl" />

            <!-- Form -->
            <form ref="activityForm" @submit.stop.prevent="handleSubmit">
              <!-- Select activities -->
              <div class="flex flex-wrap">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >เลือกกิจกรรม <span class="text-red-500">*</span></label
                  >
                  <VueMultiselect
                    v-if="activities"
                    v-model="selected"
                    :options="activities"
                    track-by="name"
                    label="name"
                    class="select"
                    placeholder="Select activity"
                  >
                  </VueMultiselect>
                  <div
                    v-if="v$.activityId.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.activityId.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Activity document name -->
              <div class="flex flex-wrap mt-4">
                <div class="w-full px-4">
                  <label class="block my-3 text-gray-700 text-md"
                    >ชื่อเอกสาร <span class="text-red-500">*</span></label
                  >
                  <input
                    type="text"
                    v-model="documentName"
                    class="w-full"
                    placeholder="Document name"
                  />
                  <div
                    v-if="v$.documentName.$error"
                    class="mt-2 text-sm text-red-500"
                  >
                    {{ v$.documentName.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <!-- Activity document upload file (pdf) -->
              <div class="flex flex-wrap my-4">
                <div class="w-full px-4 md:w-12/12">
                  <label class="block my-3 text-gray-700 text-md" for="image"
                    >เอกสารรายชื่อผู้เข้าร่วมกิจกรรม
                    <span class="text-sm mr-2"
                      >(ขนาดไฟล์ต้องไม่เกิน 10 MB)</span
                    >
                    <span class="text-red-500">*</span></label
                  >
                  <div
                    class="relative flex items-center justify-center h-32 bg-gray-100 border-b border-blue-700"
                  >
                    <input
                      ref="fileupload"
                      type="file"
                      @change="onFileChange"
                      accept="application/pdf"
                      class="w-full h-50-px opacity-0 p-3 bg-white"
                    />
                  </div>
                  <div v-if="v$.file.$error" class="mt-2 text-sm text-red-500">
                    {{ v$.file.$errors[0].$message }}
                  </div>

                  <!-- PDF Preview  -->
                  <div class="mt-4 mb-4 text-center" v-if="pdf != null">
                    <div class="flex justify-center">
                      <iframe
                        :src="pdf"
                        frameborder="0"
                        class="w-full md:w-8/12 h-600-px rounded shadow-md"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="py-6 text-center">
                <button
                  @click="handleReset"
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
import { required, helpers } from "@vuelidate/validators";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
  components: {
    VueMultiselect,
  },

  data() {
    return {
      //? Validation
      v$: useValidate(),

      //? ID from params
      id: "",

      //? Data
      activities: null,

      /// Form
      selected: "",
      activityId: "",
      documentName: "",
      file: null,

      //? Preview
      pdf: null,
    };
  },

  watch: {
    //? Watch selected and set activity id
    selected(val) {
      if (val) {
        this.activityId = val.id;
      } else {
        this.activityId = "";
      }
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getActivities();
  },

  methods: {
    //? Get all activity from API use for select
    async getActivities() {
      try {
        //? This /activities/all is get all activities not paginated
        const response = await http.get("/activities/all");
        if (response.data.success) {
          this.activities = response.data.data;
          //? Call getActivityDoc function
          this.getActivityDoc(this.id);
        }
      } catch (error) {
        console.log(err);
      }
    },

    //? Get old data activity doc use for update
    async getActivityDoc(id) {
      try {
        const response = await http.get(`activity/doc/${id}`);
        if (response.data.success) {
          let data = response.data.data;
          //? Filter activity by activity id
          this.selected = this.activities.filter(
            (activity) => activity.id == data.activity_id
          )[0];
          this.documentName = data.name;
          this.pdf = data.file;
        } else {
          const Swal = this.$swal.mixin({
            position: "center",
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            customClass: {
              title: "font-semibold custom text-blueGray-600",
            },
          });

          //? Show error
          Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
          }).then(() => {
            this.$router.push({ name: "ActivityDocShow" });
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //? Onfile upload had changed
    onFileChange(e) {
      this.file = e.target.files[0];
      //? If file is larger than 10mb then show error
      if (this.file.size > 10240 * 1000) {
        const Swal = this.$swal.mixin({
          position: "center",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
          customClass: {
            title: "font-semibold custom text-blueGray-600",
          },
        });

        //? Show error
        Swal.fire({
          icon: "error",
          title: "ขนาดไฟล์ต้องไม่เกิน 10MB",
        }).then(() => {
          //? Reset value
          this.file = null;
          this.$refs.fileupload.value = null;
        });
        return;
      }
      this.pdf = URL.createObjectURL(this.file);
    },

    //? Reset form
    handleReset() {
      this.v$.$reset();
      this.selected = "";
      this.activityId = "";
      this.documentName = "";
      this.file = null;
      this.pdf = null;
      this.$refs.fileupload.value = null;
    },

    //? Submit form
    handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let data = new FormData();
        data.append("activity_id", this.activityId);
        data.append("name", this.documentName);
        if (this.file) {
          data.append("file", this.file);
        }
        http
          .post(`activity/doc/update/${this.id}`, data)
          .then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: "success",
              title: "แก้ไขข้อมูลเรียบร้อย",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
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
              title: "ขออภัย ทำรายการไม่สำเร็จ",
            });
          });
      }
    },
  },

  validations() {
    return {
      activityId: {
        required: helpers.withMessage("กรุณาเลือกกิจกรรม", required),
      },
      documentName: {
        required: helpers.withMessage("กรุณากรอกชื่อเอกสาร", required),
      },
      file: {
        required: helpers.withMessage(
          "กรุณาอัปโหลดไฟล์โครงงาน ต้องเป็นไฟล์ .pdf เท่านั้น",
          () => {
            if (this.file != null) {
              return this.file.type == "application/pdf" ? true : false;
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

<style>
.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-bottom: 1px solid;
  background-color: transparent;
}
</style>
