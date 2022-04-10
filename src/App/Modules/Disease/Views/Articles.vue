<template>
  <div ref="diseaseContainer">
    <div class="row">
      <div class="col-4">
        <v-text-field
          v-model="diseaseName"
          label="Search Article by Disease Name"
        ></v-text-field>
      </div>
      <div class="col-4">
        <v-btn small @click="searchDisease"> Search </v-btn>
      </div>
    </div>
    <p v-if="emptyQuery" class="text-danger font-weight-light">
      {{ emptyQuery }}
    </p>
    <p v-if="searchQuery && !noDiseases">
      Showing Results For: {{ staticDiseaseName }}
    </p>
    <p v-if="noDiseases">{{ noSymtoms }}</p>
    <a
      class="btn"
      href="#"
      @click="getAllDiseases"
      v-if="searchQuery || diseases.length == 0"
    >
      <i class="fas fa-sync"></i>Reload Articles
    </a>
    <h1 class="text-center">Disease Articles</h1>
    <!-- Cards -->
    <div class="row">
      <div class="col-6" v-for="disease in diseases" :key="disease.uuid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ disease.name }}</h5>
            <p class="card-text" v-html="disease.content"></p>
            <router-link
              class="btn btn-tooltip btn-secondary"
              data-toggle="tooltip"
              data-placement="top"
              title="Details"
              data-container="body"
              data-animation="true"
              :to="{ name: 'ReadArticle', params: { uuid: disease.uuid } }"
            >
              More...
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Element -->
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="6"
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * Name
   */
  name: "Articles",
  components: {},

  data() {
    return {
      diseases: [],
      page: undefined,
      pageCount: undefined,
      diseaseName: "",
      staticDiseaseName: "",
      searchQuery: false,
      noDiseases: false,
      emptyQuery: false,
      activePage: "",
    };
  },

  methods: {
    /**
     * Get all diseases
     *
     * @param null
     * @return {null}
     */
    getAllDiseases() {
      this.searchQuery = false;
      this.diseaseName = "";
      this.emptyQuery = false;
      let diseaseContainer = this.$refs.diseaseContainer;
      console.log(this.$refs.diseaseContainer);
      let loader = this.$loading.show({
        container: diseaseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      //get-all for diseases
      //let url = "task/task1";
      let url = "disease/admin/diseases/get-all";
      this.$axios
        .get(url, {
          params: {
            page: this.page,
          },
        })
        .then((response) => {
          let unMappedDiseases = response.data.data;
          this.diseases = [];
          this.diseases = unMappedDiseases.map(this.getDisplayDisease);
          this.page = response.data.meta.current_page;
          this.pageCount = response.data.meta.last_page;
          console.log("From Get all Diseases: " + this.page);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },

    /**
     * Link to data-table headers
     *
     * @param {disease}
     * @return {disease} The disease Object
     */
    getDisplayDisease(disease) {
      let slicedContent;
      if (disease.content.length > 45) {
        slicedContent = disease.content.slice(0, 100) + "...";
      }
      //kdkd
      return {
        name: disease.name,
        uuid: disease.uuid,
        content: slicedContent,
        prevlance_rate: disease.prevelance_rate,
        age_start: disease.age_start,
        age_end: disease.age_end,
      };
    },

    /**
     * Search specific symtom(s)
     *
     * @param { null }
     * @return { string } noDisease No disease found
     */
    searchDisease() {
      let diseaseContainer = this.$refs.diseaseContainer;
      this.diseases = [];
      this.emptyQuery = false;
      this.page = undefined;
      //this.emptyQuery
      let loader = this.$loading.show({
        container: diseaseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      //get-all for diseases
      this.$axios
        .post(
          "disease/admin/diseases/get-diseases",
          {
            disease: this.diseaseName,
          },
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((response) => {
          let unMappedDiseases = [];
          unMappedDiseases = response.data.data;
          this.diseases = [];
          this.searchQuery = true;
          this.staticDiseaseName = this.diseaseName;
          if (unMappedDiseases.length == 0) {
            return (this.noDiseases = response.data);
          }
          this.diseases = unMappedDiseases.map(this.getDisplayDisease);
          this.page = response.data.meta.current_page;
          this.pageCount = response.data.meta.last_page;

          console.log("hehe" + response.data);
        })
        .catch((error) => {
          console.log("Custom Error:" + error);
          if (error.response.data.errors.disease) {
            this.emptyQuery = error.response.data.errors.disease[0];
          }
        })
        .finally(() => loader.hide());
    },

    /**
     * Handle page change
     *
     * @param { number } value The page number clicked
     * @return { null }
     */
    handlePageChange(value) {
      this.page = value;
      // if (this.searchQuery == false) {
      this.getAllDiseases();
      // } else {
      //   this.searchDisease();
      // }
      console.log(value);
    },
  },

  /**
   * mounted hook
   */
  mounted() {
    this.getAllDiseases();
  },
};
</script>