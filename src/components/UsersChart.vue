<template>
  <div>
    <canvas ref="canvasRef" class="w-full h-64" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "@/lib/axios";
import Chart from "chart.js/auto";
import "@sgratzl/chartjs-chart-boxplot";

const props = defineProps({
  userId: { type: Number, required: true },
  chartId: { type: Number, required: true }
});

const canvasRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  const response = await axios.get(
      `/api/users/${props.userId}/user_charts/${props.chartId}`
  );

  const chart = response.data;
  const ctx = canvasRef.value.getContext("2d");

  chartInstance = initializeChart(ctx, chart);
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});

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
