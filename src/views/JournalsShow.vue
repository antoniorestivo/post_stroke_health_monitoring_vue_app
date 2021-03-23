<template>
  <div class="journals-show">
    <h2 class="date">Show journal from: {{ relativeDate(journal.created_at) }}</h2>
    <h2>Description: {{ journal.description }}</h2>
    <img :src="journal.image_url" alt="" />
    <a :href="journal.video_url" target="_blank">Video</a>

    <h2>Health Routines/diet:{{ journal.health_routines }}</h2>
    <h2>bp-avg: {{ journal.bp_avg }}</h2>
    <h2>bp-annotations:{{ journal.bp_annotations }}</h2>
    <img :src="journal.image_of_tongue" alt="" />
    <router-link to="/journals">Back to all journals</router-link>
    <router-link :to="`/journals/${journal.id}/edit`">Update Journal</router-link>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      journal: {},
    };
  },
  created: function() {
    axios.get("/api/journals/" + this.$route.params.id).then(response => {
      console.log("journals show", response);
      this.journal = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
