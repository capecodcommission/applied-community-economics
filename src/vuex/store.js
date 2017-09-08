import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state object that all Vues share, JSON from API is loaded here
const state = {
  neighborhoods: [],
  centers: [],
  towns: [],
  townName: ''
}

// Create mutations; functions to change data in the state
const mutations = {

  LOAD_NEIGHBORHOODS (state, neighborhoods) {

    state.neighborhoods = neighborhoods
  },

  LOAD_ACTIVITYCENTERS (state, centers) {

  	state.centers = centers
  },

  LOAD_TOWNS (state, towns) {

    state.towns = towns
  },

  LOAD_TOWNNAME (state, name) {

    state.townName = name
  }
}

export default new Vuex.Store({
  state,
  mutations
})
