<template>
  <div class="journals-update">
    <section class="space-ptb login">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-12 bg-white box-shadow b-radius">
            <div class="psycare-account box-shadow-none">
              <div class="section-title">
                <h3 class="title">Update Journal Template</h3>
              </div>
              <div style="display: inline-flex;">
                <p>Input the health metrics you would like to track</p>
                <img
                  src="https://www.shutterstock.com/image-vector/info-information-help-tooltip-icon-260nw-1265320249.jpg"
                  alt="Info"
                  class="info-icon"
                  @mouseover="showTooltip()"
                  @mouseleave="hideTooltip()"
                />
              </div>
              <span v-if="tooltipVisible" class="tooltip-text">
                Here are some health metrics examples: Blood Pressure, Heart Rate, Weight, etc. The unit name describes
                what its measurement(s) are. Weight, for example, can have a unit of pounds (lb) or kilograms (kg). Unit
                type can be string (for text) or numeric (for numbers). The warning threshold indicates a value that
                defines the point when the health metric is of particular concern. A warning threshold of systolic blood
                pressure of 130, for example, means that for any value greater than or equal to 130 it will be flagged
                on your charts.
              </span>
              <div v-if="hasMessage" style="color: green;"> {{this.message}} </div>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateJournalTemplate" id="metricFormContainer">
                <div v-for="metric in template.metrics" v-bind:key="metric" class="metricInputGroup">
                  <label style="margin-right: 4px;">Metric name</label>
                  <input v-model="metric.metric_name" name="metric_name" type="text" class="health-metric" />
                  <label style="margin-right: 4px; margin-left: 4px;">Data type</label>
                  <input v-model="metric.metric_data_type" name="metric_data_type" type="text" class="health-metric" />
                  <label style="margin-right: 4px; margin-left: 4px;">Unit name</label>
                  <input v-model="metric.metric_unit_name" name="metric_unit_name" type="text" class="health-metric" />
                  <label style="margin-right: 4px; margin-left: 4px;">Warning Threshold</label>
                  <input v-model="metric.warning_threshold" name="warning_threshold" type="text" class="health-metric" />
                  <button v-on:click.prevent="deleteRow">Delete Field</button>
                </div>
                <div style="flex-basis: 100%; height: 0"></div>
                <button id="addMetricField" v-on:click.prevent="addMetricField()">Create Field</button>
                <br>
                <br>
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

<style scoped>
.info-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-left: 0;
  vertical-align: middle;
}

.tooltip-text {
  display: inline-block;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  z-index: 1000;
  margin-left: 10px;
  white-space: normal;
  max-width: 250px;
  word-wrap: break-word;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      template: {},
      errors: [],
      message: null,
      tooltipVisible: false
    };
  },
  created: function() {
    const id = this.$route.params.id;
    axios.get(`/api/journal_templates/${id}/edit`).then(response => {
      const data = response.data;
      this.template = data;
    });
  },
  methods: {
    showTooltip() {
      this.tooltipVisible = true;
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
    updateJournalTemplate: function() {
      var params = {
        template: { metrics: [] },
      };
      let newInputGroups = document.getElementsByClassName("metricInputGroup");
      newInputGroups.forEach(ele => {
        let nodes = ele.childNodes;
        let hash = {};
        nodes.forEach(node => {
          hash[node.name] = node.value;
        });
        params.template.metrics.push(hash);
      });
      axios
        .patch(`/api/journal_templates/${this.template.id}`, params)
        .then(response => {
          console.log("journal template update", response);
          this.$router.push(`/journals/template/${this.template.id}/edit`);
          let oldInputGroups = document.getElementsByClassName('newInputGroup');
          oldInputGroups.forEach(ele => {
            ele.remove();
          });
          this.message = 'Template successfully updated!'
        })
        .catch(error => {
          console.log("journal template update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    addMetricField: function() {
      const targetForm = document.getElementById('metricFormContainer');
      let newElements = `<label style="margin-right: 4px;">Metric Name</label>`;
      newElements += `<input name="metric_name" type="text" class="health-metric newMetric" />`;
      newElements += `<label style="margin-right: 4px; margin-left: 4px;">Metric data type</label>`;
      newElements += `<input name="metric_data_type" type="text" class="health-metric newMetric"/>`;
      newElements += `<label style="margin-right: 4px; margin-left: 4px;">Metric unit name</label>`;
      newElements += `<input name="metric_unit_name" type="text" class="health-metric newMetric"/>`;
      newElements += `<label style="margin-right: 4px; margin-left: 4px;">Warning Threshold</label>`;
      newElements += `<input name="warning_threshold" type="text" class="health-metric newMetric"/>`
      let newInputGroup = document.createElement("div");
      newInputGroup.className = 'metricInputGroup';
      newInputGroup.innerHTML = newElements;
      targetForm.prepend(newInputGroup);
    },
    deleteRow: function(event) {
      console.log(event);
      event.target.closest('div').remove();
    },
    hasMessage: function() {
      return !!this.message;
    }
  },
};
</script>
