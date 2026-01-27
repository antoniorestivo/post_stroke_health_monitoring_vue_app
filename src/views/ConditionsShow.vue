<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-gray-800">
          {{ condition.name }}
        </h1>
        <p class="text-sm text-gray-500">
          Added {{ relativeDate(condition.created_at) }}
        </p>
      </div>

      <!-- Description -->
      <div v-if="condition.description" class="text-gray-700 text-sm">
        {{ condition.description }}
      </div>

      <!-- Status -->
      <div class="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
        <p class="text-gray-700">
          <strong>Support status:</strong>
          {{ condition.support ? "Requires extra support" : "Self-managed" }}
        </p>
        <p class="text-xs text-gray-500">
          This indicates whether this condition affects daily functioning or requires help from others.
        </p>
      </div>

      <!-- Primary actions -->
      <div class="flex flex-wrap gap-4 pt-2">
        <router-link
            :to="`/conditions/${condition.id}/treatments`"
            class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          View treatments & progress
        </router-link>

        <router-link
            :to="`/conditions/${condition.id}/edit`"
            class="text-blue-600 hover:underline text-sm self-center"
        >
          Edit condition details
        </router-link>
      </div>

      <!-- Optional media -->
      <div v-if="condition.image_url || condition.video_url" class="pt-4 border-t space-y-4">
        <h2 class="text-sm font-semibold text-gray-700">
          Additional details
        </h2>

        <div v-if="condition.image_url">
          <img
              :src="condition.image_url"
              alt="Condition image"
              class="w-full rounded-lg shadow"
          />
        </div>

        <div v-if="condition.video_url" class="text-sm">
          <p class="text-gray-700 font-medium">Video reference</p>
          <a
              :href="condition.video_url"
              target="_blank"
              class="text-blue-600 hover:underline break-all"
          >
            {{ condition.video_url }}
          </a>
        </div>
      </div>

      <!-- Footer actions -->
      <div class="pt-6 border-t space-y-4">
        <div class="text-sm space-x-4">
          <router-link to="/conditions" class="text-blue-600 hover:underline">
            Back to all conditions
          </router-link>
        </div>

        <button
            @click="destroyCondition"
            class="text-sm text-red-600 hover:underline"
        >
          Delete this condition
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import moment from "moment";

const route = useRoute();
const router = useRouter();

const condition = ref({});

onMounted(() => {
  axios.get(`/api/conditions/${route.params.id}`).then(response => {
    condition.value = response.data;
  });
});

function relativeDate(date) {
  return moment(date).fromNow();
}

function destroyCondition() {
  axios.delete(`/api/conditions/${condition.value.id}`).then(() => {
    router.push("/conditions");
  });
}
</script>
