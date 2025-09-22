<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">
        Update Treatment Retrospect
      </h2>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateTreatmentRetrospect" class="space-y-6">
        <!-- Feedback -->
        <div>
          <label for="feedback" class="block font-medium mb-1">Feedback</label>
          <textarea
            id="feedback"
            v-model="retrospect.feedback"
            rows="6"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <!-- Rating -->
        <div>
          <label for="rating" class="block font-medium mb-1"
            >Rating (1–10)</label
          >
          <input
            id="rating"
            type="number"
            min="1"
            max="10"
            v-model="retrospect.rating"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <!-- Submit Button -->
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

const retrospect = ref({
  feedback: "",
  rating: null
});
const errors = ref([]);

onMounted(() => {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;
  axios.get(url).then(response => {
    retrospect.value = response.data;
  });
});

function updateTreatmentRetrospect() {
  const url = `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`;
  const params = {
    feedback: retrospect.value.feedback,
    rating: retrospect.value.rating
  };

  axios
    .patch(url, params)
    .then(() => {
      router.push(
        `/conditions/${route.params.id}/treatments/${route.params.treatment_id}/treatment_retrospects/${route.params.retrospect_id}`
      );
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Update failed."];
    });
}
</script>
