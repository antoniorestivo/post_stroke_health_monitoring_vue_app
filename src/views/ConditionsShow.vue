<template>
 <div class="conditions-show">
  <h2>Show condition at date: {{ condition.created_at }}</h2>
  <h2>Condition name: {{condition.name}}</h2>
  <h2>Condition support:{{condition.support}}</h2>
  <h2>Treatment Retrospect: {{condition.treatment_retrospect}}</h2>
  <h2>Treatment Plan:{{condition.treatment_plan}}</h2>
  <h2>Image Url: {{ condition.image_url }}</h2>
  <h2>Video Url:{{ condition.video_url }}</h2>
  
<router-link to="/conditions"> Back to all conditions </router-link>
<router-link :to="`/conditions/${condition.id}/edit`"> Update condition</router-link>
 </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      condition: {},
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id).then(response => {
      console.log("conditions show", response);
      this.condition = response.data;
    });
  },
  methods: {},
};
</script>