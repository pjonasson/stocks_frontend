import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "pacific-fjord-09245.herokuapp.com";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
