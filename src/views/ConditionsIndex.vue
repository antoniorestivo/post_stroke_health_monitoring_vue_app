<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-10">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Conditions
        </h1>

        <p class="text-sm text-gray-600 max-w-2xl mx-auto text-center">
          Conditions represent things you’re actively monitoring or trying to improve over time —
          such as sleep quality, blood pressure, a recurring symptom, or a recovery goal.
        </p>

        <p class="text-sm text-gray-500 max-w-2xl mx-auto text-center">
          Journals capture what happens each day. Conditions help you step back and see whether
          treatments or routines are actually working over weeks or months.
        </p>
      </div>
      <!-- Create Condition Button -->
      <div class="text-center">
        <router-link
          to="/conditions/new"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Track a new condition
        </router-link>
      </div>

      <div v-if="conditions.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center space-y-4">
        <h2 class="text-lg font-semibold text-gray-800">
          What would you like to work on or keep an eye on?
        </h2>

        <p class="text-sm text-gray-600 max-w-md mx-auto">
          Conditions are things that matter over more than a few days —
          like sleep quality, blood pressure, pain, or recovery progress.
        </p>

        <ul class="text-sm text-gray-500 list-disc list-inside max-w-md mx-auto">
          <li>Sleep quality</li>
          <li>Blood pressure</li>
          <li>Back pain</li>
          <li>Medication side effects</li>
          <li>Post-injury recovery</li>
        </ul>

        <router-link
          to="/conditions/new"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Track your first condition
        </router-link>
      </div>

      <!-- Condition Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="condition in conditions"
          :key="condition.id"
          class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-3"
        >
          <div v-if="condition.image_url" class="rounded overflow-hidden">
            <img
              :src="condition.image_url"
              alt="Condition image"
              class="w-full h-40 object-cover"
            />
          </div>

          <div class="space-y-1">
            <h3 class="text-md font-semibold text-gray-800">
              {{ condition.name }}
            </h3>

            <p class="text-xs text-gray-500">
              Created {{ relativeDate(condition.created_at) }}
            </p>
          </div>

          <p v-if="condition.description" class="text-sm text-gray-600 line-clamp-3">
            {{ condition.description }}
          </p>

          <div class="flex items-center justify-between text-xs text-gray-500">
          <span>
            {{ condition.treatments_count || 0 }} treatment<span v-if="condition.treatments_count !== 1">s</span>
          </span>

            <span v-if="condition.support">
              Needs support
            </span>
          </div>
          <router-link
            :to="`/conditions/${condition.id}`"
            class="text-blue-600 hover:underline text-sm"
          >
            View details →
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/lib/axios";
import moment from "moment";

const conditions = ref([]);

onMounted(() => {
  axios.get("/api/conditions").then(response => {
    conditions.value = response.data;
  });
});

function relativeDate(date) {
  return moment(date).format("MMM Do YYYY");
}
</script>
