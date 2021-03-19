<template>
  <div class="journals-index">
    <h1>Journal Index</h1>
    <div v-for="journal in journals" v-bind:key="journal.id">
      <h2>{{ journal.created_at}}</h2>
      <h2>{{ journal.updated_at}}</h2>
      <h2>{{ journal.description}}</h2>
      <h2>{{ journal.image_url}}</h2>
      <h2>{{ journal.video_url}}</h2>
      <h2>{{ journal.health_routines}}</h2>
      <h2>{{ journal.bp_avg}}</h2>
      <h2>{{ journal.bp_annotations}}</h2>
      <h2>{{ journal.image_of_tongue}}</h2>
      <router-link :to="`/journals/${journal.id}`"> Show Journal</router-link>
      
      

     </div>
     <router-link :to="`/journals/new`">Create New Journal</router-link>
     
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      journals: [],
    };
  },
  created: function() {
    axios.get("/api/journals").then(response => {
      console.log("journals index", response);
      this.journals = response.data;
    });
  },
  methods: {},
};
</script>