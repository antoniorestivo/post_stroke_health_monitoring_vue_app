<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Update Journal Template</h3>

      <!-- Tooltip Block -->
      <div class="flex items-center space-x-2">
        <p class="text-gray-700">
          Input the health metrics you would like to track
        </p>
        <div class="relative inline-block">
          <img
            src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
            alt="Info"
            class="w-4 h-4 cursor-pointer"
            @mouseover="tooltipVisible = true"
            @mouseleave="tooltipVisible = false"
          />
          <div
            v-if="tooltipVisible"
            class="absolute left-full top-0 ml-2 w-64 text-xs text-white bg-black p-2 rounded shadow z-50"
          >
            Here are some health metrics examples: Blood Pressure, Heart Rate,
            Weight, etc. The unit name describes what its measurement(s) are.
            Weight, for example, can have a unit of pounds (lb) or kilograms
            (kg). Unit type can be string (for text) or numeric (for numbers).
            The warning threshold defines the point when the health metric
            becomes concerning.
          </div>
        </div>
      </div>

      <div v-if="message" class="text-green-600">{{ message }}</div>
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <!-- Edit Form -->
      <form @submit.prevent="updateJournalTemplate" class="space-y-4">
        <div
          v-for="(metric, index) in metrics"
          :key="index"
          class="border p-4 bg-gray-50 rounded space-y-2"
        >
          <div class="flex flex-col sm:flex-row sm:gap-4">
            <div class="flex-1">
              <label class="font-medium text-sm">Metric Name</label>
              <input
                v-model="metric.metric_name"
                class="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>

            <div class="flex-1">
              <label class="font-medium text-sm">Data Type</label>
              <input
                v-model="metric.metric_data_type"
                class="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:gap-4">
            <div class="flex-1">
              <label class="font-medium text-sm">Unit Name</label>
              <input
                v-model="metric.metric_unit_name"
                class="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>

            <div class="flex-1">
              <label class="font-medium text-sm">Warning Threshold</label>
              <input
                v-model="metric.warning_threshold"
                class="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>
          </div>

          <div class="text-right">
            <button
              type="button"
              @click="removeMetricField(index)"
              class="text-red-600 text-sm hover:underline"
            >
              Delete Field
            </button>
          </div>
        </div>

        <div class="mt-4">
          <button
            type="button"
            @click="addMetricField"
            class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            + Add Metric
          </button>
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

const tooltipVisible = ref(false);
const message = ref("");
const errors = ref([]);

const templateId = route.params.id;
const metrics = ref([]);

onMounted(() => {
  axios
    .get(`/api/journal_templates/${templateId}/edit`)
    .then(response => {
      metrics.value = response.data.metrics || [];
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || [
        "Failed to load template"
      ];
    });
});

function addMetricField() {
  metrics.value.push({
    metric_name: "",
    metric_data_type: "",
    metric_unit_name: "",
    warning_threshold: ""
  });
}

function removeMetricField(index) {
  metrics.value.splice(index, 1);
}

function updateJournalTemplate() {
  const params = {
    template: { metrics: metrics.value }
  };

  axios
    .patch(`/api/journal_templates/${templateId}`, params)
    .then(() => {
      message.value = "Template successfully updated!";
      router.push(`/journals/template/${templateId}/edit`);
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Update failed"];
    });
}
</script>
