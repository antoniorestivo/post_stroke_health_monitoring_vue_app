<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <div class="flex items-center space-x-2">
        <h3 class="text-2xl font-bold text-gray-800">
          Update Journal Template
        </h3>
        <!-- Tooltip Block -->
        <img
          src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
          alt="Info"
          class="w-4 h-4 cursor-pointer"
          @mouseover="tooltipVisible = true"
          @mouseleave="tooltipVisible = false"
        />
      </div>
      <p class="text-gray-700">
        Choose what you want to pay attention to each day. Your setup will show up as health metrics to track in your
        journal entries.
      </p>
      <p
        v-if="tooltipVisible"
        class="text-sm bg-gray-800 text-white p-3 rounded max-w-md leading-relaxed"
      >
        Each field becomes a question in your daily journal.
        <br /><br />
        <strong>Examples:</strong>
        <ul class="list-disc list-inside mt-1">
          <li><strong>Sleep Hours</strong> – how long you slept</li>
          <li><strong>Energy Level</strong> – how you felt during the day</li>
          <li><strong>Exercise Intensity</strong> – how hard you worked out</li>
        </ul>
        <br />
        Warning thresholds are optional. They simply help highlight days that might need extra attention.
      </p>

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
          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-4">
            <div class="text-med font-bold text-gray-600">
              Metric {{ index + 1 }}
            </div>
            <!-- First row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Column 1 -->
              <div class="space-y-1">
                <label class="block font-medium text-gray-700">Metric Name</label>
                <input
                  v-model="metric.metric_name"
                  type="text"
                  class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Column 2 -->
              <div class="space-y-2">
                <label class="block font-medium text-gray-700">
                  What kind of value is this?
                </label>

                <p class="text-xs text-gray-500">
                  This determines which charts can be created from this metric.
                </p>

                <div class="space-y-1 text-sm">
                  <label class="flex items-start gap-2">
                    <input
                      type="radio"
                      value="numeric"
                      v-model="metric.metric_data_type"
                    />
                    <span>
                      <strong>Numeric</strong> — values you want to track or compare over time
                      <span class="block text-xs text-gray-500">
                        Examples: hours slept, weight, blood pressure, energy score
                      </span>
                    </span>
                  </label>

                  <label class="flex items-start gap-2">
                    <input
                      type="radio"
                      value="categorical"
                      v-model="metric.metric_data_type"
                    />
                    <span>
                      <strong>Categorical</strong> — labels or states you want to count or group
                      <span class="block text-xs text-gray-500">
                        Examples: mood (“good / okay / bad”), medication taken (“yes / no”)
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Second row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Column 1 -->
              <div class="space-y-1">
                <label class="block font-medium text-gray-700">Unit Name</label>
                <input
                  v-model="metric.metric_unit_name"
                  type="text"
                  class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Column 2 -->
              <div v-if="metric.metric_data_type === 'numeric'" class="space-y-3">
                <label class="block font-medium text-gray-700">
                  Warning threshold (optional)
                </label>

                <p class="text-xs text-gray-500">
                  Set a threshold and choose when values should trigger a warning.
                </p>

                <input
                  type="number"
                  v-model="metric.warning_threshold"
                  class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 6"
                />

                <div class="space-y-1 text-sm">
                  <label class="flex items-center gap-2">
                    <input
                      type="radio"
                      value="gteq"
                      v-model="metric.warning_modifier"
                      :disabled="!metric.warning_threshold"
                    />
                    Warn when values are <strong>greater than or equal to</strong> the threshold
                  </label>

                  <label class="flex items-center gap-2">
                    <input
                      type="radio"
                      value="lteq"
                      v-model="metric.warning_modifier"
                      :disabled="!metric.warning_threshold"
                    />
                    Warn when values are <strong>less than or equal to</strong> the threshold
                  </label>
                </div>
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

        <div class="mt-6 space-y-3">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>

          <div
            v-if="message"
            class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700"
          >
            {{ message }}
          </div>
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

const metrics = ref([]);

onMounted(() => {
  axios
    .get(`/api/journal_templates/edit`)
    .then(response => {
      metrics.value = (response.data.metrics || []).map(m => ({
        ...m,
        metric_data_type:
          m.metric_data_type === "categorical"
              ? "categorical"
              : "numeric",
        warning_modifier: m.warning_modifier || "gteq"
      }));
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
    metric_data_type: "numeric",
    metric_unit_name: "",
    warning_threshold: "",
    warning_modifier: "gteq"
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
    .patch("/api/journal_templates", params)
    .then(() => {
      message.value = "Template successfully updated!";
      router.push("/journals/template/edit");
    })
    .catch(error => {
      errors.value = error.response?.data?.errors || ["Update failed"];
    });
}
</script>
