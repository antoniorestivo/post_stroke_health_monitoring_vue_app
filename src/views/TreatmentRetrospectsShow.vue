<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Treatment Retrospect
        </h2>
        <p class="text-sm text-gray-500">
          Created {{ relativeDate(treatmentRetrospect.created_at) }}
        </p>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-700">Feedback</h4>
        <p class="text-gray-800">{{ treatmentRetrospect.feedback }}</p>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-700">Rating (1–10)</h4>
        <p class="text-gray-800">{{ treatmentRetrospect.rating }}</p>
      </div>

      <div
        class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
      >
        <router-link
          :to="
            `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`
          "
          class="text-blue-600 hover:underline"
        >
          ← Back to All Retrospects
        </router-link>

        <router-link
          :to="
            `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${treatmentRetrospect.id}/edit`
          "
          class="text-blue-600 hover:underline"
        >
          Edit Retrospect
        </router-link>

        <button
          @click="destroyTreatmentRetrospect"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
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

const route = useRoute();
const router = useRouter();

const treatmentRetrospect = ref({});

onMounted(() => {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;
  axios.get(url).then(response => {
    treatmentRetrospect.value = response.data;
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
