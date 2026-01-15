import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import UsersShow from '../views/UsersShow.vue'
import UsersEdit from '../views/UsersEdit.vue'
import JournalsIndex from '../views/JournalsIndex.vue'
import JournalsNewV2 from '../views/JournalsNewV2.vue'
import JournalsTemplateNew from '../views/JournalsTemplateNew.vue'
import JournalsShow from '../views/JournalsShow.vue'
import JournalsUpdate from '../views/JournalsUpdate.vue'
import ConditionsIndex from '../views/ConditionsIndex.vue'
import ConditionsNew from '../views/ConditionsNew.vue'
import ConditionsShow from '../views/ConditionsShow.vue'
import ConditionsUpdate from '../views/ConditionsUpdate.vue'
import JournalsTemplateEdit from '../views/JournalsTemplateEdit.vue'
import TreatmentsIndex from '../views/TreatmentsIndex.vue'
import TreatmentsShow from '../views/TreatmentsShow.vue'
import TreatmentsUpdate from '../views/TreatmentsUpdate.vue'
import TreatmentsNew from '../views/TreatmentsNew.vue'
import TreatmentRetrospectsNew from '../views/TreatmentRetrospectsNew.vue'
import TreatmentRetrospectsIndex from '../views/TreatmentRetrospectsIndex.vue'
import TreatmentRetrospectsShow from '../views/TreatmentRetrospectsShow.vue'
import TreatmentRetrospectsUpdate from '../views/TreatmentRetrospectsUpdate.vue'
import ChartsShow from '../views/ChartsShow.vue'
import ChartsIndex from '../views/ChartsIndex.vue'
import ChartsNew from '../views/ChartsNew.vue'
import ChartsUpdate from '../views/ChartsUpdate.vue'
import TreatmentsAll from '../views/TreatmentsAll.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'login', component: Login },
  { path: '/logout', name: 'logout', component: Logout },
  { path: '/users/:id', name: 'users-show', component: UsersShow },
  { path: '/users/:id/edit', name: 'users-edit', component: UsersEdit },
  { path: '/journals', name: 'journals-index', component: JournalsIndex },
  { path: '/journals/new', name: 'journals-new', component: JournalsNewV2 },
  { path: '/journals/template/new', name: 'journals-template-new', component: JournalsTemplateNew },
  { path: '/journals/template/:id/edit', name: 'journals-template-edit', component: JournalsTemplateEdit },
  { path: '/journals/:id', name: 'journals-show', component: JournalsShow },
  { path: '/journals/:id/edit', name: 'journals-update', component: JournalsUpdate },
  { path: '/conditions', name: 'conditions-index', component: ConditionsIndex },
  { path: '/conditions/new', name: 'conditions-new', component: ConditionsNew },
  { path: '/conditions/:id', name: 'conditions-show', component: ConditionsShow },
  { path: '/conditions/:id/edit', name: 'conditions-update', component: ConditionsUpdate },
  { path: '/conditions/:id/treatments', name: 'treatments-index', component: TreatmentsIndex },
  { path: '/conditions/:id/treatments/new', name: 'treatments-new', component: TreatmentsNew },
  { path: '/conditions/:id/treatments/:treatment_id', name: 'treatments-show', component: TreatmentsShow },
  { path: '/conditions/:id/treatments/:treatment_id/edit', name: 'treatments-update', component: TreatmentsUpdate },
  { path: '/conditions/:id/treatments/:treatment_id/treatment_retrospects/new', name: 'treatment-retrospects-new', component: TreatmentRetrospectsNew },
  { path: '/conditions/:id/treatments/:treatment_id/treatment_retrospects', name: 'treatment-retrospects-index', component: TreatmentRetrospectsIndex },
  { path: '/conditions/:id/treatments/:treatment_id/treatment_retrospects/:retrospect_id', name: 'treatment-retrospects-show', component: TreatmentRetrospectsShow },
  { path: '/conditions/:id/treatments/:treatment_id/treatment_retrospects/:retrospect_id/edit', name: 'treatment-retrospects-update', component: TreatmentRetrospectsUpdate },
  { path: '/users/:id/charts/new', name: 'charts-new', component: ChartsNew },
  { path: '/users/:id/charts/:chart_id', name: 'charts-show', component: ChartsShow },
  { path: '/users/:id/charts', name: 'charts-index', component: ChartsIndex },
  { path: '/users/:id/charts/:chart_id/edit', name: 'charts-update', component: ChartsUpdate },
  { path: '/treatments', name: 'treatments-all', component: TreatmentsAll },
  { path: '/users/:id/dashboard', name: 'dashboard', component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
