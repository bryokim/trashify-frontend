import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "./assets/styles/base.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$http = axios;

app.use(pinia);
app.use(router);
app.mount("#app");
