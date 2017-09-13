<template>
  <div class = 'fill-height' id="map">
    <div  class = 'selectEmbayment text-center'>
      <img src="http://www.capecodcommission.org/gfx/home-logo.jpg" class = 'img-rounded'><br><br><br><br>
      <table>
        <tr>
          <th>BA Sites</th>
          <th>CA Sites</th>
          <th>> 40% Impervious</th>
          <th>Form Weight >= 6</th>
          <th>% Good Form</th>
        </tr>
        <tr style = 'font-size: 30px'>
          <td id = 'BAsites'></td>
          <td id = 'CAsites'></td>
          <td id = 'abv_40'></td>
          <td id = 'frmWt'></td>
          <td id = 'pct_GF'></td>
        </tr>
      </table>
      <canvas style = 'display: inline' id="myChart" width="200" height="200"></canvas>
      <br><br><br>
      <p>Select one of the groups below, then select a subgroup from the dropdown menu</p>
      <form>
        <input @click = 'changenbh' type="radio" name="checkgroup" value="Neighborhood"> Neighborhood
        <input @click = 'changeac' type="radio" name="checkgroup" value="Activity Center"> Activity Center
        <input @click = 'changetown' type="radio" name="checkgroup" value="Town"> Town
      </form>
      <select v-show = "nbhselected" id = 'neighborhoodSelect'>
        <option value = '0'>Select a Neighborhood</option>
        <option v-for = 'neighborhood in neighborhoods.recordsets[0]' value = '{{neighborhood.Neighborhood}}'>{{neighborhood.Neighborhood}}</option>
      </select>
      <select v-model = 'townName' v-show = "acselected" id = 'acSelect'>
        <option value = '0'>Select an Activity Center</option>
        <option v-for = 'center in centers.recordsets[0]' value = '{{center.center}}'>{{center.center}}</option>
      </select>
      <button @click= 'goTown(townName)' id = 'reportCard' v-show = "acselected" class 'btn btn-primary'>View ReportCard {{townName}}</button>
      <select v-show = "townselected" id = 'townSelect'>
        <option value = '0'>Select a Town</option>
        <option v-for = 'town in towns.recordsets[0]' value = '{{town.town}}'>{{town.town}}</option>
      </select>
    </div>
    <div class = 'selectEmbayment1'>
      <div id = 'legendDiv'></div>
    </div>
  </div>
  <div id = 'mapReload'></div>
</template>

<script>

import {introJs} from '../../node_modules/intro.js/intro.js'
import { loadNeighborhoods, loadActivityCenters, loadTowns, loadTownName } from '../vuex/actions'
import { getNeighborhoods, getActivityCenters, getTowns } from '../vuex/getters'

export default {

  components: {

  },

  data () {

    return {
      nbhselected: false,
      acselected: false,
      townselected: false,
      townName: ''
    }
  },

  vuex: {

    actions: {
      
      loadNeighborhoods,
      loadActivityCenters,
      loadTowns,
      loadTownName
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

    goTown: function(x) {

      router.go({name: 'reportCard', params: {id: x}})
    },

    changenbh: function() {

      $('#ACenter').prop('checked', false)
      $('#Town').prop('checked', false)

      this.nbhselected = true
      this.acselected = false
      this.townselected = false
    },

    changeac: function() {

      $('#Neighborhood').prop('checked', false)
      $('#Town').prop('checked', false)

      this.nbhselected = false
      this.acselected = true
      this.townselected = false
    },

    changetown: function() {

      $('#ACenter').prop('checked', false)
      $('#Neighborhood').prop('checked', false)

      this.nbhselected = false
      this.acselected = false
      this.townselected = true
    }
  },

  watch: {

    'neighborhoods': function() {

      this.loadActivityCenters()
    },

    'centers': function() {

      this.loadTowns()
    },

    'townName': function(x) {

      this.loadTownName(x)
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
  width: 24%;
  float: left;
  background: #8cb8ff;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: black;

}

.selectEmbayment1 {
  top: 100px;
  right: 1px;
  position: absolute;
  z-index: 4;
  width: 10%;
  float: right;
  background: #8cb8ff;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: black;

}

#legendDiv {
  float: right;
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
