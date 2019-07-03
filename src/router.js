import Vue from "vue";
import Router from "vue-router";
import DomoHome from "@/views/DomoHome";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "domo-home",
      component: DomoHome
    }
  ]
});
