<template>
  <div class="conditions-update">
    <h1>Update Condition</h1>
    <form v-on:submit.prevent="updateCondition(condition)">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }} </li>
      </ul>
     
      Condition name:
      <input type="text" v-model="condition.name" />
      Support: <input type="checkbox" v-model="condition.support" />
      Treatment Retrospect: <input type="text" v-model="condition.treatment_retrospect" />
      Treatment Plan: <input type="text" v-model="condition.treatment_plan" />
      Image Url: <input type="text" v-model="condition.image_url" />
      Video Url: <input type="text" v-model="condition.video_url" />
    
      <input type="submit" value="Update" />
    </form>
    <button v-on:click="destroyCondition()" to="/conditions">Delete</button>
    

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function(){
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
  updateCondition: function(condition){
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
      axios.delete(`/api/conditions/${this.condition.id}`)
      .then(() => {
        console.log("condition successfully destroyed");
        this.$router.push(`/conditions`)
      })
    }
},
};

</script>