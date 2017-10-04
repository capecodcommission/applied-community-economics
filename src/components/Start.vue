<template>
  <div class = 'fill-height' id="map">
    <div class = 'selectEmbayment text-center'>
      <h2>ACE Report</h2><br>
      <h1 v-show = 'townName'>{{townName}}</h1><br>
      <p>This tool will score the form of an area based on Building Form, Business Activity and Community Activity. It allows for the comparison of scores to other similar geographies in the Report Card.  In development is the ability to dig down into key metrics that will improve the score of an area.</p>
      <!-- <table style = 'margin: auto; text-align: center; table-layout: fixed; width: 100%; !important' class = 'text-center'>
        <tr style = 'font-size: 40px'>
          <th style = 'text-align: center' id = 'BAsites'></th>
          <th style = 'text-align: center' id = 'CAsites'></th>
          <th style = 'text-align: center' id = 'pct_GF'></th>
        </tr>
        <tr v-show = 'townName' style = 'font-size: 15px'>
          <td>Businesses</td>
          <td>Community Sites</td>
          <td>% Good Form</td>
        </tr>
      </table> -->
      <p>There are <div style = 'font-size: 20px; display: inline-block;' id = 'BAsites'></div> businesses, <div style = 'font-size: 20px; display: inline-block;' id = 'CAsites'></div> community sites, and <div style = 'font-size: 20px; display: inline-block;' id = 'pct_GF'></div> are in Good Form</p>
      <canvas v-show = 'townName' style = 'display: inline' id="myChart" width="200" height="230"></canvas>
      <br>
      <p>Select one of the groups below, then select a subgroup from the dropdown menu</p>
      <div id = 'radio-group'>
        <input @click = 'changenbh' type="radio" name="checkgroup" value="Neighborhood"> Neighborhood<br>
        <input @click = 'changeac' type="radio" name="checkgroup" value="Activity Center"> Activity Center<br>
        <input @click = 'changetown' type="radio" name="checkgroup" value="Town"> Town
      </div><br><br>
      <select style = 'color: black;' v-model = 'townName' v-show = "nbhselected" id = 'neighborhoodSelect'>
        <option value = '0'>Select a Neighborhood</option>
        <option v-for = 'neighborhood in neighborhoods.recordsets[0]' value = '{{neighborhood.Neighborhood}}'>{{neighborhood.Neighborhood}}</option>
      </select>
        <select style = 'color: black;' v-show = "acselected" v-model = 'townName' id = 'acSelect'>
          <option value = '0'>Select an Activity Center</option>
          <option v-for = 'center in centers.recordsets[0]' value = '{{center.center}}'>{{center.center}}</option>
        </select>
      <select style = 'color: black;' v-model = 'townName' v-show = "townselected" id = 'townSelect'>
        <option value = '0'>Select a Town</option>
        <option v-for = 'town in towns.recordsets[0]' value = '{{town.town}}'>{{town.town}}</option>
      </select><br><br>
      <button v-show = "townName != ''" @click = "goTown(townName)" class = "btn btn-success">View ReportCard {{townName}}</button>
    </div>
    <div v-show = 'townName' class = 'selectEmbayment1'>
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
      townName: false,
      BAsites: false
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

#radio-group {
  display: inline-block
}

h1 {
  font-family: "Open Sans";
  font-size: 28px;
}

h2 {
  font-family: "Open Sans"
}

p {
  font-family: "Open Sans";
  font-size: 15px;
}

.cccLogo {
  position: absolute;
  z-index: 2;
  right: 0px;

}

.selectEmbayment {
  top: 5px;
  position: absolute;
  z-index: 3;
  width: 25%;
  float: left;
  background: #28536c;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: #f0ead6;
}

.selectEmbayment1 {
  top: 5px;
  right: 1px;
  position: absolute;
  z-index: 4;
  float: right;
  background: #28536c;
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
  background: #28536c;
  color: #f0ead6;
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
