<template>
  <div class="login">
     <!--=================================
    Login -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-sm-10">
            <!-- Tab-nav START -->
            <ul class="nav nav-tabs nav-tabs-02 justify-content-center" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="false">Login</a>
              </li>
              
            </ul>
            <!-- Tab-nav END -->

            <!-- Tab-content START -->
            <div class="tab-content mt-0 login-tab-content" id="myTabContent">
              <!-- login-tab START -->
              <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                <!-- login-form START -->
                <div class="section-title">
                  <h2 class="title">Login to your account</h2>
                </div>
                <form v-on:submit.prevent="login()" class="form-row mt-4 mb-5 align-items-center">
                  <div class="form-group col-sm-12">
                    <label>Email:</label>
                    <input type="text" class="form-control" placeholder="" v-model="email">
                  </div>
                  <div class="form-group col-sm-12">
                    <label>Password:</label>
                    <input type="Password" class="form-control" placeholder="" v-model="password">
                  </div>
                  <div class="col-sm-6">
                    <button type="submit"  class="btn btn-primary btn-block">Sign in</button>

                  </div>
                  <div class="col-sm-6">
                    <ul class="list-unstyled d-flex mb-1 mt-sm-0 mt-3 justify-content-sm-end">
                      <li class="mr-1"><a class="text-dark" href="signup">Don't have an account? Click here</a></li>
                    </ul>
                  </div>
                </form>
                <!-- login-form END -->
              </div>
              <!-- login-tab END -->

              <!-- Register-tab START -->
              
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

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    login: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/users/me");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>