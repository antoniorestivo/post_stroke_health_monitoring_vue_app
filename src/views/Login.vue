<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
    <div class="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-6">

      <!-- Header -->
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold text-gray-800">
          Welcome back
        </h1>
        <p class="text-sm text-gray-600">
          Sign in to continue where you left off.
          <br>
          <strong> Note: this app is in demo mode. Your account will be deleted within 2-3 days after creation.</strong>
        </p>
      </div>

      <!-- Errors -->
      <div
        v-if="errors.length"
        class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 text-center"
      >
        <p v-for="(error, index) in errors" :key="index">
          {{ error }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="completeLogin" class="space-y-4">

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign in
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-600">
        Don’t have an account?
        <router-link to="/signup" class="text-blue-600 hover:underline">
          Create one
        </router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errors = ref([]);

import axios, { setAuthToken } from "@/lib/axios";
import { login } from "@/lib/auth";

function completeLogin() {
  axios
    .post(
      "/api/sessions",
      { email: email.value, password: password.value },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(response => {
      const token = response.data.jwt;
      login(token);
      setAuthToken(token);
      router.push("/users/me");
    })
    .catch(error => {
      console.log(error.response);
      errors.value = ["Invalid email or password."];
      password.value = "";
    });
}
</script>
