import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./assets/tailwind.css";

import router from "./router";

import { setAuthToken } from "@/lib/axios";

const token = localStorage.getItem("jwt");
if (token) {
  setAuthToken(token);
}

createApp(App)
  .use(router)
  .mount("#app");
