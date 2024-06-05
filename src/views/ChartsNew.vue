<template>
  <div class="charts-new">
    <!--=================================
    Appointment -->
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Create your new chart </h3>
              </div>
              <div v-if="errors" class="loading">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
              </div>
              <div v-if="loading" class="loading">Loading...</div>
              <div v-if="post" class="content">
                <form class="form-row align-items-center" v-on:submit.prevent="createChart()">
                  <div class="form-group col-md-12">
                    <h5>Choose First Variable</h5>
                    <label style="margin-right: 4px;">Time (track metric change over time)</label>
                    <input type="radio" id="metric.id" value="Time" v-model="metricOne" name="metricOne" />
                    <div v-for="metric in metrics" v-bind:key="metric.id" for="metric.metric_name">
                      <label style="margin-right: 4px;">{{ metric.metric_name }}</label>
                      <input type="radio" id="metric.id" :value="metric.metric_name" v-model="metricOne" name="metricOne" />
                      <br>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <h5>Choose Second Variable</h5>
                    <div v-for="metric in metrics" v-bind:key="metric.id" for="metric.metric_name">
                      <label style="margin-right: 4px;">{{ metric.metric_name }}</label>
                      <input type="radio" id="metric.id" :value="metric.metric_name" v-model="metricTwo" name="metricTwo" />
                      <br>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label>Title</label>
                    <input v-model="title" type="text" class="form-control" placeholder="" name="title" />
                  </div>
                  <div class="form-group col-sm-12">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--=================================
    Appointment -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      loading: true,
      metrics: [],
      errors: null,
      post: false
    };
  },
  created: function() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    createChart: function() {
      var params = {
        x_label: this.metricOne,
        y_label: this.metricTwo,
        title: this.title
      };
      console.log(params);
      axios
        .post(`/api/users/${this.$route.params.id}/user_charts`, params)
        .then(response => {
          console.log(response);
          this.$router.push(`/users/${this.$route.params.id}/charts`);
        })
        .catch(error => {
          console.log("chart create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      axios
        .get(`/api/users/${this.$route.params.id}/user_charts/new`)
        .then(response => {
          console.log(response)
          let data = response.data;
          this.metrics = data;
          this.loading = false;
          this.post = true
          this.buildFormElements(data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<!--t.bigint "user_id"-->
<!--t.string "title"-->
<!--t.string "chart_type"-->
<!--t.string "x_label"-->
<!--t.string "y_label"-->
<!--t.jsonb "options"-->
