<template>
  <div class="treatments-retrospects-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h3 class="title">
                  Feedback: {{ treatment_retrospect.feedback }}
                </h3>
                <h4>
                  Retrospect created {{ relativeDate(treatment_retrospect.created_at) }}
                </h4>
                <h4>
                  Rating (scale 1 - 10): {{ treatment_retrospect.rating }}
                </h4>
                <router-link to="../treatment_retrospects">Back to all retrospects</router-link>

                |

                <router-link :to="`${treatment_retrospect.id}/edit`">Update retrospect</router-link>
                <br>
                <br>
                <button v-on:click="destroyTreatmentRetrospect()" type="submit" class="btn btn-primary">Delete</button>
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
      treatment_retrospect: {},
    };
  },
  created: function() {
    const url = `/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects/${this.$route.params.retrospect_id}`
    axios.get(url)
        .then(response => {
          this.treatment_retrospect = response.data;
        });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    destroyTreatmentRetrospect: function() {
      const url = `/api/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects/${this.$route.params.retrospect_id}`
      axios.delete(url).then(() => {
        console.log("treatment successfully destroyed");
        this.$router.push(`/conditions/${this.$route.params.id}/treatments/${this.$route.params.treatment_id}/treatment_retrospects`);
      });
    },
  },
};
</script>
