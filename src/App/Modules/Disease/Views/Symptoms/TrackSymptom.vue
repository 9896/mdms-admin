<template>
  <div>
    <h1>Track Symptom</h1>
    <h2>{{ symptomName }}</h2>
    <form ref="symptomContainer">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          v-model="description"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="slider">Severity (0-10)</label>
        <v-slider
          v-model="slider.val"
          :color="slider.color"
          :label="slider.label"
          :min="slider.min"
          :max="slider.max"
          thumb-label="always"
        ></v-slider>
      </div>
      <button class="btn btn-primary" @click="trackSymptom">Track</button>
    </form>
  </div>
</template>

<script>
export default {
  /**
   * Component name
   */
  name: "TrackSymptom",
  components: {},
  /**
   * properties
   */
  data() {
    return {
      symptomName: "",
      description: "",
      slider: {
        val: 5,
        color: "blue",
        label: "severity",
        track: "green",
        thumbColor: "green",
        max: 10,
        min: 0,
      },
      symptom: {
        name: "",
        uuid: "",
      },
      updateSuccess: false,
      serverResponse: false,
    };
  },
  /**
   * methods
   */
  methods: {
    getSymptom() {
      let symptomContainer = this.$refs.symptomContainer;
      let loader = this.$loading.show({
        container: symptomContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      let url = "symptom/admin/symptoms/get-symptom/" + this.$route.params.uuid;
      this.$axios
        .get(url)
        .then((response) => {
          this.symptomName = response.data.data.name;
          this.symptom.name = response.data.data.name;
          this.symptom.uuid = response.data.data.uuid;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },
    /**
     * Track Sympotm
     */
    trackSymptom() {
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
      let url = "symptom/admin/symptoms/track-symptom";
      this.$axios
        .post(url, {
          symptom_uuid: this.$route.params.uuid,
          severity: this.slider.val,
          description: this.description,
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
        .finally(() => loader.hide());
    },

    successAlertDisplay() {
      this.$swal(
        "Tracking Successfull",
        "Symptom Tracked successfully",
        "success"
      );
    },

    errorAlertDisplay(error) {
      this.$swal("Error", error, "error");
    },
  },
  mounted() {
    this.getSymptom();
  },
};
</script>

<style scoped>

</style>