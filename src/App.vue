<template>
  <div id="app">
    <header class="bg-blue-800 text-white">
      <div
        class="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center"
      >
        <h1 class="text-2xl font-bold mb-2 sm:mb-0">Health Monitoring App</h1>

        <div class="flex space-x-4">
          <router-link v-if="isLoggedIn" to="/logout" class="hover:underline">
            Logout
          </router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="hover:underline">
            Login
          </router-link>
          <router-link
            v-if="!isLoggedIn"
            to="/signup"
            class="hover:underline"
          >
            Sign Up
          </router-link>
        </div>
      </div>

      <nav
        v-if="isLoggedIn"
        class="bg-blue-700 text-white border-t border-blue-600"
      >
        <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-6 text-sm">
          <router-link to="/treatments" class="hover:underline"
            >Treatments</router-link
          >
          <router-link to="/conditions" class="hover:underline"
            >Conditions</router-link
          >
          <router-link to="/journals" class="hover:underline"
            >Journals</router-link
          >
          <router-link to="/users/me/dashboard" class="hover:underline"
            >Dashboard</router-link
          >
          <router-link to="/users/me" class="hover:underline"
            >User Profile</router-link
          >
        </div>
      </nav>
    </header>

    <main class="mt-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuth } from "@/lib/auth";

const { isLoggedIn } = useAuth();
</script>

