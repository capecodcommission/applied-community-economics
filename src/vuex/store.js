import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state object that all Vues share, JSON from API is loaded here
const state = {
  tracts2: [],
  blockGroups2: [],
  censusTowns: [],
  tracts: [],
  blockGroups: [],
  attributes: {
    Land: false,
    Water: false,
    Toggle: false,
    less10k: false,
    ten14: false,
    fifteen19: false,
    twenty24: false,
    twentyFive29: false,
    thirty34: false,
    thirtyFive39: false,
    fourty44: false,
    fourtyFive49: false,
    fifty59: false,
    sixty74: false,
    seventyFive99: false,
    hundred124: false,
    hundredTwentyFive149: false,
    hundredFifty199: false,
    twoHundredPlus: false,
    paretoMedian: false,
    percUnemp: false,
    lessHS: false,
    hsg: false,
    sca: false,
    bac: false,
    gradPro: false,
    totalEdu: false,
    incLessHS: false,
    incHSG: false,
    incSCA: false,
    incBac: false,
    incGrad: false,
    townIncLessHS: false,
    townIncHSG: false,
    townIncSCA: false,
    townIncBac: false,
    townIncGrad: false,
    townParetoMedian: false,
    townPercUnemp: false,
    townHSG: false,
    townSCA: false,
    townGradPro: false,
    townLessHS: false,
    townBac: false,
    townEdu: false,
    townIncLessHSROT: false,
    townIncHSGROT: false,
    townIncSCAROT: false,
    townIncBacROT: false,
    townIncGradROT: false,
    percUnempCont: false,
    lessHSCont: false,
    hsgCont: false,
    scaCont: false,
    bacCont: false,
    gradProCont: false,
    totalEduCont: false,
    incLessHSCont: false,
    incHSGCont: false,
    incSCACont: false,
    incBacCont: false,
    incGradCont: false,
    paretoMedianCont: false,
    totalSeasonal1MI: false,
    totalHousing1MI: false,
    totalYearRound1MI: false,
    totalYearRoundROT: false,
    totalSeasonalROT: false,
    totalYearRoundSelected: false,
    totalSeasonalSelected: false,
    totalHousingROT: false,
    totalHousingSelected: false,
    totalResidential1MI: false,
    totalResidentialSelected: false,
    totalResidentialROT: 26809
  },
  townselected: false,
  nbhselected: false,
  acselected: false,
  showComparison: false,
  selectType: '',
  neighborhoods: [],
  centers: [],
  towns: [],
  townName: 'APPLIED COMMUNITY ECONOMICS',
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

  LOAD_TRACTS2 (state, tracts) {

    state.tracts2 = tracts

    console.log('Census Tracts Loaded')
    // console.log(state.tracts[1])
  },

  LOAD_BLKS2 (state, blks) {

    state.blockGroups2 = blks
    console.log('Additional Census Columns Loaded')
  },

  LOAD_CENSUSTOWNS (state, towns) {

    towns.map((i) => {

      // Reduce subdivision string to town name, then uppercase to match with parcel layer town name
      i[0] = i[0].substr(0,i[0].indexOf(' ')).toUpperCase()

      return i
    })

    state.censusTowns = towns
    console.log('Census Towns Loaded')
  },

  LOAD_TRACTS (state, tracts) {

    state.tracts = tracts

    console.log('Census Tracts Loaded')
    // console.log(state.tracts[1])
  },

  LOAD_BLKS (state, blks) {

    state.blockGroups = blks

    console.log('Census BlockGroups Loaded')
  },

  TOGGLE_ATTRIB (state, land, water) {

    state.attributes.Land = land
    state.attributes.Water = water
  },

  TOGGLE_TOWNSELECTED (state, toggle) {

    state.townselected = toggle
  },

  TOGGLE_ACSELECTED (state, toggle) {

    state.acselected = toggle
  },


  TOGGLE_NBHSELECTED (state, toggle) {

    state.nbhselected = toggle
  },

  TOGGLE_COMPARISON (state) {

    state.showComparison = !state.showComparison
  },

  UPDATE_SELECT (state, type) {

    state.selectType = type
  },

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

    state.d3data[0].rank = ''
    state.d3data[0].comScore = ''
    state.d3data[0].buScore = ''
    state.d3data[0].formScore = ''
    state.d3data[0].finalScore = ''
    state.d3data[0].Community = d3data.Community
    state.d3data[0].Business = d3data.Business
    state.d3data[0].pctgf = d3data.GoodForm / d3data.Impervious

    var community = state.d3data[0].children[0]
    var business = state.d3data[0].children[1]
    var form = state.d3data[0].children[2]

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

    if (d3data.Community > 9) {

      state.d3data[0].comScore = 4

    } else if (d3data.Community > 6) {

      state.d3data[0].comScore = 3

    } else if (d3data.Community > 2) {

      state.d3data[0].comScore = 2

    } else if (d3data.Community >= 1) {

      state.d3data[0].comScore = 1

    } else {

      state.d3data[0].comScore = 0
    }


    if (d3data.Business > 98) {

      state.d3data[0].buScore = 4

    } else if (d3data.Business > 34) {

      state.d3data[0].buScore = 3

    } else if (d3data.Business > 10) {

      state.d3data[0].buScore = 2

    } else if (d3data.Business >= 1) {

      state.d3data[0].buScore = 1

    } else {

      state.d3data[0].buScore = 0
    }

    var pctG = d3data.GoodForm / d3data.Impervious

    if (pctG > .6) {

      state.d3data[0].formScore = 4

    } else if (pctG > .4) {

      state.d3data[0].formScore = 3

    } else if (pctG > .2) {

      state.d3data[0].formScore = 2

    } else if (pctG >= .01) {

      state.d3data[0].formScore = 1

    } else {

      state.d3data[0].formScore = 0
    }  

    state.d3data[0].finalScore = (state.d3data[0].comScore + state.d3data[0].buScore + state.d3data[0].formScore) / 3

    if (state.d3data[0].finalScore > 3.5) {

      state.d3data[0].rank = 'very strong'

    } else if (state.d3data[0].finalScore > 2.5) {

      state.d3data[0].rank = 'strong'

    } else if (state.d3data[0].finalScore > 1.5) {

      state.d3data[0].rank = 'moderate'

    } else if (state.d3data[0].finalScore > 0.5) {

      state.d3data[0].rank = 'weak'
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
      state.acscores[i].finalScore = 0

      state.acscores[i].d3data = [{
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

      var community = state.acscores[i].d3data[0].children[0]
      var business = state.acscores[i].d3data[0].children[1]
      var form = state.acscores[i].d3data[0].children[2]

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

      if (type === 'ac') {

        if (state.acscores[i].Community > 9) {

          state.acscores[i].d3data[0].comScore = 4
          state.acscores[i].comScore = 4

        } else if (state.acscores[i].Community > 6) {

          state.acscores[i].d3data[0].comScore = 3
          state.acscores[i].comScore = 3

        } else if (state.acscores[i].Community > 2) {

          state.acscores[i].d3data[0].comScore = 2
          state.acscores[i].comScore = 2

        } else if (state.acscores[i].Community >= 1) {

          state.acscores[i].d3data[0].comScore = 1
          state.acscores[i].comScore = 1

        } else {

          state.acscores[i].d3data[0].comScore = 0
          state.acscores[i].comScore = 0
        }

        if (state.acscores[i].Business > 98) {

          state.acscores[i].d3data[0].buScore = 4
          state.acscores[i].buScore = 4

        } else if (state.acscores[i].Business > 34) {

          state.acscores[i].d3data[0].buScore = 3
          state.acscores[i].buScore = 3

        } else if (state.acscores[i].Business > 10) {

          state.acscores[i].d3data[0].buScore = 2
          state.acscores[i].buScore = 2

        } else if (state.acscores[i].Business >= 1) {

          state.acscores[i].d3data[0].buScore = 1
          state.acscores[i].buScore = 1

        } else {

          state.acscores[i].d3data[0].buScore = 0
          state.acscores[i].buScore = 0
        }

        var pctG = state.acscores[i].GoodForm / state.acscores[i].Impervious

        if (pctG > .6) {

          state.acscores[i].d3data[0].formScore = 4
          state.acscores[i].formScore = 4

        } else if (pctG > .4) {

          state.acscores[i].d3data[0].formScore = 3
          state.acscores[i].formScore = 3

        } else if (pctG > .2) {

          state.acscores[i].d3data[0].formScore = 2
          state.acscores[i].formScore = 2

        } else if (pctG >= .01) {

          state.acscores[i].d3data[0].formScore = 1
          state.acscores[i].formScore = 1

        } else {

          state.acscores[i].d3data[0].formScore = 0
          state.acscores[i].formScore = 0

        }
      } else if (type === 'twn') {

       if (state.acscores[i].Community > 9) {

        state.acscores[i].d3data[0].comScore = 4
        state.acscores[i].comScore = 4

        } else if (state.acscores[i].Community > 6) {

          state.acscores[i].d3data[0].comScore = 3
          state.acscores[i].comScore = 3

        } else if (state.acscores[i].Community > 2) {

          state.acscores[i].d3data[0].comScore = 2
          state.acscores[i].comScore = 2

        } else if (state.acscores[i].Community >= 1) {

          state.acscores[i].d3data[0].comScore = 1
          state.acscores[i].comScore = 1

        } else {

          state.acscores[i].d3data[0].comScore = 0
          state.acscores[i].comScore = 0
        }

        if (state.acscores[i].Business > 98) {

          state.acscores[i].d3data[0].buScore = 4
          state.acscores[i].buScore = 4

        } else if (state.acscores[i].Business > 34) {

          state.acscores[i].d3data[0].buScore = 3
          state.acscores[i].buScore = 3

        } else if (state.acscores[i].Business > 10) {

          state.acscores[i].d3data[0].buScore = 2
          state.acscores[i].buScore = 2

        } else if (state.acscores[i].Business >= 1) {

          state.acscores[i].d3data[0].buScore = 1
          state.acscores[i].buScore = 1

        } else {

          state.acscores[i].d3data[0].buScore = 0
          state.acscores[i].buScore = 0
        }

        var pctG = state.acscores[i].GoodForm / state.acscores[i].Impervious

        if (pctG > .6) {

          state.acscores[i].d3data[0].formScore = 4
          state.acscores[i].formScore = 4

        } else if (pctG > .4) {

          state.acscores[i].d3data[0].formScore = 3
          state.acscores[i].formScore = 3

        } else if (pctG > .2) {

          state.acscores[i].d3data[0].formScore = 2
          state.acscores[i].formScore = 2

        } else if (pctG >= .01) {

          state.acscores[i].d3data[0].formScore = 1
          state.acscores[i].formScore = 1

        } else {

          state.acscores[i].d3data[0].formScore = 0
          state.acscores[i].formScore = 0

        }
      } else if (type === 'nbh') {

        if (state.acscores[i].Community > 9) {

          state.acscores[i].d3data[0].comScore = 4
          state.acscores[i].comScore = 4

        } else if (state.acscores[i].Community > 6) {

          state.acscores[i].d3data[0].comScore = 3
          state.acscores[i].comScore = 3

        } else if (state.acscores[i].Community > 2) {

          state.acscores[i].d3data[0].comScore = 2
          state.acscores[i].comScore = 2

        } else if (state.acscores[i].Community >= 1) {

          state.acscores[i].d3data[0].comScore = 1
          state.acscores[i].comScore = 1

        } else {

          state.acscores[i].d3data[0].comScore = 0
          state.acscores[i].comScore = 0

        }

        if (state.acscores[i].Business > 98) {

          state.acscores[i].d3data[0].buScore = 4
          state.acscores[i].buScore = 4

        } else if (state.acscores[i].Business > 34) {

          state.acscores[i].d3data[0].buScore = 3
          state.acscores[i].buScore = 3

        } else if (state.acscores[i].Business > 10) {

          state.acscores[i].d3data[0].buScore = 2
          state.acscores[i].buScore = 2

        } else if (state.acscores[i].Business >= 1) {

          state.acscores[i].d3data[0].buScore = 1
          state.acscores[i].buScore = 1

        } else {

          state.acscores[i].d3data[0].buScore = 0
          state.acscores[i].buScore = 0
        }

        var pctG = state.acscores[i].GoodForm / state.acscores[i].Impervious

        if (pctG > .6) {

          state.acscores[i].d3data[0].formScore = 4
          state.acscores[i].formScore = 4

        } else if (pctG > .4) {

          state.acscores[i].d3data[0].formScore = 3
          state.acscores[i].formScore = 3

        } else if (pctG > .2) {

          state.acscores[i].d3data[0].formScore = 2
          state.acscores[i].formScore = 2

        } else if (pctG >= .01) {

          state.acscores[i].d3data[0].formScore = 1
          state.acscores[i].formScore = 1

        } else {

          state.acscores[i].d3data[0].formScore = 0
          state.acscores[i].formScore = 0
        }
      }

      state.acscores[i].finalScore = (state.acscores[i].comScore + state.acscores[i].buScore + state.acscores[i].formScore) / 3
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
