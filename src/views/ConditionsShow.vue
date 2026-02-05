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

      <!-- Treatments -->
      <div class="pt-6 border-t space-y-4">
        <h2 class="text-lg font-semibold text-gray-700">
          Treatments
        </h2>

        <div v-if="treatments.length === 0" class="text-sm text-gray-500">
          No treatments added yet.
        </div>

        <ul v-else class="space-y-3">
          <li
              v-for="treatment in treatments"
              :key="treatment.id"
              class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium text-gray-800">
                  {{ treatment.name }}
                </p>

                <p
                    v-if="treatment.description"
                    class="text-xs text-gray-600 mt-1 line-clamp-3"
                >
                  {{ treatment.description }}
                </p>
              </div>

              <router-link
                  :to="`/conditions/${condition.id}/treatments/${treatment.id}`"
                  class="text-xs text-blue-600 hover:underline whitespace-nowrap"
              >
                View
              </router-link>
            </div>
          </li>
        </ul>

        <router-link
            :to="`/conditions/${condition.id}/treatments/new`"
            class="text-sm text-blue-600 hover:underline my-2"
        >
          + Add treatment
        </router-link>
        <br>

        <router-link
            :to="`/conditions/${condition.id}/treatments`"
            class="text-xs text-blue-600 hover:underline inline-block"
        >
          View all treatments & progress →
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
          <router-link
              :to="`/conditions/${condition.id}/edit`"
              class="text-blue-600 hover:underline text-sm self-center"
          >
            Edit condition details
          </router-link>

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
const treatments = ref([]);

onMounted(async () => {
  const conditionResponse = await axios.get(
    `/api/conditions/${route.params.id}`
  );
  condition.value = conditionResponse.data;

  const treatmentsResponse = await axios.get(
    `/api/conditions/${route.params.id}/treatments`
  );
  const data = JSON.parse(treatmentsResponse.data)
  treatments.value = data.treatments;
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
