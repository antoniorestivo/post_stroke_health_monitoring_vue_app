<template>
  <div class="treatments-index">
    <!--=================================
    services -->
    <section class="space-pt">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="text-center mt-4 mt-lg-5">
              <router-link :to="`/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects/new`" class="btn btn-primary">Create New Treatment Retrospect</router-link>
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
          <div v-for="treatment_retrospect in treatment_retrospects" v-bind:key="treatment_retrospect.id" class="col-lg-4 col-md-6 mb-0 mb-lg-3">
            <!-- Blog-Post-01 START -->
            <div class="blog-post">
              <div class="blog-post-content">
                <div class="blog-post-info">
                  <div class="blog-post-date">
                    <i class="far fa-clock"></i>
                    {{ relativeDate(treatment_retrospect.created_at) }}
                  </div>
                </div>
                <h6 class="blog-post-title">
                  Treatment Feedback:
                </h6>
                <p>
                  {{ treatment_retrospect.feedback }}
                </p>
                <router-link :to="`treatment_retrospects/${treatment_retrospect.id}`" class="btn btn-primary">More Info</router-link>
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
      treatment_retrospects: [],
    };
  },
  created: function() {
    const url = `/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`
    axios.get(url).then(response => {
      let data = JSON.parse(response.data);
      this.treatment_retrospects = data.treatment_retrospects;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMM Do YY");
    },
  },
};
</script>
