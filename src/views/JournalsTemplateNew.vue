<template>
  <div class="journals-template-new">
    <section class="space-pt">
      <div style="display: inline-flex;">
        <p class="form-header" style="margin-left: 1rem;">Input the health metrics you would like to track. </p>
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
      <form class="form-row align-items-center" v-on:submit.prevent="createJournalTemplate()" id="dynamic-form">
        <div class="form-group col-sm-12">
          <label for="Field 1 Name">Field 1 Name</label>
          <input type="text" name="field_name_1" id="field_name_1" class="dynamic-input" />
          <label for="Field 1 Unit">Field 1 Unit</label>
          <input type="text" name="field_unit_1" id="field_unit_1" class="dynamic-input" />
          <label for="Field 1 Data Type">Field 1 Data Type</label>
          <input type="text" name="field_data_type_1" id="field_data_type_1" class="dynamic-input" />
          <label for="Field 1 Data Type">Field 1 Warning Threshold</label>
          <input type="text" name="warning_threshold_1" id="warning_threshold_1" class="dynamic-input" />
        </div>
        <div class="container" id="template-form-container"></div>
        <div class="form-group col-sm-12">
          <button type="submit" class="btn btn-primary" style="margin-left: 1rem;">Submit</button>
        </div>
      </form>
      <button @click="addField" class="rounded-green-btn">+</button>
      <span style="margin-left: 0.5rem;">Add more fields</span>
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

.rounded-green-btn {
  background-color: #28a745; /* Bootstrap success green color */
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 1rem;
}

.rounded-green-btn:hover {
  background-color: #218838; /* Slightly darker green for hover effect */
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
  data() {
    return {
      fieldCounter: 1,
      tooltipVisible: false
    };
  },
  methods: {
    showTooltip() {
      this.tooltipVisible = true;
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
    addField() {
      this.fieldCounter += 1;
      let newInputGroup = this.addInputField(this.fieldCounter);
      document.getElementById("template-form-container").appendChild(newInputGroup);
    },
    addInputField(fieldCounter) {
      let newInputGroup = document.createElement("div");
      newInputGroup.className = "input-group";
      let labelElementOne = `<label for="Field ${fieldCounter} Name">Field ${fieldCounter} Name</label>`;
      let inputElementOne = `<input type="text" name="field_name_${fieldCounter}" id="field_name_${fieldCounter}" class="dynamic-input" />`;
      let labelElementTwo = `<label for="Field ${fieldCounter} Unit">Field ${fieldCounter} Unit</label>`;
      let inputElementTwo = `<input type="text" name="field_unit_${fieldCounter}" id="field_unit_${fieldCounter}" class="dynamic-input" />`;
      let labelElementThree = `<label for="Field ${fieldCounter} Data Type">Field ${fieldCounter} Data Type</label>`;
      let inputElementThree = `<input type="text" name="field_data_type_${fieldCounter}" id="field_data_type_${fieldCounter}" class="dynamic-input" />`;
      let labelElementFour = `<label for="Field ${fieldCounter} Data Type">Field ${fieldCounter} Warning Threshold</label>`;
      let inputElementFour = `<input type="text" name="warning_threshold_${fieldCounter}" id="warning_threshold_${fieldCounter}" class="dynamic-input" />`;
      let elements = [
        labelElementOne,
        inputElementOne,
        labelElementTwo,
        inputElementTwo,
        labelElementThree,
        inputElementThree,
        labelElementFour,
        inputElementFour,
      ];
      newInputGroup.innerHTML = elements.join("");
      return newInputGroup;
    },
    createJournalTemplate() {
      let params = { template: {} };
      for (let i = 1; i <= this.fieldCounter; i++) {
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
        .then((response) => {
          console.log("template create", response);
          this.$router.push("/journals");
        })
        .catch((error) => {
          console.log("journals template create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
