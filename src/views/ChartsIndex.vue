<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- Create Chart Button -->
      <div class="text-center">
        <router-link
          :to="`/users/${route.params.id}/charts/new`"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Chart
        </router-link>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="chart in charts"
          :key="chart.id"
          class="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
        >
          <div>
            <p class="text-sm text-gray-600 mb-2">
              Created {{ relativeDate(chart.created_at) }}
            </p>
            <h5 class="text-lg font-semibold text-gray-800 mb-4">
              {{ chart.title }}
            </h5>
          </div>

          <router-link
            :to="`/users/${route.params.id}/charts/${chart.id}`"
            class="text-blue-600 hover:underline text-sm"
          >
            View Chart →
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import moment from "moment";

const route = useRoute();
const charts = ref([]);

onMounted(async () => {
  const response = await axios.get(`/api/users/${route.params.id}/user_charts`);
  console.log("Charts API response:", response.data);
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;
  charts.value = data.charts;
});

function relativeDate(date) {
  return moment(date).format("MMM Do YYYY");
}
</script>
