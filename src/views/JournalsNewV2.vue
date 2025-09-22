<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Enter Today's Health Metrics
      </h2>

      <form @submit.prevent="createJournal" class="space-y-6">
        <div>
          <label for="description" class="block font-medium mb-1"
            >Describe your day</label
          >
          <textarea
            id="description"
            v-model="form.description"
            rows="5"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label for="health_routines" class="block font-medium mb-1"
            >What are your health routines?</label
          >
          <textarea
            id="health_routines"
            v-model="form.health_routines"
            rows="5"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label for="image_url" class="block font-medium mb-1"
            >Image URL</label
          >
          <input
            id="image_url"
            type="text"
            v-model="form.image_url"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label for="video_url" class="block font-medium mb-1"
            >Video URL</label
          >
          <input
            id="video_url"
            type="text"
            v-model="form.video_url"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div v-if="metricFields.length">
          <h4 class="text-lg font-semibold text-gray-700 mt-6 mb-2">
            Health Metrics
          </h4>
          <div class="space-y-4">
            <div
              v-for="metric in metricFields"
              :key="metric.metric_name"
              class="flex flex-col"
            >
              <label class="font-medium mb-1">{{ metric.metric_name }}</label>
              <input
                type="text"
                v-model="form.metrics[metric.metric_name]"
                class="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      <div v-if="loading" class="text-gray-500 text-sm">Loading...</div>
      <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
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
