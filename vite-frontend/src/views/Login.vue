<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gray-100 px-4"
  >
    <div class="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 class="text-2xl font-bold text-center text-blue-600">
        Login to your account
      </h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>

        <div class="text-sm text-center">
          <router-link to="/signup" class="text-blue-600 hover:underline">
            Don't have an account? Click here.
          </router-link>
        </div>

        <div v-if="errors.length" class="text-red-600 text-sm text-center">
          <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
        </div>
      </form>
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

function login() {
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
      localStorage.setItem("jwt", token);
      setAuthToken(token); // ✅ update the instance header
      router.push("/users/me");
    })
    .catch(error => {
      console.log(error.response);
      errors.value = ["Invalid email or password."];
      email.value = "";
      password.value = "";
    });
}
</script>
