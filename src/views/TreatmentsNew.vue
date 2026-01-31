<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Add a treatment you tried or are doing now
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          Treatments represent specific approaches to improve or manage this condition.
          Write down what you did or are doing so you can later reflect on how it worked.
        </p>
      </div>

      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="createTreatment" class="space-y-6">
        <!-- Treatment name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Treatment name
          </label>
          <p class="text-xs text-gray-500 mb-1">
            A short label to identify this treatment (used in charts and comparisons).
          </p>
          <input
              v-model="name"
              type="text"
              required
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Daily walking routine"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            What did you try or are trying now?
          </label>
          <p class="text-xs text-gray-500 mb-1">
            Describe the treatment, routine, medication, or change you made.
            Include any details that might matter later.
          </p>
          <textarea
              v-model="description"
              rows="5"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="For example: Took medication X daily for two weeks, adjusted sleep schedule, followed a specific exercise routine..."
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-2">
          <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Start tracking this treatment
          </button>

          <router-link
              :to="`/conditions/${route.params.id}/treatments`"
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const description = ref("");
const name = ref("");
const errors = ref([]);

function createTreatment() {
  errors.value = [];

  if (!name.value.trim()) {
    errors.value.push("Please provide a name for this treatment.");
    return;
  }

  if (!description.value.trim()) {
    errors.value.push("Please provide a description for this treatment.");
    return;
  }

  const params = {
    name: name.value,
    description: description.value
  };

  axios
    .post(`/api/conditions/${route.params.id}/treatments`, params)
    .then(() => {
      router.push(`/conditions/${route.params.id}/treatments`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Creation failed."];
    });
}
</script>
