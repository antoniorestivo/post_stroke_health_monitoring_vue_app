<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-gray-800">
          Treatment check-in
        </h1>
        <p class="text-sm text-gray-500">
          Logged {{ relativeDate(treatmentRetrospect.created_at) }}
        </p>
      </div>

      <!-- Treatment context -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-1">
        <p class="text-sm text-gray-500">
          Treatment being evaluated
        </p>
        <p class="text-sm font-medium text-gray-800">
          {{ treatment.description }}
        </p>
      </div>

      <!-- Rating -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-1">
        <p class="text-sm text-gray-600">
          Overall effectiveness
        </p>
        <p class="text-3xl font-semibold text-gray-800">
          {{ treatmentRetrospect.rating }}
          <span class="text-base font-normal text-gray-500">/ 10</span>
        </p>
      </div>

      <!-- Reflection -->
      <div class="space-y-2">
        <h2 class="text-sm font-semibold text-gray-700">
          Reflection
        </h2>
        <p class="text-sm text-gray-800 leading-relaxed">
          {{ treatmentRetrospect.feedback }}
        </p>
      </div>

      <!-- Actions -->
      <div class="pt-4 border-t border-gray-200 space-y-4">
        <div class="flex flex-wrap gap-4 text-sm">
          <router-link
            :to="retrospectsIndexPath"
            class="text-blue-600 hover:underline"
          >
            ← Back to check-ins
          </router-link>

          <router-link
              v-if="editCheckInPath"
              :to="editCheckInPath"
            class="text-blue-600 hover:underline"
          >
            Edit this check-in
          </router-link>
        </div>

        <button
          @click="destroyTreatmentRetrospect"
          class="text-sm text-red-600 hover:underline"
        >
          Delete this check-in
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import moment from "moment";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const treatment = ref({});

const treatmentRetrospect = ref({});
const retrospectsIndexPath =
  `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`;

const editCheckInPath = computed(() => {
  if (!treatmentRetrospect.value?.id) return null;

  return `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${treatmentRetrospect.value.id}/edit`;
});

onMounted(() => {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;
  axios.get(url).then(response => {
    const data =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;
    console.log(data);
    treatmentRetrospect.value = data.treatment_retrospect
    treatment.value = data.treatment
  });
});

function relativeDate(date) {
  return moment(date).fromNow();
}

function destroyTreatmentRetrospect() {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;
  axios.delete(url).then(() => {
    router.push(
      `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`
    );
  });
}
</script>
