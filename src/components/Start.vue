<template>

  <div style = 'overflow: hidden' id="loading">
    <p id = 'progress' class = 'center'></p>
  </div>

  <div style = 'padding-bottom: 0px; flex-shrink: 0 !important' class = 'row'>
    <div style = 'padding-right: 0px; padding-left: 0px' class = 'col-md-12'>
      <headthing></headthing>
    </div>
  </div>

  <div style = 'height: calc(100% - 123.797px); padding-bottom: 0' class = 'row'>
    <div class = 'col-md-2 sidething'>
      <sidething></sidething>
    </div>
    <div style = 'padding-left: 0;' class = 'col-md-10 text-center'>
      <div id="viewDiv" class="balt-theme"></div>
      <div transition = 'fade' v-show = 'totals.Toggle' class = 'col-md-2 Results'>
        <div class = 'row text-center'>
          <!-- <p>Selected Pareto Median: ${{totals.paretoMedianCont}}</p>
          <p>Selected Unemployment: {{(totals.percUnempCont * 100).toFixed(0)}}%</p>
          <p>Selected LessHS: ${{totals.incLessHSCont.toFixed(0)}}</p>
          <p>Selected HSG: ${{totals.incHSGCont.toFixed(0)}}</p>
          <p>Selected SCA: ${{totals.incSCACont.toFixed(0)}}</p>
          <p>Selected Bac: ${{totals.incBacCont.toFixed(0)}}</p>
          <p>Selected Grad: ${{totals.townIncGradCont.toFixed(0)}}</p> -->
          <p>1mi Pareto Median: ${{totals.paretoMedian}}</p>
          <p>1mi Unemployment: {{(totals.percUnemp * 100).toFixed(0)}}%</p>
          <p>1mi LessHS: ${{totals.incLessHS.toFixed(0)}}</p>
          <p>1mi HSG: ${{totals.incHSG.toFixed(0)}}</p>
          <p>1mi SCA: ${{totals.incSCA.toFixed(0)}}</p>
          <p>1mi Bac: ${{totals.incBac.toFixed(0)}}</p>
          <p>1mi Grad: ${{totals.townIncGrad.toFixed(0)}}</p>
          <p>Rest of Town Pareto Median: ${{totals.townParetoMedian}}</p>
          <p>Rest of Town Unemployment: {{(totals.townPercUnemp * 100).toFixed(0)}}%</p>
          <p>Rest of Town Income (Less than High School): ${{totals.townIncLessHSROT.toFixed(0)}}</p>
          <p>Rest of Town Income (High School Grad): ${{totals.townIncHSGROT.toFixed(0)}}</p>
          <p>Rest of Town Income (Some College / Associates): ${{totals.townIncSCAROT.toFixed(0)}}</p>
          <p>Rest of Town Income (Bachelor's): ${{totals.townIncBacROT.toFixed(0)}}</p>
          <p>Rest of Town Income (Graduate): ${{totals.townIncGradROT.toFixed(0)}}</p>
        </div>
      </div>
    </div>
  </div>

  <div transition = 'fade' v-show = 'showComparison' class = 'col-md-8 Comparison'>
    <comparison></comparison>
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
    document.getElementById('loading').style.display = false ? 'block' : 'none';

    this.loadBlks()
  },

  methods: {

  },

  watch: {

    'blockGroups': function(x) {

      this.loadTracts()
    },

    'tracts': function(x) {

      esriLoader.bootstrap((err) => { createMap(esriLoader, this.totals, this.blockGroups, this.tracts, this.updateProg)}, { url: 'https://js.arcgis.com/4.5/'})
    }
  }
}

</script>

<style>

.maxHeight {
  min-height: 100% !important;
  height:100% !important;
  flex-shrink: 0 !important;
  padding-bottom: 0;
  /*max-height: 88%;*/
}

.center {
    width: 650px;
    height: 300px;
    color: #f0ead6;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 101;

    margin: auto;
}

#loading {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(192, 192, 192, 0.5);
    background-image: url("http://i.stack.imgur.com/MnyxU.gif");
    background-repeat: no-repeat;
    background-position: center;
}

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

.sidething {
  /*position: absolute !important;*/
  background: #28536c;
  color: #f0ead6;
  padding: 1%;
  height: 100% !important;
  max-height: 100%;
  overflow: hidden;
  /*display: flex; */
  flex-direction: column; 
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
  margin-left: 1%;
  z-index: 99;
  bottom: 40%;
  left: 15%;
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
  /*flex-shrink: 0 !important;*/
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
