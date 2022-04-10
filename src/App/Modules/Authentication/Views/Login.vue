<template>
  <auth-layout>
    <template slot="content">
      <!-- Header -->
      <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                <h1 class="text-white">Welcome!</h1>
                <p class="text-lead text-white">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg
            x="0"
            y="0"
            viewBox="0 0 2560 100"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              class="fill-default"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-header bg-transparent pb-5">
                <div class="text-muted text-center mt-2 mb-3">
                  <small>Sign in</small>
                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <form role="form" class="sign-in-form">
                  <!-- CombinationError -->
                  <small
                    class="form-text text-danger"
                    v-if="combinationError"
                  >
                    {{ combinationError }}
                  </small>
                  <div class="form-group mb-3">
                    <div
                      class="
                        input-group input-group-merge input-group-alternative
                      "
                    >
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><i class="ni ni-email-83"></i
                        ></span>
                      </div>
                      <input
                        class="form-control"
                        placeholder="Email"
                        type="email"
                        v-model="loginData.email"
                      />
                    </div>
                    <!--Email error -->
                    <small
                      class="form-text text-danger"
                      v-if="formError['email']"
                    >
                      {{ formError.email[0] }}
                    </small>
                  </div>
                  <div class="form-group">
                    <div
                      class="
                        input-group input-group-merge input-group-alternative
                      "
                    >
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><i class="ni ni-lock-circle-open"></i
                        ></span>
                      </div>
                      <input
                        class="form-control"
                        placeholder="Password"
                        type="password"
                        v-model="loginData.password"
                      />
                    </div>
                    <!-- Password error -->
                    <small
                      class="form-text text-danger"
                      v-if="formError['password']"
                    >
                      {{ formError.password[0] }}
                    </small>
                  </div>
                  <div
                    class="
                      custom-control custom-control-alternative custom-checkbox
                    "
                  >
                    <input
                      class="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label class="custom-control-label" for=" customCheckLogin">
                      <span class="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div class="text-center">
                    <button
                      type="button"
                      class="btn btn-primary my-4"
                      @click="logIn"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/App/Modules/Authentication/Components/AuthLayout";

export default {
  name: "Login",

  data() {
    return {
      loginData: {
        email: "kari.muller@example.org",
        password: "12345678",
      },
      formError: [],
      combinationError: false,
      loader: "spinner",
      rep: "",
    };
  },

  /**
   * Methods
   */
  methods: {
    logIn() {
      //console.log("LoginData : "+this.email +" "+ this.password);
      let progress = this.$loading.show({
        loader: this.loader,
      });
      this.combinationError = false
      this.formError = [];
      this.$axios
        .post("/authentication/admins/login", this.loginData)
        .then((response) => {
          console.log(response);
          if (response.data[0].message) {
            this.combinationError = response.data[0].message;
          }
          console.log("CombeError: " + response.data[0].message);
          let token = response.data[0].access_token;
          
          if (token) {
            this.$store.dispatch("set_token", token);
            this.setUserDetails("/admin/me");
            this.$router.push({ name: "Home" });
          }
        })
        .catch((error) => {
          console.log("From Upper section of catch:" + error);
          //if (err.response) {
          // if (err.response.data.errors !== undefined) {
          this.formError = error.response.data.errors;
          // }
          //}
          console.log("From Login Catch Error:" + this.formError);
        })
        .finally(() => {
          progress.hide();
          console.log("hehe From FInal" + this.formError);
        });
    },
  },

  components: {
    AuthLayout,
  },
};
</script>

<style scoped>
.signa-in-form {
  margin-bottom: 90px;
}
</style>