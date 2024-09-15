<template>
  <div style="margin-left: 1rem;">
    <h2>Enter today's health metrics</h2>
    <form id="journal-form-container" v-on:submit.prevent="createJournal()">
      <div class="form-group">
        <label for="description">Describe your day</label>
        <textarea name="description" cols="30" rows="8" id="newJournalDescription" style="margin-left: 2rem;" />
      </div>
      <br />
      <div class="form-group">
        <label for="health_routines">What are your health routines?</label>
        <br />
        <textarea name="health_routines" cols="30" rows="8" id="newJournalHealthRoutines" style="margin-left: 2rem;" />
      </div>
      <br />
      <div class="form-group">
        <label for="image_url">Enter an image url as a memento of your day:</label>
        <input type="text" name="image_url" id="newJournalImageUrl" />
      </div>
      <br />
      <div class="form-group">
        <label for="video_url">Enter an video url as a memento of your day:</label>
        <input type="text" name="video_url" id="newJournalVideoUrl" />
      </div>
      <button type="submit" class="btn-primary">Submit</button>
    </form>
    <div v-if="loading" class="loading">Loading... Test</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content"></div>
  </div>
</template>

<style scoped>

.form-group {
  margin-bottom: 1.5rem; /* Adds spacing between form fields */
  display: flex;
  flex-direction: column;
}

/deep/ label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

textarea,
input[type="text"] {
  width: 100%; /* Ensure inputs and textareas take up full width */
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical; /* Allow vertical resize but not horizontal */
}

/* Button styling */
.btn-primary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow effect on hover */
}

.btn-primary:active {
  transform: scale(1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow effect on hover */
}

.loading {
  color: gray;
  font-size: 1rem;
}

.error {
  color: red;
}

</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    buildFormElements(dataArray) {
      const targetElement = document.getElementById("journal-form-container");
      dataArray.forEach(healthMetric => {
        let newInputGroup = document.createElement("div");
        newInputGroup.className = "input-group";
        let metricName = healthMetric.metric_name;
        let labelElement = `<label for="${metricName}">${metricName}</label>`;
        let inputElement = `<input type="text" name="${metricName}" class="dynamic-input health-metric" />`;
        let elements = [labelElement, inputElement];
        newInputGroup.innerHTML = elements.join("");
        targetElement.prepend(newInputGroup);
      });
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      axios
        .get("/api/journals/new")
        .then(response => {
          let data = response.data;
          this.post = data;
          this.loading = false;
          this.buildFormElements(data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    createJournal() {
      let description = document.getElementById("newJournalDescription");
      let health_routines = document.getElementById("newJournalHealthRoutines");
      let image_url = document.getElementById("newJournalImageUrl");
      let video_url = document.getElementById("newJournalVideoUrl");
      var params = {
        description: description.value,
        health_routines: health_routines.value,
        image_url: image_url.value,
        video_url: video_url.value,
        metrics: {},
      };
      let metrics = document.getElementsByClassName("health-metric");
      metrics.forEach(ele => {
        let key = ele.name;
        let value = ele.value;
        params.metrics[key] = value;
      });
      console.log(`Params: ${params}`);
      axios
        .post("/api/journals", params)
        .then(response => {
          console.log("journals create", response);
          this.$router.push("/journals");
        })
        .catch(error => {
          console.log("journals create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};

</script>
