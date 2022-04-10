<template>
  <div>
    <h1>Edit Tracked Symptom</h1>
    <h2>{{ symptom.name }}</h2>
    
    <form ref="symptomContainer">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          v-model="symptom.description"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="slider">Severity (0-10)</label>
        <v-slider
          v-model="symptom.severity"
          :color="slider.color"
          :label="slider.label"
          :min="slider.min"
          :max="slider.max"
          thumb-label="always"
        ></v-slider>
      </div>
      <button class="btn btn-primary" @click="editTrackedSymptom">Edit</button>

    </form>
  </div>
</template>

<script>
export default {
  /**
   * Component name
   */
  name: "EditTrackedSymptom",
  components: {},
  /**
   * properties
   */
  data() {
    return {
      symptomName: "",
      symptom: {
        name: "",
        uuid: "",
        created_at: "",
        severity: "",
        description: "",
      },
      updateSuccess: false,
      serverResponse: false,
      slider: {
        val: 5,
        color: "blue",
        label: "severity",
        track: "green",
        thumbColor: "green",
        max: 10,
        min: 0,
      },
    };
  },
  
  /**
   * Props
   */
  props: ['created_at'],

  /**
   * methods
   */
  methods: {
    showTrackedSymptom() {
      let symptomContainer = this.$refs.symptomContainer;
      let loader = this.$loading.show({
        container: symptomContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      let url = "symptom/admin/symptoms/show-tracked-symptom/" + this.$route.params.uuid + "/" + this.$route.params.created_at;
        
      this.$axios
        .get(url)
        .then((response) => {
          let result = response.data.data;
          this.symptom.name = result.name;
          this.symptom.uuid = result.uuid;
          this.symptom.created_at = result.created_at == undefined ? null : result.created_at;
          this.symptom.severity = result.severity;
          this.symptom.description =
            result.description == undefined ? null : result.description;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },
    editTrackedSymptom() {
      this.udpateSucces = false;
      this.serverResponse = false;
      let symptomContainer = this.$refs.symptomContainer;
      let loader = this.$loading.show({
        container: symptomContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      let url = "symptom/admin/symptoms/edit-tracked-symptom";
      this.$axios
        .post(url, {
          name: this.symptom.name,
          uuid: this.symptom.uuid,
          created_at: this.symptom.created_at,
          severity: this.symptom.severity,
          description: this.symptom.description,
        })
        .then((response) => {
          this.updateSuccess = response.data;
          console.log(this.updateSuccess);
          this.successAlertDisplay();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.errors.name[0]);
          //if (error.response.data.errors.name) {
          this.serverResponse = error.response.data.errors.name[0];
          this.errorAlertDisplay(this.serverResponse);
          //}
        })
        .finally(() => {
            loader.hide()
            });
    },

    successAlertDisplay() {
      this.$swal(
        "Update Successfull",
        "Tracked Symptom updated successfully",
        "success"
      );
    },

    errorAlertDisplay(error) {
      this.$swal("Error", error, "error");
    },


  },
  mounted() {
    this.showTrackedSymptom();

  },
};
</script>
<style scoped>
</style>