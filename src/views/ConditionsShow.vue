<template>
  <div class="conditions-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h2 class="title">
                  {{ condition.name }} is the name of the condition and is recorded
                  {{ relativeDate(condition.created_at) }}
                </h2>
                <h3 v-if="condition.support === true">Condition Needs Outside Support</h3>
                <h3 v-else>Condition does not need outside support at the moment</h3>

                <div class="blog-post-image">
                  <img class="img-fluid" :src="condition.image_url" alt="" />
                </div>

                <h3>Video Url:{{ condition.video_url }}</h3>

                <router-link to="/conditions">Back to all conditions</router-link>

                |

                <router-link :to="`/conditions/${condition.id}/edit`">Update condition</router-link>

                |

                <router-link :to="`/conditions/${condition.id}/treatments`">Treatments for condition</router-link>
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
      condition: {},
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id).then(response => {
      console.log("conditions show", response);
      this.condition = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
