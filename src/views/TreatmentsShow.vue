<template>
  <div class="treatments-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h2 class="title">
                  Description: {{ treatment.description }}
                </h2>
                <h4>
                  Treatment created or began {{ relativeDate(treatment.created_at) }}
                </h4>
                <router-link to="../treatments">Back to all treatments</router-link>

                |

                <router-link :to="`${treatment.id}/edit`">Update treatment</router-link>

                |

                <router-link :to="`${treatment.id}/treatment_retrospects`">Evaluate Treatment</router-link>
                <br>
                <br>
                <button v-on:click="destroyTreatment()" type="submit" class="btn btn-primary">Delete</button>
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
      treatment: {},
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id + "/" + "treatments/" + this.$route.params.treatment_id)
        .then(response => {
          console.log("treatments show", response);
          this.treatment = response.data;
        });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    destroyTreatment: function() {
      axios.delete(`/api/conditions/${this.$route.params.id}/treatments/${this.treatment.id}`).then(() => {
        console.log("treatment successfully destroyed");
        this.$router.push(`/conditions/${this.$route.params.id}/treatments`);
      });
    },
  },
};
</script>
