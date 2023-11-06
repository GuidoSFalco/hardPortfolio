import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    page: {
      nameActualPageEspanol: 'Inicio',
      nameActualPageIngles: 'Start',
      urlActualPage: '',
    },
    // actualPage: '',
    startPage: '',
    translation: false,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
