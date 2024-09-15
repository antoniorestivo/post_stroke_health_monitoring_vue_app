<template>
  <div class="users-edit">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update User</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateUser(user)">
                <div class="form-group col-md-12">
                  <label>Email</label>
                  <input v-model="user.email" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>password</label>
                  <input v-model="user.newPassword" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-12">
                  <label>confirm password</label>
                  <input v-model="user.confirmPassword" type="text" class="form-control" placeholder="" />
                </div>
                <div class="form-group col-md-6">
                  <label>First Name:</label>
                  <input type="text" class="form-control" placeholder="" v-model="user.firstName">
                </div>
                <div class="form-group col-md-6">
                  <label>Last Name:</label>
                  <input type="text" class="form-control" placeholder="" v-model="user.lastName">
                </div>
                <div class="form-group col-md-6">
                  <label>Profile Image:</label>
                  <input type="file" class="form-control" id="profileImage" name="profileImage">
                </div>
                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
              <button v-on:click="destroyUser()" type="submit" class="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},

      errors: [],
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
      const profileImage = document.getElementById('profileImage').files[0];
      const formData = new FormData();
      formData.append('profile_image', profileImage)
      formData.append('email', user.email)
      console.log(formData);
      axios
        .patch(`/api/users/${this.user.id}`, formData)
        .then(response => {
          console.log("user successfully updated", response.data);
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch(error => {
          console.log("user create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      axios.delete(`/api/users/${this.user.id}`).then(() => {
        localStorage.removeItem("jwt");
        console.log("user successfully destroyed");
        this.$router.push(`/signup`);
      });
    },
  },
};
</script>
