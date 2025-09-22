<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <div class="flex items-center space-x-2">
        <h2 class="text-lg font-semibold text-gray-800">
          Input the health metrics you would like to track.
        </h2>
        <img
          src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
          alt="Info"
          class="w-4 h-4 cursor-pointer"
          @mouseover="tooltipVisible = true"
          @mouseleave="tooltipVisible = false"
        />
      </div>

      <p
        v-if="tooltipVisible"
        class="text-sm bg-gray-800 text-white p-2 rounded max-w-md"
      >
        Here are some health metrics examples: Blood Pressure, Heart Rate,
        Weight, etc. The unit name describes what its measurement(s) are.
        Weight, for example, can have a unit of pounds (lb) or kilograms (kg).
        Unit type can be string (for text) or numeric (for numbers). The warning
        threshold indicates a value that defines the point when the health
        metric is of particular concern.
      </p>

      <form @submit.prevent="createJournalTemplate" class="space-y-4">
        <div
          v-for="(field, index) in metricFields"
          :key="index"
          class="border p-4 rounded bg-gray-50 space-y-2"
        >
          <label class="block font-medium">Field {{ index + 1 }} Name</label>
          <input
            type="text"
            v-model="field.name"
            class="w-full border rounded px-3 py-2"
          />

          <label class="block font-medium">Unit</label>
          <input
            type="text"
            v-model="field.unit"
            class="w-full border rounded px-3 py-2"
          />

          <label class="block font-medium">Data Type</label>
          <input
            type="text"
            v-model="field.dataType"
            class="w-full border rounded px-3 py-2"
          />

          <label class="block font-medium">Warning Threshold</label>
          <input
            type="text"
            v-model="field.warningThreshold"
            class="w-full border rounded px-3 py-2"
          />
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
</script>
