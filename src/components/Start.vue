<template>
  <div class = 'fill-height' id="map">
    <div id="legendDiv"></div>
    <!-- <img src="http://www.capecodcommission.org/gfx/home-logo.jpg"> -->
    <div class = 'selectEmbayment text-center'>
      <img src="http://www.capecodcommission.org/gfx/home-logo.jpg" class = 'img-rounded'><br><br><br><br>
      <table width = '100%'>
        <tr>
          <th>BA Sites</th>
          <th>CA Sites</th>
          <th>> 40% Impervious</th>
          <th>Form Weight >= 6</th>
          <th>% Good Form</th>
        </tr>
        <tr style = 'font-size: 40px'>
          <td id = 'BAsites'></td>
          <td id = 'CAsites'></td>
          <td id = 'abv_40'></td>
          <td id = 'frmWt'></td>
          <td id = 'pct_GF'></td>
        </tr>
      </table>
      <br><br><br>
      <p>Zoom to either Neighborhoods or Activity Centers from the dropdowns below</p>
      <table width = '100%'>
        <tr>
          <td>
            <select id = 'neighborhoodSelect'>
              <option value = '0'>Select a Neighborhood</option>
              <option v-for = 'neighborhood in neighborhoods.recordsets[0]' value = '{{neighborhood.Neighborhood}}'>{{neighborhood.Neighborhood}}</option>
            </select>
          </td>
          <td>
            <select id = 'acSelect'>
              <option value = '0'>Select an Activity Center</option>
              <option v-for = 'center in centers.recordsets[0]' value = '{{center.center}}'>{{center.center}}</option>
            </select>
          </td>
          <td>
            <select id = 'townSelect'>
              <option value = '0'>Select a Town</option>
              <option v-for = 'town in towns.recordsets[0]' value = '{{town.town}}'>{{town.town}}</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div id = 'mapReload'></div>
</template>

<script>

import {introJs} from '../../node_modules/intro.js/intro.js'
import { loadNeighborhoods, loadActivityCenters, loadTowns } from '../vuex/actions'
import { getNeighborhoods, getActivityCenters, getTowns } from '../vuex/getters'

export default {

  components: {

  },

  data () {

    return {

    }
  },

  vuex: {

    actions: {
      
      loadNeighborhoods,
      loadActivityCenters,
      loadTowns
    },

    getters: {

      neighborhoods: getNeighborhoods,
      centers: getActivityCenters,
      towns: getTowns
    }
  },

  ready() {

    this.loadNeighborhoods()
  },

  methods: {

  },

  watch: {

    'neighborhoods': function() {

      this.loadActivityCenters()
    },

    'centers': function() {

      this.loadTowns()
    }
  }
}

</script>

<style>

.cccLogo {
  position: absolute;
  z-index: 2;
  right: 0px;

}

.selectEmbayment {
  top: 100px;
  position: absolute;
  z-index: 3;
  width: 25%;
  float: left;
  background: #8cb8ff;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: black;

}

 html, body, #app {

    height: 100%;
 }

 .fill-height {

  min-height: 100%;
  height: auto !important;
  height: 100%;
 }
</style>
