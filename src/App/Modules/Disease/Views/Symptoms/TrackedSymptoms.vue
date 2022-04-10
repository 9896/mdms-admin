<template>
  <div ref="symptomContainer">
    <h1>Tracked Symptoms</h1>

    <v-data-table
      :headers="headers"
      :items="symptoms"
      disable-pagination
      :hide-default-footer="true"
    >
      <template v-slot:item.actions="{ item }">
        <div class="nowrap-buttons">
          <router-link
            class="btn btn-tooltip"
            data-toggle="tooltip"
            data-placement="top"
            title="View"
            data-container="body"
            data-animation="true"
            :to="{ name: 'TrackedSymptom', params: { uuid: item.uuid } }"
          >
            <i class="fas fa-edit"></i>
          </router-link>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "TrackedSymptoms",
  data() {
    return {
      loader: "dots",
      symptoms: [],
      symptomName: "",
      noSymptoms: false,
      headers: [
        { text: "Symptoms", sortable: false, align: "start", value: "name" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
    };
  },
  components: {},

  /**
   * methods
   */

  methods: {
    /**
     * Get all tracked symptoms
     *
     * @param null
     * @return {null}
     */
    getTrackedSymptoms() {
      let symptomContainer = this.$refs.symptomContainer;
      console.log(this.$refs.symptomContainer);
      let loader = this.$loading.show({
        container: symptomContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      //get-all for symptoms
      let url = "symptom/admin/symptoms/get-tracked-symptoms";
      this.$axios
        .get(url)
        .then((response) => {
          let unMappedSymptoms = response.data.data;
          this.symptoms = [];
          this.symptoms = unMappedSymptoms.map(this.getDisplaySymptom);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },

    /**
     * Link to data-table headers
     *
     * @param {symptom}
     * @return {symptom} The symptom Object
     */
    getDisplaySymptom(symptom) {

      return {
        name: symptom.name,
        uuid: symptom.uuid,
      };
    },
  },
  mounted() {
    this.getTrackedSymptoms();
  },
};
</script>

<style scoped>
.cont {
  position: relative;
}

.nowrap-buttons {
  white-space: nowrap !important;
}

.search-group {
  white-space: nowrap;
}
</style>