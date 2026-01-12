<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "@/lib/axios";
import { logout } from "@/lib/auth";

export default {
  created() {
    delete axios.defaults.headers.common["Authorization"];
    logout();
    this.$router.push("/");
  }
};
</script>