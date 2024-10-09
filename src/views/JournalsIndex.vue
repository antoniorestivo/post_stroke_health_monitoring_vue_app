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
            <div v-if="!template" class="text-center mt-4 mt-lg-5">
              <router-link :to="`/journals/template/new`" class="btn btn-primary">Create Journal Template</router-link>
            </div>
            <div v-if="template" class="text-center mt-4 mt-lg-5">
              <router-link :to="`/journals/template/${template.id}/edit`" class="btn btn-primary">
                Edit Journal Template
              </router-link>
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
            <!-- Blog-Post START -->
            <div class="blog-post">
              <div class="blog-post-content">
                <div class="blog-post-info">
                  <div class="blog-post-date">
                    <i class="far fa-clock"></i>
                    {{ relativeDate(journal.created_at) }}
                  </div>
                </div>
                <h6 class="blog-post-title">Description:</h6>
                <p>{{ journal.description }}</p>
                <div class="blog-post-image">
                  <img class="img-fluid" :src="journal.image_url" alt="" />
                </div>
                <h7 class="blog-post-title">Video Url:</h7>
                <p>{{ journal.video_url }}</p>
                <h6 class="blog-post-title">Health Routines:</h6>
                <p>{{ journal.health_routines }}</p>
                <h6 class="blog-post-title">Metrics:</h6>
                <div v-for="metric in Object.keys(journal.metrics)" v-bind:key="metric">
                  <h7>{{ metric }}</h7>
                  <p>{{ `${journal.enriched_metrics[metric]}` }}</p>
                </div>
                <router-link :to="`/journals/${journal.id}`" class="btn btn-primary">More Info</router-link>
              </div>
            </div>
            <!-- Blog-Post END -->
          </div>
        </div>
        <!-- Pagination Controls -->
        <div class="pagination-controls">
          <button
            class="btn btn-secondary"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            class="btn btn-secondary"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next
          </button>
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
      journals: [],
      template: null,
      currentPage: 1,
      recordsPerPage: 9,
      totalRecords: 0
    };
  },
  created: function() {
    this.fetchJournals(this.currentPage);
  },
  watch: {
    journals(newVal) {
      console.log("Journals updated: ", newVal);
    }
  },
  computed: {
    totalPages: function() {
      return Math.ceil(this.totalRecords / this.recordsPerPage);
    },
  },
  methods: {
    fetchJournals: function(page) {
      const offset = (page - 1) * this.recordsPerPage;
      axios
        .get("/api/journals", {
          params: {
            limit: this.recordsPerPage,
            offset: offset,
          },
        })
        .then(response => {
          const data = JSON.parse(response.data);
          this.journals = data.journals;
          this.template = data.template;
          this.totalRecords = data.total_records;
        })
        .catch(error => {
          console.error("Error fetching journal records:", error);
        });
    },
    relativeDate: function(date) {
      return moment(date).format("MMM Do YY");
    },
    changePage: function(page) {
      if (page < 1 || page > this.totalPages) {
        return;
      }
      this.currentPage = page;
      this.fetchJournals(page);
    },
  },
};
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination-controls button {
  margin: 0 1rem;
}
</style>
