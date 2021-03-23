<template>
  <div id="app">
  
    <header class="header">
      <!-- Topbar -->
      <div class="topbar">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="d-block d-md-flex align-items-center text-center">
                <div class="mr-3 d-inline-block">
                  
                  <!-- <a href="mailto:gethelp@psycare.com"><i class="far fa-envelope mr-2 fa-flip-horizontal"></i>gethelp@psycare.com</a> -->
                </div>
                <div class="mr-auto d-inline-block">
                  <!-- <a href="tel:0123456789"><i class="fa fa-phone mr-2 fa fa-flip-horizontal"></i>0123-456-789</a> -->
                </div>
                <div class="d-inline-block mr-3">
                  <ul class="list-unstyled">
                    <li class="logout"><router-link v-if="isLoggedIn()" to="/logout">Logout</router-link></li>
                    <li class="login"><router-link v-if="!isLoggedIn()" to="/login">Login</router-link></li>
                    <li><router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link></li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Topbar -->

      <!-- Nav -->
      <nav class="navbar navbar-static-top navbar-expand-lg header-sticky">
        <!-- <h1>Post-Stroke Health Monitoring App</h1> -->
        <div class="container">
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse"><i class="fas fa-align-left"></i></button>
          
          <div class="navbar-collapse collapse justify-content-center">
            <ul class="nav navbar-nav">
             
              <li class="nav-item dropdown">
                <router-link class="nav-link dropdown-toggle" v-if="isLoggedIn()" to="/conditions">Patient Conditions</router-link>
              </li>
              <li class="nav-item dropdown">
                <router-link class="nav-link dropdown-toggle" v-if="isLoggedIn()" to="/journals">Journals</router-link>
              </li>
              <li class="nav-item dropdown">
                <router-link class="nav-link dropdown-toggle" v-if="isLoggedIn()" to="/users/me">User Profile</router-link>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
      <!-- Nav -->
    </header>
    <!--=================================
     header -->
    
    
     
      
    <router-view/>
    
  </div>
</template>

<style>

</style>

<script>
export default {
  data: function() {
    return {
      
    };
  },
  created: function() {},
  methods: {
    isLoggedIn: function(){
      return localStorage.getItem("jwt");
    }
  }
};
</script>


