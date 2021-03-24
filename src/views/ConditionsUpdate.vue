<template>
  <div class="conditions-update">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update Condition</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateCondition(condition)">
                <div class="form-group col-md-12">
                  <label>Condition Name</label>
                  <input v-model="condition.name" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Needs Support</label>
                  <input v-model="condition.support" type="checkbox" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Treatment Retrospect</label>
                  <textarea
                    v-model="condition.treatment_retrospect"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div class="form-group col-md-12">
                  <label>Treatment</label>
                  <textarea
                    v-model="condition.treatment_plan"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div class="form-group col-md-3">
                  <label>Image Url</label>
                  <input v-model="condition.image_url" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-9">
                  <label>Video Url</label>
                  <input v-model="condition.video_url" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
              <button v-on:click="destroyCondition()" type="submit" class="btn btn-primary">Delete</button>
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
      condition: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id).then(response => {
      console.log("conditions show", response);
      this.condition = response.data;
    });
  },
  methods: {
    updateCondition: function(condition) {
      var params = {
        name: condition.name,
        support: condition.support,
        treatment_retrospect: condition.treatment_retrospect,
        treatment_plan: condition.treatment_plan,
        image_url: condition.image_url,
        video_url: condition.video_url,
      };
      axios
        .patch(`/api/conditions/${this.condition.id}`, params)
        .then(response => {
          console.log("conditions update", response);
          this.$router.push(`/conditions/${this.condition.id}`);
        })
        .catch(error => {
          console.log("conditions create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyCondition: function() {
      axios.delete(`/api/conditions/${this.condition.id}`).then(() => {
        console.log("condition successfully destroyed");
        this.$router.push(`/conditions`);
      });
    },
  },
};
</script>
