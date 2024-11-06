<template>
  <div class="treatments-index">
    <section class="space-ptb">
      <div class="container">
        <h1 style="text-align: center; margin-bottom: 2rem;">Conditions and Treatments</h1>
        <div v-for="(condition_treatment, index) in condition_treatments" v-bind:key="condition_treatment.id">
          <!-- Wrapper with border -->
          <div style="border: 1px solid black; padding: 15px; margin-bottom: 1rem;">
            <h3> Condition </h3>
            <p style="font-size: medium;"> {{ condition_treatment.name }} </p>
            <p> {{ condition_treatment.description }} </p>
          </div>
          <div class="row">
            <div v-for="(treatment, index) in condition_treatment.treatments"
                 v-bind:key="treatment.id"
                 class="col-lg-4 col-md-6 mb-0 mb-lg-3">
              <!-- Blog-Post-01 START -->
              <div class="blog-post">
                <div class="blog-post-content" style="position: inherit;">
                  <div class="blog-post-info">
                    <div class="blog-post-date">
                      <i class="far fa-clock"></i>
                      {{ relativeDate(treatment.created_at) }}
                    </div>
                  </div>
                  <!-- Treatment Numbering -->
                  <h6 class="blog-post-title">
                    Treatment #{{ index + 1 }}:
                  </h6>
                  <p>
                    {{ treatment.description }}
                  </p>
                  <router-link :to="`conditions/${condition_treatment.id}/treatments/${treatment.id}`"
                               class="btn btn-primary">More Info</router-link>
                </div>
              </div>
              <!-- Blog-Post-01 END -->
            </div>
          </div>
          <!-- Divider between condition sections, except after the last one -->
          <hr v-if="index < condition_treatments.length - 1" style="border: solid black 2px;">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      condition_treatments: []
    };
  },
  created: function() {
    axios.get('/api/treatments/all').then(response => {
      console.log(response);
      let data = JSON.parse(response.data);
      console.log(response);
      this.condition_treatments = data.condition_treatments;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMM Do YYYY");
    },
  },
};
</script>
