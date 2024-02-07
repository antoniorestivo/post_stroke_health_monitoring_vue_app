<template>
  <div class="post">
    <h2>Enter today's health metrics</h2>
    <form id="journal-form-container" v-on:submit.prevent="createJournal()">
      <label for="description">Describe your day</label>
      <textarea name="description" cols="30" rows="8" id="newJournalDescription" />
      <br />
      <label for="health_routines">What are your health routines?</label>
      <textarea name="health_routines" cols="30" rows="8" id="newJournalHealthRoutines" />
      <br />
      <label for="image_url">Enter an image url as a memento of your day:</label>
      <input type="text" name="image_url" id="newJournalImageUrl" />
      <br />
      <label for="video_url">Enter an video url as a memento of your day:</label>
      <input type="text" name="video_url" id="newJournalVideoUrl" />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-if="loading" class="loading">Loading... Test</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content"></div>
  </div>
</template>

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

//[ { "id": 1, "journal_template_id": 1, "metric_name": "Weight", "metric_data_type": "decimal", "metric_unit_name": "pounds", "created_at": "2024-01-25T23:26:53.959Z", "updated_at": "2024-01-25T23:26:53.959Z" }, { "id": 2, "journal_template_id": 1, "metric_name": "Blood pressure", "metric_data_type": "string", "metric_unit_name": "systolic / diastolic", "created_at": "2024-01-25T23:26:53.962Z", "updated_at": "2024-01-25T23:26:53.962Z" } ]
</script>
