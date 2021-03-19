<template>
  <div class="journals-update">
    <h1>Update Journal</h1>
    <form v-on:submit.prevent="updateJournal(journal)">
     
      Journal Description:
      <input type="text" v-model="journal.description" />
      Image Url: <input type="text" v-model="journal.image_url" />
      Video Url: <input type="text" v-model="journal.video_url" />
      Health Routines: <input type="text" v-model="journal.health_routines" />
      Blood pressure average: <input type="text" v-model="journal.bp_avg" />
      Blood annotation: <input type="text" v-model="journal.bp_annotations" />
      Image of Tongue: <input type="text" v-model="journal.image_of_tongue" />
      <input type="submit" value="Update" />
    </form>
    <button v-on:click="destroyJournal()">Delete</button>

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
created: function() {
  axios.get("/api/journals/" + this.$route.params.id).then(response => {
      console.log("journals show", response);
      this.journal = response.data;
    });
},
methods: {
  updateJournal: function(journal){
    var params = {
      description: journal.description,
      image_url: journal.image_url,
      video_url: journal.video_url,
      health_routines: journal.health_routines,
      bp_avg: journal.bp_avg,
      bp_annotations: journal.bp_annotations,
      image_of_tongue: journal.image_of_tongue
      
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
      axios.delete(`/api/journals/${this.journal.id}`)
      .then(() => {
        console.log("journal successfully destroyed");
        this.$router.push(`/journals/${this.journal.id}`)
      })
    }
},
};

</script>

