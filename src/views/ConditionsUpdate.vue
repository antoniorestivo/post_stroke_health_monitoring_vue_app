<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Update this condition
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          You can update this condition as your situation changes.
          These changes will apply going forward.
        </p>
      </div>

      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateCondition" class="space-y-6">

        <!-- Core info -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              What are you tracking?
            </label>
            <p class="text-xs text-gray-500 mb-1">
              For example: Sleep quality, Back pain, Blood pressure
            </p>
            <input
                v-model="condition.name"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <p class="text-xs text-gray-500 mb-1">
              Update any details that help explain what’s going on or why this matters.
            </p>
            <textarea
                v-model="condition.description"
                rows="4"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div class="flex items-start gap-2">
            <input
                v-model="condition.support"
                type="checkbox"
                id="support"
                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label for="support" class="text-sm text-gray-700">
              This condition requires extra support or assistance
            </label>
          </div>
        </div>

        <!-- Optional media -->
        <div class="space-y-4 pt-4 border-t border-gray-200">
          <h2 class="text-sm font-semibold text-gray-700">
            Additional details (optional)
          </h2>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
                v-model="condition.image_url"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
                v-model="condition.video_url"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-4">
          <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save changes
          </button>

          <router-link
              :to="`/conditions/${condition.id}`"
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

const condition = ref({});
const errors = ref([]);

onMounted(() => {
  axios.get(`/api/conditions/${route.params.id}`).then(response => {
    condition.value = response.data;
  });
});

function updateCondition() {
  const params = {
    name: condition.value.name,
    support: condition.value.support,
    image_url: condition.value.image_url,
    video_url: condition.value.video_url,
    description: condition.value.description
  };

  axios
    .patch(`/api/conditions/${condition.value.id}`, params)
    .then(() => {
      router.push(`/conditions/${condition.value.id}`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Update failed."];
    });
}
</script>
