<template>
  <div class="treatments-new">
    <!--=================================
    Appointment -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Create your new treatment</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="createTreatment()">
                <div class="form-group col-md-12">
                  <label>Description</label>
                  <textarea
                      v-model="newTreatmentDescription"
                      class="form-control"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                  ></textarea>
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
      newTreatmentDescription: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createTreatment: function() {
      var params = {
        description: this.newTreatmentDescription,
      };
      axios
          .post(`/api/conditions/${this.$route.params.id}/treatments`, params)
          .then(response => {
            console.log("treatments create", response);
            this.$router.push(`/conditions/${this.$route.params.id}/treatments`);
          })
          .catch(error => {
            console.log("treatments create error", error.response);
            this.errors = error.response.data.errors;
          });
    },
  },
};
</script>
