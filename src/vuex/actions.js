import api from '../api'

// Actions obtain JSON from API, pass response to state mutations via dispatch

export const loadNeighborhoods = function({dispatch, state}) {

  api.getNeighborhoods().then(function (response) {

    dispatch('LOAD_NEIGHBORHOODS', response.data)

  }, function (response) {

    console.log(response)
  })
}




