<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">

      <!-- =========================
           SIGNUP SUCCESS MESSAGE
           ========================= -->
      <div
        v-if="signupComplete"
        class="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center space-y-3"
      >
        <h2 class="text-lg font-semibold text-blue-700">
          Check your email
        </h2>

        <p class="text-sm text-gray-700">
          We’ve sent a verification link to
          <strong>{{ newEmail }}</strong>.
          Please click the link to activate your account.
        </p>

        <router-link
          to="/login"
          class="text-blue-600 hover:underline text-sm"
        >
          Back to login
        </router-link>
      </div>

      <!-- =========================
           SIGNUP FORM
           ========================= -->
      <div v-else class="space-y-6">
        <!-- Header -->
        <div class="space-y-1 text-center">
          <h1 class="text-2xl font-semibold text-gray-800">
            Create your account
          </h1>
          <p class="text-sm text-gray-600">
            It only takes a minute to get started.
          </p>
        </div>

        <!-- Errors -->
        <div
          v-if="errors.length"
          class="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700"
        >
          <p v-for="(error, index) in errors" :key="index">
            {{ error }}
          </p>
        </div>

        <form @submit.prevent="createUser" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              v-model="newEmail"
              required
              class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Name -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                v-model="firstName"
                required
                class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                v-model="lastName"
                required
                class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              v-model="newPassword"
              required
              class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              v-model="newConfirmPassword"
              required
              class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Optional profile image -->
          <div class="pt-2">
            <label class="block text-sm font-medium text-gray-700">
              Profile image (optional)
            </label>
            <input
              type="file"
              ref="profileImage"
              class="mt-1 block w-full text-sm text-gray-600"
            />
          </div>

          <!-- Actions -->
          <div class="space-y-3 pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {{ loading ? "Creating account…" : "Create account" }}
            </button>

            <p class="text-center text-sm text-gray-600">
              Already have an account?
              <router-link to="/login" class="text-blue-600 hover:underline">
                Log in
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/lib/axios";

export default {
  data() {
    return {
      newEmail: "",
      newPassword: "",
      newConfirmPassword: "",
      firstName: "",
      lastName: "",
      signupComplete: false,
      loading: false,
      errors: []
    };
  },

  methods: {
    createUser() {
      this.errors = [];
      this.loading = true;

      const profileImage = this.$refs.profileImage?.files[0];

      const params = {
        user: {
          email: this.newEmail,
          password: this.newPassword,
          password_confirmation: this.newConfirmPassword,
          first_name: this.firstName,
          last_name: this.lastName,
          profile_image: profileImage
        }
      };

      axios
        .post("/api/users", params)
        .then(() => {
          this.signupComplete = true;
        })
        .catch(error => {
          this.errors =
              error.response?.data?.errors ||
              ["Unable to create account. Please try again."];
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
