<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-10">
      <h1 class="text-center text-3xl font-bold text-gray-800">
        Conditions and Treatments
      </h1>

      <div
        v-for="(condition, index) in conditionTreatments"
        :key="condition.id"
        class="space-y-6"
      >
        <!-- Condition Card -->
        <div class="border border-black rounded-md p-4 bg-white shadow">
          <h3 class="text-lg font-semibold text-gray-800">Condition</h3>
          <p class="text-md text-gray-700 font-semibold">
            {{ condition.name }}
          </p>
          <p class="text-sm text-gray-600">{{ condition.description }}</p>
        </div>

        <!-- Treatments Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(treatment, tIndex) in condition.treatments"
            :key="treatment.id"
            class="bg-white rounded-lg shadow p-4 space-y-2"
          >
            <p class="text-sm text-gray-500">
              Created {{ relativeDate(treatment.created_at) }}
            </p>

            <h6 class="text-md font-semibold text-gray-800">
              Treatment #{{ tIndex + 1 }}
            </h6>

            <p class="text-sm text-gray-700">{{ treatment.description }}</p>

            <router-link
              :to="`/conditions/${condition.id}/treatments/${treatment.id}`"
              class="text-blue-600 hover:underline text-sm"
            >
              More Info →
            </router-link>
          </div>
        </div>

        <!-- Divider between sections -->
        <hr
          v-if="index < conditionTreatments.length - 1"
          class="border-t-2 border-black my-8"
        />
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
