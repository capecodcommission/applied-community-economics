import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state object that all Vues share, JSON from API is loaded here
const state = {
  neighborhoods: [],
  centers: [],
  towns: [],
  townName: '',
  acscores: [
    {
      "name": "TOPICS",
      "children": [
        {
          "name": "Community Activity",
          "children": [
            {
              "name": "Community Activity",
              "size": 1
            }
          ]
        },
        {
          "name": "Business Activity",
          "children": [
            {
              "name": "Business Activity",
              "size": 0,
              "children": [
                {
                  "name": "Business Activity",
                  "size": 1
                }
              ]
            }
          ]
        },
        {
          "name": "Building Form",
          "children": [
            {
              "name": "Building Form",
              "size": 0,
              "children": [
                {
                  "name": "Building Form",
                  "size": 0,
                  "children": [
                    {
                      "name": "Building Form",
                      "size": 1
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  d3data: [
    {
      "name": "TOPICS",
      "children": [
        {
          "name": "Community Activity",
          "children": [
            {
              "name": "Community Activity",
              "size": 1
            }
          ]
        },
        {
          "name": "Business Activity",
          "children": [
            {
              "name": "Business Activity",
              "size": 0,
              "children": [
                {
                  "name": "Business Activity",
                  "size": 1
                }
              ]
            }
          ]
        },
        {
          "name": "Building Form",
          "children": [
            {
              "name": "Building Form",
              "size": 0,
              "children": [
                {
                  "name": "Building Form",
                  "size": 0,
                  "children": [
                    {
                      "name": "Building Form",
                      "size": 1
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

// Create mutations; functions to change data in the state
const mutations = {

  UPDATE_D3DATA (state, data) {

    var d3data = data.recordsets[0][0]

    state.d3data = [{
      name: "TOPICS",
      children: [
        {
          name: "Community Activity"
        },
        {
          name: "Business Activity"
        },
        {
          name: "Building Form"
        }
      ]
    }]

    var community = state.d3data[0].children[0]
    var business = state.d3data[0].children[1]
    var form = state.d3data[0].children[2]

    if (d3data.Community > 9) {

      community.children = [{
        name: "Community Activity",
        children: [{
          name: "Community Activity",
          children: [{
            name: "Community Activity",
            size: 1
          }]
        }]
      }]
    } else if (d3data.Community > 6) {

      community.children = [{
        name: "Community Activity",
        children: [{
          name: "Community Activity",
          size: 1
        }]
      }]
    } else if (d3data.Community > 2) {

      community.children = [{
        name: "Community Activity",
        size: 1
      }]
    } else if (d3data.Community >= 1) {

      community.children = [{}]
      community.size = 1
    } else {

      community.children = [{}]
      community.size = 1
    }

    if (d3data.Business > 98) {

      business.children = [{
        name: "Business Activity",
        children: [{
          name: "Business Activity",
          children: [{
            name: "Business Activity",
            size: 1
          }]
        }]
      }]
    } else if (state.d3data.Business > 34) {

      business.children = [{
        name: "Business Activity",
        children: [{
          name: "Business Activity",
          size: 1
        }]
      }]
    } else if (state.d3data.Business > 10) {

      business.children = [{
        name: "Business Activity",
        size: 1
      }]
    } else if (state.d3data.Business >= 1) {

      business.children = [{}]
      business.size = 1
    } else {

      business.size = 1
    }

    var pctG = d3data.GoodForm / d3data.Impervious

    if (pctG > .6) {

      form.children = [{
        name: "Building Form",
        children: [{
          name: "Building Form",
          children: [{
            name: "Building Form",
            size: 1
          }]
        }]
      }]
    } else if (pctG > .4) {

      form.children = [{
        name: "Building Form",
        children: [{
          name: "Building Form",
          size: 1
        }]
      }]
    } else if (pctG > .2) {

      form.children = [{
        name: "Building Form",
        size: 1
      }]
    } else if (pctG >= .01) {

      form.children = [{}]
      form.size = 1
    } else {

      form.size = 1
    }   
  },

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
    state.acscores = [
    {
      "name": "TOPICS",
      "children": [
        {
          "name": "Community Activity",
          "children": [
            {
              "name": "Community Activity",
              "size": 1
            }
          ]
        },
        {
          "name": "Business Activity",
          "children": [
            {
              "name": "Business Activity",
              "size": 0,
              "children": [
                {
                  "name": "Business Activity",
                  "size": 1
                }
              ]
            }
          ]
        },
        {
          "name": "Building Form",
          "children": [
            {
              "name": "Building Form",
              "size": 0,
              "children": [
                {
                  "name": "Building Form",
                  "size": 0,
                  "children": [
                    {
                      "name": "Building Form",
                      "size": 1
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  }
}

export default new Vuex.Store({
  state,
  mutations
})
