<template>
  <div class="treatment-retrospects-new">
    <!--=================================
    Appointment -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Rate and give feedback on your treatment</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="createTreatmentRetrospect()">
                <div class="form-group col-md-12">
                  <label>Feedback</label>
                  <img
                    src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
                    alt="Info"
                    class="info-icon"
                    @mouseover="showTooltip(1)"
                    @mouseleave="hideTooltip(1)"
                  />
                  <span v-if="tooltipOneVisible" class="tooltip-text">
                    Describe how the treatment is working (or not working) for you.
                  </span>
                  <textarea
                    v-model="feedback"
                    class="form-control"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <br />
                  <label>Treatment Rating</label>
                  <img
                    src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
                    alt="Info"
                    class="info-icon"
                    @mouseover="showTooltip(2)"
                    @mouseleave="hideTooltip(2)"
                  />
                  <span v-if="tooltipTwoVisible" class="tooltip-text">
                    Rate your treatment on a scale of 1 (ineffective) to 10 (highly effective).
                  </span>
                  <div>
                    <div v-for="ratingValue in 10" :key="ratingValue" class="form-check form-check-inline">
                      <label :for="'rating-' + ratingValue" class="form-check-label" style="margin-right: 0.5rem;">{{ ratingValue }}</label>
                      <input
                        type="radio"
                        :id="'rating-' + ratingValue"
                        v-model="rating"
                        :value="ratingValue"
                        class="form-check-input"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--=================================
    Appointment -->
  </div>
</template>
<style scoped>

.info-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-left: 0.25rem;
  vertical-align: middle;
}

.tooltip-text {
  display: inline-block;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  z-index: 1000;
  margin-left: 10px;
  white-space: normal;
  max-width: 250px;
  word-wrap: break-word;
}

</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      feedback: "",
      rating: null,
      errors: [],
      tooltipOneVisible: false,
      tooltipTwoVisible: false
    };
  },
  methods: {
    createTreatmentRetrospect: function() {
      var params = {
        feedback: this.feedback,
        rating: this.rating
      };
      axios
        .post(`/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`, params)
        .then(response => {
          console.log("treatment retrospects create", response);
          this.$router.push(`/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`);
        })
        .catch(error => {
          console.log("treatment retrospects create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    showTooltip: function(n) {
      if (n === 1) { this.tooltipOneVisible = true }
      else if(n === 2) { this.tooltipTwoVisible = true }
    },
    hideTooltip: function(n) {
      if (n === 1) { this.tooltipOneVisible = false }
      else if(n === 2) { this.tooltipTwoVisible = false }
    },
  },
};
</script>
