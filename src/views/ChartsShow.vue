<template>
  <div class="charts-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h2>{{ chart.title }}</h2>
                <canvas id="myChart"></canvas>
              </div>
              <router-link :to="`/users/${this.$route.params.id}/charts`">Back to charts</router-link>

              |

              <router-link :to="`/users/${this.$route.params.id}/charts/${chart.id}/edit`">Update chart</router-link>
              <br>
              <br>
              <button v-on:click="destroyChart()" type="submit" class="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/chart.js">
</script>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      chart: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}/user_charts/${this.$route.params.chart_id}`).then(response => {
      console.log(response);
      this.chart = response.data;
      this.loadScript('https://cdn.jsdelivr.net/npm/chart.js', () => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: this.chart.chart_type,
          data: {
            labels: this.chart.data.x,
            datasets: [{
              label: this.chart.title,
              data: this.chart.data.y,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: this.chart.y_label
                }
              },
              x: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: this.chart.x_label
                }
              }
            }
          }
        });
      });
    });
  },
  methods: {
    loadScript(url, callback) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    },
    destroyChart() {
      const url = `/api/users/${this.$route.params.id}/user_charts/${this.$route.params.chart_id}`;
      axios.delete(url).then(() => {
        console.log("chart successfully destroyed");
        this.$router.push(`/users/${this.$route.params.id}/charts`);
      });
    }
  }
};
</script>
