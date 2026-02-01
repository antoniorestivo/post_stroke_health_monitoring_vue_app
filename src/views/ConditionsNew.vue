<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-8">

      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          Track a condition or goal over time
        </h1>
        <p class="text-sm text-gray-600 max-w-2xl">
          Conditions are things you’re actively monitoring or trying to improve over weeks or months —
          such as sleep quality, blood pressure, pain, or recovery progress.
          You can update this later as your situation changes.
        </p>
      </div>

      <!-- Errors -->
      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="createCondition" class="space-y-6">

        <!-- Core info -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              What condition are you tracking?
            </label>
            <p class="text-xs text-gray-500 mb-1">
              For example: Insomnia, Back pain, High Blood pressure
            </p>
            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <p class="text-xs text-gray-500 mb-1">
              Add any details that help explain what’s going on or why this matters.
            </p>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div class="flex items-start gap-2">
            <input
              v-model="form.support"
              type="checkbox"
              id="support"
              class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label for="support" class="text-sm text-gray-700">
              This condition requires extra support or assistance
            </label>
          </div>
        </div>

        <!-- Optional media -->
        <div class="space-y-4 pt-4 border-t border-gray-200">
          <h2 class="text-sm font-semibold text-gray-700">
            Additional details (optional)
          </h2>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              v-model="form.image_url"
              type="text"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              v-model="form.video_url"
              type="text"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Submit -->
        <div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Start tracking this condition
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
const errors = ref([]);

const form = ref({
  name: "",
  support: false,
  description: "",
  image_url: "",
  video_url: ""
});

function createCondition() {
  axios
    .post("/api/conditions", form.value)
    .then(() => {
      router.push("/conditions");
    })
    .catch(error => {
      console.log("conditions create error", error.response);
      errors.value = error.response?.data?.errors || [
        "Failed to create condition."
      ];
    });
}
</script>
