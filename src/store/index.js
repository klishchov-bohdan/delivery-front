import Vue from "vue";
import Vuex from "vuex";

import suppliersState from "./suppliers"
import profile from "./profile";

Vue.use(Vuex);

const modules = {
  suppliers: suppliersState,
  profile: profile
}

export default new Vuex.Store({
  modules
});
