<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-xl bg-white shadow-md rounded-xl p-6 text-center space-y-4">
      <h1 class="text-2xl font-bold text-blue-600">Welcome to the Stroke Care App</h1>
      <p class="text-gray-700 leading-relaxed">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
const message =
  "This app helps track the stroke patient's conditions and daily state. It assists the caretaker in making the best lifestyle choices for the patient.";
</script>
