<template>
  <!-- Topnav -->
  <nav
    class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom"
  >
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <h1 class="text-center navbar-text">MDMS</h1>

        <nav class="navbar navbar-expand-lg navbar-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav"></ul>
          </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav left">

            </ul>
          </div>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style scoped>
.navbar-text {
  color: rgb(233, 233, 233);
}

nav {
  width: 100%;
}

ul.left {
  position: absolute;
  right: 0;
}
</style>