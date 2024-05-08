<template>
  <div class="treatments-update">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update Treatments</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateTreatment(treatment)">
                <div class="form-group col-md-12">
                  <label>Treatment Description</label>
                  <input v-model="treatment.description" type="text" class="form-control" placeholder="" />
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
      treatment: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id + "/" + "treatments/" + this.$route.params.treatment_id).then(response => {
      console.log(response);
      this.treatment = response.data
    });
  },
  methods: {
    updateTreatment: function(treatment) {
      var params = {
        description: treatment.description,
      };
      axios
          .patch(`/api/conditions/${this.$route.params.id}/treatments/${this.treatment.id}`, params)
          .then(response => {
            console.log("treatments update", response);
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
