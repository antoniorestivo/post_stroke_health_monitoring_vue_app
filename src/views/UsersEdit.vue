<template>
  <div class="users-edit">
    <h1>Update User</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }} </li>
      </ul>
      Email <input type="text" v-model="user.email" />
      old password <input type="password" v-model="user.oldPassword" />
      password <input type="password" v-model="user.newPassword" />
      confirm password <input type="password" v-model="user.confirmPassword" />
      <input type="submit" value="Update" />

    </form>
    <button v-on:click="destroyUser()">Delete</button>

    
  </div>
</template>

<script>
import axios from "axios";

export default{
  data: function() {
    return {
      user: {},
      
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      console.log("users update", response);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        email: user.email,
        password: user.newPassword,
        confirm_password: user.confirmPassword,
        old_password: user.oldPassword
      };
      axios
      .patch(`/api/users/${this.user.id}`,params)
      .then(response => {
        console.log("user successfully updated", response.data);
        this.$router.push(`/users/${this.user.id}`)
      })
      .catch(error => {
          console.log("user create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      axios.delete(`/api/users/${this.user.id}`)
      .then(() => {
        localStorage.removeItem("jwt");
        console.log("user successfully destroyed");
        this.$router.push(`/signup`)
      })
    }
  },
};
</script>
