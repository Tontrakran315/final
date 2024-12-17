<template>
  <div class="flex flex-wrap custom">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
      >
        <div class="container mx-auto">
          <div class="px-6">
            <div class="mt-6 text-center">
              <h1 class="py-6 text-3xl font-bold">
                CSMJU | ระบบแจ้งซ่อมอุปกรณ์
              </h1>
            </div>

            <div
              class="w-full px-6 pt-6 flex flex-wrap justify-center md:justify-start"
            >
              <div class="py-3">
                <router-link
                  :to="{ name: 'RepairChart' }"
                  v-slot="{ href, navigate, isActive }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="px-2 py-2 rounded-lg mr-2"
                    :class="{
                      'bg-orange-500 text-white': isActive,
                      'bg-blueGray-200': !isActive,
                    }"
                  >
                    <span class="mr-2 hidden md:inline-block"
                      >ความคืบหน้าการทำงาน</span
                    >
                    <span class="mr-2 inline-block md:hidden">ความคืบหน้า</span>
                    <i class="fa-solid fa-chart-pie"></i>
                  </a>
                </router-link>
              </div>

              <div class="py-3">
                <router-link
                  :to="{ name: 'RepairLogs' }"
                  v-slot="{ href, navigate, isActive }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="px-2 py-2 rounded-lg mr-2"
                    :class="{
                      'bg-blue-500 text-white': isActive,
                      'bg-blueGray-200': !isActive,
                    }"
                  >
                    <span class="mr-2 hidden md:inline-block"
                      >รายการแจ้งซ่อม</span
                    >
                    <span class="mr-2 inline-block md:hidden">รายการ</span>
                    <i class="fa-solid fa-list-check"></i>
                  </a>
                </router-link>
              </div>

              <div class="py-3">
                <router-link
                  :to="{ name: 'RepairHistory' }"
                  v-slot="{ href, navigate, isActive }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="px-2 py-2 rounded-lg mr-2"
                    :class="{
                      'bg-indigo-500 text-white': isActive,
                      'bg-blueGray-200': !isActive,
                    }"
                  >
                    <span class="mr-2 hidden md:inline-block"
                      >ประวัติการซ่อม</span
                    >
                    <span class="mr-2 inline-block md:hidden">ประวัติ</span>
                    <i class="fa-solid fa-tools"></i>
                  </a>
                </router-link>
              </div>

              <div class="py-3">
                <router-link
                  :to="{ name: 'LineTokenAdd' }"
                  v-slot="{ href, navigate, isActive }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="px-2 py-2 rounded-lg mr-2"
                    :class="{
                      'bg-emerald-500 text-white': isActive,
                      'bg-blueGray-200': !isActive,
                    }"
                  >
                    <span class="mr-2 hidden md:inline-block"
                      >เพิ่ม Line Token</span
                    >
                    <span class="mr-2 inline-block md:hidden">Line Token</span>
                    <i class="fa-solid fa-cookie-bite"></i>
                  </a>
                </router-link>
              </div>
            </div>

            <br class="shadow-xl" />

            <div class="w-full">
              <router-view v-slot="{ Component, route }">
                <transition name="slide-fade" mode="out-in">
                  <component :is="Component" :key="route.path"></component>
                </transition>
              </router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
