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
                <canvas id="myChart"></canvas>
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

<script src="https://cdn.jsdelivr.net/npm/chart.js">
</script>
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
      this.loadScript('https://cdn.jsdelivr.net/npm/chart.js', () => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar', // type
          data: {
            labels: ['happy', 'sad', 'depressed', 'anxious', 'angry', 'energized'], // x axis data
            datasets: [{
              label: 'My First dataset', // title
              data: [5, 3, 2, 4, 3, 6], // y axis data,
              backgroundColor: ["red", "blue", "green", "yellow", "violet", "indigo"]
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true // configuration options
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
    }
  },
};
</script>
