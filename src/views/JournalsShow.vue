<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-gray-800">
          Daily journal entry
        </h1>
        <p class="text-sm text-gray-500">
          Logged {{ relativeDate(journal.created_at) }}
        </p>
      </div>

      <!-- Reflection -->
      <div class="space-y-2">
        <h2 class="text-sm font-semibold text-gray-700">
          How the day went
        </h2>
        <p class="text-sm text-gray-800 leading-relaxed">
          {{ journal.description || "No description recorded." }}
        </p>
      </div>

      <!-- Health routines -->
      <div v-if="journal.health_routines" class="space-y-2">
        <h2 class="text-sm font-semibold text-gray-700">
          Health routines
        </h2>
        <p class="text-sm text-gray-800 leading-relaxed">
          {{ journal.health_routines }}
        </p>
      </div>

      <!-- Media -->
      <div
        v-if="journal.image_url || journal.video_url"
        class="space-y-4 pt-4 border-t border-gray-200"
      >
        <h2 class="text-sm font-semibold text-gray-700">
          Additional details
        </h2>

        <div v-if="journal.image_url">
          <img
            :src="journal.image_url"
            alt="Journal image"
            class="w-full rounded-lg shadow"
          />
        </div>

        <div v-if="journal.video_url">
          <p class="text-sm font-medium text-gray-700">
            Video reference
          </p>
          <a
            :href="journal.video_url"
            target="_blank"
            class="text-blue-600 hover:underline break-all text-sm"
          >
            {{ journal.video_url }}
          </a>
        </div>
      </div>

      <!-- Metrics -->
      <div
        v-if="journal.metrics && Object.keys(journal.metrics).length"
        class="space-y-3 pt-4 border-t border-gray-200"
      >
        <h2 class="text-sm font-semibold text-gray-700">
          Health metrics
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div
            v-for="metric in Object.keys(journal.metrics)"
            :key="metric"
            class="bg-gray-50 rounded-lg p-3 text-sm"
          >
            <p class="font-medium text-gray-600">
              {{ metric }}
            </p>
            <p class="text-gray-800">
              {{ journal.metrics[metric] }}
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
        <router-link
          to="/journals"
          class="text-blue-600 hover:underline"
        >
          ← Back to all journals
        </router-link>

        <router-link
          :to="`/journals/${journal.id}/edit`"
          class="text-blue-600 hover:underline"
        >
          Edit this entry
        </router-link>
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
const journal = ref({});

onMounted(() => {
  axios.get(`/api/journals/${route.params.id}`).then(response => {
    journal.value = response.data;
  });
});

function relativeDate(date) {
  return moment(date).fromNow();
}
</script>
