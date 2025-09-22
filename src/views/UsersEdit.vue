<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <h3 class="text-2xl font-bold text-gray-800">Update User</h3>

      <ul v-if="errors.length" class="text-red-600 text-sm list-disc pl-5">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>

      <form @submit.prevent="updateUser" class="space-y-6">
        <div>
          <label class="block font-medium mb-1">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Password</label>
          <input
            v-model="user.newPassword"
            type="password"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">First Name</label>
            <input
              v-model="user.firstName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block font-medium mb-1">Last Name</label>
            <input
              v-model="user.lastName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label class="block font-medium mb-1">Profile Image</label>
          <input
            ref="profileImageRef"
            type="file"
            class="block w-full text-sm text-gray-600 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div class="flex flex-wrap gap-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>

          <button
            type="button"
            @click="destroyUser"
            class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/lib/axios'

const route = useRoute()
const router = useRouter()

const user = ref({})
const errors = ref([])
const profileImageRef = ref(null)

onMounted(() => {
  axios.get(`/api/users/${route.params.id}`).then((response) => {
    user.value = response.data
  })
})

function updateUser() {
  const profileImage = profileImageRef.value?.files?.[0]
  const formData = new FormData()

  formData.append('email', user.value.email)
  formData.append('first_name', user.value.firstName)
  formData.append('last_name', user.value.lastName)
  formData.append('password', user.value.newPassword || '')
  formData.append('password_confirmation', user.value.confirmPassword || '')

  if (profileImage) {
    formData.append('profile_image', profileImage)
  }

  axios
    .patch(`/api/users/${user.value.id}`, formData)
    .then(() => {
      router.push(`/users/${user.value.id}`)
    })
    .catch((error) => {
      console.log(error.response)
      errors.value = error.response?.data?.errors || ['Update failed.']
    })
}

function destroyUser() {
  axios.delete(`/api/users/${user.value.id}`).then(() => {
    localStorage.removeItem('jwt')
    router.push('/signup')
  })
}
</script>
