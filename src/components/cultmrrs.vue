<template>
  
  <div class="col-md-6">
    <h3 align = 'left' style = 'color: red'>Cultural Resources</h3>
    <ul align = 'left' style = 'font-size: 20px;'>
      <li style = 'color: red;'>#/% {{townName}} Residents Participating in Youth Programs relative to Town Participation</li>
      <li>{{townName}} Youth Use of Transportation Services</li>
      <li>Evening and Weekend Transportation Services Offered</li>
      <li>#/% {{townName}} Residents Participating in Senior Center Programs relative to Town Participation</li>
      <li style = 'color: red;'>Hyannis Free Library – Hours; Staffing and Circulation Relative to Service Area Size and Town of Barnstable Use Overall</li>
      <li style = 'color: red;'># of Non profit land uses  & Income from non profit land uses</li>
      <li>Barnstable County/Town of Barnstable utilization Rates</li>
      <li>Annual Revenue from Shanty Program & Net Profit to Town</li>
      <li>#/type of Artists Participating</li>
      <li># Artists from Hyannis/Town of Barnstable Participating</li>
      <li># Visitors to Cultural Facilities</li>
      <li># Public Art Installations</li>
    </ul>
  </div>

  <div class = 'col-md-6'>

    <div class = 'row'>
      <div class = 'col-md-8'>
      <img  src = 'https://i.imgur.com/k2mnGoA.png' width = '100%'>
      </div>
      <div class = 'col-md-4'>
        <img  src = 'https://i.imgur.com/10K2xt9.png' width = '100%'>
      </div>
    </div>

    <div class ='row'>
      <div class = 'col'>
        <h3 align="left">Marine Resources</h3>
        <ul align = 'left' style = 'font-size: 20px;'>
          <li>Dredge Maintenance</li>
          <li style = 'color: red;'>Variety of Land Uses in Harbor District</li>
          <li style = 'color: red;'>Property Valuation</li>
          <li>Bismore Park – Monthly Parking Utilization and Revenue</li>
          <li># of Tide and Flooding Events Impairing Parking</li>
          <li>Parking Revenue</li>
          <li>Vehicles Parked (Turnover Rate)</li>
        </ul>
      </div>
    </div>
    
  </div>

</template>

<script>

import { getTownName } from '../vuex/getters'

export default {

  components: {

  },

  data () {

    return {

    }
  },

  vuex: {

    actions: {

    },

    getters: {

      townName: getTownName
    }
  },

  ready() {

  },

  methods: {

  },

  watch: {

  }
}

</script>

<style>

.container-table {
    display: table;
    height: 100%;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}

</style>
