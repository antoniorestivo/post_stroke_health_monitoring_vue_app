<template>
  <div class="users-show">
    <h1>User Profile</h1>
    <h2>User email: {{ email }} </h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: {},
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      console.log("users show", response);
      this.email = response.data;
    });
  },
  methods: {},
};


</script>

