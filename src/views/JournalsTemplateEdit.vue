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
              <form class="form-row align-items-center" v-on:submit.prevent="updateJournalTemplate(template)">
                <div v-for="metric in template.metrics" v-bind:key="metric">
                  <label>{{ metric.metric_name }}</label>
                  <input v-model="metric.metric_name" name="metric" type="text" class="health-metric" />
                  <label>{{ metric.metric_data_type }}</label>
                  <input v-model="metric.metric_data_type" name="metric" type="text" class="health-metric" />
                  <label>{{ metric.metric_unit_name }}</label>
                  <input v-model="metric.metric_unit_name" name="metric" type="text" class="health-metric" />
                </div>

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
      const data = response.data
      console.log(data);
      this.template = data;
    });
  },
  methods: {
    updateJournalTemplate: function(template) {
      var params = {
        metrics: template.metrics,
      };
      console.log(`!!!!${template.metrics}`);
      // metrics.forEach(ele => {
      //   let key = ele.name;
      //   let value = ele.value;
      //   params.metrics[key] = value;
      // });
      axios
        .patch(`/api/journal_templates/${this.template.id}`, params)
        .then(response => {
          console.log("journal template update", response);
          this.$router.push(`/journals/template/${this.template.id}/edit`);
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
  },
};
</script>
