<template>
  <div id="app">
    <div id="nav">
      <h1>Post-Stroke Health Monitoring App</h1>
      <router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link>
      |
      <router-link v-if="!isLoggedIn()" to="/login">Login</router-link>
      
      <router-link v-if="isLoggedIn()" to="/">Patient Conditions</router-link> |

      <router-link v-if="isLoggedIn()" to="/journals">Journals</router-link> |

<router-link v-if="isLoggedIn()" to="/logout">Logout</router-link> |

<router-link v-if="isLoggedIn()" to="/users/${user.id}">User Profile</router-link> |
      
      
    </div>
    <router-view/>
    
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
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


