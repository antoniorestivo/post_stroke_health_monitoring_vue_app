<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Create New Treatment</h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="createTreatment" class="space-y-6">
        <div>
          <label class="block font-medium mb-1">Description</label>
          <textarea
            v-model="description"
            rows="5"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
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
const errors = ref([]);

function createTreatment() {
  const params = {
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
