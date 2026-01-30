<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Update treatment check-in
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          You can update this check-in if you remember more details
          or want to clarify how the treatment was going at the time.
        </p>
      </div>

      <!-- Treatment context -->
      <div
        v-if="treatment"
        class="bg-gray-50 rounded-lg p-4 space-y-1"
      >
        <p class="text-sm text-gray-500">
          This check-in is for the following treatment:
        </p>
        <p class="text-sm font-medium text-gray-800">
          {{ treatment.description }}
        </p>
      </div>

      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>

      <form @submit.prevent="updateTreatmentRetrospect" class="space-y-6">

        <!-- Reflection -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            How was this treatment going at the time?
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Update your reflection if you want to clarify what you noticed,
            how you felt, or what stood out during this period.
          </p>
          <textarea
            v-model="retrospect.feedback"
            rows="5"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Rating -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Overall effectiveness at that time
          </label>
          <p class="text-xs text-gray-500 mb-2">
            Rate from 1 (not effective) to 10 (very effective).
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
                v-model="retrospect.rating"
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
            Save changes
          </button>

          <router-link
            :to="cancelPath"
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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const retrospect = ref({
  feedback: "",
  rating: null
});
const treatment = ref(null);
const errors = ref([]);

const cancelPath = computed(() =>
  `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`
);

function fetchTreatmentContext() {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}`;

  axios.get(url).then(response => {
    treatment.value =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;
  });
}

onMounted(() => {
  const retrospectUrl =
      `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;

  axios.get(retrospectUrl).then(response => {
    retrospect.value =
      typeof response.data === "string"
        ? JSON.parse(response.data).treatment_retrospect
        : response.data.treatment_retrospect;
  });

  fetchTreatmentContext();
});

function updateTreatmentRetrospect() {
  const url =
    `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;

  const params = {
    feedback: retrospect.value.feedback,
    rating: retrospect.value.rating
  };

  axios
    .patch(url, params)
    .then(() => {
      router.push(cancelPath.value);
    })
    .catch(error => {
      errors.value =
        error.response?.data?.errors || ["Update failed."];
    });
}
</script>
