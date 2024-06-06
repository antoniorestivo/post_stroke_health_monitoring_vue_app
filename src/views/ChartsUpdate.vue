<template>
  <div class="charts-update">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update Retrospect</h3>
              </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateChart(chart)">
                <div class="form-group col-md-12">
                  <h5>Choose First Variable</h5>
                  <label style="margin-right: 4px;">Time (track metric change over time)</label>
                  <input type="radio" id="metric.id" value="Time" v-model="chart.x_label" name="metricOne" />
                  <div v-for="metric in metrics" v-bind:key="metric.id" for="metric.metric_name">
                    <label style="margin-right: 4px;">{{ metric.metric_name }}</label>
                    <input type="radio" id="metric.id" :value="metric.metric_name" v-model="chart.x_label" name="metricOne" />
                    <br>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <h5>Choose Second Variable</h5>
                  <div v-for="metric in metrics" v-bind:key="metric.id" for="metric.metric_name">
                    <label style="margin-right: 4px;">{{ metric.metric_name }}</label>
                    <input type="radio" id="metric.id" :value="metric.metric_name" v-model="chart.y_label" name="metricTwo" />
                    <br>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label>Title</label>
                  <input v-model="chart.title" type="text" class="form-control" placeholder="" name="title" />
                </div>
                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="form-group col-sm-12">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      chart: {},
      errors: [],
      metrics: []
    };
  },
  created: function() {
    const url = `/api/users/${this.$route.params.id}/user_charts/${this.$route.params.chart_id}/edit`;
    axios.get(url).then(response => {
      this.chart = response.data.chart;
      this.metrics = response.data.health_metrics;
    });
  },
  methods: {
    updateChart: function(chart) {
      const url = `/api/users/${this.$route.params.id}/user_charts/${this.chart.id}`;
      var params = {
        x_label: chart.x_label,
        y_label: chart.y_label,
        title: chart.title
      };
      axios
          .patch(url, params)
          .then(response => {
            console.log(response);
            this.$router.push(`/users/${this.$route.params.id}/charts`);
          })
          .catch(error => {
            console.log("charts update error", error.response);
            this.errors = error.response.data.errors;
          });
    },
  },
};
</script>
