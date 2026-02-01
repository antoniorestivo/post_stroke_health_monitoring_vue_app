<template>
  <section>
    <div class="max-w-6xl mx-auto space-y-10">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Treatments across your conditions
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          Review all treatments you’ve tried or are trying, grouped by the conditions they were meant to address.
        </p>
      </div>

      <!-- Empty state: no conditions -->
      <div
        v-if="conditionTreatments.length === 0"
        class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4"
      >
        <h2 class="text-lg font-semibold text-gray-800">
          No conditions yet
        </h2>

        <p class="text-sm text-gray-600 max-w-md mx-auto">
          Treatments are always associated with a condition.
          Start by adding something you want to monitor or improve,
          like sleep quality, blood pressure, or recovery progress.
        </p>

        <router-link
          to="/conditions/new"
          class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add your first condition
        </router-link>
      </div>


      <!-- Condition groups -->
      <div
          v-for="condition in conditionTreatments"
          :key="condition.id"
          class="space-y-4"
      >
        <!-- Condition header -->
        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-1">
          <h2 class="text-lg font-semibold text-gray-800">
            {{ condition.name }}
          </h2>
          <p class="text-sm text-gray-600">
            {{ condition.description }}
          </p>
        </div>

        <!-- Treatments -->
        <div v-if="condition.treatments.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
                v-for="(treatment) in condition.treatments"
                :key="treatment.id"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-2"
            >
              <span class="font-medium text-gray-800">
                {{ treatment.name }}
              </span>

              <p class="text-xs text-gray-500">
                Started {{ relativeDate(treatment.created_at) }}
              </p>

              <p class="text-sm text-gray-600 line-clamp-3">
                {{ treatment.description }}
              </p>

              <router-link
                  :to="`/conditions/${condition.id}/treatments/${treatment.id}`"
                  class="text-blue-600 hover:underline text-sm"
              >
                View details →
              </router-link>
            </div>
          </div>

          <!-- Add another treatment -->
          <div class="pt-4">
            <router-link
                :to="`/conditions/${condition.id}/treatments/new`"
                class="inline-block text-sm text-blue-600 hover:underline"
            >
              + Add another treatment
            </router-link>
          </div>
        </div>

        <!-- Empty state: no treatments -->
        <div
            v-else
            class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center space-y-3"
        >
          <h3 class="text-sm font-semibold text-gray-700">
            No treatments added yet
          </h3>

          <p class="text-sm text-gray-600 max-w-md mx-auto">
            Treatments represent specific approaches you’ve tried to improve or manage this condition.
            Add one to start tracking what you’ve done and how it worked.
          </p>

          <router-link
              :to="`/conditions/${condition.id}/treatments/new`"
              class="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add your first treatment
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

const conditionTreatments = ref([]);

onMounted(() => {
  axios.get("/api/treatments/all").then(response => {
    const data =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;
    conditionTreatments.value = data.condition_treatments;
  });
});

function relativeDate(date) {
  return moment(date).format("MMM Do YYYY");
}
</script>
