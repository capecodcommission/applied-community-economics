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
        },
        '/stormwater': {
          name: 'stormwater',
          component: require('./components/stormwater.vue')
        },
        '/wastewater': {
          name: 'wastewater',
          component: require('./components/wastewater.vue')
        },
        '/opnsprcr': {
          name: 'opnsprcr',
          component: require('./components/opnsprcr.vue')
        },
        '/comprog': {
          name: 'comprog',
          component: require('./components/comprog.vue')
        },
        '/cultmrrs': {
          name: 'cultmrrs',
          component: require('./components/cultmrrs.vue')
        },
        '/hstrsrcs': {
          name: 'hstrsrcs',
          component: require('./components/hstrsrcs.vue')
        },
        '/neighborhoods': {
          name: 'neighborhoods',
          component: require('./components/neighborhoods.vue')
        },
        '/housing': {
          name: 'housing',
          component: require('./components/housing.vue')
        },
        '/walkability': {
          name: 'walkability',
          component: require('./components/walkability.vue')
        },
        '/electric': {
          name: 'electric',
          component: require('./components/electric.vue')
        },
        '/natgas': {
          name: 'natgas',
          component: require('./components/natgas.vue')
        },
        '/brdtlcm': {
          name: 'brdtlcm',
          component: require('./components/brdtlcm.vue')
        },
        '/other': {
          name: 'other',
          component: require('./components/other.vue')
        },
        '/hrdsltns': {
          name: 'hrdsltns',
          component: require('./components/hrdsltns.vue')
        },
        '/sftsltns': {
          name: 'sftsltns',
          component: require('./components/sftsltns.vue')
        },
        '/dsnchrctr': {
          name: 'dsnchrctr',
          component: require('./components/dsnchrctr.vue')
        },
        '/economy': {
          name: 'economy',
          component: require('./components/economy.vue')
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
