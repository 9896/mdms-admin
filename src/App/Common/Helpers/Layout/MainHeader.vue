<template>
  <!-- Header -->
  <div class="header bg-primary pb-6">
    <div class="container-fluid">
      <div class="header-body">
        <div class="row align-items-center py-4"></div>
        <!-- Card stats -->
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <div class="card card-stats">
              <!-- Card body -->
              <router-link :to="{ name: 'DoctorPermissions' }">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">
                        Doctors
                      </h5>

                      <span class="h2 font-weight-bold mb-0">{{
                        doctors
                      }}</span>
                      <v-progress-circular
                        v-if="!info"
                        indeterminate
                        color="primary"
                      >
                      </v-progress-circular>
                    </div>
                    <div class="col-auto">
                      <div
                        class="
                          icon icon-shape
                          bg-gradient-red
                          text-white
                          rounded-circle
                          shadow
                        "
                      >
                        <i class="fa fa-user-md" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card card-stats">
              <!-- Card body -->
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">
                      Users
                    </h5>
                    <span class="h2 font-weight-bold mb-0">{{ users }}</span>
                    <v-progress-circular
                      v-if="!info"
                      indeterminate
                      color="primary"
                    >
                    </v-progress-circular>
                  </div>
                  <div class="col-auto">
                    <div
                      class="
                        icon icon-shape
                        bg-gradient-orange
                        text-white
                        rounded-circle
                        shadow
                      "
                    >
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card card-stats">
              <!-- Card body -->
              <router-link :to="{ name: 'AllSymptoms' }">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">
                        Symptoms
                      </h5>

                      <span class="h2 font-weight-bold mb-0">{{
                        symptoms
                      }}</span>
                      <v-progress-circular
                        v-if="!info"
                        indeterminate
                        color="primary"
                      >
                      </v-progress-circular>
                    </div>
                    <div class="col-auto">
                      <div
                        class="
                          icon icon-shape
                          bg-gradient-green
                          text-white
                          rounded-circle
                          shadow
                        "
                      >
                        <i class="fa fa-map-signs" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card card-stats">
              <!-- Card body -->
              <router-link :to="{ name: 'AllDiseases' }">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">
                        Diseases
                      </h5>
                      <span class="h2 font-weight-bold mb-0">{{
                        diseases
                      }}</span>
                      <v-progress-circular
                        v-if="!info"
                        indeterminate
                        color="primary"
                      >
                      </v-progress-circular>
                    </div>
                    <div class="col-auto">
                      <div
                        class="
                          icon icon-shape
                          bg-gradient-info
                          text-white
                          rounded-circle
                          shadow
                        "
                      >
                        <i class="fa fa-snowflake-o" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * name
   */
  name: "MainHeader",

  /**
   * Data
   */
  data() {
    return {
      doctors: "",
      users: "",
      symptoms: "",
      diseases: "",
      info: false,
    };
  },

  /**
   * Methods
   *
   */
  methods: {
    getStatistics() {
      let url = "disease/admin/diseases/get-statistics";
      this.$axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.doctors = response.data.doctors;
          this.users = response.data.users;
          this.symptoms = response.data.symptoms;
          this.diseases = response.data.diseases;
          this.info = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  /**
   * Mounted hook
   */
  mounted() {
    this.getStatistics();
  },
};
</script>