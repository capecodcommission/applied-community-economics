// Create nested routes
export default function (router) {
  router.map({
    '/': {
      name: 'Start',
      component: require('./components/Start.vue')
    }, // TODO: Track current routes per treatment
    '/TM': { // :id is a route parameter that can be passed into a function
      component: require('./components/ScenarioView.vue'),
      subRoutes: {
        '/' : { // Routes hereafter are nested within /scenario/:id
          name: 'TreatmentDetail',
          component: require('./components/TreatmentDetail.vue'),
        },
        '/pedAccom': {
          name: 'pedAccom',
          component: require('./components/pedAccom.vue')
        },
        '/bikeAccom': {
          name: 'bikeAccom',
          component: require('./components/bikeAccom.vue')
        },
        '/trafficCirc': {
          name: 'trafficCirc',
          component: require('./components/traffCirc.vue')
        },
        '/parking': {
          name: 'parking',
          component: require('./components/parking.vue')
        },
        '/transit': {
          name: 'transit',
          component: require('./components/transit.vue')
        }
      }
    },
    '/WR': { // :id is a route parameter that can be passed into a function
      component: require('./components/ScenarioView.vue'),
      subRoutes: {
        '/drWater': {
          name: 'drWater',
          component: require('./components/drWater.vue')
        }
      }
    }
  })
  router.redirect({
    '*': '/'
  })
  // router.beforeEach((transition)=>{
  //   transition.next()
  // })
}
