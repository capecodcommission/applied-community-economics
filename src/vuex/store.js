import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state object that all Vues share, JSON from API is loaded here
const state = {
  blockGroups5: [],
  blockGroups4: [],
  blockGroups3: [],
  tracts2: [],
  blockGroups2: [],
  censusTowns: [],
  tracts: [],
  blockGroups: [],
  attributes: {
    Land: 0,
    Water: 0,
    Toggle: 0,
    less10k: 0,
    ten14: 0,
    fifteen19: 0,
    twenty24: 0,
    twentyFive29: 0,
    thirty34: 0,
    thirtyFive39: 0,
    fourty44: 0,
    fourtyFive49: 0,
    fifty59: 0,
    sixty74: 0,
    seventyFive99: 0,
    hundred124: 0,
    hundredTwentyFive149: 0,
    hundredFifty199: 0,
    twoHundredPlus: 0,
    paretoMedian: 0,
    percUnemp: 0,
    lessHS: 0,
    hsg: 0,
    sca: 0,
    bac: 0,
    gradPro: 0,
    totalEdu: 0,
    incLessHS: 0,
    incHSG: 0,
    incSCA: 0,
    incBac: 0,
    incGrad: 0,
    townIncLessHS: 0,
    townIncHSG: 0,
    townIncSCA: 0,
    townIncBac: 0,
    townIncGrad: 0,
    townParetoMedian: 0,
    townPercUnemp: 0,
    townHSG: 0,
    townSCA: 0,
    townGradPro: 0,
    townLessHS: 0,
    townBac: 0,
    townEdu: 0,
    townIncLessHSROT: 0,
    townIncHSGROT: 0,
    townIncSCAROT: 0,
    townIncBacROT: 0,
    townIncGradROT: 0,
    percUnempCont: 0,
    lessHSCont: 0,
    hsgCont: 0,
    scaCont: 0,
    bacCont: 0,
    gradProCont: 0,
    totalEduCont: 0,
    incLessHSCont: 0,
    incHSGCont: 0,
    incSCACont: 0,
    incBacCont: 0,
    incGradCont: 0,
    paretoMedianCont: 0,
    totalSeasonal1MI: 0,
    totalHousing1MI: 0,
    totalYearRound1MI: 0,
    totalYearRoundROT: 0,
    totalSeasonalROT: 0,
    totalYearRoundSelected: 0,
    totalSeasonalSelected: 0,
    totalHousingROT: 0,
    totalHousingSelected: 0,
    totalResidential1MI: 0,
    totalResidentialSelected: 0,
    totalResidentialROT: 0,
    totalOwned1MI: 0,
    totalRental1MI: 0,
    totalOwnedROT: 0,
    totalRentalROT: 0,
    totalOwnedSelected: 0,
    totalRentalSelected: 0,
    avgUnitsPP1MI: 0,
    avgUnitsPA1MI: 0,
    avgUnitsPPSelected: 0,
    avgUnitsPASelected: 0,
    avgUnitsPPROT: 0,
    avgUnitsPAROT: 0,
    totalApt1MIHSG: 0,
    totalMixed1MIHSG: 0,
    totalMultiOne1MIHSG: 0,
    totalOther1MIHSG: 0,
    totalResCondo1MIHSG: 0,
    totalShrdTmp1MIHSG: 0,
    totalSingleFam1MIHSG: 0,
    totalApt1MIAcres: 0,
    totalMixed1MIAcres: 0,
    totalMultiOne1MIAcres: 0,
    totalOther1MIAcres: 0,
    totalResCondo1MIAcres: 0,
    totalShrdTmp1MIAcres: 0,
    totalSingleFam1MIAcres: 0,
    totalAptSelectedHSG: 0,
    totalMixedSelectedHSG: 0,
    totalMultiOneSelectedHSG: 0,
    totalOtherSelectedHSG: 0,
    totalResCondoSelectedHSG: 0,
    totalShrdTmpSelectedHSG: 0,
    totalSingleFamSelectedHSG: 0,
    totalAptSelectedAcres: 0,
    totalMixedSelectedAcres: 0,
    totalMultiOneSelectedAcres: 0,
    totalOtherSelectedAcres: 0,
    totalResCondoSelectedAcres: 0,
    totalShrdTmpSelectedAcres: 0,
    totalSingleFamSelectedAcres: 0,
    totalAptROTHSG: 0,
    totalMixedROTHSG: 0,
    totalMultiOneROTHSG: 0,
    totalOtherROTHSG: 0,
    totalResCondoROTHSG: 0,
    totalShrdTmpROTHSG: 0,
    totalSingleFamROTHSG: 0,
    totalAptROTAcres: 0,
    totalMixedROTAcres: 0,
    totalMultiOneROTAcres: 0,
    totalOtherROTAcres: 0,
    totalResCondoROTAcres: 0,
    totalShrdTmpROTAcres: 0,
    totalSingleFamROTAcres: 0,
    totalHHBelowPovertyWithin: 0,
    totalHHBelowPoverty1MI: 0,
    totalHHBelowPovertyROT: 0,
    totalHHWithChildrenWithin: 0,
    totalHHWithChildren1MI: 0,
    totalHHWithChildrenROT: 0,
    totalHHSpendingGreater30Within: 0,
    totalHHSpendingGreater301MI: 0,
    totalHHSpendingGreater30ROT: 0,
    totalAgesZero19Within: 0,
    totalAgesZero191MI: 0,
    totalAgesZero19ROT: 0,
    totalAgesTwenty44Within: 0,
    totalAgesTwenty441MI: 0,
    totalAgesTwenty44ROT: 0,
    totalAgesFortyFive64Within: 0,
    totalAgesFortyFive641MI: 0,
    totalAgesFortyFive64ROT: 0,
    totalAgesSixtyFivePlusWithin: 0,
    totalAgesSixtyFivePlus1MI: 0,
    totalAgesSixtyFivePlusROT: 0,
    totalRentMedianWithin: 0,
    totalRentMedian1MI: 0,
    totalRentMedianROT: 0,
    totalPriceMedianWithin: 0,
    totalPriceMedian1MI: 0,
    totalPriceMedianROT: 0
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

  LOAD_BLKS5 (state, blks) {

    state.blockGroups5 = blks
  },

  LOAD_BLKS4 (state, blks) {

    state.blockGroups4 = blks
  },

  LOAD_BLKS3 (state, blks) {

    state.blockGroups3 = blks
  },

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
    // console.log(state.blockGroups)
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
