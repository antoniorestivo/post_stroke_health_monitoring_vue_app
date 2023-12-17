<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      // replace `getPost` with your data fetching util / API wrapper
      axios
        .get("/api/journals/new", params)
        .then(response => {
          let data = JSON.parse(response);
          this.data.post = data

        })
        .catch(error => {
          console.log("journals new error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
}
</script>
