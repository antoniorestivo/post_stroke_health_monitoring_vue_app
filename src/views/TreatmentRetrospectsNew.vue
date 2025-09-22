<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">
        Rate and give feedback on your treatment
      </h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>

      <form @submit.prevent="createTreatmentRetrospect" class="space-y-6">
        <!-- Feedback -->
        <div>
          <label class="block font-medium mb-1">Feedback</label>
          <div class="flex items-center">
            <img
              src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
              alt="Info"
              class="w-4 h-4 ml-2 cursor-pointer"
              @mouseenter="tooltip.feedback = true"
              @mouseleave="tooltip.feedback = false"
            />
            <span
              v-if="tooltip.feedback"
              class="ml-3 bg-gray-800 text-white text-xs rounded px-2 py-1 absolute z-10"
            >
              Describe how the treatment is working (or not working) for you.
            </span>
          </div>
          <textarea
            v-model="feedback"
            rows="6"
            class="mt-2 w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <!-- Rating -->
        <div>
          <label class="block font-medium mb-1">Treatment Rating</label>
          <div class="flex items-center">
            <img
              src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
              alt="Info"
              class="w-4 h-4 ml-2 cursor-pointer"
              @mouseenter="tooltip.rating = true"
              @mouseleave="tooltip.rating = false"
            />
            <span
              v-if="tooltip.rating"
              class="ml-3 bg-gray-800 text-white text-xs rounded px-2 py-1 absolute z-10"
            >
              Rate your treatment on a scale of 1 (ineffective) to 10 (highly
              effective).
            </span>
          </div>

          <div class="flex flex-wrap gap-4 mt-4">
            <label
              v-for="n in 10"
              :key="n"
              class="inline-flex items-center gap-1 text-sm"
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

const feedback = ref("");
const rating = ref(null);
const errors = ref([]);
const tooltip = ref({
  feedback: false,
  rating: false
});

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
</script>
