<template>
  <div class="journals-index">
    <!--=================================
    services -->
    <section class="space-pt">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="text-center mt-4 mt-lg-5">
              <router-link :to="`/journals/new`" class="btn btn-primary">Create New Journal</router-link>
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
          <div v-for="journal in journals" v-bind:key="journal.id" class="col-lg-4 col-md-6 mb-0 mb-lg-3">
            <!-- Blog-Post-01 START -->
            <div class="blog-post">
              <div class="blog-post-image">
                <img class="img-fluid" :src="journal.image_url" alt="" />
              </div>
              <div class="blog-post-content">
                <div class="blog-post-info">
                  <div class="blog-post-date">
                    <i class="far fa-clock"></i>
                    {{ relativeDate(journal.created_at) }}
                  </div>
                </div>
                <h6 class="blog-post-title">
                  Description:
                </h6>
                <p>
                  {{ journal.description }}
                </p>
                <h6>Blood Pressure:</h6>
                <p class="">{{ journal.bp_avg }}</p>
                <router-link :to="`/journals/${journal.id}`" class="btn btn-primary">More Info</router-link>
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
      journals: [],
    };
  },
  created: function() {
    axios.get("/api/journals").then(response => {
      console.log("journals index", response);
      this.journals = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMM Do YY");
    },
  },
};
</script>
