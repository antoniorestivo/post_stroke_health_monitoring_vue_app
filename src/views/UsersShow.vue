<template>
  <div class="users-show">
    <section class="space-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="section-contant">
              <div class="section-title mb-4">
                <h1 class="title">
                  User Profile
                </h1>
                <h2>User email: {{ user.email }}</h2>
                <canvas id="myChart" width="20" height="20"></canvas>
                <router-link :to="`/users/${user.id}/edit`">Update User</router-link>
                |
                <router-link :to="`/users/${user.id}/charts`">User Charts</router-link>
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
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log("users show", response);
      this.user = response.data;
      this.loadScripts().then(() => {
        this.createChart();
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
    createChart() {
      console.log("Creating chart...");
      const ctx = document.getElementById('myChart').getContext('2d');
      if (ctx) {
        console.log("Canvas context acquired", ctx);

        new window.Chart(ctx, {
          type: 'boxplot',
          data: {
            labels: ['Dataset 1', 'Dataset 2', 'Dataset 3'], // chart.labels
            datasets: [{
              label: 'Boxplot Dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [
                [1, 2, 3, 4, 5, 11],
                [1, 3, 8, 12, 13, 15],
                [2, 4, 6, 8, 10, 12]
              ]
            }]
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
      } else {
        console.error("Failed to acquire canvas context");
      }
    }
  },
};
</script>
