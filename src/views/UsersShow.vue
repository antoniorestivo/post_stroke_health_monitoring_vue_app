<template>
  <section class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ user.first_name }} {{ user.last_name }} Profile
        </h1>
        <img
          v-if="profileImageUrl"
          :src="profileImageUrl"
          alt="Profile"
          class="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
      </div>

      <p class="text-gray-600 mb-4">Email: {{ user.email }}</p>

      <div class="space-x-4 mb-6">
        <router-link
          :to="`/users/${user.id}/charts`"
          class="text-blue-600 hover:underline"
          >User Charts</router-link
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Monthly Logins
          </h3>
          <canvas ref="monthlyCanvas" class="w-full h-64" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Daily Logins</h3>
          <canvas ref="dailyCanvas" class="w-full h-64" />
        </div>
      </div>

      <!-- Account & Data -->
      <div class="mt-10 pt-6 border-t border-gray-200 space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">
          Account & data
        </h3>

        <p class="text-sm text-gray-600 max-w-2xl">
          <strong>This is a demonstration environment. Please do not enter real or sensitive personal or medical information.
          All accounts and associated data are automatically deleted within 2-3 days after creation.</strong>
        </p>

        <p class="text-sm text-gray-600 max-w-2xl">
          You can also delete your account immediately. This will permanently remove
          all your journals, conditions, treatments, charts, and reflections.
        </p>

        <!-- Delete confirmation -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3 max-w-md">
          <p class="text-sm text-red-700">
            To delete your account now, type <strong>DELETE</strong> below and confirm.
          </p>

          <input
              v-model="deleteConfirmation"
              type="text"
              placeholder="Type DELETE to confirm"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />

          <button
              @click="deleteAccount"
              :disabled="deleteConfirmation !== 'DELETE' || deleting"
              class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ deleting ? "Deleting…" : "Delete account" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/lib/axios";
import Chart from "chart.js/auto";

const router = useRouter();
const user = ref({});
const monthlyStats = ref({ labels: [], logins: [] });
const dailyStats = ref({ labels: [], logins: [] });
const profileImageUrl = ref("");

const monthlyCanvas = ref(null);
const dailyCanvas = ref(null);

const deleteConfirmation = ref("");
const deleting = ref(false);

async function deleteAccount() {
  if (deleteConfirmation.value !== "DELETE") return;

  deleting.value = true;

  try {
    await axios.delete(`/api/users/${user.value.id}`);
    localStorage.removeItem('jwt')
    router.push("/");
  } catch (error) {
    console.error("Failed to delete account:", error);
    deleting.value = false;
  }
}

onMounted(async () => {
  try {
    const response = await axios.get("/api/users/me");
    user.value = response.data;
    monthlyStats.value = response.data.monthly_statistics;
    dailyStats.value = response.data.daily_statistics;
    profileImageUrl.value = response.data.profile_image_url;

    renderCharts();
  } catch (error) {
    console.error("Failed to load user data:", error);
    router.push("/login"); // fallback if unauthorized
  }
});

function renderCharts() {
  if (monthlyCanvas.value && dailyCanvas.value) {
    new Chart(monthlyCanvas.value.getContext("2d"), {
      type: "bar",
      data: {
        labels: monthlyStats.value.labels,
        datasets: [
          {
            label: "Month",
            data: monthlyStats.value.logins,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
            title: { display: true, text: "Logins" }
          },
          x: {
            title: { display: true, text: "Month" }
          }
        }
      }
    });

    new Chart(dailyCanvas.value.getContext("2d"), {
      type: "bar",
      data: {
        labels: dailyStats.value.labels,
        datasets: [
          {
            label: "Last 7 Days",
            data: dailyStats.value.logins,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
            title: { display: true, text: "Logins" }
          },
          x: {
            title: { display: true, text: "Date" }
          }
        }
      }
    });
  }
}
</script>
