import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state object that all Vues share, JSON from API is loaded here
const state = {
  neighborhoods: [],
  centers: [],
  towns: [],
  townName: '',
  acscores: []
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
  },

  LOAD_ACSCORES (state, scores, type) {

    state.acscores = scores.recordsets[0]

    for (var i = state.acscores.length - 1; i >= 0; i--) {

      state.acscores[i].comScore = 0
      state.acscores[i].buScore = 0
      state.acscores[i].formScore = 0

      if (type === 'ac') {

        if (state.acscores[i].Community > 9) {

          state.acscores[i].comScore = 4
        } else if (state.acscores[i].Community > 6) {

          state.acscores[i].comScore = 3
        } else if (state.acscores[i].Community > 2) {

          state.acscores[i].comScore = 2
        } else if (state.acscores[i].Community >= 1) {

          state.acscores[i].comScore = 1
        } else {

          state.acscores[i].comScore = 0
        }

        if (state.acscores[i].Business > 98) {

          state.acscores[i].buScore = 4
        } else if (state.acscores[i].Business > 34) {

          state.acscores[i].buScore = 3
        } else if (state.acscores[i].Business > 10) {

          state.acscores[i].buScore = 2
        } else if (state.acscores[i].Business >= 1) {

          state.acscores[i].buScore = 1
        } else {

          state.acscores[i].buScore = 0
        }

        var pctG = state.acscores[i].GoodForm / state.acscores[i].Impervious

        if (pctG > .6) {

          state.acscores[i].formScore = 4
        } else if (pctG > .4) {

          state.acscores[i].formScore = 3
        } else if (pctG > .2) {

          state.acscores[i].formScore = 2
        } else if (pctG >= .01) {

          state.acscores[i].formScore = 1
        } else {

          state.acscores[i].formScore = 0
        }
      } else if (type === 'twn') {

        if (state.acscores[i].Community > 9) {

          state.acscores[i].comScore = 4
        } else if (state.acscores[i].Community > 6) {

          state.acscores[i].comScore = 3
        } else if (state.acscores[i].Community > 2) {

          state.acscores[i].comScore = 2
        } else if (state.acscores[i].Community >= 1) {

          state.acscores[i].comScore = 1
        } else {

          state.acscores[i].comScore = 0
        }

        if (state.acscores[i].Business > 98) {

          state.acscores[i].buScore = 4
        } else if (state.acscores[i].Business > 34) {

          state.acscores[i].buScore = 3
        } else if (state.acscores[i].Business > 10) {

          state.acscores[i].buScore = 2
        } else if (state.acscores[i].Business >= 1) {

          state.acscores[i].buScore = 1
        } else {

          state.acscores[i].buScore = 0
        }

        var pctG = state.acscores[i].GoodForm / state.acscores[i].Impervious

        if (pctG > .6) {

          state.acscores[i].formScore = 4
        } else if (pctG > .4) {

          state.acscores[i].formScore = 3
        } else if (pctG > .2) {

          state.acscores[i].formScore = 2
        } else if (pctG >= .01) {

          state.acscores[i].formScore = 1
        } else {

          state.acscores[i].formScore = 0
        }
      } else if (type === 'nbh') {

        if (state.acscores[i].Community > 9) {

          state.acscores[i].comScore = 4
        } else if (state.acscores[i].Community > 6) {

          state.acscores[i].comScore = 3
        } else if (state.acscores[i].Community > 2) {

          state.acscores[i].comScore = 2
        } else if (state.acscores[i].Community >= 1) {

          state.acscores[i].comScore = 1
        } else {

          state.acscores[i].comScore = 0
        }

        if (state.acscores[i].Business > 98) {

          state.acscores[i].buScore = 4
        } else if (state.acscores[i].Business > 34) {

          state.acscores[i].buScore = 3
        } else if (state.acscores[i].Business > 10) {

          state.acscores[i].buScore = 2
        } else if (state.acscores[i].Business >= 1) {

          state.acscores[i].buScore = 1
        } else {

          state.acscores[i].buScore = 0
        }

        var pctG = state.acscores[i].GoodForm / state.acscores[i].Impervious

        if (pctG > .6) {

          state.acscores[i].formScore = 4
        } else if (pctG > .4) {

          state.acscores[i].formScore = 3
        } else if (pctG > .2) {

          state.acscores[i].formScore = 2
        } else if (pctG >= .01) {

          state.acscores[i].formScore = 1
        } else {

          state.acscores[i].formScore = 0
        }
      }
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
