<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">
        This journal is recorded around {{ relativeDate(journal.created_at) }}
      </h2>

      <div>
        <h4 class="text-lg font-semibold text-gray-700 mb-1">Description</h4>
        <p class="text-gray-800">{{ journal.description }}</p>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-700 mb-1">
          Health Routines / Diet
        </h4>
        <p class="text-gray-800">{{ journal.health_routines }}</p>
      </div>

      <div v-if="journal.image_url">
        <img
          :src="journal.image_url"
          alt="Journal image"
          class="w-full rounded shadow"
        />
      </div>

      <div v-if="journal.video_url">
        <h4 class="text-lg font-semibold text-gray-700 mt-4 mb-1">Video URL</h4>
        <p class="text-sm break-all text-blue-600">{{ journal.video_url }}</p>
      </div>

      <div v-if="journal.metrics && Object.keys(journal.metrics).length">
        <h4 class="text-lg font-semibold text-gray-700 mt-4 mb-2">Metrics</h4>
        <div class="space-y-1">
          <div
            v-for="metric in Object.keys(journal.metrics)"
            :key="metric"
            class="text-sm"
          >
            <p class="font-medium text-gray-600">{{ metric }}:</p>
            <p class="text-gray-800">{{ journal.metrics[metric] }}</p>
          </div>
        </div>
      </div>

      <div class="pt-6 space-x-4 text-sm">
        <router-link to="/journals" class="text-blue-600 hover:underline">
          Back to all journals
        </router-link>

        |

        <router-link
          :to="`/journals/${journal.id}/edit`"
          class="text-blue-600 hover:underline"
        >
          Update journal
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
