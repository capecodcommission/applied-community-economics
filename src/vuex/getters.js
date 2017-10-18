// Functinos to retrieve data from the state
export function getNeighborhoods (state) {

  return state.neighborhoods
}

export function getActivityCenters (state) {
	
  return state.centers
}

export function getTowns (state) {
	
  return state.towns
}

export function getTownName (state) {
	
  return state.townName
}

export function getACScores (state) {
	
  return state.acscores
}

export function getd3Data (state) {
	
  return state.d3data[0]
}