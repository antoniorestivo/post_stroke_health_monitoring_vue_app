import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import JournalsIndex from "../views/JournalsIndex.vue";
import JournalsNewV2 from "../views/JournalsNewV2.vue";
import JournalsTemplateNew from "../views/JournalsTemplateNew.vue";
import JournalsShow from "../views/JournalsShow.vue";
import JournalsUpdate from "../views/JournalsUpdate.vue";
import ConditionsIndex from "../views/ConditionsIndex.vue";
import ConditionsNew from "../views/ConditionsNew.vue";
import ConditionsShow from "../views/ConditionsShow.vue";
import ConditionsUpdate from "../views/ConditionsUpdate.vue";
import JournalsTemplateEdit from "../views/JournalsTemplateEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  { path: "/logout", name: "logout", component: Logout },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow,
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit,
  },
  {
    path: "/journals",
    name: "journals-index",
    component: JournalsIndex,
  },
  {
    path: "/journals/new",
    name: "journals-new",
    component: JournalsNewV2,
  },
  {
    path: "/journals/template/new",
    name: "journals-template-new",
    component: JournalsTemplateNew,
  },
  {
    path: "/journals/template/:id/edit",
    name: "journals-template-edit",
    component: JournalsTemplateEdit,
  },
  {
    path: "/journals/:id",
    name: "journals-show",
    component: JournalsShow,
  },
  {
    path: "/journals/:id/edit",
    name: "journals-update",
    component: JournalsUpdate,
  },
  {
    path: "/conditions",
    name: "conditions-index",
    component: ConditionsIndex
  },
  {
    path: "/conditions/new",
    name: "conditions-new",
    component: ConditionsNew
  },
  {
    path: "/conditions/:id",
    name: "conditions-show",
    component: ConditionsShow
  },
  {
    path: "/conditions/:id/edit",
    name: "conditions-update",
    component: ConditionsUpdate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
