import { createApp } from "vue";
import App from "./App.vue";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css"; //icons
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";
import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
