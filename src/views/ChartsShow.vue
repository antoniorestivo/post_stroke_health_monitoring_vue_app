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

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://unpkg.com/@sgratzl/chartjs-chart-boxplot@4.4.0/build/index.umd.min.js"></script>
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
      this.loadScripts().then(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        this.initializeChart(ctx, this.chart);
      });
    });
  },
  methods: {
    loadScripts() {
      return new Promise((resolve) => {
        this.loadScript('https://cdn.jsdelivr.net/npm/chart.js', () => {
          console.log("Chart.js loaded");
          this.loadScript('https://cdn.jsdelivr.net/npm/@sgratzl/chartjs-chart-boxplot@3.0.0', () => {
            console.log("Chart.js Boxplot plugin loaded");
            resolve();
          });
        });
      });
    },
    loadScript(url, callback) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = callback;
      script.onerror = () => {
        console.error(`Failed to load script: ${url}`);
      };
      document.head.appendChild(script);
    },
    destroyChart() {
      const url = `/api/users/${this.$route.params.id}/user_charts/${this.$route.params.chart_id}`;
      axios.delete(url).then(() => {
        console.log("chart successfully destroyed");
        this.$router.push(`/users/${this.$route.params.id}/charts`);
      });
    },
    initializeChart(ctx, chart) {
      switch (chart.chart_type) {
        case 'line':
          this.createLineChart(ctx, chart);
          break;
        case 'bar':
          this.createBarChart(ctx, chart);
          break;
        case 'scatter':
          this.createScatterChart(ctx, chart);
          break;
        case 'boxplot':
          this.createBoxPlotChart(ctx, chart);
          break;
        default:
          console.error(`Unknown chart type: ${chart.chart_type}`);
      }
    },
    createLineChart(ctx, chart) {
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: chart.data.x,
          datasets: [{
            label: chart.title,
            data: chart.data.y,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            pointBackgroundColor: function(context) {
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              return parseInt(value) > parseInt(chart.data.thresholds.y) ? 'rgb(255, 0, 0)' : 'rgb(75, 192, 192)'
            }
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: chart.y_label
              },
            },
            x: {
              beginAtZero: false,
              title: {
                display: true,
                text: chart.x_label
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';

                  if (parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)) {
                    label += ` Warning for ${chart.y_label}!`;
                  }

                  if (parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)) {
                    label += ` Warning for ${chart.x_label}!`;
                  }
                  return label;
                },
                labelColor: function(context) {
                  if (parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)) {
                    return {
                      borderColor: 'rgb(255, 0, 0)',
                      backgroundColor: 'rgb(255, 0, 0)',
                      borderWidth: 2,
                      borderDash: [2, 2],
                      borderRadius: 2,
                    };
                  }

                  if (parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)) {
                    return {
                      borderColor: 'rgb(255, 0, 0)',
                      backgroundColor: 'rgb(255, 0, 0)',
                      borderWidth: 2,
                      borderDash: [2, 2],
                      borderRadius: 2,
                    };
                  }
                }
              }
            }
          }
        }
      });
    },
    createBarChart(ctx, chart) {
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: chart.data.x,
          datasets: [{
            label: chart.title,
            data: chart.data.y,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: chart.y_label
              },
            },
            x: {
              title: {
                display: true,
                text: chart.x_label
              }
            }
          }
        }
      });
    },
    createScatterChart(ctx, chart) {
      new window.Chart(ctx, {
        type: 'scatter',
        data: {
          labels: chart.data.x,
          datasets: [{
            label: chart.title,
            data: chart.data.y,
            borderWidth: 1,
            pointBackgroundColor: function(context) {
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              return parseInt(value) > parseInt(chart.data.thresholds.y) ? 'rgb(255, 0, 0)' : 'rgb(75, 192, 192)'
            }
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: chart.y_label
              },
            },
            x: {
              title: {
                display: true,
                text: chart.x_label
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';

                  if (parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)) {
                    label += ` Warning for ${chart.y_label}!`;
                  }

                  if (parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)) {
                    label += ` Warning for ${chart.x_label}!`;
                  }
                  return label;
                },
                labelColor: function(context) {
                  if (parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)) {
                    return {
                      borderColor: 'rgb(255, 0, 0)',
                      backgroundColor: 'rgb(255, 0, 0)',
                      borderWidth: 2,
                      borderDash: [2, 2],
                      borderRadius: 2,
                    };
                  }

                  if (parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)) {
                    return {
                      borderColor: 'rgb(255, 0, 0)',
                      backgroundColor: 'rgb(255, 0, 0)',
                      borderWidth: 2,
                      borderDash: [2, 2],
                      borderRadius: 2,
                    };
                  }
                }
              }
            }
          }
        }
      });
    },
    createBoxPlotChart(ctx, chart) {
      console.log(chart.data);
      new window.Chart(ctx, {
        type: 'boxplot',
        data: {
          labels: chart.data.labels,
          datasets: chart.data.datasets
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Boxplot Comparison'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>
