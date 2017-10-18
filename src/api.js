import Vue from 'vue'
import VueResource from 'vue-resource'

import { API_ROOT } from './config'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.headers.common['Authorization'] = '123123'

// Export (out of this script) functions to access API 
export default {

  getNeighborhoods () {
    return Vue.http.get(API_ROOT + 'getNeighborhoods')
  },

  getActivityCenters () {
    return Vue.http.get(API_ROOT + 'getActivityCenters')
  },

  getTowns () {
    return Vue.http.get(API_ROOT + 'getTowns')
  },

  getACScores (type) {
    return Vue.http.get(API_ROOT + 'getACScores/' + type)
  },

  getd3Data (type, name) {
    return Vue.http.get(API_ROOT + 'getd3Data/' + type + '/' + name)
  }
}