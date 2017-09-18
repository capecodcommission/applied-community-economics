// Create nested routes
export default function (router) {
  router.map({
    '/': {
      name: 'Start',
      component: require('./components/Start.vue')
    }, // TODO: Track current routes per treatment
    '/reportcard/:type/:id': { // :id is a route parameter that can be passed into a function
      name: 'reportCard',
      component: require('./components/ScenarioView.vue'),
      subRoutes: {
        '/' : { // Routes hereafter are nested within /scenario/:id
          name: 'TreatmentDetail',
          component: require('./components/TreatmentDetail.vue'),
        },
        '/embaymentCharts': {
          name: 'propertyOwnerCosts',
          component: require('./components/propertyOwnerCosts.vue')
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
