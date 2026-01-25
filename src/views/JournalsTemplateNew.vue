<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <div class="flex items-center space-x-2">
        <h2 class="text-lg font-semibold text-gray-800">
          Choose what you want to pay attention to each day. Your setup will show up as health metrics to track in your
          journal entries.
        </h2>
        <img
          src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
          alt="Info"
          class="w-4 h-4 cursor-pointer"
          @mouseover="tooltipVisible = true"
          @mouseleave="tooltipVisible = false"
        />
      </div>
      <p> These are the questions your journal will ask each time you log an entry.
        You can change this later, and it will only affect future entries.
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

      <hr>
      <p class="text-xs text-gray-500 mt-2">
        This will pre-fill the form with a common setup. You can edit anything before submitting.
      </p>

      <div class="mb-4 space-x-2 text-xs">
        <button
            type="button"
            @click="applyPreset(basicHealthPreset)"
            class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Start with a common daily health setup
        </button>
      </div>
      <hr>

      <form @submit.prevent="createJournalTemplate" class="space-y-4">
        <div
          v-for="(field, index) in metricFields"
          :key="index"
          class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-3"
        >
          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-4">
            <div class="text-med font-bold text-gray-600">
              Metric {{ index + 1 }}
            </div>
            <!-- First row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Column 1 -->
              <div class="space-y-1">
                <label class="block font-medium text-gray-700">
                  What do you want to track?
                </label>
                <p class="text-xs text-gray-500">
                  For example: Weight, Sleep Hours, Energy Level
                </p>
                <input
                    type="text"
                    v-model="field.name"
                    class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Column 2 -->
              <div class="space-y-1">
                <label class="block font-medium text-gray-700">
                  How is it measured?
                </label>
                <p class="text-xs text-gray-500">
                  For example: pounds, hours, scale 1–5
                </p>
                <input
                    type="text"
                    v-model="field.unit"
                    class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Second row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Column 1 -->
              <div class="space-y-1">
                <label class="block font-medium text-gray-700">
                  What kind of value is this?
                </label>
                <p class="text-xs text-gray-500">
                  Usually a number, but text is fine too
                </p>
                <input
                    type="text"
                    v-model="field.dataType"
                    class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Column 2 -->
              <div class="space-y-1">
                <label class="block font-medium text-gray-700">
                  When should this stand out? (optional)
                </label>
                <p class="text-xs text-gray-500">
                  e.g. "200" (Leave blank if you don’t want alerts)
                </p>
                <input
                    type="text"
                    v-model="field.warningThreshold"
                    class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addField"
          class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          + Add Another Field
        </button>

        <div>
          <button
            type="submit"
            class="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Template
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/lib/axios";

const router = useRouter();

const tooltipVisible = ref(false);

const metricFields = ref([
  {
    name: "",
    unit: "",
    dataType: "",
    warningThreshold: ""
  }
]);

const basicHealthPreset = [
  {
    name: "Sleep Hours",
    unit: "hours",
    dataType: "number",
    warningThreshold: 6.0
  },
  {
    name: "Energy Level",
    unit: "scale_1_5",
    dataType: "number",
    warningThreshold: 2
  },
  {
    name: "Exercise Intensity",
    unit: "scale_0_3",
    dataType: "number",
    warningThreshold: 0
  }
];

function addField() {
  metricFields.value.push({
    name: "",
    unit: "",
    dataType: "",
    warningThreshold: ""
  });
}

function createJournalTemplate() {
  const template = {};

  metricFields.value.forEach((field, index) => {
    const i = index + 1;
    template[`field_name_${i}`] = field.name;
    template[`field_unit_${i}`] = field.unit;
    template[`field_data_type_${i}`] = field.dataType;
    template[`warning_threshold_${i}`] = field.warningThreshold;
  });

  axios
    .post("/api/journal_templates", { template })
    .then(() => {
      router.push("/journals");
    })
    .catch(error => {
      console.error("Template creation error:", error.response);
    });
}

function applyPreset(preset) {
  metricFields.value = preset.map(field => ({
    name: field.name,
    unit: field.unit,
    dataType: field.dataType,
    warningThreshold: field.warningThreshold
  }));
}
</script>
