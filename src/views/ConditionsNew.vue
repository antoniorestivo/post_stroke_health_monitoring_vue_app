<template>
  <div class="conditions-new">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Create new condition</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="createCondition()">
                <div class="form-group col-md-12">
                  <label>Condition Name</label>
                  <input v-model="newName" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Needs Support:</label>
                  <input v-model="newSupport" type="checkbox" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>Condition Description</label>
                  <textarea
                    v-model="newDescription"
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div class="form-group col-md-3">
                  <label>Image Url:</label>
                  <input v-model="newImageUrl" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-9">
                  <label>Video Url</label>
                  <input v-model="newVideoUrl" type="text" class="form-control" placeholder="" />
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newName: "",
      newSupport: "",
      newImageUrl: "",
      newVideoUrl: "",
      newDescription: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createCondition: function() {
      var params = {
        name: this.newName,
        support: this.newSupport,
        description: this.newDescription,
        image_url: this.newImageUrl,
        video_url: this.newVideoUrl,
      };
      axios
        .post("/api/conditions", params)
        .then(response => {
          console.log("conditions create", response);
          this.$router.push("/conditions");
        })
        .catch(error => {
          console.log("conditions create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
