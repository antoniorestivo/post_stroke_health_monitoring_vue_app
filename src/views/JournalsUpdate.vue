<template>
  <div class="journals-new">
    <h1>Create New Journal</h1>
    <form v-on:submit.prevent="createJournal()">
     
      Journal Description:
      <input type="text" v-model="newJournalDescription" />
      Image Url: <input type="text" v-model="newImageUrl" />
      Video Url: <input type="text" v-model="newVideoUrl" />
      Health Routines: <input type="text" v-model="newHealthRoutines" />
      Blood pressure average: <input type="text" v-model="newBpAvg" />
      Blood annotation: <input type="text" v-model="newBpAnnotations" />
      Image of Tongue: <input type="text" v-model="newImageOfTongue" />
      <input type="submit" value="Create" />
    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function(){
  return {
    journal: {},
    errors: [],
  };
},
created: function() {},
methods: {
  createJournal: function(){
    var params = {
      description: this.newJournalDescription,
      image_url: this.newImageUrl,
      health_routines: this.newHealthRoutines,
      bp_avg: this.newBpAvg,
      bp_annotations: this.newBpAnnotations,
      image_of_tongue: this.newImageOfTongue
      
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