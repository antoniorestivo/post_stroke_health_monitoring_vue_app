<template>
  <div class="conditions-show">
    <section
      class="inner-banner bg-overlay-black-70"
      style="background-image: url('images/bg/10.jpg'); background-attachment: fixed;"
    >
      <div class="container">
        <div class="row align-items-center intro-title">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="text-center text-md-left">
              <h1 class="text-white mb-0">{{ condition.name }}</h1>
            </div>
          </div>
          <div class="col-md-6 ">
            <div class="d-flex justify-content-center justify-content-md-end">
              <ol class="breadcrumb mb-0 p-0">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active"><span>About us</span></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h2 class="title">Embrace your health because that is what empowers you.</h2>
                <p class="lead">
                  The old expression is absolutely true – whether you think you can or you can’t, you’re right!
                </p>
                <p class="mb-0">
                  The majority of people carry with them, an entire series of self-limiting beliefs that will absolutely
                  stop, and hold them back from, success. Things like “I’m not good enough”,
                </p>
              </div>

              <div class="mt-4 pr-lg-5">
                <!-- Skill-bar START -->
                <div class="overflow-hidden">
                  <!-- Skill-01 START -->
                  <div class="skill">
                    <div class="skill-bar" data-percent="89" data-delay="0" data-type="%">
                      <div class="skill-title">Design</div>
                    </div>
                  </div>
                  <!-- Skill-01 END -->

                  <!-- Skill-02 START -->
                  <div class="skill">
                    <div class="skill-bar" data-percent="73" data-delay="0" data-type="%">
                      <div class="skill-title">Development</div>
                    </div>
                  </div>
                  <!-- Skill-02 END -->

                  <!-- Skill-03 START -->
                  <div class="skill">
                    <div class="skill-bar" data-percent="85" data-delay="0" data-type="%">
                      <div class="skill-title">Support</div>
                    </div>
                  </div>
                  <!-- Skill-03 END -->
                </div>
                <!-- Skill-bar END -->
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div class="col-sm-6">
                <img class="img-fluid b-radius mb-4 mt-sm-4" src="images/about/03.jpg" alt="" />
                <img class="img-fluid b-radius mb-4 mb-sm-0" src="images/about/04.jpg" alt="" />
              </div>
              <div class="col-sm-6">
                <img class="img-fluid b-radius mb-4" src="images/about/05.jpg" alt="" />
                <!-- video -->
                <div class="position-relative z-index-9 bg-overlay-black-30">
                  <img class="img-fluid b-radius" src="images/about/06.jpg" alt="image" />
                  <a class="video-btn btn-animation popup-youtube" href="https://youtu.be/8DIxdJNJq3o">
                    <i class="fas fa-play"></i>
                  </a>
                </div>
                <!-- video -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <h2 class="date">Show condition from: {{ relativeDate(condition.created_at) }}</h2>
    <h2>Condition name: {{ condition.name }}</h2>
    <h2>Condition support:{{ condition.support }}</h2>
    <h2>Treatment Retrospect: {{ condition.treatment_retrospect }}</h2>
    <h2>Treatment Plan:{{ condition.treatment_plan }}</h2>
    <img :src="condition.image_url" alt="" />
    <h2>Video Url:{{ condition.video_url }}</h2>

    <router-link to="/conditions">Back to all conditions</router-link>
    <router-link :to="`/conditions/${condition.id}/edit`">Update condition</router-link>
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
