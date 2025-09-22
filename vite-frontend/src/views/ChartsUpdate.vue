<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Update Chart</h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateChart" class="space-y-6">
        <!-- First Variable -->
        <div>
          <h5 class="text-lg font-semibold mb-2">Choose First Variable</h5>
          <label class="block mb-2">
            <input type="radio" value="Time" v-model="chart.x_label" />
            Time (track over time)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              v-for="metric in metrics"
              :key="`x-${metric.id}`"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :value="metric.metric_name"
                v-model="chart.x_label"
              />
              <span>{{ metric.metric_name }}</span>
            </label>
          </div>
        </div>

        <!-- Second Variable -->
        <div>
          <h5 class="text-lg font-semibold mb-2">Choose Second Variable</h5>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              v-for="metric in metrics"
              :key="`y-${metric.id}`"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :value="metric.metric_name"
                v-model="chart.y_label"
              />
              <span>{{ metric.metric_name }}</span>
            </label>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label class="block font-medium mb-1">Chart Title</label>
          <input
            v-model="chart.title"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Submit -->
        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Chart
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const chart = ref({});
const errors = ref([]);
const metrics = ref([]);

onMounted(() => {
  const url = `/api/users/${route.params.id}/user_charts/${route.params.chart_id}/edit`;
  axios.get(url).then(response => {
    chart.value = response.data.chart;
    metrics.value = response.data.health_metrics;
  });
});

function updateChart() {
  const url = `/api/users/${route.params.id}/user_charts/${chart.value.id}`;
  const params = {
    x_label: chart.value.x_label,
    y_label: chart.value.y_label,
    title: chart.value.title
  };

  axios
    .patch(url, params)
    .then(() => {
      router.push(`/users/${route.params.id}/charts`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Update failed."];
    });
}
</script>
