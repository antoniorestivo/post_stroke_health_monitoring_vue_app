<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-gray-800">
          Treatment attempt
        </h1>
        <p class="text-sm text-gray-500">
          Started {{ relativeDate(treatment.created_at) }}
        </p>
      </div>

      <!-- Description -->
      <div class="text-sm text-gray-700 leading-relaxed">
        {{ treatment.description }}
      </div>

      <!-- Primary action -->
      <div class="pt-2">
        <router-link
            :to="`/conditions/${route.params.id}/treatments/${treatment.id}/treatment_retrospects`"
            class="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Reflect on how this worked
        </router-link>
      </div>

      <!-- Secondary actions -->
      <div class="pt-4 border-t border-gray-200 space-y-3">
        <div class="text-sm space-x-4">
          <router-link
              :to="`/conditions/${route.params.id}/treatments`"
              class="text-blue-600 hover:underline"
          >
            Back to treatments
          </router-link>

          <router-link
              :to="`/conditions/${route.params.id}/treatments/${treatment.id}/edit`"
              class="text-blue-600 hover:underline"
          >
            Edit treatment
          </router-link>
        </div>

        <button
            @click="destroyTreatment"
            class="text-sm text-red-600 hover:underline"
        >
          Delete this treatment
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

const treatment = ref({});

onMounted(() => {
  axios
    .get(
      `/api/conditions/${route.params.id}/treatments/${route.params.treatment_id}`
    )
    .then(response => {
      treatment.value = response.data;
    });
});

function relativeDate(date) {
  return moment(date).fromNow();
}

function destroyTreatment() {
  axios
    .delete(
      `/api/conditions/${route.params.id}/treatments/${treatment.value.id}`
    )
    .then(() => {
      router.push(`/conditions/${route.params.id}/treatments`);
    });
}
</script>
