<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Daily journal check-in
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          Capture how today went and record the health metrics you’re tracking.
          This usually only takes a few minutes.
        </p>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="text-sm text-gray-500">
        Loading your journal setup…
      </div>
      <div v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </div>

      <form v-if="!loading" @submit.prevent="createJournal" class="space-y-8">
        <!-- Reflection -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            How was your day?
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Write anything that feels relevant — how you felt, what stood out, or what was different.
          </p>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Health routines -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Health routines (optional)
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Note anything you did intentionally for your health today.
          </p>
          <textarea
            v-model="form.health_routines"
            rows="3"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Optional media -->
        <div class="space-y-4 pt-4 border-t border-gray-200">
          <h2 class="text-sm font-semibold text-gray-700">
            Optional details
          </h2>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              v-model="form.image_url"
              type="text"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              v-model="form.video_url"
              type="text"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Metrics -->
        <div v-if="metricFields.length" class="pt-4 border-t border-gray-200 space-y-4">
          <h2 class="text-sm font-semibold text-gray-700">
            Health metrics
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="metric in metricFields"
              :key="metric.metric_name"
              class="bg-gray-50 rounded-lg p-3 space-y-1"
            >
              <label class="text-xs font-medium text-gray-600">
                {{ metric.metric_name }} ({{ metric.metric_unit_name }})
              </label>
              <input
                type="text"
                v-model="form.metrics[metric.metric_name]"
                class="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save today’s entry
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";

const form = ref({
  description: "",
  health_routines: "",
  image_url: "",
  video_url: "",
  metrics: {}
});

const metricFields = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(() => {
  fetchMetrics();
});

function fetchMetrics() {
  loading.value = true;
  error.value = null;

  axios
    .get("/api/journals/new")
    .then(response => {
      const data = response.data;
      metricFields.value = data || [];
      // Initialize each metric with empty string
      data.forEach(metric => {
        form.value.metrics[metric.metric_name] = "";
      });
    })
    .catch(err => {
      error.value = err.response?.data?.errors?.[0] || "Failed to load metrics";
    })
    .finally(() => {
      loading.value = false;
    });
}

function createJournal() {
  axios
    .post("/api/journals", form.value)
    .then(() => {
      window.location.href = "/journals";
    })
    .catch(err => {
      error.value =
        err.response?.data?.errors?.[0] || "Failed to create journal";
    });
}
</script>
