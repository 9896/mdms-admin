<template>
  <div ref="symptomContainer">
    <h1>Create, Update, Delete (CUD) Permissions Control</h1>

    <v-data-table
      :headers="headers"
      :items="doctors"
      disable-pagination
      :hide-default-footer="true"
    >
      <template v-slot:item.actions="{ item }">
        <div class="nowrap-buttons">
          <button
            class="btn btn-danger"
            v-if="item.permission == true"
            @click="permissionAlertDisplay({uuid: item.uuid, cud: item.permission})"
          >
            Revoke
          </button>
          <button
            class="btn btn-success"
            v-if="item.permission == false"
            @click="permissionAlertDisplay({uuid: item.uuid, cud: item.permission})"
          >
            Grant
          </button>
        </div>
      </template>
    </v-data-table>

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
  name: "DoctorPermissions",
  data() {
    return {
      loader: "dots",
      doctors: [],
      staticSymptomName: "",
      searchQuery: false,
      noSymptoms: false,
      emptyQuery: false,
      page: undefined,
      pageCount: undefined,
      activePage: "",
      headers: [
        { text: "Doctors", align: "start", value: "name" },
        { text: "Actions", sortable: false, value: "actions" },
        //{ text: "Uuid", sortable: "false", value: "uuid" }
      ],
    };
  },
  components: {},

  /**
   * methods
   */

  methods: {
    /**
     * Get all symptoms
     *
     * @param null
     * @return {null}
     */
    getAllDoctors() {
      this.searchQuery = false;
      this.emptyQuery = false;
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
      this.$axios
        .get("doctor/doctors/get-all-doctors", {
          params: {
            page: this.page,
          },
        })
        .then((response) => {
          let unMappedDoctors = response.data.data;
          this.doctors = [];
          this.doctors = unMappedDoctors.map(this.getDisplayDoctor);
          this.page = response.data.meta.current_page;
          this.pageCount = response.data.meta.last_page;
          console.log("From Get all Doctors: " + this.page);
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
    getDisplayDoctor(doctor) {
      return {
        name: doctor.first_name,
        uuid: doctor.uuid,
        permission: doctor.CUD,
      };
    },

    /**
     * Handle page change
     *
     * @param { number } value The page number clicked
     * @return { null }
     */
    handlePageChange(value) {
      this.page = value;
      if (this.searchQuery == false) {
        this.getAllDoctors();
      } else {
        this.searchSymptom();
      }
      console.log(value);
    },

    /**
     * Grant/Revoke
     *
     * @param { string } uuid
     * @return { null }
     */
    togglePermission(uuid, cud) {
      let symptomContainer = this.$refs.symptomContainer;
      //this.emptyQuery
      let loader = this.$loading.show({
        container: symptomContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      
      let url = "";
      if (cud) {
        url = "admin/admins/revoke-doctor-cud/" + uuid;
      } else {
        url = "admin/admins/grant-doctor-cud/" + uuid;
      }
      this.$axios
        .post(url)
        .then((response) => {
          console.log("hehe" + response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },

    permissionAlertDisplay(permissionData) {
      console.log(permissionData.uuid+ "/"+permissionData.cud);
      this.$swal({
        title: "Are you sure?",
        text: "Change Permission",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Change",
        cancelButtonText: "Cancel",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        console.log(result.value);
        if (result.value) {
          this.togglePermission(permissionData.uuid, permissionData.cud);
          this.getAllDoctors();
        }
      });
    },
  },
  mounted() {
    this.getAllDoctors();
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