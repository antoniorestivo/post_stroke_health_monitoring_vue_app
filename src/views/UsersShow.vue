<template>
  <div class="users-show">
    <h1>User Profile</h1>
    <h2>User email: {{ user.email }} </h2>
    <router-link :to="`/users/${user.id}/edit`">Update User</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {},
};


</script>

