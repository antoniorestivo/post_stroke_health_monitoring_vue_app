<template>
  <section class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ chart.title }}</h2>
        <canvas ref="canvasRef" class="w-full h-64 mb-4" />
      </div>

      <div class="space-x-4">
        <router-link
          :to="`/users/${route.params.id}/charts`"
          class="text-blue-600 hover:underline"
        >
          Back to charts
        </router-link>
        |
        <router-link
          :to="`/users/${route.params.id}/charts/${chart.id}/edit`"
          class="text-blue-600 hover:underline"
        >
          Update chart
        </router-link>
      </div>

      <div class="pt-4">
        <button
          @click="destroyChart"
          type="button"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/lib/axios";
import Chart from "chart.js/auto";
import "@sgratzl/chartjs-chart-boxplot";

const route = useRoute();
const router = useRouter();
const canvasRef = ref(null);
const chart = ref({});

onMounted(async () => {
  const response = await axios.get(
    `/api/users/${route.params.id}/user_charts/${route.params.chart_id}`
  );
  chart.value = response.data;
  const ctx = canvasRef.value.getContext("2d");
  initializeChart(ctx, chart.value);
});

function destroyChart() {
  const url = `/api/users/${route.params.id}/user_charts/${route.params.chart_id}`;
  axios.delete(url).then(() => {
    router.push(`/users/${route.params.id}/charts`);
  });
}

function initializeChart(ctx, chart) {
  switch (chart.chart_type) {
    case "line":
      createLineChart(ctx, chart);
      break;
    case "bar":
      createBarChart(ctx, chart);
      break;
    case "scatter":
      createScatterChart(ctx, chart);
      break;
    case "boxplot":
      createBoxPlotChart(ctx, chart);
      break;
    default:
      console.error(`Unknown chart type: ${chart.chart_type}`);
  }
}

function createLineChart(ctx, chart) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: chart.data.x,
      datasets: [
        {
          label: chart.title,
          data: chart.data.y,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
          pointBackgroundColor(context) {
            const value = context.dataset.data[context.dataIndex];
            return parseInt(value) > parseInt(chart.data.thresholds.y)
              ? "rgb(255, 0, 0)"
              : "rgb(75, 192, 192)";
          }
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: chart.y_label }
        },
        x: {
          beginAtZero: false,
          title: { display: true, text: chart.x_label }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(context) {
              let label = context.dataset.label || "";
              if (
                parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)
              ) {
                label += ` Warning for ${chart.y_label}!`;
              }
              if (
                parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)
              ) {
                label += ` Warning for ${chart.x_label}!`;
              }
              return label;
            },
            labelColor(context) {
              const red = {
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                borderWidth: 2,
                borderDash: [2, 2],
                borderRadius: 2
              };
              if (
                parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)
              )
                return red;
              if (
                parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)
              )
                return red;
            }
          }
        }
      }
    }
  });
}

function createBarChart(ctx, chart) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: chart.data.x,
      datasets: [
        {
          label: chart.title,
          data: chart.data.y,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: chart.y_label }
        },
        x: {
          title: { display: true, text: chart.x_label }
        }
      }
    }
  });
}

function createScatterChart(ctx, chart) {
  new Chart(ctx, {
    type: "scatter",
    data: {
      labels: chart.data.x,
      datasets: [
        {
          label: chart.title,
          data: chart.data.y,
          borderWidth: 1,
          pointBackgroundColor(context) {
            const value = context.dataset.data[context.dataIndex];
            return parseInt(value) > parseInt(chart.data.thresholds.y)
              ? "rgb(255, 0, 0)"
              : "rgb(75, 192, 192)";
          }
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: chart.y_label }
        },
        x: {
          title: { display: true, text: chart.x_label }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(context) {
              let label = context.dataset.label || "";
              if (
                parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)
              ) {
                label += ` Warning for ${chart.y_label}!`;
              }
              if (
                parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)
              ) {
                label += ` Warning for ${chart.x_label}!`;
              }
              return label;
            },
            labelColor(context) {
              const red = {
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                borderWidth: 2,
                borderDash: [2, 2],
                borderRadius: 2
              };
              if (
                parseInt(context.parsed.y) > parseInt(chart.data.thresholds.y)
              )
                return red;
              if (
                parseInt(context.parsed.x) > parseInt(chart.data.thresholds.x)
              )
                return red;
            }
          }
        }
      }
    }
  });
}

function createBoxPlotChart(ctx, chart) {
  new Chart(ctx, {
    type: "boxplot",
    data: {
      labels: chart.data.labels,
      datasets: chart.data.datasets
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Boxplot Comparison" }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
</script>
