<template>

  <div style = 'padding-bottom: 0px' class = 'row'>

    <div style = 'padding-right: 0px; padding-left: 0px' class = 'col-md-12'>
      <headthing></headthing>
    </div>

  </div>

  <div class = 'row'>

    <div class = 'col-md-2 sidebar'>
      <sidething></sidething>
    </div>

    <div style = 'padding-left: 0;' class = 'col-md-10 text-center'>
      <div id="viewDiv" class="balt-theme"></div>

      <div transition = 'fade' v-show = 'totals.Toggle' class = 'col-md-2 Results'>
        <div class = 'row text-center'>
          <p>Land (Acres): {{totals.Land}}</p>
          <p>Water (Acres): {{totals.Water}}</p>
          <p>Population (Less than $10,000): {{totals.less10k}}</p>
          <p>Population ($10,000 - $14,000): {{totals.ten14}}</p>
          <p>Population ($15,000 - $19,000): {{totals.fifteen19}}</p>
          <p>Population ($20,000 - $24,000): {{totals.twenty24}}</p>
          <p>Population ($25,000 - $29,000): {{totals.twentyFive29}}</p>
          <p>Population ($30,000 - $34,000): {{totals.thirty34}}</p>
          <p>Population ($35,000 - $39,000): {{totals.thirtyFive39}}</p>
          <p>Population ($40,000 - $44,000): {{totals.fourty44}}</p>
          <p>Population ($45,000 - $49,000): {{totals.fourtyFive49}}</p>
          <p>Population ($50,000 - $59,000): {{totals.fifty59}}</p>
          <p>Population ($60,000 - $74,000): {{totals.sixty74}}</p>
          <p>Population ($75,000 - $99,000): {{totals.seventyFive99}}</p>
          <p>Population ($100,000 - $124,000): {{totals.hundred124}}</p>
          <p>Population ($125,000 - $149,000): {{totals.hundredTwentyFive149}}</p>
          <p>Population ($150,000 - $199,000): {{totals.hundredFifty199}}</p>
          <p>Population ($200,000 +): {{totals.twoHundredPlus}}</p>
          <p>Pareto Median: ${{totals.paretoMedian}}</p>
          <p>Unemployment: {{(totals.percUnemp * 100).toFixed(2)}}%</p>

          <p>Less-than High School: {{totals.lessHS}} </p>
        </div>
      </div>

    </div>

  </div>

  <div class = 'row'>

    <div transition = 'fade' v-show = 'showComparison' class = 'col-md-8 Comparison'>
      <comparison></comparison>
    </div>

  </div>

</template>

<script>
import { getComparison, getTownName, getAttrib, getBlks, getTracts } from '../vuex/getters'

import {updateAttrib, loadBlks, loadTracts} from '../vuex/actions'
import treatmentDetail from './TreatmentDetail'
import Header from './Header'
import sidething from './sideBar'

import * as esriLoader from 'esri-loader'
import { createMap } from './esrimap'

export default {

  components: {
    'comparison': treatmentDetail,
    'headthing': Header,
    'sidething': sidething
  },

  data () {

    return {

    }
  },

  vuex: {

    actions: {

      updateAttrib,
      loadBlks,
      loadTracts
    },

    getters: {

      showComparison: getComparison,
      townName: getTownName,
      totals: getAttrib,
      blockGroups: getBlks,
      tracts: getTracts
    }
  },

  ready() {

    this.loadBlks()
  },

  methods: {

  },

  watch: {

    'blockGroups': function(x) {

      this.loadTracts()
    },

    'tracts': function(x) {

      esriLoader.bootstrap((err) => { createMap(esriLoader, this.totals, this.blockGroups, this.tracts)}, { url: 'https://js.arcgis.com/4.5/'})
    }
  }
}

</script>

<style>

.esri-ui-bottom-left {
  bottom: 15% !important;
}

.esri-legend {
  background: #28536c;
  color: #f0ead6;
  border-radius: 25px;
  border: 5px solid grey;
}

#viewDiv {
    position: fixed !important;
    /*top: 3.5rem;
    bottom: 0;
    left: 0;
    right: 0;*/
    height: 100%;
    width: 100%;
  }


#BAsites {

  color: #ed7d31
}

#CAsites {
  color: #4472c4
}

#pct_GF {
  color: #a5a5a5
}

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

.sidebar {
  background: #28536c;
  color: #f0ead6;
  padding: 1%;
}

.selectEmbayment {
  /*top: 0;*/
  position: absolute;
  /*z-index: 6;*/
  /*width: 16%;*/
  float: left;
  background: #28536c;
  /*border-radius: 25px;*/
  /*padding: 1.5em;*/
  /*border: 2px solid black;*/
  /*opacity: 0.9;*/
  color: #f0ead6;
  padding: 0;
  padding-bottom: 1%;
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

.comparison {
  bottom: 1px;
  left: 1px;
  /*position: absolute;*/
  /*z-index: 5;*/
  float: right;
  background: #28536c;
  border-radius: 25px;
  /*padding: 1.5em;*/
  border: 5px solid grey;
  /*opacity: 0.9;*/
  /*height: 40%*/
  /*color: black;*/

}

.Comparison {
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  float: left;
  margin-left: 1%
}

.Results {
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  float: right;
  margin-right: 1%;
  color: white;
  text-align: center;
  font-family: "Open Sans";
  
}

.headthing {
  /*z-index: 6;*/
  top: 1px;
  position: absolute;
  padding: 0 !important;
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
    width: 100%
 }

 .fill-height {

  min-height: 100%;
  height: auto !important;
  height: 100%;
 }
</style>
