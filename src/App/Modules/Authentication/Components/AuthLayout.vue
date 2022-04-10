<template>
  <div class="bg-default" id="page-container">
    <!-- Navbar -->
    <nav
      id="navbar-main"
      class="
        navbar
        navbar-horizontal
        navbar-transparent
        navbar-main
        navbar-expand-lg
        navbar-light
      "
    >
      <div class="container">
        <router-link to="{name: 'Home}">
          <img src="" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar-collapse navbar-custom-collapse collapse"
          id="navbar-collapse"
        >
          <div class="navbar-collapse-header">
            <div class="row">
              <div class="col-6 collapse-brand">
                <a href="dashboard.html">
                  <img src="" />
                </a>
              </div>
              <div class="col-6 collapse-close">
                <button
                  type="button"
                  class="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbar-collapse"
                  aria-controls="navbar-collapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link">
                <span class="nav-link-inner--text">Dashboard</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Login' }" class="nav-link">
                <span class="nav-link-inner--text">Login</span>
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link :to="{ name: 'Register' }" class="nav-link">
                <span class="nav-link-inner--text">Register</span>
              </router-link>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
    <!-- Main content -->
    <div class="main-content">
      <!-- ------------------------------------------------------ -->
      <!-- Content Slot -->
      <!-- ------------------------------------------------------ -->
      <slot name="content"></slot>

      <!-- ./Slot -->
    </div>
    <!-- ------------------------------------------------------ -->
    <!-- Footer -->
    <!-- ------------------------------------------------------ -->
    <!-- Footer -->
    <!-- <footer class="py-5" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; 2020
              <a href="#" class="font-weight-bold ml-1" target="_blank"
                >Manuel</a
              >
            </div>
          </div>
          <div class="col-xl-6">
            <ul
              class="
                nav nav-footer
                justify-content-center justify-content-xl-end
              "
            >
              <li class="nav-item">
                <a href="#" class="nav-link" target="_blank">Manuel</a>
              </li>
              <li class="nav-item">
                <a href="#/" class="nav-link" target="_blank">About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped>
#page-container {
  position: relative;
  min-height: 100vh;
}
</style>