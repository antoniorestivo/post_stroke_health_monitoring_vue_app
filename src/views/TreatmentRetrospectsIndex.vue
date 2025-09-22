<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Create Button -->
      <div class="text-center">
        <router-link
          :to="
            `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/new`
          "
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Treatment Retrospect
        </router-link>
      </div>

      <!-- Retrospect Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="retrospect in treatmentRetrospects"
          :key="retrospect.id"
          class="bg-white rounded-xl shadow-md p-5 space-y-3"
        >
          <p class="text-sm text-gray-500">
            Created {{ relativeDate(retrospect.created_at) }}
          </p>

          <h4 class="font-semibold text-gray-800">Feedback</h4>
          <p class="text-gray-700">{{ retrospect.feedback }}</p>

          <h4 class="font-semibold text-gray-800">Rating (1–10)</h4>
          <p class="text-gray-700">{{ retrospect.rating }}</p>

          <router-link
            :to="
              `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${retrospect.id}`
            "
            class="text-blue-600 hover:underline text-sm"
          >
            More Info →
          </router-link>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-4 pt-6">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span class="text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "@/lib/axios";
import moment from "moment";

const route = useRoute();
const treatmentRetrospects = ref([]);
const currentPage = ref(1);
const recordsPerPage = 15;
const totalRecords = ref(0);

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / recordsPerPage)
);

function fetchTreatmentRetrospects(page) {
  const offset = (page - 1) * recordsPerPage;
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`;

  axios
    .get(url, { params: { limit: recordsPerPage, offset } })
    .then(response => {
      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;
      treatmentRetrospects.value = data.treatment_retrospects;
      totalRecords.value = data.total_records;
    })
    .catch(error => {
      console.error("Error fetching treatment retrospects:", error);
    });
}

function relativeDate(date) {
  return moment(date).format("MMM Do YYYY");
}

function changePage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchTreatmentRetrospects(page);
}

onMounted(() => {
  fetchTreatmentRetrospects(currentPage.value);
});
</script>
