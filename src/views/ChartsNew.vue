<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Create a chart
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          Choose what you’d like to visualize. Charts help you spot patterns and compare outcomes over time.
        </p>
      </div>

      <!-- Errors -->
      <div
        v-if="errors"
        class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700"
      >
        <p v-for="(error, i) in errors" :key="i">{{ error }}</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-sm text-gray-500">
        Loading chart options…
      </div>

      <form v-if="!loading" @submit.prevent="createChart" class="space-y-8">
        <!-- Chart mode -->
        <div class="space-y-2">
          <h2 class="text-sm font-semibold text-gray-700">
            What would you like to visualize?
          </h2>

          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm">
              <input type="radio" value="metric_over_time" v-model="chartMode" />
              Track a metric over time
            </label>

            <label class="flex items-center gap-2 text-sm">
              <input type="radio" value="metric_vs_metric" v-model="chartMode" />
              Compare two metrics
            </label>

            <label class="flex items-center gap-2 text-sm">
              <input type="radio" value="treatment_comparison" v-model="chartMode" />
              Compare treatments
            </label>
          </div>
        </div>

        <!-- Metric over time -->
        <div v-if="chartMode === 'metric_over_time'" class="space-y-4">
          <h3 class="text-sm font-semibold text-gray-700">
            Choose a metric
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              v-for="metric in metrics"
              :key="metric.id"
              class="flex items-center gap-2 text-sm"
            >
              <input type="radio" :value="metric.metric_name" v-model="metricOne" />
              {{ metric.metric_name }}
            </label>
          </div>
        </div>

        <!-- Metric vs metric -->
        <div v-if="chartMode === 'metric_vs_metric'" class="space-y-4">
          <h3 class="text-sm font-semibold text-gray-700">
            Choose two metrics
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">First metric</p>
              <select v-model="metricOne" class="w-full rounded border px-2 py-1 text-sm">
                <option disabled value="">Select</option>
                <option v-for="m in metrics" :key="m.id" :value="m.metric_name">
                  {{ m.metric_name }}
                </option>
              </select>
            </div>

            <div>
              <p class="text-xs text-gray-500 mb-1">Second metric</p>
              <select v-model="metricTwo" class="w-full rounded border px-2 py-1 text-sm">
                <option disabled value="">Select</option>
                <option v-for="m in metrics" :key="m.id" :value="m.metric_name">
                  {{ m.metric_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Treatment comparison -->
        <div v-if="chartMode === 'treatment_comparison'" class="space-y-4">
          <h3 class="text-sm font-semibold text-gray-700">
            Choose treatments to compare
          </h3>

          <div class="space-y-2">
            <label
              v-for="treatment in treatments"
              :key="treatment.id"
              class="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                :value="treatment.id"
                v-model="selectedTreatments"
              />
              {{ treatment.description }}
            </label>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Chart title
          </label>
          <input
            v-model="title"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Actions -->
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create chart
        </button>
      </form>
    </div>
  </section>
</template>


<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const metrics = ref([]);
const treatments = ref([]);
const errors = ref(null);
const post = ref(false);

const title = ref("");
const metricOne = ref("");
const metricTwo = ref("");
const chartMode = ref("metric");
const selectedTreatments = ref([]);

watch(
  () => route.params,
  () => fetchData(),
  { immediate: true }
);

watch(chartMode, () => {
  metricOne.value = "";
  metricTwo.value = "";
  selectedTreatments.value = [];
});

function fetchData() {
  errors.value = null;
  post.value = false;
  loading.value = true;

  axios
    .get(`/api/users/${route.params.id}/user_charts/new`)
    .then(response => {
      metrics.value = response.data.metrics;
      treatments.value = response.data.treatments;
      loading.value = false;
      post.value = true;
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Failed to load data."];
      loading.value = false;
    });
}

function createChart() {
  const params = {
    x_label: metricOne.value,
    y_label: metricTwo.value,
    title: title.value,
    options: {},
    chart_mode: chartMode.value
  };

  if (chartMode.value === "treatment_comparison") {
    if (selectedTreatments.value.length < 2) {
      errors.value = ["Please select at least two treatments to compare."];
      return;
    }

    params.options.treatment_ids = selectedTreatments.value;
  }

  console.log(params);

  axios
    .post(`/api/users/${route.params.id}/user_charts`, params)
    .then(() => {
      router.push(`/users/${route.params.id}/charts`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Chart creation failed."];
    });
}
</script>
