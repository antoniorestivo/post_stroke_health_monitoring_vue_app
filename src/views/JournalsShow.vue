<template>
  <div class="journals-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h2 class="title">
                  This journal is recorded around
                  {{ relativeDate(journal.created_at) }}
                </h2>
                <h4>Description</h4>
                <p class="lead">
                  {{ journal.description }}
                </p>
                <h4>Health Routines/diet</h4>
                <p class="lead">
                  {{ journal.health_routines }}
                </p>
                <h4>Blood pressure average</h4>
                <p class="lead">
                  {{ journal.bp_avg }}
                </p>
                <h4>Blood pressure annotations</h4>
                <p class="lead">
                  {{ journal.bp_annotations }}
                </p>

                <div class="blog-post-image">
                  <img class="img-fluid" :src="journal.image_url" alt="" />
                </div>
                <h2>Video Url:{{ journal.video_url }}</h2>
                <div class="blog-post-image">
                  <img class="img-fluid" :src="journal.image_of_tongue" alt="" />
                </div>
                <button class="btn btn-secondary">
                  <router-link to="/journals">Back to all journals</router-link>
                </button>

                <button class="btn btn-secondary">
                  <router-link :to="`/journals/${journal.id}/edit`">Update journal</router-link>
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
import moment from "moment";

export default {
  data: function() {
    return {
      journal: {},
    };
  },
  created: function() {
    axios.get("/api/journals/" + this.$route.params.id).then(response => {
      console.log("journals show", response);
      this.journal = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
