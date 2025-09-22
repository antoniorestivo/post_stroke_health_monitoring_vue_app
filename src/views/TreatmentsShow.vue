<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">
        Description: {{ treatment.description }}
      </h2>

      <p class="text-gray-600">
        Treatment created or began {{ relativeDate(treatment.created_at) }}
      </p>

      <div class="space-x-4 text-sm pt-4">
        <router-link
          :to="`/conditions/${route.params.id}/treatments`"
          class="text-blue-600 hover:underline"
        >
          Back to all treatments
        </router-link>

        |

        <router-link
          :to="`/conditions/${route.params.id}/treatments/${treatment.id}/edit`"
          class="text-blue-600 hover:underline"
        >
          Update treatment
        </router-link>

        |

        <router-link
          :to="
            `/conditions/${route.params.id}/treatments/${treatment.id}/treatment_retrospects`
          "
          class="text-blue-600 hover:underline"
        >
          Evaluate Treatment
        </router-link>
      </div>

      <div class="pt-4">
        <button
          @click="destroyTreatment"
          class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
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
