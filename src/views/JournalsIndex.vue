<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <h1 class="text-2xl font-semibold text-gray-800 text-center mb-4">
      Journal entries
    </h1>
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Actions -->
      <div class="flex justify-center gap-4 flex-wrap">
        <router-link
            v-if="template"
            to="/journals/new"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add journal entry
        </router-link>

        <router-link
            v-if="template"
            :to="`/journals/template/${template.id}/edit`"
            class="text-blue-600 hover:underline self-center"
        >
          Edit journal template
        </router-link>

        <router-link
            v-if="!template"
            to="/journals/template/new"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Set up journal template
        </router-link>
      </div>

      <!-- Journals Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="journal in journals"
          :key="journal.id"
          class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-4"
        >
          <!-- Date -->
          <p class="text-sm text-gray-500">
            {{ relativeDate(journal.created_at) }}
          </p>

          <!-- Description -->
          <p class="text-gray-800 text-sm line-clamp-3">
            {{ journal.description || 'No description provided.' }}
          </p>

          <!-- Image (optional, restrained) -->
          <div v-if="journal.image_url" class="pt-2">
            <img
              :src="journal.image_url"
              alt="Journal image"
              class="w-full h-40 object-cover rounded-md"
            />
          </div>

          <!-- Metrics summary -->
          <div class="pt-2">
            <h6 class="text-xs font-semibold text-gray-600 mb-2">
              Metrics
            </h6>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div
                v-for="metric in Object.keys(journal.metrics)"
                :key="metric"
                class="bg-gray-50 rounded px-2 py-1 text-xs"
              >
                <span class="font-medium text-gray-600">
                  {{ metric }}
                </span>
                <span class="text-gray-800 ml-1">
                  {{ journal.enriched_metrics?.[metric] ?? '—' }}
                </span>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="pt-2">
            <router-link
              :to="`/journals/${journal.id}`"
              class="text-blue-600 hover:underline text-sm"
            >
              View entry →
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
      console.log(data);
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
