<template>
  <div class="journals-new">
    <!--=================================
    Appointment -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Create your new journal</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="createJournal()">
                <div class="form-group col-md-12">
                  <label>Description</label>
                  <textarea
                    v-model="newJournalDescription"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <div class="form-group col-md-12">
                  <label>Image Url</label>
                  <input v-model="newImageUrl" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Video Url</label>
                  <input v-model="newVideoUrl" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Health Routines</label>
                  <textarea
                    v-model="newHealthRoutines"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div class="form-group col-md-3">
                  <label>Blood Pressure Average</label>
                  <input v-model="newBpAvg" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-9">
                  <label>Blood Pressure Annotations</label>
                  <input v-model="newBpAnnotations" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Image Of Tongue</label>
                  <input v-model="newImageOfTongue" type="text" class="form-control" placeholder="" />
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
    <h1>Create New Journal</h1>
    <form v-on:submit.prevent="createJournal()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>

      Journal Description:
      <input type="text" v-model="newJournalDescription" />
      Image Url:
      <input type="text" v-model="newImageUrl" />
      Video Url:
      <input type="text" v-model="newVideoUrl" />
      Health Routines:
      <input type="text" v-model="newHealthRoutines" />
      Blood pressure average:
      <input type="text" v-model="newBpAvg" />
      Blood pressure annotation:
      <input type="text" v-model="newBpAnnotations" />
      Image of Tongue:
      <input type="text" v-model="newImageOfTongue" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newJournalDescription: "",
      newImageUrl: "",
      newVideoUrl: "",
      newHealthRoutines: "",
      newBpAvg: "",
      newBpAnnotations: "",
      newImageOfTongue: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createJournal: function() {
      var params = {
        description: this.newJournalDescription,
        image_url: this.newImageUrl,
        health_routines: this.newHealthRoutines,
        bp_avg: this.newBpAvg,
        bp_annotations: this.newBpAnnotations,
        image_of_tongue: this.newImageOfTongue,
      };
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
