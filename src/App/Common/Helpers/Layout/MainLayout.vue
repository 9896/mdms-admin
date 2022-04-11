<template>
  <!-- <div id="page-container">
    <div id="content-wrap"> -->
  <div>
    <!-- --------------------------------------------- -->
    <!-- SideNave -->
    <!-- --------------------------------------------- -->
    <side-nav></side-nav>

    <div class="main-content" id="panel">
      <!-- --------------------------- ----------------->
      <!-- TopNav -->
      <!-- ------------------------------------------ -->
      <top-nav></top-nav>
      <!-- ----------------------------------- -->
      <!-- Slot MainHeader with cards ------------------->
      <!-- ----------------------------------- -->
      <slot name="main-header">
        <vue-page-transition name="fade"> </vue-page-transition>
      </slot>

      <!-- ----------------------------------- -->
      <!--Page Content ------------------->
      <!-- ----------------------------------- -->
      <div class="container-fluid mt--6 content-area">
        <div class="row">
          <div class="col">
            <slot name="content"
              >Welcome to Medical Diagnosis Management System (MDMS). It is our greatest
              desire to offer near-accurate data on medical topics. Our users are important
              to us. Proceed with the system resource managment with vigour and enthusiasm </slot
            >
          </div>
        </div>
        <!-- -------------------------------------------------- -->
        <!-- MainFooter -->
        <!-- -------------------------------------------------- -->
        <!-- <main-footer></main-footer> -->
      </div>
    </div>
  </div>
  <!-- </div>
  </div> -->
</template>

<script>
import TopNav from "./TopNav";
//import MainHeader from "./MainHeader";
import SideNav from "./SideNav";
//import MainFooter from "./MainFooter";

export default {
  name: "MainLayout",
  components: {
    TopNav,
    SideNav,
  //  MainFooter,
  },
};
</script>

<style scoped>
#page-container {
  position: relative;
  min-height: 100vh;

}

#content-wrap {
  padding-bottom: 2.5rem; /* Footer height */
}

#footer {
  position: absolute;
  bottom: 0;
  /* width: 100%; */
  height: 2.5rem; 
 
}

.footer{
 padding: 0px !important;
}
.content-area {
  margin-top: 30px !important;

  position: relative;
  min-height: 100vh;
  padding-bottom: 2.5rem;
}
</style>