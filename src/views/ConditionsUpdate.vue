<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Update Condition</h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateCondition" class="space-y-6">
        <div>
          <label class="block font-medium mb-1">Condition Name</label>
          <input
            v-model="condition.name"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="condition.support"
            type="checkbox"
            id="support"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label for="support" class="text-sm font-medium text-gray-700">
            Needs Support?
          </label>
        </div>

        <div>
          <label class="block font-medium mb-1">Condition Description</label>
          <textarea
            v-model="condition.description"
            rows="4"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label class="block font-medium mb-1">Image URL</label>
          <input
            v-model="condition.image_url"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Video URL</label>
          <input
            v-model="condition.video_url"
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
