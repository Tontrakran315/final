<template>
  <div>
    <sidebar />
    <div class="relative min-h-screen clear-both md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <header-stats />
      <div class="w-full px-4 mx-auto -m-24 md:px-10">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
        <admin-footer />
      </div>
    </div>
  </div>
</template>

<script>
//? Components
import AdminNavbar from "@/components/navbars/AdminNavbar.vue";
import Sidebar from "@/components/sidebars/Sidebar.vue";
import HeaderStats from "@/components/headers/HeaderStats.vue";
import AdminFooter from "@/components/footers/AdminFooter.vue";
export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    AdminFooter,
  },
};
</script>
