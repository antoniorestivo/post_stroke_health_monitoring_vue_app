<template>
  <div class="signup">
    <section class="space-ptb login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-sm-10">

            <!-- =========================
                 SIGNUP SUCCESS MESSAGE
                 ========================= -->
            <div
                v-if="signupComplete"
                class="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
            >
              <h2 class="title text-blue-700 mb-3">
                Check your email
              </h2>

              <p class="text-gray-700 mb-4">
                We’ve sent a verification link to
                <strong>{{ newEmail }}</strong>.
                <br />
                Please click the link to activate your account before logging in.
              </p>

              <router-link
                  to="/login"
                  class="text-blue-600 font-medium hover:underline"
              >
                Back to login
              </router-link>
            </div>

            <!-- =========================
                 SIGNUP FORM
                 ========================= -->
            <div v-else>
              <ul
                  class="nav nav-tabs nav-tabs-02 justify-content-center"
                  role="tablist"
              >
                <li class="nav-item">
                  <span class="nav-link active">Register</span>
                </li>
              </ul>

              <div class="section-title mt-4">
                <h2 class="title">Register your account</h2>
              </div>

              <form
                  class="form-row mt-4 mb-5 align-items-center"
                  @submit.prevent="createUser"
              >
                <div class="form-group col-md-6">
                  <label>Email Address</label>
                  <input
                      type="email"
                      class="form-control"
                      v-model="newEmail"
                      required
                  />
                </div>

                <div class="form-group col-md-6">
                  <label>First Name</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="firstName"
                      required
                  />
                </div>

                <div class="form-group col-md-6">
                  <label>Last Name</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="lastName"
                      required
                  />
                </div>

                <div class="form-group col-md-6">
                  <label>Profile Image</label>
                  <input
                      type="file"
                      class="form-control"
                      ref="profileImage"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label>Password</label>
                  <input
                      type="password"
                      class="form-control"
                      v-model="newPassword"
                      required
                  />
                </div>

                <div class="form-group col-md-6">
                  <label>Confirm Password</label>
                  <input
                      type="password"
                      class="form-control"
                      v-model="newConfirmPassword"
                      required
                  />
                </div>

                <div class="col-sm-6">
                  <button
                      type="submit"
                      class="btn btn-primary btn-block"
                      :disabled="loading"
                  >
                    {{ loading ? "Creating account..." : "Sign up" }}
                  </button>
                </div>

                <div class="col-sm-6 mt-3 mt-sm-0">
                  <router-link to="/login">
                    Already registered? Log in
                  </router-link>
                </div>

                <div
                    v-if="errors.length"
                    class="col-12 text-danger mt-3"
                >
                  <p v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "@/lib/axios";

export default {
  data() {
    return {
      newEmail: "",
      newPassword: "",
      newConfirmPassword: "",
      firstName: "",
      lastName: "",
      signupComplete: false,
      loading: false,
      errors: []
    };
  },

  methods: {
    createUser() {
      this.errors = [];
      this.loading = true;

      const profileImage = this.$refs.profileImage?.files[0];

      const params = {
        user: {
          email: this.newEmail,
          password: this.newPassword,
          password_confirmation: this.newConfirmPassword,
          first_name: this.firstName,
          last_name: this.lastName,
          profile_image: profileImage
        }
      };

      axios
          .post("/api/users", params)
          .then(() => {
            this.signupComplete = true;
          })
          .catch(error => {
            this.errors =
                error.response?.data?.errors ||
                ["Unable to create account. Please try again."];
          })
          .finally(() => {
            this.loading = false;
          });
    }
  }
};
</script>
