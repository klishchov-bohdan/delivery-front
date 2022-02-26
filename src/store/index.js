import Vue from "vue";
import Vuex from "vuex";

import suppliersState from "./suppliers"

Vue.use(Vuex);

const modules = {
  suppliers: suppliersState,
}

export default new Vuex.Store({
  modules
});
