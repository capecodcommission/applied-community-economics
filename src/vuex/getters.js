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

export function getType (state) {
  
  return state.selectType
}

export function getComparison (state) {
  
  return state.showComparison
}

export function getnbhselected (state) {
  
  return state.nbhselected
}

export function getacselected (state) {
  
  return state.acselected
}

export function gettownselected (state) {
  
  return state.townselected
}

export function getAttrib (state) {
  
  return state.attributes
}

export function getBlks (state) {

  return state.blockGroups
}

export function getTracts (state) {

  return state.tracts
}

export function getCensusTowns (state) {

  return state.censusTowns
}

export function getBlks2 (state) {

  return state.blockGroups2
}

export function getTracts2 (state) {

  return state.tracts2
}