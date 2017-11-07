<template>
  <div class = 'fill-height' id="map">
    <div transition = 'fade' v-show = 'showComparison' class = 'col-md-7 comparison'>
      <comparison></comparison>
    </div>
    <div class = 'selectEmbayment text-center'>
      <h2>ACE Report</h2><br>
      <h1 v-show = 'townName != false'>{{townName}}</h1><br>
      <p>This tool will score the form of an area based on Building Form, Business Activity and Community Activity. It allows for the comparison of scores to other similar geographies in the Report Card.  In development is the ability to dig down into key metrics that will improve the score of an area.</p>
      <div v-show = 'townName != false'><p style = 'display: inline-block;'><div style = "display: inline-block; font-size: 20px; font-family: 'Open Sans'">{{townName}}</div> has a <div style = "display: inline-block; font-size: 20px; font-family: 'Open Sans'">{{rank}}</div> score, due to <br><div style = 'font-size: 30px; display: inline-block;' id = 'CAsites'></div> community sites, <div style = 'font-size: 30px; display: inline-block;' id = 'BAsites'></div> businesses and <div style = 'font-size: 30px; display: inline-block;' id = 'pct_GF'></div> are in Good Form</p></div>
      <!-- <canvas v-show = 'townName != false' style = 'display: inline' id="myChart" width="200" height="230"></canvas> -->
      <svg id = 'svgboi'></svg>
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
      <!-- <button v-show = "townName != false" @click = "goTown(townName)" class = "btn btn-success">View ReportCard {{townName}}</button> -->
    </div>
    <div v-show = 'townName' class = 'selectEmbayment1'>
      <div id = 'legendDiv'></div>
    </div>
    <div id = 'comScore' style = 'display: none'></div>
    <div id = 'buScore' style = 'display: none'></div>
    <div id = 'formScore' style = 'display: none'></div>
  </div>
</template>

<script>

import {introJs} from '../../node_modules/intro.js/intro.js'
import { loadNeighborhoods, loadActivityCenters, loadTowns, loadTownName, updated3Data, loadACScores, updateSelect } from '../vuex/actions'
import { getNeighborhoods, getActivityCenters, getTowns, getd3Data, getACScores } from '../vuex/getters'
import * as d3 from "d3"
import treatmentDetail from './TreatmentDetail'

export default {

  components: {
    'comparison': treatmentDetail
  },

  data () {

    return {

      nbhselected: false,
      acselected: false,
      townselected: false,
      townName: false,
      BAsites: false,
      rank: '',
      showComparison: false
    }
  },

  vuex: {

    actions: {
      
      loadNeighborhoods,
      loadActivityCenters,
      loadTowns,
      loadTownName,
      updated3Data,
      loadACScores,
      updateSelect
    },

    getters: {

      neighborhoods: getNeighborhoods,
      centers: getActivityCenters,
      towns: getTowns,
      d3data: getd3Data,
      scores: getACScores
    }
  },

  ready() {

    this.loadNeighborhoods()

    $('#neighborhoodSelect').on('change', function() {

      var x = $(this).val().toString()

      if (x === '0') {

        this.townName = false
      } else {

        $('#acSelect').val("0")
      }
    })

    $('#acSelect').on('change', function() {

      var x = $(this).val().toString()

      if (x === '0') {

        this.townName = false
      }
    })

    $('#townSelect').on('change', function() {

      var x = $(this).val().toString()

      if (x === '0') {

        this.townName = false
      }
    })

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

      // router.go({name: 'reportCard', params: {id: x, type: y}})
    },

    changenbh: function() {

      $('#ACenter').prop('checked', false)
      $('#Town').prop('checked', false)

      $('#neighborhoodSelect').val('0')

      this.nbhselected = true
      this.acselected = false
      this.townselected = false
    },

    changeac: function() {

      $('#Neighborhood').prop('checked', false)
      $('#Town').prop('checked', false)

      $('#acSelect').val('0')

      this.nbhselected = false
      this.acselected = true
      this.townselected = false
    },

    changetown: function() {

      $('#ACenter').prop('checked', false)
      $('#Neighborhood').prop('checked', false)

      $('#townSelect').val('0')

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

      var y = ''

      if (this.nbhselected) {

        y = 'nbh'
        this.updateSelect('Neighborhood')
      } else if (this.acselected) {

        y = 'ac'
        this.updateSelect('Activity Center')
      } else if (this.townselected) {

        y = 'twn'
        this.updateSelect('Town')
      }

      if (x != '0') {
        
        this.loadTownName(x)
        this.updated3Data(y, x)
      }
    },

    'd3data': function() {

      console.log(this.d3data)

      this.showComparison = true

      this.rank = this.d3data.rank

      d3.select('#svgboi').selectAll("g > *").remove()
      // Variables
      var width = 230;
      var height = 200;
      var radius = Math.min(width, height) / 2;
      var color = d3.scaleOrdinal(["#4472c4", "#a5a5a5","#ed7d31"]);
      

      // Size our <svg> element, add a <g> element, and move translate 0,0 to the center of the element.
      var g = d3.select('#svgboi')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      // Create our sunburst data structure and size it.
      var partition = d3.partition()
          .size([2 * Math.PI, radius]);

      // Find the root node of our data, and begin sizing process.
      var root = d3.hierarchy(this.d3data)
        .sum(function (d) { return d.size});

      // Calculate the sizes of each arc that we'll draw later.
      partition(root);
      var arc = d3.arc()
        .startAngle(function (d) { return d.x0  })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0  })
        .outerRadius(function (d) { return d.y1 - 3 })
        .padAngle(.04)

        // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
        // variable calculations. Last, color the lines and the slices.
      g.selectAll('g')
        .data(root.descendants())
        .enter().append('g').attr("class", "node").append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        // .style('stroke', '#000000')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        
      g.append("text")
       .attr("text-anchor", "middle")
       .attr('font-size', '2em')
       .style('fill', '#f0ead6')
       .attr('font-family', 'Open Sans')
       .attr('y', 10)
       .text(Math.round(this.d3data.finalScore));


      function computeTextRotation(d) {
        var angle = (d.x0 + d.x1) / Math.PI * 90;

        // Avoid upside-down labels
        return (angle < 120 || angle > 270) ? angle : angle + 180  // labels as rims
        // return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
      }

      var y = ''

      if (this.nbhselected) {

        y = 'nbh'
      } else if (this.acselected) {

        y = 'ac'
      } else if (this.townselected) {

        y = 'twn'
      }

      this.loadACScores(y)
    }
  }
}

</script>

<style>

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

.comparison {
  bottom: 5px;
  right: 1px;
  position: absolute;
  z-index: 5;
  float: right;
  background: #28536c;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  /*color: black;*/

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
