<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Treatment check-ins
        </h1>

        <p class="text-sm text-gray-600 max-w-2xl mx-auto">
          Use check-ins to regularly reflect on how this treatment is working.
          Over time, these entries help you notice patterns and decide what to change.
        </p>
        <!-- Treatment context -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-1">
          <p class="text-sm text-gray-500">
            Treatment being evaluated
          </p>
          <h3 class="text-lg font-semibold text-gray-800">
            {{ treatment.name }}
          </h3>
          <p class="text-sm font-medium text-gray-800">
            {{ treatment.description }}
          </p>
        </div>

      </div>
      <!-- Primary CTA -->
      <div>
        <router-link
            :to="newCheckInPath"
            class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add a check-in
        </router-link>
      </div>
      <!-- Empty State -->
      <div
          v-if="treatmentRetrospects.length === 0"
          class="bg-white rounded-xl shadow-sm p-8 text-center space-y-4"
      >
        <h2 class="text-lg font-semibold text-gray-800">
          No check-ins yet
        </h2>

        <p class="text-sm text-gray-600 max-w-md mx-auto">
          Check-ins are short reflections you add periodically to track how this
          treatment is going. Many people add one every few days or once a week.
        </p>

        <router-link
            :to="newCheckInPath"
            class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add your first check-in
        </router-link>
      </div>

      <!-- Check-in Cards -->
      <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
            v-for="retrospect in treatmentRetrospects"
            :key="retrospect.id"
            class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-2"
        >
          <!-- Date -->
          <p class="text-xs text-gray-500">
            {{ relativeDate(retrospect.created_at) }}
          </p>

          <!-- Rating -->
          <p class="text-sm font-semibold text-gray-800">
            Rating: {{ retrospect.rating }} / 10
          </p>

          <!-- Reflection -->
          <p class="text-sm text-gray-600 line-clamp-3">
            {{ retrospect.feedback }}
          </p>

          <!-- Details -->
          <router-link
              :to="showCheckInPath(retrospect.id)"
              class="text-blue-600 hover:underline text-sm"
          >
            View details →
          </router-link>
        </div>
      </div>

      <!-- Secondary CTA -->
      <div
          v-if="treatmentRetrospects.length > 0"
          class="pt-6 text-center"
      >
        <router-link
            :to="newCheckInPath"
            class="text-blue-600 hover:underline"
        >
          + Add another check-in
        </router-link>
      </div>

      <!-- Pagination -->
      <div
          v-if="totalPages > 1"
          class="flex justify-center items-center space-x-4 pt-6"
      >
        <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
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
const treatment = ref({});
const currentPage = ref(1);
const recordsPerPage = 15;
const totalRecords = ref(0);

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / recordsPerPage)
);

const newCheckInPath = computed(() =>
  `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/new`
);

function showCheckInPath(retrospectId) {
  return `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${retrospectId}`;
}

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
      treatment.value = data.treatment;
    })
    .catch(error => {
      console.error("Error fetching treatment check-ins:", error);
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
