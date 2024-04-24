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
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <form class="form-row align-items-center" v-on:submit.prevent="updateJournalTemplate" id="metricFormContainer">
                <div v-for="metric in template.metrics" v-bind:key="metric" class="metricInputGroup">
                  <label style="margin-right: 4px;">Metric name</label>
                  <input v-model="metric.metric_name" name="metric_name" type="text" class="health-metric" />
                  <label style="margin-right: 4px; margin-left: 4px;">Metric data type</label>
                  <input v-model="metric.metric_data_type" name="metric_data_type" type="text" class="health-metric" />
                  <label style="margin-right: 4px; margin-left: 4px;">Metric unit name</label>
                  <input v-model="metric.metric_unit_name" name="metric_unit_name" type="text" class="health-metric" />
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
              <button v-on:click="destroyJournal()" type="submit" class="btn btn-primary">Delete</button>
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
      template: {},
      errors: [],
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
        })
        .catch(error => {
          console.log("journal template update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyJournal: function() {
      axios.delete(`/api/journal_templates/${this.journal.id}/destroy`).then(() => {
        this.$router.push(`/journals/template/${this.template.id}/edit`);
      });
    },
    addMetricField: function() {
      const targetForm = document.getElementById('metricFormContainer');
      let newElements = `<label style="margin-right: 4px;">Metric Name</label>`;
      newElements += `<input name="metric_name" type="text" class="health-metric newMetric" />`;
      newElements += `<label style="margin-right: 4px; margin-left: 4px;">Metric data type</label>`;
      newElements += `<input name="metric_data_type" type="text" class="health-metric newMetric"/>`
      newElements += `<label style="margin-right: 4px; margin-left: 4px;">Metric unit name</label>`;
      newElements += `<input name="metric_unit_name" type="text" class="health-metric newMetric"/>`
      let newInputGroup = document.createElement("div");
      newInputGroup.className = 'metricInputGroup';
      newInputGroup.innerHTML = newElements;
      targetForm.prepend(newInputGroup);
    },
    deleteRow: function(event) {
      console.log(event);
      event.target.closest('div').remove();
    }
  },
};
</script>
