<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Actions -->
      <div class="text-center space-y-4">
        <router-link
          to="/journals/new"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Journal
        </router-link>

        <div v-if="!template">
          <router-link
            to="/journals/template/new"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Journal Template
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="`/journals/template/${template.id}/edit`"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Journal Template
          </router-link>
        </div>
      </div>

      <!-- Journals Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="journal in journals"
          :key="journal.id"
          class="bg-white shadow rounded-lg p-4 space-y-2"
        >
          <p class="text-sm text-gray-500">
            {{ relativeDate(journal.created_at) }}
          </p>

          <h6 class="font-semibold text-gray-800">Description:</h6>
          <p class="text-gray-700">{{ journal.description }}</p>

          <div v-if="journal.image_url">
            <img :src="journal.image_url" alt="Journal image" class="w-full h-auto rounded" />
          </div>

          <h6 class="font-semibold mt-2 text-gray-800">Video URL:</h6>
          <p class="text-sm break-all text-blue-600">{{ journal.video_url }}</p>

          <h6 class="font-semibold mt-2 text-gray-800">Health Routines:</h6>
          <p class="text-sm">{{ journal.health_routines }}</p>

          <h6 class="font-semibold mt-2 text-gray-800">Metrics:</h6>
          <div class="space-y-1">
            <div v-for="metric in Object.keys(journal.metrics)" :key="metric">
              <p class="text-sm font-medium text-gray-600">{{ metric }}:</p>
              <p class="text-sm text-gray-800">
                {{ journal.enriched_metrics?.[metric] ?? '—' }}
              </p>
            </div>
          </div>

          <div class="mt-4">
            <router-link
              :to="`/journals/${journal.id}`"
              class="text-blue-600 hover:underline text-sm"
            >
              More Info →
            </router-link>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-4 mt-8">
        <button
          class="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>

        <span class="text-sm text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          class="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/lib/axios'
import moment from 'moment'

const journals = ref([])
const template = ref(null)
const currentPage = ref(1)
const recordsPerPage = 9
const totalRecords = ref(0)

const totalPages = computed(() => Math.ceil(totalRecords.value / recordsPerPage))

function fetchJournals(page) {
  const offset = (page - 1) * recordsPerPage
  axios
    .get('/api/journals', {
      params: {
        limit: recordsPerPage,
        offset
      }
    })
    .then(response => {
      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
      journals.value = data.journals
      template.value = data.template
      totalRecords.value = data.total_records
    })
    .catch(error => {
      console.error('Error fetching journal records:', error)
    })
}

function relativeDate(date) {
  return moment(date).format('MMM Do YYYY')
}

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchJournals(page)
}

onMounted(() => {
  fetchJournals(currentPage.value)
})
</script>
