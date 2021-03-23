<template>
  <div class="conditions-new">
    <h1>Create New Condition</h1>
    <form v-on:submit.prevent="createCondition()">
     <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }} </li>
      </ul>
      Condition Name:
      <input type="text" v-model="newName" />
      Needs Support: <input type="checkbox" v-model="newSupport" />
      Treatment Retrospect: <input type="text" v-model="newTreatmentRetrospect" />
      Treatment Plan: <input type="text" v-model="newTreatmentPlan" />
      Image Url: <input type="text" v-model="newImageUrl" />
      Video Url: <input type="text" v-model="newVideoUrl" />
      
      
      <input type="submit" value="Create" />
    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function(){
  return {
    newName: "",
    newSupport: "",
    newTreatmentRetrospect: "",
    newTreatmentPlan: "",
    newImageUrl: "",
    newVideoUrl: "",
    errors: [],
  };
},
created: function() {},
methods: {
  createCondition: function(){
    var params = {
      name: this.newName,
      support: this.newSupport,
      treatment_retrospect: this.newTreatmentRetrospect,
      treatment_plan: this.newTreatmentPlan,
      image_url: this.newImageUrl,
      video_url: this.newVideoUrl
      
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