import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import LogInView from "@/views/LogInView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LogInView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
