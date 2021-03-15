<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form v-on:submit.prevent="createUser()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }} </li>
      </ul>
      Email <input type="text" v-model="newEmail" />
      password <input type="text" v-model="newPassword" />
      confirm password <input type="text" v-model="newConfirmPassword" />
      <input type="submit" value="Submit" />
    </form>

    
  </div>
</template>

<script>
import axios from "axios";

export default{
  data: function() {
    return {
      newEmail: "",
      newPassword: "",
      newConfirmPassword: ""
    };
  },
  created: function() {},
  methods: {
    createUser: function() {
      var params = {
        email: this.newEmail,
        password: this.newPassword,
        confirm_password: this.newConfirmPassword
      };
      axios
      .post("/api/users",params)
      .then(response => {
        console.log("user create", response);
        this.$router.push("/users")
      })
      .catch(error => {
          console.log("user create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
