<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container px-4 mx-auto">
          <div class="px-6">
            <div class="mt-4 text-right">
              <router-link to="/admin/complaining">
                <i
                  class="relative duration-150 ease-linear hover:zoom fas fa-times fa-2x"
                ></i>
              </router-link>
            </div>
            <div class="text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | รายละเอียดแจ้งติดต่อกลับ
              </h1>
            </div>

            <br class="shadow-xl" />

            <div class="cssanimation sequence fadeInBottom">
              <p class="mt-8 text-2xl font-bold leading-relaxed text-center">
                {{ title }}
              </p>
              <p class="mb-8 font-bold leading-relaxed text-center" v-if="date">
                วันที่ {{ new Date(date).toLocaleDateString() }} เวลา :
                {{ new Date(date).toLocaleTimeString() }}
              </p>
              <p class="my-6 rem2">
                {{ detail }}
              </p>
              <p class="flex justify-center w-full py-6" v-if="image">
                <img
                  :src="image"
                  class="w-64 h-auto rounded"
                  alt="report image"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/services/APIService";
export default {
  data() {
    return {
      //? id
      id: this.$route.params.id,

      //? Data
      title: "",
      detail: "",
      image: "",
      date: "",
    };
  },

  mounted() {
    this.getComplain();
  },

  methods: {
    async getComplain() {
      let res = await http.get(`complain/show/${this.id}`);
      if (res) {
        let data = res.data.data;
        this.title = data.title;
        this.detail = data.detail;
        this.image = data.image;
        this.date = data.created_at;
      }
    },
  },
};
</script>
