<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Update journal entry
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          You can update this entry if you remember more details or want to clarify
          how the day went. Changes will apply going forward.
        </p>
      </div>

      <!-- Previously recorded cue -->
      <div class="bg-blue-50 rounded-lg p-4 text-sm text-blue-900">
        This journal entry was previously recorded.
        You can adjust any of the fields below if your memory has changed.
      </div>

      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">
          {{ error }}
        </li>
      </ul>

      <form @submit.prevent="updateJournal" class="space-y-8">

        <!-- Reflection -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            How did the day go?
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Update anything that feels relevant — how you felt, what stood out, or what changed.
          </p>
          <textarea
            v-model="journal.description"
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
            Update any routines or intentional actions you took for your health.
          </p>
          <textarea
            v-model="journal.health_routines"
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
              v-model="journal.image_url"
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
              v-model="journal.video_url"
              type="text"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Metrics -->
        <div
          v-if="journal.metrics && Object.keys(journal.metrics).length"
          class="space-y-4 pt-4 border-t border-gray-200"
        >
          <h2 class="text-sm font-semibold text-gray-700">
            Health metrics
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="metric in Object.keys(journal.metrics)"
              :key="metric"
              class="bg-gray-50 rounded-lg p-3 space-y-1"
            >
              <label class="text-xs font-medium text-gray-600">
                {{ metric }} ({{ extractUnit(journal, metric) }})
              </label>
              <input
                v-model="journal.metrics[metric]"
                type="text"
                class="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save changes
          </button>

          <router-link
            :to="`/journals/${journal.id}`"
            class="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </router-link>
        </div>
      </form>

      <!-- Destructive action -->
      <div class="pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="destroyJournal"
          class="text-sm text-red-600 hover:underline"
        >
          Delete this journal entry
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const journal = ref({});
const errors = ref([]);

onMounted(() => {
  axios.get(`/api/journals/${route.params.id}`).then(response => {
    journal.value = response.data;
  });
});

function updateJournal() {
  const params = {
    description: journal.value.description,
    image_url: journal.value.image_url,
    video_url: journal.value.video_url,
    health_routines: journal.value.health_routines,
    metrics: journal.value.metrics
  };

  axios
    .patch(`/api/journals/${journal.value.id}`, params)
    .then(() => {
      router.push(`/journals/${journal.value.id}`);
    })
    .catch(error => {
      console.log("journals update error", error.response);
      errors.value = error.response?.data?.errors || ["Update failed."];
    });
}

function destroyJournal() {
  axios.delete(`/api/journals/${journal.value.id}`).then(() => {
    router.push("/journals");
  });
}

function getEnrichedMetric(journal, metricName) {
  if (!journal?.enriched_metrics) return null
  if (!journal?.id) return null

  return journal.enriched_metrics[journal.id]?.[metricName] ?? null
}

function extractUnit(journal, metricName) {
  const enrichedValue = getEnrichedMetric(journal, metricName)

  if (typeof enrichedValue !== "string") {
    return "" // no unit, categorical, or missing data
  }

  // Common patterns we tolerate:
  // "7.5 hours"
  // "204 lbs"
  // "120 mmHg"
  const parts = enrichedValue.trim().split(/\s+/)

  if (parts.length < 2) {
    return "" // no unit present
  }

  const unitCandidate = parts.at(-1)

  // Defensive: ensure it looks like a unit, not a number
  if (!isNaN(Number(unitCandidate))) {
    return ""
  }

  return unitCandidate
}
</script>
