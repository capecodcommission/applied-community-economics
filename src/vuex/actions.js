import api from '../api'

// Actions obtain JSON from API, pass response to state mutations via dispatch

export const loadNeighborhoods = function({dispatch, state}) {

  api.getNeighborhoods().then(function (response) {

    dispatch('LOAD_NEIGHBORHOODS', response.data)

  }, function (response) {

    console.log(response)
  })
}

export const loadActivityCenters = function({dispatch, state}) {

  api.getActivityCenters().then(function (response) {

    dispatch('LOAD_ACTIVITYCENTERS', response.data)

  }, function (response) {

    console.log(response)
  })
}

export const loadTowns = function({dispatch, state}) {

  api.getTowns().then(function (response) {

    dispatch('LOAD_TOWNS', response.data)

  }, function (response) {

    console.log(response)
  })
}

export const loadTownName = function({dispatch, state}, name) {

  dispatch('LOAD_TOWNNAME', name)
}

export const loadACScores = function({dispatch, state}, type) {

  api.getACScores(type).then(function (response) {

    dispatch('LOAD_ACSCORES', response.data, type)
  }, function (response) {

    console.log(response)
  })
}

export const updated3Data = function({dispatch, state}, type, name) {

  api.getd3Data(type, name).then(function (response) {

    dispatch('UPDATE_D3DATA', response.data)
  }, function (response) {

    console.log(response)
  })
}

export const updateSelect = function({dispatch, state}, type) {

  dispatch('UPDATE_SELECT', type) 
}

export const toggleComparison = function({dispatch, state}) {

  dispatch('TOGGLE_COMPARISON') 
}

export const updateNBH = function({dispatch, state}, toggle) {

  dispatch('TOGGLE_NBHSELECTED', toggle) 
}

export const updateAC = function({dispatch, state}, toggle) {

  dispatch('TOGGLE_ACSELECTED', toggle) 
}

export const updateTown = function({dispatch, state}, toggle) {

  dispatch('TOGGLE_TOWNSELECTED', toggle) 
}

export const updateAttrib = function({dispatch, state}, land, water) {

  dispatch('TOGGLE_ATTRIB', land, water) 
}


// Load array of block groups, tracts, and population counts from census API
export const loadBlks = function({dispatch, state}) {

    $.getJSON("https://api.census.gov/data/2016/acs/acs5?get=NAME,B01003_001E,B19001_002E,B19001_003E,B19001_004E,B19001_005E,B19001_006E,B19001_007E,B19001_008E,B19001_009E,B19001_010E,B19001_011E,B19001_012E,B19001_013E,B19001_014E,B19001_015E,B19001_016E,B19001_017E&for=block%20group:*&in=state:25%20county:001&key=8c7a3c5bf959c4358f3e0eee9b07cd95d7856f5c", function (result) {

      dispatch("LOAD_BLKS", result)
    })
  }