<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">
        Create Your New Chart
      </h3>

      <div v-if="errors" class="mb-4 text-red-600 text-sm">
        <ul>
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
      </div>

      <div v-if="loading" class="text-gray-500 mb-4">Loading...</div>

      <form
        v-if="!loading && post"
        @submit.prevent="createChart"
        class="space-y-8"
      >
        <!-- Metric One -->
        <div>
          <h5 class="text-lg font-semibold mb-2">Choose First Variable</h5>
          <label class="block mb-2">
            <input type="radio" value="Time" v-model="metricOne" />
            Time (track over time)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              v-for="metric in metrics"
              :key="`m1-${metric.id}`"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :value="metric.metric_name"
                v-model="metricOne"
              />
              <span>{{ metric.metric_name }}</span>
            </label>
          </div>
        </div>

        <!-- Metric Two -->
        <div>
          <h5 class="text-lg font-semibold mb-2">Choose Second Variable</h5>
          <label class="block mb-2">
            <input type="radio" value="Frequency / Count" v-model="metricTwo" />
            Frequency (for categorical variable)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              v-for="metric in metrics"
              :key="`m2-${metric.id}`"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :value="metric.metric_name"
                v-model="metricTwo"
              />
              <span>{{ metric.metric_name }}</span>
            </label>
          </div>
        </div>

        <hr />

        <!-- Treatments -->
        <h4 class="text-lg font-semibold">OR, select treatments to compare</h4>

        <div>
          <h5 class="text-md font-semibold mb-1">Choose First Treatment</h5>
          <div class="space-y-2">
            <label
              v-for="treatment in treatments"
              :key="`t1-${treatment.id}`"
              class="flex items-center space-x-2"
            >
              <input type="radio" :value="treatment.id" v-model="metricOne" />
              <span>{{ treatment.description }}</span>
            </label>
          </div>
        </div>

        <div>
          <h5 class="text-md font-semibold mt-4 mb-1">
            Choose Second Treatment
          </h5>
          <div class="space-y-2">
            <label
              v-for="treatment in treatments"
              :key="`t2-${treatment.id}`"
              class="flex items-center space-x-2"
            >
              <input type="radio" :value="treatment.id" v-model="metricTwo" />
              <span>{{ treatment.description }}</span>
            </label>
          </div>
        </div>

        <hr />

        <div>
          <label class="block font-medium mb-1">Chart Title</label>
          <input
            v-model="title"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
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

watch(
  () => route.params,
  () => fetchData(),
  { immediate: true }
);

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
  const treatmentIds = getTreatmentIds();
  const params = {
    x_label: metricOne.value,
    y_label: metricTwo.value,
    title: title.value,
    options: { treatmentIds }
  };

  axios
    .post(`/api/users/${route.params.id}/user_charts`, params)
    .then(() => {
      router.push(`/users/${route.params.id}/charts`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Chart creation failed."];
    });
}

function getTreatmentIds() {
  const selected = [];
  const allRadios = document.querySelectorAll('input[type="radio"]:checked');
  allRadios.forEach(el => {
    if (!isNaN(el.value)) selected.push(el.value);
  });
  return selected;
}
</script>
