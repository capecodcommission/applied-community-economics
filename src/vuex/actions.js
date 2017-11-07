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