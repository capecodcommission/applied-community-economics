<template>
  <div class = 'fill-height' id="map">
    <div class = 'selectEmbayment text-center'>
      <h1>Selected: <div v-bind:class = "[nbhselected ? smallFont : '']">{{townName}}</div></h1><br>
      <table style = 'margin: auto; text-align: center !important' class = 'text-center'>
        <tr style = 'font-size: 40px'>
          <th style = 'text-align: center' id = 'BAsites'></th>
          <th style = 'text-align: center' id = 'CAsites'></th>
          <th style = 'text-align: center' id = 'pct_GF'></th>
        </tr>
        <tr v-show = 'nbhselected || acselected || townselected' style = 'font-size: 15px'>
          <td>Businesses</td>
          <td>Community Sites</td>
          <td>% Good Form</td>
        </tr>
      </table>
      <canvas v-show = 'nbhselected || acselected || townselected' style = 'display: inline' id="myChart" width="200" height="230"></canvas>
      <br><br><br>
      <p>Select one of the groups below, then select a subgroup from the dropdown menu</p>
      <form>
        <input @click = 'changenbh' type="radio" name="checkgroup" value="Neighborhood"> Neighborhood
        <input @click = 'changeac' type="radio" name="checkgroup" value="Activity Center"> Activity Center
        <input @click = 'changetown' type="radio" name="checkgroup" value="Town"> Town
      </form><br>
      <select v-model = 'townName' v-show = "nbhselected" id = 'neighborhoodSelect'>
        <option value = '0'>Select a Neighborhood</option>
        <option v-for = 'neighborhood in neighborhoods.recordsets[0]' value = '{{neighborhood.Neighborhood}}'>{{neighborhood.Neighborhood}}</option>
      </select>
        <select v-show = "acselected" v-model = 'townName' id = 'acSelect'>
          <option value = '0'>Select an Activity Center</option>
          <option v-for = 'center in centers.recordsets[0]' value = '{{center.center}}'>{{center.center}}</option>
        </select>
      <select v-model = 'townName' v-show = "townselected" id = 'townSelect'>
        <option value = '0'>Select a Town</option>
        <option v-for = 'town in towns.recordsets[0]' value = '{{town.town}}'>{{town.town}}</option>
      </select><br><br>
      <button v-show = "townName != '(Please select a Neighborhood, Activity Center, or Town)'" @click = "goTown(townName)" class = "btn btn-success">View ReportCard {{townName}}</button>
    </div>
    <div v-show = 'nbhselected || acselected || townselected' class = 'selectEmbayment1'>
      <div id = 'legendDiv'></div>
    </div>
  </div>
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
      townName: '(Please select a Neighborhood, Activity Center, or Town)'
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

      var y = ''

      if (this.nbhselected) {

        y = 'nbh'
      } else if (this.acselected) {

        y = 'ac'
      } else if (this.townselected) {

        y = 'twn'
      }

      router.go({name: 'reportCard', params: {id: x, type: y}})
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
  top: 5px;
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
  top: 5px;
  right: 1px;
  position: absolute;
  z-index: 4;
  float: right;
  background: #8cb8ff;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: black;

}

.smallFont {
  font-size: 10px;
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
