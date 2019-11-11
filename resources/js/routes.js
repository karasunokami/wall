import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main",
            component: Vue.component("Main", require("./pages/Main.vue").default)
        },
        {
            path: "/login",
            name: "login",
            component: Vue.component("Login", require("./pages/Login.vue").default)
        },
        {
            path: "/register",
            name: "register",
            component: Vue.component("Register", require("./pages/Register.vue").default)
        }
    ]
});