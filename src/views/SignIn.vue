<template>
  <div class="signin">
    <h1>Sign In</h1>
    <form v-on:submit.prevent="loginUser()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }} </li>
      </ul>
      Email <input type="text" v-model="newEmail" />
      password <input type="text" v-model="newPassword" />
      <input type="submit" value="Submit" />
    </form>

    
  </div>
</template>

<script>
import axios from "axios";

export default{
  data: function() {
    return {
      sameEmail: "",
      samePassword: "",
    };
  },
  created: function() {},
  methods: {
    loginUser: function() {
      var params = {
        email: this.sameEmail,
        password: this.samePassword,
      
      };
      axios
      .post("/api/sessions",params)
      .then(response => {
        console.log("user login", response);
        this.$router.push("/sessions")
      })
      .catch(error => {
          console.log("user create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>