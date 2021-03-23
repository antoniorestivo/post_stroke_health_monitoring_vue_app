<template>
  <div class="conditions-index">
    <h1>Conditions Index</h1>
    <div v-for="condition in conditions" v-bind:key="condition.id">
      Created at:<h2 class="date">{{ relativeDate(condition.created_at)}}</h2>
      Updated at:<h2 class="date">{{ relativeDate(condition.updated_at)}}</h2>
      Name:<h2>{{ condition.name}}</h2>
      Needs Support:<h2>{{ condition.support}}</h2>
      Treatment Retrospect: <h2>{{ condition.treatment_retrospect}}</h2>
      Treatment Plan<h2>{{ condition.treatment_plan}}</h2>
      <img :src="condition.image_url" alt="">
      Video Url:<h2>{{ condition.video_url}}</h2>
      <router-link :to="`/conditions/${condition.id}`"> Show Condition</router-link>
      
      

     </div>
     <router-link :to="`/conditions/new`">Create New Condition</router-link>
     
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      conditions: [],
    };
  },
  created: function() {
    axios.get("/api/conditions").then(response => {
      console.log("conditions index", response);
      this.conditions = response.data;
    });
  },
    methods: {
       relativeDate: function(date) {
       return moment(date).format("MMM Do YY");
  
  },
 },
};
</script>