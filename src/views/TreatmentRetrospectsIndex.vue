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
                  Treatment Feedback
                </h6>
                <p>
                  {{ treatment_retrospect.feedback }}
                </p>
                <h6 class="blog-post-title">
                  Rating (1-10)
                </h6>
                <p>
                  {{ treatment_retrospect.rating }}
                </p>
                <router-link :to="`treatment_retrospects/${treatment_retrospect.id}`" class="btn btn-primary">More Info</router-link>
              </div>
            </div>
            <!-- Blog-Post-01 END -->
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
      currentPage: 1,
      recordsPerPage: 15,
      totalRecords: 0
    };
  },
  created: function() {
    this.fetchTreatmentRetrospects(this.currentPage);
  },
  methods: {
    fetchTreatmentRetrospects: function(page) {
      const offset = (page - 1) * this.recordsPerPage;
      const url = `/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`
      axios
        .get(url, {
          params: {
            limit: this.recordsPerPage,
            offset: offset
          }
        })
        .then(response => {
          let data = JSON.parse(response.data);
          this.treatment_retrospects = data.treatment_retrospects;
          this.totalRecords = data.total_records;
        })
        .catch(error => {
          console.error("Error fetching treatment retrospects records:", error);
        });
    },
    relativeDate: function(date) {
      return moment(date).format("MMM Do YYYY");
    },
    changePage: function(page) {
      if (page < 1 || page > this.totalPages) {
        return;
      }
      this.currentPage = page;
      this.fetchTreatmentRetrospects(page);
    }
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
