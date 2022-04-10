<template>
  <div>
    <h1>Edit Disease</h1>
    <form ref="diseaseContainer">
      <!-- Name field -->
      <div class="form-group">
        <label for="disease-name">Disease Name</label>
        <input
          v-model="disease.name"
          type="text"
          class="form-control"
          id="disease-name"
          placeholder="Disease Name"
        />
      </div>
      <p v-if="errorResponse.name" class="text-danger font-weight-light">
        {{ errorResponse.name[0] }}
      </p>
      <!-- Content field -->
      <div class="form-group">
        <label for="content">Disease Content</label>
        <ckeditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        ></ckeditor>
      </div>
      <p v-if="errorResponse.content" class="text-danger font-weight-light">
        {{ errorResponse.content[0] }}
      </p>

      <!--Prevelance rate field  -->
      <div class="form-group">
        <label for="prevelance-rate">Edit Prevalence Rate</label>
        <input
          v-model="disease.prevelance_rate"
          type="digit"
          class="form-control"
          id="prevelance-rate"
          placeholder="Prevalence Rate"
        />
      </div>
      <p
        v-if="errorResponse.prevelance_rate"
        class="text-danger font-weight-light"
      >
        {{ errorResponse.prevelance_rate[0] }}
      </p>

      <!-- Age start field -->
      <div class="form-group">
        <label for="age-start">Edit Age start</label>
        <input
          v-model="disease.age_start"
          type="digit"
          class="form-control"
          id="age-start"
          placeholder="Disease starting age"
        />
      </div>

      <!-- Age end field -->
      <div class="form-group">
        <label for="age-end">Edit Age end</label>
        <input
          v-model="disease.age_end"
          type="digit"
          class="form-control"
          id="age-end"
          placeholder="Disease ending age"
        />
      </div>

      <!-- Link symptoms field -->
      <label for="link-symptom">Link Symptoms</label>
      <v-autocomplete
        :items="symptoms"
        v-model="disease.symptoms"
        item-text="name"
        item-value="uuid"
        chips
        deletable-chips
        filled
        multiple
        solo
        label="Link Symptoms"
      ></v-autocomplete>
      <p v-if="errorResponse.symptom" class="text-danger font-weight-light">
        {{ errorResponse.symptom[0] }}
      </p>

      <!-- Disease classification field -->
      <label for="link-classification">Link classifications</label>
      <v-autocomplete
        :items="classifications"
        v-model="disease.disease_classifications"
        item-text="name"
        item-value="uuid"
        chips
        deletable-chips
        filled
        multiple
        solo
        label="Link Classification"
      ></v-autocomplete>

      <!-- Disease category field -->
      <label for="link-category">Link Categories</label>
      <v-autocomplete
        :items="categories"
        v-model="disease.disease_categories"
        item-text="name"
        item-value="uuid"
        chips
        deletable-chips
        multiple
        solo
        label="Link Category"
      ></v-autocomplete>

      <button class="btn btn-primary" @click="updateDisease">update</button>
    </form>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  /**
   * Component name
   */
  name: "EditDisease",
  components: {},
  /**
   * properties
   */
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {},
      symptoms: [],
      classifications: [],
      categories: [],
      disease: {
        name: "",
        uuid: "",
        content: "",
        prevelance_rate: "",
        age_start: "",
        age_end: "",
        symptoms: [],
        disease_classifications: [],
        disease_categories: [],
      },
      updateSuccess: false,
      errorResponse: false,
    };
  },
  /**
   * methods
   */
  methods: {
    /**
     * Get specific disease
     *
     * @param { null }
     * @return { null }
     */
    getDisease() {
      let diseaseContainer = this.$refs.diseaseContainer;
      let loader = this.$loading.show({
        container: diseaseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      let url = "disease/admin/diseases/get-disease/" + this.$route.params.uuid;
      this.$axios
        .get(url)
        .then((response) => {
          let data = response.data.data;
          this.diseaseName = data.name;
          this.disease.name = data.name;
          this.disease.uuid = data.uuid;
          this.editorData = data.content;
          this.disease.prevelance_rate = data.prevelance_rate;
          this.disease.age_start = data.age_start;
          this.disease.age_end = data.age_end;
          this.disease.symptoms = data.symptoms.map(this.getDisplaySymptom);
          this.disease.disease_categories = data.categories.map(
            this.getDisplayCategory
          );
          this.disease.disease_classifications = data.classifications.map(
            this.getDisplayClassification
          );
          console.log("Haya ndo hii symptoms:");
          console.log(this.disease.symptoms);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },

    /**
     * Display linked symptoms
     *
     * @param { symptom }
     * @return { string }
     */
    getDisplaySymptom(symptom) {
      return symptom.uuid;
    },

    /**
     * Display linked classifications
     *
     * @param { classification }
     * @return { string }
     */
    getDisplayClassification(classification) {
      return classification.uuid;
    },

    /**
     * Display linked categories
     *
     * @param { category }
     * @return { string }
     */
    getDisplayCategory(categories) {
      return categories.uuid;
    },

    updateDisease() {
      this.udpateSucces = false;
      this.errorResponse = false;
      let diseaseContainer = this.$refs.diseaseContainer;
      let loader = this.$loading.show({
        container: diseaseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      console.log("UPdate, available symptoms:");
      console.log(this.disease.symptoms);
      let url =
        "disease/admin/diseases/update-disease/" + this.$route.params.uuid;
      this.$axios
        .post(url, {
          name: this.disease.name,
          content: this.editorData,
          prevelance_rate: this.disease.prevelance_rate,
          age_start: this.disease.age_start,
          age_end: this.disease.age_end,
          symptom: this.disease.symptoms,
          disease_classification: this.disease.disease_classifications,
          disease_category: this.disease.disease_categories,
        })
        .then((response) => {
          this.updateSuccess = response.data;
          console.log(this.updateSuccess);
          this.successAlertDisplay();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.errors);
          //if (error.response.data.errors.name) {
          this.errorResponse = error.response.data.errors;
          console.log("serverResponse:");
          //console.log(this.serverResponse);
          //this.errorAlertDisplay(this.serverResponse);
          //}
        })
        .finally(() => loader.hide());
    },

    /**
     * Get all symptoms
     *
     * @param { null }
     * @return { null }
     */
    getAllSymptoms() {
      this.symptoms = [];
      let url = "symptom/admin/symptoms/get-all/" + "true";
      this.$axios
        .get(url)
        .then((response) => {
          this.symptoms = response.data.data;
          console.log(this.symptoms);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * get all categories
     *
     * @param { null }
     * @return { null }
     */
    getAllCategories() {
      this.categories = [];
      let url = "disease-category/admin/disease-categories/get-all";
      this.$axios
        .get(url)
        .then((response) => {
          this.categories = response.data.data;
          console.log(this.symptoms);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Get all Classifications
     */
    getAllClassifications() {
      this.clasifications = [];
      let url = "disease-classification/admin/disease-classifications/get-all";
      this.$axios
        .get(url)
        .then((response) => {
          this.classifications = response.data.data;
          console.log(this.classifications);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    successAlertDisplay() {
      this.$swal(
        "Update Successfull",
        "Disease updated successfully",
        "success"
      );
    },

    errorAlertDisplay(error) {
      this.$swal("Error", error, "error");
    },
  },
  mounted() {
    this.getDisease();
    this.getAllSymptoms();
    this.getAllClassifications();
    this.getAllCategories();
  },
};
</script>