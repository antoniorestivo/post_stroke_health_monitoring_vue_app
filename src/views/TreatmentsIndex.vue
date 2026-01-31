<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- Create Treatment Button -->
      <div class="text-center">
        <router-link
          :to="`/conditions/${route.params.id}/treatments/new`"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Treatment
        </router-link>
      </div>

      <!-- Treatment Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="treatment in treatments"
          :key="treatment.id"
          class="bg-white shadow-md rounded-xl p-4 flex flex-col space-y-2"
        >
          <div v-if="treatment.image_url">
            <img
              :src="treatment.image_url"
              alt="Treatment image"
              class="w-full h-48 object-cover rounded"
            />
          </div>
          <h3 class="text-xl font-semibold text-gray-800">
            {{ treatment.name }}
          </h3>

          <p class="text-sm text-gray-500">
            Created {{ relativeDate(treatment.created_at) }}
          </p>

          <h6 class="text-md font-semibold text-gray-800">
            Treatment Description:
          </h6>
          <p class="text-gray-700">{{ treatment.description }}</p>

          <router-link
            :to="`/conditions/${route.params.id}/treatments/${treatment.id}`"
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
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import moment from "moment";

const route = useRoute();
const treatments = ref([]);

onMounted(() => {
  axios
    .get(`/api/conditions/${route.params.id}/treatments`)
    .then(response => {
      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;
      treatments.value = data.treatments;
    })
    .catch(error => {
      console.error("Error fetching treatments:", error);
    });
});

function relativeDate(date) {
  return moment(date).format("MMM Do YY");
}
</script>
