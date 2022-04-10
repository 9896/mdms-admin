  <template>
  <!-- Sidenav -->
  <nav
    class="
      sidenav
      navbar navbar-vertical
      fixed-left
      navbar-expand-xs navbar-light
      bg-white
    "
    id="sidenav-main"
  >
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="sidenav-header align-items-center">
        <a class="navbar-brand" href="javascript:void(0)">
          <h4 class="navbar-heading p-0 text-muted">
            <span class="docs-normal">Admin Dashboard</span>
          </h4>
        </a>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->

          <!-- Home Page -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link">
                <i class="fa fa-home" aria-hidden="true"></i>
                <span class="nav-link-text">Home</span></router-link
              >
            </li>
          </ul>

          <!--Disease Heading -->
          <h6 class="navbar-heading p-0 text-muted">
            <span class="docs-normal">Diseases</span>
          </h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'AllDiseases' }" class="nav-link">
                <i class="fa fa-list" aria-hidden="true"></i>
                <span class="nav-link-text">Disease List</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'CreateDisease' }" class="nav-link">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <span class="nav-link-text">Add Disease</span></router-link
              >
            </li>
          </ul>

          <!--Symptoms Heading -->
          <h6 class="navbar-heading p-0 text-muted">
            <span class="docs-normal">Symptoms</span>
          </h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'AllSymptoms' }" class="nav-link">
                <i class="fa fa-list" aria-hidden="true"></i>
                <span class="nav-link-text">Symptoms List</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'CreateSymptom' }" class="nav-link">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <span class="nav-link-text">Add Symptom</span></router-link
              >
            </li>
          </ul>

          <!-- Divider -->
          <hr class="my-3" />

          <h6 class="navbar-heading p-0 text-muted">
            <span class="docs-normal">Symptom Tracking</span>
          </h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'AllSymptoms' }" class="nav-link">
                <i class="fas fa-assistive-listening-systems"></i>
                <span class="nav-link-text">Track Symptom</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'TrackedSymptoms' }" class="nav-link">
                <i class="fa fa-list" aria-hidden="true"></i>
                <span class="nav-link-text">Tracked Symptoms</span></router-link
              >
            </li>
          </ul>

          <!-- Divider -->
          <hr class="my-3" />

          <h6 class="navbar-heading p-0 text-muted">
            <span class="docs-normal">Options</span>
          </h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'Diagnose' }" class="nav-link">
                <i class="fas fa-stethoscope" aria-hidden="true"></i>
                <span class="nav-link-text">Run Diagnosis</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Articles' }" class="nav-link">
                <i class="fas fa-newspaper" aria-hidden="true"></i>
                <span class="nav-link-text">Articles</span></router-link
              >
            </li>
          </ul>
          <!-- Divider -->
          <hr class="my-3" />
          <!-- Heading -->
          <h6 class="navbar-heading p-0 text-muted">
            <span class="docs-normal">User Actions</span>
          </h6>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'DoctorPermissions' }" class="nav-link">
                <i class="fas fa-user-check" aria-hidden="true"></i>
                <span class="nav-link-text">Permissions</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'CreateDoctor' }" class="nav-link">
                <i class="fas fa-plus" aria-hidden="true"></i>
                <span class="nav-link-text">Create Doctor</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Contact' }" class="nav-link">
                <i class="fas fa-id-card" aria-hidden="true"></i>
                <span class="nav-link-text">Contact Us</span></router-link
              >
            </li>

            <li class="nav-item">
              <a @click="logOut" class="nav-link">
                <i class="ni ni-user-run" aria-hidden="true"></i>
                <span class="nav-link-text">Log out</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
//import $ from "jquery";

export default {
  name: "SideNav",
  data() {
    return {
      diseasePdsaPanelToggle: true, //means show is available
      symptomPdsaPanelToggle: true, //means show is unavailable
    };
  },
  computed: {
    diseaseBoldArrow() {
      return this.diseasePdsaPanelToggle ? "ni-bold-down" : "ni-bold-right";
    },
    symptomBoldArrow() {
      return this.symptomPdsaPanelToggle ? "ni-bold-down" : "ni-bold-right";
    },
  },
  methods: {
    toggleDiseaseBoldArrow() {
      if (this.diseasePdsaPanelToggle == true) {
        this.diseasePdsaPanelToggle = false;
      } else {
        this.diseasePdsaPanelToggle = true;
      }
      //alert(event.target.tagName);
      this.symptomPdsaPanelToggle = false;
      console.log(this.diseasePdsaPanelToggle);
    },
    toggleSymptomBoldArrow() {
      if (this.symptomPdsaPanelToggle == true) {
        this.symptomPdsaPanelToggle = false;
      } else {
        this.symptomPdsaPanelToggle = true;
      }
      this.diseasePdsaPanelToggle = false;
      console.log(this.symptomPdsaPanelToggle);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.card > .card-header > .card-title > a {
  text-decoration: none;
}
.pdsa-panel-toggle {
  float: right;
  cursor: pointer;
}

.card {
  margin-bottom: 0px;
}
</style>
      