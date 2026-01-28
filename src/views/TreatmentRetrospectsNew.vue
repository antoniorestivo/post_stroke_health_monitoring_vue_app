<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Treatment check-in
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          Use this check-in to reflect on how this treatment has been going so far.
          You can add check-ins regularly as your experience changes.
        </p>
      </div>

      <div v-if="loadingTreatment" class="text-sm text-gray-500">
        Loading treatment details…
      </div>

      <div v-else-if="treatment" class="bg-gray-50 rounded-lg p-4 space-y-1">
        <p class="text-sm text-gray-500">
          You’re reflecting on this treatment:
        </p>
        <p class="text-sm font-medium text-gray-800">
          {{ treatment.description }}
        </p>
      </div>

      <div v-else class="text-sm text-red-600">
        {{ treatmentError }}
      </div>


      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>

      <form @submit.prevent="createTreatmentRetrospect" class="space-y-6">

        <!-- Reflection -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            How is this treatment going?
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Write a short reflection on how this treatment is working (or not working) for you.
            Mention any changes, side effects, or observations that feel important.
          </p>
          <textarea
            v-model="feedback"
            rows="5"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="For example: Feeling some improvement after the first week, but still noticing fatigue in the afternoons…"
          ></textarea>
        </div>

        <!-- Rating -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Overall, how effective does this feel right now?
          </label>
          <p class="text-xs text-gray-500 mb-2">
            Rate from 1 (not effective) to 10 (very effective). This helps you spot trends over time.
          </p>

          <div class="flex flex-wrap gap-3">
            <label
              v-for="n in 10"
              :key="n"
              class="inline-flex items-center gap-1 text-sm text-gray-700"
            >
              <input
                type="radio"
                :value="n"
                v-model="rating"
                class="form-radio text-blue-600"
              />
              {{ n }}
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-2">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save check-in
          </button>

          <router-link
            :to="`/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`"
            class="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const feedback = ref("");
const rating = ref(null);
const errors = ref([]);

const treatment = ref(null);
const loadingTreatment = ref(true);
const treatmentError = ref(null);

function fetchTreatmentContext() {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}`;

  axios
    .get(url)
    .then(response => {
      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      treatment.value = data;
      loadingTreatment.value = false;
    })
    .catch(error => {
      console.error("Failed to load treatment context:", error);
      treatmentError.value = "Unable to load treatment information.";
      loadingTreatment.value = false;
    });
}

function createTreatmentRetrospect() {
  const params = {
    feedback: feedback.value,
    rating: rating.value
  };

  axios
    .post(
      `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`,
      params
    )
    .then(() => {
      router.push(
        `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects`
      );
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Creation failed."];
    });
}

onMounted(() => {
  fetchTreatmentContext();
});
</script>
