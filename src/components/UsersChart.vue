<template>
  <div class="relative w-full h-[70vh]">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "@/lib/axios";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

import {
  BoxPlotController,
  BoxAndWiskers
} from "@sgratzl/chartjs-chart-boxplot";

ChartJS.register(
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  BoxPlotController,
  BoxAndWiskers
);

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
  console.log(response.data);
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
  new ChartJS(ctx, {
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
            return isWarning(
                value,
                chart.data.thresholds.y,
                chart.data.thresholds.y_modifier
            )
              ? "rgb(255, 0, 0)"
              : "rgb(75, 192, 192)";
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: titleWithUnits(chart.y_label, chart.data.y_unit) }
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
                  isWarning(
                      context.parsed.y,
                      chart.data.thresholds.y,
                      chart.data.thresholds.y_modifier
                  )
              ) {
                label += ` Warning for ${chart.y_label}!`;
              }

              if (
                  isWarning(
                      context.parsed.x,
                      chart.data.thresholds.x,
                      chart.data.thresholds.x_modifier
                  )
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
                  isWarning(
                      context.parsed.y,
                      chart.data.thresholds.y,
                      chart.data.thresholds.y_modifier
                  )
              )
                return red;
              if (
                  isWarning(
                      context.parsed.x,
                      chart.data.thresholds.x,
                      chart.data.thresholds.x_modifier
                  )
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
  new ChartJS(ctx, {
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
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: chart.y_label || "Frequency" }
        },
        x: {
          title: { display: true, text: chart.x_label }
        }
      }
    }
  });
}

function createScatterChart(ctx, chart) {
  new ChartJS(ctx, {
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
            return isWarning(
              value,
              chart.data.thresholds.y,
              chart.data.thresholds.y_modifier
            )
              ? "rgb(255, 0, 0)"
              : "rgb(75, 192, 192)";
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: titleWithUnits(chart.y_label, chart.data.y_unit) }
        },
        x: {
          title: { display: true, text: titleWithUnits(chart.x_label, chart.data.x_unit) }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(context) {
              let label = context.dataset.label || "";
              if (
                  isWarning(
                      context.parsed.y,
                      chart.data.thresholds.y,
                      chart.data.thresholds.y_modifier
                  )
              ) {
                label += ` Warning for ${chart.y_label}!`;
              }
              if (
                  isWarning(
                      context.parsed.x,
                      chart.data.thresholds.x,
                      chart.data.thresholds.x_modifier
                  )
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
                  isWarning(
                      context.parsed.y,
                      chart.data.thresholds.y,
                      chart.data.thresholds.y_modifier
                  )
              )
                return red;
              if (
                  isWarning(
                      context.parsed.x,
                      chart.data.thresholds.x,
                      chart.data.thresholds.x_modifier
                  )
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
  new ChartJS(ctx, {
    type: "boxplot",
    data: {
      labels: chart.data.labels,
      datasets: chart.data.datasets
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: { display: true, text: "Boxplot Comparison" }
      },
      scales: {
        y: { beginAtZero: true,
             title: {
               display: true,
               text: chart.y_label
            }
        }
      }
    }
  });
}
function isWarning(value, threshold, modifier) {
  if (threshold == null || value == null) return false;

  const v = Number(value);
  const t = Number(threshold);

  if (Number.isNaN(v) || Number.isNaN(t)) return false;

  // Default to greater-than-or-equal
  if (modifier === "lteq") {
    return v <= t;
  }

  // gteq or null / unknown
  return v >= t;
}

function titleWithUnits(label, unit) {
  return `${label} (${unit})`
}
</script>
