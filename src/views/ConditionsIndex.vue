<template>
  <div class="conditions-index">
    <!--=================================
    services -->
    <section class="space-pt">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="text-center mt-4 mt-lg-5">
              <router-link :to="`/conditions/new`" class="btn btn-primary">Create New Condition</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--=================================
    services -->
    <!--=================================
    Blog -->
    <section class="space-ptb">
      <div class="container">
        <div class="row">
          <div v-for="condition in conditions" v-bind:key="condition.id" class="col-lg-4 col-md-6 mb-0 mb-lg-3">
            <!-- Blog-Post-01 START -->
            <div class="blog-post">
              <div class="blog-post-image">
                <img class="img-fluid" :src="condition.image_url" alt="" />
              </div>
              <div class="blog-post-content">
                <div class="blog-post-info">
                  <div class="blog-post-date">
                    <i class="far fa-clock"></i>
                    {{ relativeDate(condition.created_at) }}
                  </div>
                </div>
                <h6 class="blog-post-title">
                  Condition Name:
                </h6>
                <p>
                  {{ condition.name }}
                </p>
                <h6>Needs Support:</h6>
                <p class="">{{ condition.support }}</p>
                <router-link :to="`/conditions/${condition.id}`" class="btn btn-primary">More Info</router-link>
              </div>
            </div>
            <!-- Blog-Post-01 END -->
          </div>
        </div>
      </div>
    </section>
    <!--=================================
    Blog -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      conditions: [],
    };
  },
  created: function() {
    axios.get("/api/conditions").then(response => {
      console.log("conditions index", response);
      this.conditions = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMM Do YY");
    },
  },
};
</script>
