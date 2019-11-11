require("./bootstrap");

import Vue    from "vue";
import store  from "./store.js";
import router from "./routes.js";

import {initialize} from "./helpers/general";
initialize(store, router);

const moment = require("moment");
require("moment/locale/ru");
Vue.use(require("vue-moment"), {
    moment
});

const app = new Vue({
    router,
    store,
}).$mount('#app');

Vue.config.productionTip = false;