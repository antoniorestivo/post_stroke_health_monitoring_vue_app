<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- Create Condition Button -->
      <div class="text-center">
        <router-link
          to="/conditions/new"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Condition
        </router-link>
      </div>

      <!-- Condition Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="condition in conditions"
          :key="condition.id"
          class="bg-white shadow-md rounded-xl p-4 space-y-2"
        >
          <div v-if="condition.image_url" class="rounded overflow-hidden">
            <img
              :src="condition.image_url"
              alt="Condition image"
              class="w-full h-48 object-cover"
            />
          </div>

          <p class="text-sm text-gray-500">
            Created {{ relativeDate(condition.created_at) }}
          </p>

          <h6 class="text-md font-semibold text-gray-800">Condition Name:</h6>
          <p class="text-gray-700">{{ condition.name }}</p>

          <h6 class="text-md font-semibold text-gray-800">Needs Support:</h6>
          <p class="text-gray-700">{{ condition.support }}</p>

          <router-link
            :to="`/conditions/${condition.id}`"
            class="text-blue-600 hover:underline text-sm"
          >
            More Info →
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
  return moment(date).format("MMM Do YY");
}
</script>
