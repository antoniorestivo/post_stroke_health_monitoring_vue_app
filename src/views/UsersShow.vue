<template>
  <div class="users-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <div style="display: flex;">
                  <h1 class="title">
                    {{ user.first_name }} {{ user.last_name }} Profile
                  </h1>
                  <img :src="profile_image_url" style="width: 100px; height: 100px; margin-left: 1rem;" />
                </div>
                <h4>email: {{ user.email }}</h4>
                <router-link :to="`/users/${user.id}/edit`">Update User</router-link>
                |
                <router-link :to="`/users/${user.id}/charts`">User Charts</router-link>
                <canvas id="myMonthlyChart" width="20" height="20"></canvas>
                <hr style="border: 2px solid black;">
                <canvas id="myDailyChart" width="20" height="20"></canvas>
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

export default {
  data: function() {
    return {
      user: {},
      monthly_statistics: { labels: ['June', 'July', 'August'], logins: [12, 15, 11] },
      daily_statistics: { labels: ['08-23-2024', '08-24-2024', '08-25-2024',], logins: [1, 2, 0]},
      profile_image_url: ''
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log("users show", response);
      this.user = response.data;
      this.monthly_statistics = response.data.monthly_statistics;
      this.daily_statistics = response.data.daily_statistics;
      this.profile_image_url = response.data.profile_image_url;
      this.loadScripts().then(() => {
        this.createCharts();
      });
    });
  },
  methods: {
    loadScripts() {
      return new Promise((resolve) => {
        this.loadScript('https://cdn.jsdelivr.net/npm/chart.js', () => {
          this.loadScript('https://cdn.jsdelivr.net/npm/@sgratzl/chartjs-chart-boxplot@3.0.0', () => {
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
    createCharts() {
      this.createMonthlyChart();
      this.createDailyChart();
    },
    createMonthlyChart() {
      const ctx = document.getElementById('myMonthlyChart').getContext('2d');
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.monthly_statistics.labels,
          datasets: [{
            label: 'Month',
            data: this.monthly_statistics.logins,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              },
              title: {
                display: true,
                text: 'Logins'
              },
            },
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            }
          }
        }
      });
    },
    createDailyChart() {
      const ctx = document.getElementById('myDailyChart').getContext('2d');
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.daily_statistics.labels,
          datasets: [{
            label: 'Last 7 days logins',
            data: this.daily_statistics.logins,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              },
              title: {
                display: true,
                text: 'Logins'
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
      });
    }
  }
};
</script>
