<template>
  <div class="journals-update">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update Journal</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateJournal(journal)">
                <div class="form-group col-md-12">
                  <label>Description</label>
                  <textarea
                    v-model="journal.description"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <div class="form-group col-md-12">
                  <label>Image Url</label>
                  <input v-model="journal.image_url" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Video Url</label>
                  <input v-model="journal.video_url" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Health Routines</label>
                  <textarea
                    v-model="journal.health_routines"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div class="form-group col-md-3">
                  <label>Blood Pressure Average</label>
                  <input v-model="journal.bp_avg" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-9">
                  <label>Blood Pressure Annotations</label>
                  <input v-model="journal.bp_annotations" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Image Of Tongue</label>
                  <input v-model="journal.image_of_tongue" type="text" class="form-control" placeholder="" />
                </div>

                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
              <button v-on:click="destroyJournal()" type="submit" class="btn btn-primary">Delete</button>
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
      journal: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/journals/" + this.$route.params.id).then(response => {
      console.log("journals show", response);
      this.journal = response.data;
    });
  },
  methods: {
    updateJournal: function(journal) {
      var params = {
        description: journal.description,
        image_url: journal.image_url,
        video_url: journal.video_url,
        health_routines: journal.health_routines,
        bp_avg: journal.bp_avg,
        bp_annotations: journal.bp_annotations,
        image_of_tongue: journal.image_of_tongue,
      };
      axios
        .patch(`/api/journals/${this.journal.id}`, params)
        .then(response => {
          console.log("journals update", response);
          this.$router.push(`/journals/${this.journal.id}`);
        })
        .catch(error => {
          console.log("journals create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyJournal: function() {
      axios.delete(`/api/journals/${this.journal.id}`).then(() => {
        console.log("journal successfully destroyed");
        this.$router.push(`/journals`);
      });
    },
  },
};
</script>
