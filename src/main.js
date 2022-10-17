import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"

import "./assets/tailwind.css";
import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia());
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(axios)
app.mount("#app");

