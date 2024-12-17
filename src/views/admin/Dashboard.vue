<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full mx-auto">
        <!-- Card stats top-->
        <div class="flex flex-wrap">
          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="จำนวนนักศึกษา (ระบบ)"
              :statTitle="studentTotal"
              statIconName="fas fa-user-graduate"
              statIconColor="bg-red-500"
            />
          </div>

          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="จำนวนบุคลากร (ระบบ)"
              :statTitle="personnelTotal"
              statArrow="down"
              statPercent="3.48"
              statIconName="fas fa-user-tie"
              statIconColor="bg-orange-500"
            />
          </div>

          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="ระบบประกาศข่าวสาร"
              :statTitle="this.newsTotal"
              statArrow="down"
              statPercent="3.48"
              statIconName="fas fa-newspaper"
              statIconColor="bg-pink-500"
            />
          </div>

          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="ครุภัณฑ์ในระบบทั้งหมด"
              :statTitle="this.equipmentTotal"
              statIconName="fas fa-cubes"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>

        <!-- Card stats bottom -->
        <div class="flex flex-wrap mt-6">
          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="ระบบแจ้งตกค้างรายวิชา"
              :statTitle="this.courseTotal"
              statArrow="up"
              statPercent="3.48"
              statPercentColor="text-emerald-500"
            />
          </div>

          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="ระบบแจ้งซ่อม"
              :statTitle="this.repairTotal"
              statArrow="down"
              statPercent="3.48"
              statIconName="fas fa-wrench"
              statIconColor="bg-orange-500"
            />
          </div>

          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="ระบบติดต่อกลับ"
              :statTitle="this.complainTotal"
              statArrow="down"
              statPercent="1.10"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>

          <div class="w-full px-4 lg:w-6/12 xl:w-3/12">
            <card-stats
              statSubtitle="ระบบยืม-คืน"
              :statTitle="this.borrowTotal"
              statArrow="up"
              statPercent="12"
              statIconName="fas fa-handshake"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full px-4 mb-12 xl:w-12/12 xl:mb-0">
        <card-page-visits />
      </div>
    </div>
  </div>
</template>

<script>
//? Components
// import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardStats from "@/components/cards/CardStats.vue";
import CardPageVisits from "@/components/cards/CardPageVisits.vue";
//? API
import http from "@/services/APIService";
export default {
  name: "dashboard-page",
  components: {
    CardStats,
    CardPageVisits,
  },
  data() {
    return {
      studentTotal: 0,
      personnelTotal: 0,
      newsTotal: 0,
      equipmentTotal: 0,
      courseTotal: 0,
      repairTotal: 0,
      complainTotal: 0,
      borrowTotal: 0,
    };
  },

  async mounted() {
    await this.getData();
  },

  methods: {
    async getData() {
      //? Student
      let students = await http.get("students");
      this.studentTotal = students?.data?.total;

      //? Personnel
      let personnels = await http.get("personnels");
      this.personnelTotal = personnels?.data?.total;

      //? News
      let news = await http.get("news/private");
      this.newsTotal = news?.data?.total;

      //? Equipment
      let equipments = await http.get("equipments");
      this.equipmentTotal = equipments?.data?.total;

      //? Courses
      let courses = await http.get("residuals");
      this.courseTotal = courses?.data?.total;

      //? Complains
      let complains = await http.get("complains");
      this.complainTotal = complains?.data?.total;

      //? Repairs
      let repairs = await http.get("equipment/repairs");
      this.repairTotal = repairs?.data?.total;

      //? Borrows
      let borrows = await http.get("equipment/borrows");
      this.borrowTotal = borrows?.data?.total;
    },
  },
};
</script>
