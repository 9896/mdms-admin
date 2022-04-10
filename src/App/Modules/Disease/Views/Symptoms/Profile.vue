<template>
  <form ref="symptomContainer">
    <div class="form-group">
      <label for="first-name">Email</label>
      <input
        disabled
        v-model="userInfo.email"
        type="text"
        class="form-control"
        id="Email"
      />
    </div>

    <div class="form-group">
      <label for="first-name">First Name</label>
      <input
        v-model="userInfo.first_name"
        type="text"
        class="form-control"
        id="first-name"
        placeholder="First name"
      />
    </div>
    <p v-if="errorResponse.first_name" class="text-danger font-weight-light">
      {{ errorResponse.first_name[0] }}
    </p>
    <div class="form-group">
      <label for="last-name">Last Name</label>
      <input
        v-model="userInfo.last_name"
        type="text"
        class="form-control"
        id="last-name"
        placeholder="Last name"
      />
    </div>
    <p v-if="errorResponse.last_name" class="text-danger font-weight-light">
      {{ errorResponse.last_name[0] }}
    </p>
    <div class="form-group">
      <label for="phone-number">Phone Number</label>
      <input
        v-model="userInfo.phone_number"
        type="text"
        class="form-control"
        id="phone-number"
        placeholder="Phone number"
      />
    </div>
    <p v-if="errorResponse.phone_number" class="text-danger font-weight-light">
      {{ errorResponse.phone_number[0] }}
    </p>
    <!-- <p v-if="serverResponse" class="text-danger font-weight-light">
      {{ serverResponse }}
    </p> -->

    <!-- <p v-if="updateSuccess" class="text-success font-weight-light">
      {{ updateSuccess[0] }}
    </p> -->
    <button class="btn btn-primary" @click="updateMe">Update</button>
  </form>
</template>

<script>
export default {
  /**
   * Component name
   */
  name: "Profile",
  components: {},
  /**
   * properties
   */
  data() {
    return {
      userInfo: {
        phone_number: "",
        first_name: "",
        last_name: "",
      },

      successResponse: false,
      errorResponse: false,
    };
  },
  /**
   * methods
   */
  methods: {
    successAlertDisplay() {
      this.$swal(
        "Udpate Successfull",
        "Personal Info updated successfully",
        "success"
      );
    },

    errorAlertDisplay(error) {
      this.$swal("Error", error, "error");
    },

    getMe() {
      let diseaseContainer = this.$refs.diseaseContainer;
      let loader = this.$loading.show({
        container: diseaseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });

      let url = "/admin/me";
      this.$axios
        .get(url)
        .then((response) => {
          console.log(response);
          let data = response.data.data;
          this.userInfo.first_name = data.first_name;
          this.userInfo.last_name = data.last_name;
          this.userInfo.phone_number = data.phone_number;
          this.userInfo.permission = data.CUD;
          this.userInfo.email = data.email;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => loader.hide());
    },

    updateMe() {
      let diseaseContainer = this.$refs.diseaseContainer;
      let loader = this.$loading.show({
        container: diseaseContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });

      let url = "/admin/admins/update";
      this.$axios
        .post(url, {
          first_name: this.userInfo.first_name,
          last_name: this.userInfo.last_name,
          phone_number: this.userInfo.phone_number,
        })
        .then((response) => {
          console.log(response);
          this.successAlertDisplay();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.errors);
          //if (error.response.data.errors.name.length) {
          this.errorResponse = error.response.data.errors;
          console.log("serverResponse:");
          //console.log(this.serverResponse);
          //this.errorAlertDisplay(this.serverResponse);
          //}
        })
        .finally(() => loader.hide());
    },
  },
  mounted() {
    this.getMe();
  },
};
</script>