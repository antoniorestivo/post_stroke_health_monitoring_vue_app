<template>
  <div class="users-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h1 class="title">
                  User Profile
                </h1>
                <h2>User email: {{ user.email }}</h2>

                <button class="btn btn-secondary">
                  <router-link :to="`/users/${user.id}/edit`">Update User</router-link>
                </button>
              </div>
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
