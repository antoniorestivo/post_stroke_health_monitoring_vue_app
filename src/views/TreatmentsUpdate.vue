<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Update this treatment
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          You can update this description if you remember more details
          or want to clarify what you tried.
        </p>
      </div>

      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateTreatment" class="space-y-6">
        <!-- Treatment name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Treatment name
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Short label used to identify this treatment in charts.
          </p>
          <input
              v-model="treatment.name"
              type="text"
              required
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>


        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            What did you try?
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Update the details of the treatment, routine, medication,
            or change you made.
          </p>
          <textarea
              v-model="treatment.description"
              rows="5"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="For example: Adjusted dosage, changed routine, extended duration, etc."
          ></textarea>
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
              :to="`/conditions/${route.params.id}/treatments/${treatment.id}`"
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

const treatment = ref({});
const errors = ref([]);

onMounted(() => {
  axios
    .get(
      `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}`
    )
    .then(response => {
      treatment.value = response.data;
    });
});

function updateTreatment() {
  errors.value = [];

  if (!treatment.value.name.trim()) {
    errors.value.push("Please provide a name for this treatment.");
    return;
  }

  if (!treatment.value.description.trim()) {
    errors.value.push("Please provide a description for this treatment.");
    return;
  }

  const params = {
    name: treatment.value.name,
    description: treatment.value.description
  };

  axios
    .patch(
      `/api/conditions/${route.params.id}/treatments/${treatment.value.id}`,
      params
    )
    .then(() => {
      router.push(`/conditions/${route.params.id}/treatments`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Update failed."];
    });
}
</script>
