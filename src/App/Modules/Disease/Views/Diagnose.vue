<template>
  <div ref="diagnoseContainer">
    <h1>Run Diagnosis</h1>
    <label for="disease-by-symptom">Search Disease By Symptom</label>
    <div class="row">
      <div class="col-8">
        <!-- Link symptoms field -->
        <v-autocomplete
          :items="symptoms"
          v-model="diseaseSymptoms"
          item-text="name"
          item-value="uuid"
          chips
          deletable-chips
          
          multiple
          solo
          label="Type symptom"
        ></v-autocomplete>
        <p v-if="errorResponse" class="text-danger font-weight-light">
          {{ errorResponse }}
        </p>
      </div>
      <div class="col-4">
        <v-btn small @click="getDiseaseBySymptoms"> Search </v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-data-table
          v-if="diseases"
          :headers="headers"
          :items="diseases"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:item.actions="{ item }">
            <div class="nowrap-buttons">
              <router-link
                class="btn btn-tooltip"
                data-toggle="tooltip"
                data-placement="top"
                title="Details"
                data-container="body"
                data-animation="true"
                :to="{ name: 'ReadArticle', params: { uuid: item.uuid } }"
              >
                <i class="fad fa-info-circle"></i>
              </router-link>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   *Component name
   */
  name: "Diagnose",
  /**
   *data
   */
  data() {
    return {
      symptoms: [],
      errorResponse: false,
      diseases: false,
      diseaseSymptoms: [],
      headers: [
        { text: "Matched Diseases", align: "start", value: "name" },
        { text: "Actions", sortable: "false", value: "actions" },
        //{ text: "Uuid", sortable: "false", value: "uuid" }
      ],
    };
  },

  /**
   * methods
   */
  methods: {
    /**
     * Get all symptoms
     *
     * @param { null }
     * @return { null }
     */
    getAllSymptoms() {
      this.symptoms = [];
      let diagnoseContainer = this.$refs.diagnoseContainer;
      let loader = this.$loading.show({
        container: diagnoseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      let url = "symptom/admin/symptoms/get-all/" + "true";
      this.$axios
        .get(url)
        .then((response) => {
          this.symptoms = response.data.data;
          console.log(this.symptoms);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loader.hide();
        });
    },

    /**
     * Return Likely disease based on symptoms
     *
     * @param { array } symptoms
     * @return { array } diseases
     */
    getDiseaseBySymptoms() {
      this.diseases = [];
      this.errorResponse = false;
      let diagnoseContainer = this.$refs.diagnoseContainer;
      let loader = this.$loading.show({
        container: diagnoseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      
      let url = "disease/admin/diseases/get-disease-by-symptoms";
      this.$axios
        .post(url, {
          symptom: this.diseaseSymptoms,
        })
        .then((response) => {
          let unMappedDiseases = response.data.data;
          this.diseases = [];
          this.diseases = unMappedDiseases.map(this.getDisplayDisease);
          console.log("Some matched Diseases")
          console.log(unMappedDiseases);
        })
        .catch((error) => {
          console.log(error);
          this.errorResponse = error.response.data.errors.symptom[0];
        })
        .finally(() => loader.hide());
    },

    /**
     * Display disease in datatable
     * 
     * @param { array } disease
     * @return { array } disease
     */
    getDisplayDisease(disease) {
      return {
        name: disease.name,
        uuid: disease.uuid
      }
    }

  },
  mounted() {
    this.getAllSymptoms();
  },
};
</script>