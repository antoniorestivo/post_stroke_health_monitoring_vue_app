<template>
  <section class="min-h-screen bg-gray-100 py-6 px-4">
    <div class="max-w-screen-xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

    <h2 class="text-2xl font-bold text-gray-800">
        {{ chartTitle }}
      </h2>

      <UsersChart
        :user-id="userId"
        :chart-id="chartId"
      />

      <div class="space-x-4">
        <router-link
          :to="`/users/${userId}/charts`"
          class="text-blue-600 hover:underline"
        >
          Back to charts
        </router-link>
      </div>

      <button
        @click="destroyChart"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import UsersChart from "@/components/UsersChart.vue";

const route = useRoute();
const router = useRouter();

const userId = Number(route.params.id);
const chartId = Number(route.params.chart_id);
const chartTitle = ref("");

onMounted(async () => {
  const response = await axios.get(
    `/api/users/${userId}/user_charts/${chartId}`
  );
  chartTitle.value = response.data.title;
});

function destroyChart() {
  axios
    .delete(`/api/users/${userId}/user_charts/${chartId}`)
    .then(() => router.push(`/users/${userId}/charts`));
}
</script>
