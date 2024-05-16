<template>
  <div class="treatment-retrospects-new">
    <!--=================================
    Appointment -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Create your new treatment retrospect</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="createTreatmentRetrospect()">
                <div class="form-group col-md-12">
                  <label>Feedback</label>
                  <textarea
                      v-model="feedback"
                      class="form-control"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                  ></textarea>
                  <label>Treatment Rating</label>
                  <input v-model="rating" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--=================================
    Appointment -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      feedback: "",
      rating: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createTreatmentRetrospect: function() {
      var params = {
        feedback: this.feedback,
        rating: this.rating
      };
      axios
          .post(`/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`, params)
          .then(response => {
            console.log("treatment retrospects create", response);
            this.$router.push(`/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`);
          })
          .catch(error => {
            console.log("treatment retrospects create error", error.response);
            this.errors = error.response.data.errors;
          });
    },
  },
};
</script>
