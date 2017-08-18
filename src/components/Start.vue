<template>
  <div class = 'fill-height' id="map">
    <!-- <img src="http://www.capecodcommission.org/gfx/home-logo.jpg"> -->
    <div class = 'selectEmbayment text-center'>
      <img src="http://www.capecodcommission.org/gfx/home-logo.jpg" class = 'img-rounded'><br><br>
      <h5>
        <p>The Section 208 Areawide Plan Update (208 Plan) provides nitrogen-removal target goals for the Cape’s impaired waters. These targets are based on extensive monitoring and analysis that was completed as part of the Massachusetts Estuaries Project (MEP).</p>
        <p>Since the publication of these estuary-specific MEP Reports, most Cape towns have continued to collect water quality data and conduct additional studies for many of their estuaries. This has resulted in a substantial number of embayment-specific water quality data sets that span over fifteen years.</p>
        <p>Going forward, the 208 Plan recommends extensive monitoring of watershed solutions to ensure water quality goals are being met. The Water Quality Monitoring application aims to provide an analysis of Cape Cod estuaries' vital nutrients.</p>
        <p>
          <button @click = 'downloadExcel'  class = 'btn btn-success'>Download Blank Template</button>
        </p>
        <p>Zoom to an embayment from the dropdown below</p>
      </h5>
      <select id = 'embaySelect'>
        <option value = '0'>Select a Neighborhood</option>
        <option v-for = 'neighborhood in neighborhoods.recordsets[0]' value = '{{neighborhood.Neighborhood}}'>{{neighborhood.Neighborhood}}</option>
      </select>
    </div>
  </div>
  <div id = 'mapReload'></div>
  <pre>{{ neighborhoods | json }}</pre>
</template>

<script>

import {introJs} from '../../node_modules/intro.js/intro.js'
import { loadNeighborhoods } from '../vuex/actions'
import { getNeighborhoods } from '../vuex/getters'

export default {

  components: {

  },

  data () {

    return {


    }
  },

  vuex: {

    actions: {


      loadNeighborhoods
    },

    getters: {

      neighborhoods: getNeighborhoods
    }
  },

  ready() {

    this.loadNeighborhoods()
      
    var intro = introJs()

    intro.setOptions({

      showStepNumbers: false,

      tooltipClass: 'introjs-tooltip-mario text-center',

      steps: [
        {
          intro: "<img class = 'img-rounded text-center' src='http://www.capecodcommission.org/gfx/home-logo.jpg'> <br><br>" +
                  "<h4><p>The Section 208 Areawide Plan Update (208 Plan) provides nitrogen-removal target goals for the " +
                  "Cape’s impaired waters. These targets are based on extensive monitoring and analysis that was " +
                  "completed as part of the Massachusetts Estuaries Project (MEP).</p> <p>Since the publication of these " +
                  "estuary-specific MEP Reports, most Cape towns have continued to collect water quality data and " +
                  "conduct additional studies for many of their estuaries. This has resulted in a substantial number of " +
                  "embayment-specific water quality data sets that span over fifteen years.</p> <p>Going forward, the 208 Plan " +
                  "recommends extensive monitoring of watershed solutions to ensure water quality goals are being met. " +
                  "The Water Quality Monitoring application aims to provide an analysis of Cape Cod estuaries' vital nutrients. </p>" +
                  "<p><button  class = 'btn btn-success'>Download Blank Template</button></p> </h4>"
        },
        {
          intro: "<img class = 'text-center' src='http://www.capecodcommission.org/gfx/home-logo.jpg'> <br><br>" +
                 "<h4>Click on a station icon to view relative nutrient data and visualizations</h4>"
        }
      ]
    })
  },

  methods: {

    downloadExcel() {

      window.location.href = 'http://www.watershedmvp.org/waterqualitymonitoring/Content/Files/BlankTemplate.xlsx'
    }
  },

  watch: {

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
