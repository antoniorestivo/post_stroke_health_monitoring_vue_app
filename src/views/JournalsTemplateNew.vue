<template>
  <div class="journals-template-new">
    <section class="space-pt">
      <p class="form-header">Choose your fields for your optimal journal template</p>
      <form class="form-row align-items-center" v-on:submit.prevent="createJournalTemplate()" id="dynamic-form">
        <div class="container" id="template-form-container"></div>
        <div class="form-group col-sm-12">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <button id="addFieldBtn">+</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";

let fieldCounter = 0;
const addInputField = fieldCounter => {
  let newInputGroup = document.createElement("div");
  newInputGroup.className = "input-group";
  let labelElementOne = `<label for="Field ${fieldCounter} Name">Field ${fieldCounter} Name</label>`;
  let inputElementOne = `<input type="text" name="field_name_${fieldCounter}" id="field_name_${fieldCounter}" class="dynamic-input" />`;
  let labelElementTwo = `<label for="Field ${fieldCounter} Unit">Field ${fieldCounter} Unit</label>`;
  let inputElementTwo = `<input type="text" name="field_unit_${fieldCounter}" id="field_unit_${fieldCounter}" class="dynamic-input" />`;
  let labelElementThree = `<label for="Field ${fieldCounter} Data Type">Field ${fieldCounter} Data Type</label>`;
  let inputElementThree = `<input type="text" name="field_data_type_${fieldCounter}" id="field_data_type_${fieldCounter}" class="dynamic-input" />`;
  let labelElementFour = `<label for="Field ${fieldCounter} Data Type">Field ${fieldCounter} Data Type</label>`;
  let inputElementFour = `<input type="text" name="warning_threshold_${fieldCounter}" id="warning_threshold_${fieldCounter}" class="dynamic-input" />`;
  let elements = [
    labelElementOne,
    inputElementOne,
    labelElementTwo,
    inputElementTwo,
    labelElementThree,
    inputElementThree,
    labelElementFour,
    inputElementFour
  ];
  newInputGroup.innerHTML = elements.join("");
  return newInputGroup;
};

window.onload = () => {
  console.log(document.getElementById("addFieldBtn"));
  // Vanilla JavaScript to handle adding new fields
  document.getElementById("addFieldBtn").addEventListener("click", function() {
    fieldCounter += 1;
    let newInputGroup = addInputField(fieldCounter);
    document.getElementById("template-form-container").appendChild(newInputGroup);
  });
};
export default {
  created: function() {},
  methods: {
    createJournalTemplate: function() {
      let params = { template: {} };
      for (let i = 1; i <= fieldCounter; i++) {
        let name = document.getElementById(`field_name_${i}`).value;
        let unit = document.getElementById(`field_unit_${i}`).value;
        let dataType = document.getElementById(`field_data_type_${i}`).value;
        let warningThreshold = document.getElementById(`warning_threshold_${i}`).value;
        params.template[`field_name_${i}`] = name;
        params.template[`field_unit_${i}`] = unit;
        params.template[`field_data_type_${i}`] = dataType;
        params.template[`warning_threshold_${i}`] = warningThreshold;
      }
      console.log(params);
      axios
        .post("/api/journal_templates", params)
        .then(response => {
          console.log("template create", response);
          this.$router.push("/journals");
        })
        .catch(error => {
          console.log("journals template create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
