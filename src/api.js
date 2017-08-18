import Vue from 'vue'
import VueResource from 'vue-resource'

import { API_ROOT } from './config'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.headers.common['Authorization'] = '123123'

// Export (out of this script) functions to access API 
export default {

  // Obtain finance options JSON from API
  getNeighborhoods () {
    return Vue.http.get(API_ROOT + 'getNeighborhoods')
  }
}
