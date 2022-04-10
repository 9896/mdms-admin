<template>
  <form ref="symptomContainer">
    <!-- <div class="form-group">
      <label for="firstName">First Name</label>
      <input
        v-model="doctor.firstName"
        type="text"
        class="form-control"
        id="firstName"
        aria-describedby="emailHelp"
      />
    </div>
    <p v-if="errorResponse.first_name" class="text-danger font-weight-light">
      {{ errorResponse.first_name[0] }}
    </p>

    <div class="form-group">
      <div>
        <label for="lastName">Last Name</label>
        <input
          v-model="doctor.lastName"
          type="text"
          class="form-control"
          id="lastName"
          aria-describedby="emailHelp"
        />
      </div>
    </div>
    <p v-if="errorResponse.last_name" class="text-danger font-weight-light">
      {{ errorResponse.last_name[0] }}
    </p> -->

    <div class="form-group">
      <label for="email">Email address</label>
      <input
        v-model="doctor.email"
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
      />
    </div>
    <p v-if="errorResponse.email" class="text-danger font-weight-light">
      {{ errorResponse.email[0] }}
    </p>

    <!-- <div class="form-group">
      <label for="phoneNumber">Phone Number</label>
      <input
        v-model="doctor.phoneNumber"
        type="text"
        class="form-control"
        id="phoneNumber"
        aria-describedby="emailHelp"
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="doctor.password"
        type="password"
        class="form-control"
        id="password"
        aria-describedby="emailHelp"
      />
    </div>
    <p v-if="errorResponse.password" class="text-danger font-weight-light">
      {{ errorResponse.password[0] }}
    </p> -->

    <button class="btn btn-primary" @click="createDoctor">Create Invitation</button>
  </form>
</template>

<script>
export default {
  /**
   * Component name
   */
  name: "CreateDoctor",
  components: {},
  /**
   * properties
   */
  data() {
    return {
      symptomName: "",
      doctor: {
        firstName: "a",
        lastName: "b",
        email: "a@gmail.com",
        phoneNumber: 654321,
        password: 123456,
      },
      successResponse: false,
      errorResponse: false,
    };
  },
  /**
   * methods
   */
  methods: {
    /**
     * Create doctor
     *
     * @param { null }
     * @return { null }
     */
    createDoctor() {
      this.errorResponse = false;
      let symptomContainer = this.$refs.symptomContainer;
      let loader = this.$loading.show({
        container: symptomContainer,
        //isFullPage: false,
        loader: this.loader,
        //canCancel: true,
        onCancel: this.cancelled,
      });
      console.log(this.doctor.firstName+this.doctor.lastName+this.doctor.email+this.doctor.phoneNumber+this.doctor.password);
      let url = "doctor/doctors/store-doctor";
      this.$axios
        .post(url, {
          first_name: this.doctor.firstName,
          last_name: this.doctor.lastName,
          email: this.doctor.email,
          phone_number: this.doctor.phoneNumber,
          password: this.doctor.password,
        })
        .then((response) => {
          this.successResponse = response.data;
          this.successAlertDisplay();
        })
        .catch((error) => {
          console.log("From Catch Create DOc"+error.response.data.message);
          //console.log(error.response.data.errors);
          //if (error.response.data.errors.name) {
          this.errorResponse = error.response.data.errors;
          //this.errorAlertDisplay(this.errorResponse);
          //}
        })
        .finally(() => loader.hide());
    },

    successAlertDisplay() {
      this.$swal(
        "Email Saved",
        "Invitation sent successfully",
        "success"
      );
    },

    errorAlertDisplay(error) {
      this.$swal("Error", error, "error");
    },
  },
  mounted() {},
};
</script>