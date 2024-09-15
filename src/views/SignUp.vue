
<template>
<div class="signup">
    <!--=================================
    Login -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-sm-10">
            <!-- Tab-nav START -->
            <ul class="nav nav-tabs nav-tabs-02 justify-content-center" id="myTab" role="tablist">
              
              <li class="nav-item">
                <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
              </li>
            </ul>
            <!-- Tab-nav END -->

            <!-- Tab-content START -->
            <div class="tab-content mt-0 register-tab-content" id="myTabContent">
              

              <!-- Register-tab START -->
              <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                <!-- Register-form START -->
                <div class="section-title">
                  <h2 class="title">Register to your account</h2>
                </div>
                <form v-on:submit.prevent="createUser()" class="form-row mt-4 mb-5 align-items-center">
                  
                  <div class="form-group col-md-6">
                    <label>Email Address:</label>
                    <input type="email" class="form-control" placeholder="" v-model="newEmail">
                  </div>
                  <div class="form-group col-md-6">
                    <label>First Name:</label>
                    <input type="text" class="form-control" placeholder="" v-model="firstName">
                  </div>
                  <div class="form-group col-md-6">
                    <label>Last Name:</label>
                    <input type="text" class="form-control" placeholder="" v-model="lastName">
                  </div>
                  <div class="form-group col-md-6">
                    <label>Profile Image:</label>
                    <input type="file" class="form-control" placeholder="" id="profileImage" name="profileImage">
                  </div>
                  <div class="form-group col-md-6">
                    <label>Password:</label>
                    <input type="Password" class="form-control" placeholder="" v-model="newPassword">
                  </div>
                  <div class="form-group col-md-6">
                    <label>Confirm Password:</label>
                    <input type="Password" class="form-control" placeholder="" v-model="newConfirmPassword">
                  </div>
                  <div class="col-sm-6">
                    <button type="submit" class="btn btn-primary btn-block">Sign up</button>
                  </div>
                  <div class="col-sm-6">
                    <ul class="list-unstyled d-flex mb-1 mt-sm-0 mt-3">
                      <li class="mr-1"><a href="login">Already Registered User? Click here to login</a></li>
                    </ul>
                  </div>
                </form>
                <!-- Register-form END -->

                
              </div>
              <!-- Register-tab END -->
            </div>
            <!-- Tab-content END -->
          </div>
        </div>
      </div>
    </section>
    <!--=================================
    Login -->
    

    
  </div>
</template>

<script>
import axios from "axios";

export default{
  data: function() {
    return {
      newEmail: "",
      newPassword: "",
      newConfirmPassword: "",
      firstName: "",
      lastName: ""
    };
  },
  created: function() {},
  methods: {
    createUser: function() {
      const profileImage = document.getElementById('profileImage').files[0];
      var params = {
        email: this.newEmail,
        password: this.newPassword,
        confirm_password: this.newConfirmPassword,
        profile_image: profileImage,
        first_name: this.firstName,
        last_name: this.lastName
      };
      console.log(params);
      axios
      .post("/api/users",params)
      .then(response => {
        console.log("user create", response);
        this.$router.push("/login")
      })
      .catch(error => {
          console.log("user create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
