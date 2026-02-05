<template>
  <section class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-5xl mx-auto space-y-8">

      <!-- =====================
           HEADER
           ===================== -->
      <div class="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
        <p class="text-yellow-900 text-sm">
          <strong>You’re viewing sample data.</strong>
          Explore freely — nothing you do here will be saved.
          <strong>This is a demonstration environment. Please do not enter real or sensitive personal or medical information.
            Note that all data is deleted within 2-3 days after creation.</strong>
          <router-link to="/signup" class="underline ml-1">
            Create your own account
          </router-link>
        </p>
      </div>

      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Your health patterns at a glance
        </h1>
        <p class="text-gray-600 mt-1">
          Insights based on your recent entries
        </p>
      </div>

      <!-- =====================
           INSIGHT SUMMARY
           ===================== -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-blue-800 mb-2">
          What stands out
        </h2>

        <ul
            v-if="hasCharts"
            class="list-disc list-inside text-blue-900 space-y-1"
        >
          <li>Energy tends to be higher on days with exercise.</li>
          <li>Sleep consistency has improved over the past two weeks.</li>
        </ul>

        <p v-else class="text-blue-900">
          Once you log a few days, patterns between your habits and how you feel
          will start to appear here.
        </p>
      </div>

      <!-- =====================
           CHARTS OR EMPTY STATE
           ===================== -->
      <div v-if="hasCharts" class="space-y-8">

        <!-- DASHBOARD CHARTS -->
        <div
          v-for="chart in dashboardCharts"
          :key="chart.id"
          class="bg-white shadow-md rounded-xl p-6"
        >
          <UsersChart
            :user-id="userId"
            :chart-id="chart.id"
          />


          <!-- Reuse existing chart route -->
          <router-link
            :to="`/users/${userId}/charts/${chart.id}`"
            class="text-blue-600 hover:underline text-sm"
          >
            View full chart →
          </router-link>
        </div>

      </div>

      <!-- EMPTY STATE -->
      <div
        v-else
        class="bg-white shadow-md rounded-xl p-8 text-center space-y-4"
      >
        <h3 class="text-xl font-semibold text-gray-800">
          This is where your charts will appear
        </h3>

        <p class="text-gray-600">
          Track things like sleep, energy, or weight for a few days and the app
          will automatically turn them into visual trends.
        </p>

        <router-link
          to="/journals/new"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log your first entry
        </router-link>
      </div>

      <!-- =====================
           ACTION BAR
           ===================== -->
      <div class="flex flex-wrap gap-4 pt-4">
        <router-link
          to="/journals/new"
          class="text-blue-600 hover:underline"
        >
          Log today’s journal
        </router-link>

        <router-link
          :to="`/users/${userId}/charts`"
          class="text-blue-600 hover:underline"
        >
          View all charts
        </router-link>

        <router-link
          to="/conditions"
          class="text-blue-600 hover:underline"
        >
          Review conditions
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "@/lib/axios";
import UsersChart from "@/components/UsersChart.vue";

const charts = ref([]);
const userId = ref(null);

onMounted(async () => {
  try {
    const userResponse = await axios.get("/api/users/me");
    userId.value = userResponse.data.id;

    const chartsResponse = await axios.get(
      `/api/users/${userId.value}/user_charts`
    );

    const payload =
      typeof chartsResponse.data === "string"
          ? JSON.parse(chartsResponse.data)
          : chartsResponse.data;

    charts.value = payload.charts ?? [];
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    charts.value = [];
  }
});


const hasCharts = computed(() => charts.value?.length > 0);

const dashboardCharts = computed(() => {
  return charts.value?.slice(0, 2) ?? [];
});
</script>

