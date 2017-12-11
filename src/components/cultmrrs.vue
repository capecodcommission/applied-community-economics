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

    <div class = 'row'>
      <div v-show = "townName != 'APPLIED COMMUNITY ECONOMICS' " id="viewDiv" class="balt-theme"></div>
    </div>
  </div>

  <!-- <div id="viewDiv" class="balt-theme"></div> -->

</template>

<script>

import * as esriLoader from 'esri-loader'
import { getTownName } from '../vuex/getters'
import { createMap } from './esrimap'

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

    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err)
        }
        createMap(esriLoader, this.$router)
      }, {
        url: 'https://js.arcgis.com/4.5/'
      })
    } else {
      createMap(esriLoader)
    }
  },

  methods: {

  },

  watch: {

    'townName': (x) => {

    }
  }
}

</script>

<style>

.nav.is-default {
    background-color: #f5f5f5;
    margin-bottom: 2rem;
  }
  .nav-left{
    align-items: center;
  }
  .nav-item img {
      max-height: 2.2rem;
  }
  input {
    margin-left: 1rem;
    border: 0;
    background: transparent;
    font-weight: normal;
  }
  #home {
    position: fixed;
    top : 30px;
    z-index: 10;
  }
  #viewDiv {
    position: absolute;
    /*top: 3.5rem;
    bottom: 0;
    left: 0;
    right: 0;*/
    height: 100%;
    width: 100%;
  }

.container-table {
    display: table;
    height: 100%;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}

</style>
