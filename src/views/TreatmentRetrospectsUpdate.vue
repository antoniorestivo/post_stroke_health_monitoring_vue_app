<template>
  <div class="treatment-retrospects-update">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update Retrospect</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateTreatmentRetrospect(treatment_retrospect)">
                <div class="form-group col-md-12">
                  <label>Feedback</label>
                  <textarea
                      v-model="treatment_retrospect.feedback"
                      class="form-control"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                  ></textarea>
                </div>
                <div class="form-group col-md-12">
                  <label>Retrospect Rating (scale 1 - 10)</label>
                  <input v-model="treatment_retrospect.rating" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      treatment_retrospect: {},
      errors: [],
    };
  },
  created: function() {
    const url = `/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects/${this.$route.params.retrospect_id}`
    axios.get(url).then(response => {
      this.treatment_retrospect = response.data
    });
  },
  methods: {
    updateTreatmentRetrospect: function(treatment_retrospect) {
      const url = `/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects/${this.$route.params.retrospect_id}`
      var params = {
        feedback: treatment_retrospect.feedback,
        rating: treatment_retrospect.rating
      };
      axios
          .patch(url, params)
          .then(response => {
            console.log(response);
            this.$router.push(`/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects/${this.$route.params.retrospect_id}`);
          })
          .catch(error => {
            console.log("treatments create error", error.response);
            this.errors = error.response.data.errors;
          });
    },
  },
};
</script>
