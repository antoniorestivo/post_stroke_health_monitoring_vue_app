<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Update Treatment</h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateTreatment" class="space-y-6">
        <div>
          <label class="block font-medium mb-1">Treatment Description</label>
          <input
            v-model="treatment.description"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>
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
  const params = {
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
