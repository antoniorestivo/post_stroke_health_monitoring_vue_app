<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-xl bg-white shadow-md rounded-xl p-6 text-center space-y-4">
      <h1 class="text-2xl font-bold text-blue-600">Welcome to the Health Monitoring App</h1>
      <p class="text-gray-700 leading-relaxed">
        Learn about how your daily habits and medical treatments affect your health
      </p>
      <button
          @click="tryDemo"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Try Live Demo
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "@/lib/axios";
import { login } from "@/lib/auth";
import { useRouter } from "vue-router";

const router = useRouter();

async function tryDemo() {
  const response = await axios.post("/api/demo_login");
  const token = response.data.jwt;

  login(token);
  router.push("/users/me/dashboard");
}
</script>
