<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Update Journal</h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateJournal" class="space-y-6">
        <div>
          <label class="block font-medium mb-1">Description</label>
          <textarea
            v-model="journal.description"
            rows="5"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label class="block font-medium mb-1">Image URL</label>
          <input
            v-model="journal.image_url"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Video URL</label>
          <input
            v-model="journal.video_url"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Health Routines</label>
          <textarea
            v-model="journal.health_routines"
            rows="4"
            class="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>

        <div v-if="journal.metrics && Object.keys(journal.metrics).length">
          <h4 class="text-lg font-semibold text-gray-700 mt-4 mb-2">Metrics</h4>
          <div class="space-y-3">
            <div
              v-for="metric in Object.keys(journal.metrics)"
              :key="metric"
              class="flex flex-col"
            >
              <label class="text-sm font-medium text-gray-700 mb-1">{{
                metric
              }}</label>
              <input
                v-model="journal.metrics[metric]"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>

          <button
            type="button"
            @click="destroyJournal"
            class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
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

const journal = ref({});
const errors = ref([]);

onMounted(() => {
  axios.get(`/api/journals/${route.params.id}`).then(response => {
    journal.value = response.data;
  });
});

function updateJournal() {
  const params = {
    description: journal.value.description,
    image_url: journal.value.image_url,
    video_url: journal.value.video_url,
    health_routines: journal.value.health_routines,
    metrics: journal.value.metrics
  };

  axios
    .patch(`/api/journals/${journal.value.id}`, params)
    .then(() => {
      router.push(`/journals/${journal.value.id}`);
    })
    .catch(error => {
      console.log("journals update error", error.response);
      errors.value = error.response?.data?.errors || ["Update failed."];
    });
}

function destroyJournal() {
  axios.delete(`/api/journals/${journal.value.id}`).then(() => {
    router.push("/journals");
  });
}
</script>
