import { createApp } from "vue";
import App from "./App.vue";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css"; //icons
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Tooltip from "primevue/tooltip";
import ProgressSpinner from "primevue/progressspinner";
import InputText from "primevue/inputtext";

const app = createApp(App);
app.use(PrimeVue);

app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("InputText", InputText);
app.component("ProgressSpinner", ProgressSpinner);
app.directive("tooltip", Tooltip);

app.mount("#app");
