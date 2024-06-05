<template>
  <div class="charts-index">
    <!--=================================
    services -->
    <section class="space-pt">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="text-center mt-4 mt-lg-5">
              <router-link :to="`charts/new`" class="btn btn-primary">Create New chart</router-link>
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
          <div v-for="chart in charts" v-bind:key="chart.id" class="col-lg-4 col-md-6 mb-0 mb-lg-3">
            <!-- Blog-Post-01 START -->
            <div class="blog-post">
              <div class="blog-post-content">
                <div class="blog-post-info">
                  <div class="blog-post-date">
                    <i class="far fa-clock"></i>
                    Created {{ relativeDate(chart.created_at) }}
                  </div>
                </div>
                <h5>
                  {{ chart.title }}
                </h5>
                <router-link :to="`charts/${chart.id}`" class="btn btn-primary">More Info</router-link>
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
import moment from "moment";

export default {
  data: function() {
    return {
      charts: []
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}/user_charts`).then(response => {
      let data = JSON.parse(response.data);
      console.log(data);
      this.charts = data.charts;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMM Do YY");
    },
  },
};
</script>
