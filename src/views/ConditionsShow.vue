<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ condition.name }} — recorded {{ relativeDate(condition.created_at) }}
      </h2>

      <p class="text-lg text-gray-700">
        {{
          condition.support
            ? "This condition needs outside support."
            : "This condition does not currently need outside support."
        }}
      </p>

      <div v-if="condition.image_url">
        <img
          :src="condition.image_url"
          alt="Condition image"
          class="w-full rounded-lg shadow"
        />
      </div>

      <div v-if="condition.video_url">
        <h4 class="text-md font-semibold text-gray-800 mt-4">Video URL</h4>
        <p class="text-sm text-blue-600 break-all">{{ condition.video_url }}</p>
      </div>

      <div class="pt-6 space-x-4 text-sm">
        <router-link to="/conditions" class="text-blue-600 hover:underline">
          Back to all conditions
        </router-link>

        |

        <router-link
          :to="`/conditions/${condition.id}/edit`"
          class="text-blue-600 hover:underline"
        >
          Update Condition
        </router-link>

        |

        <router-link
          :to="`/conditions/${condition.id}/treatments`"
          class="text-blue-600 hover:underline"
        >
          Treatments for Condition
        </router-link>
      </div>

      <div class="pt-4">
        <button
          @click="destroyCondition"
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
