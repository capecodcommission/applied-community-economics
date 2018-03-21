<template>

  <!-- <img style = 'width: 100%' class="img-fluid" src="https://i.imgur.com/2rnoGzZ.png"><br><br> -->
  
  <p v-show = "townThing == 'APPLIED COMMUNITY ECONOMICS'" style = 'margin-left: 3%' align = 'left'>This tool will score the form of an area based on Building Form, Business Activity, and Community Activity. It allows for the comparison of scores to other simlar geographics in the Report Card. In development is the ability to dig down into key metrics that will improve the score of an area.</p>

  <div v-show = "townThing != 'APPLIED COMMUNITY ECONOMICS'">
    <p style = 'display: inline-block; margin-left: 3%' align = 'left'>
      <div style = "display: inline-block; font-size: 25px; font-family: 'Open Sans'">{{townThing}}</div> currently has a 
      <div style = "display: inline-block; font-size: 20px; font-family: 'Open Sans'">{{rank}}</div> score, thanks to 
      <div style = 'font-size: 30px; display: inline-block;' id = 'CAsites'>{{d3data.Community}}</div> community activity sites, 
      <div style = 'font-size: 30px; display: inline-block;' id = 'BAsites'>{{d3data.Business}}</div> businesses and 
      <div style = 'font-size: 30px; display: inline-block;' id = 'pct_GF'>{{(d3data.pctgf * 100).toFixed()}}%</div> of buildings with great form.
    </p>
    <svg style = 'display: block; margin: 0 auto;' id = 'svgboi'></svg>
  </div>
  <br>

  <p v-show = "townThing == 'APPLIED COMMUNITY ECONOMICS'" style = 'margin-left: 3%' align = 'left'>Please select a neighborhood, activity center, or town to see the geography's ACE score.</p><br>

  <div v-show = "townThing == 'APPLIED COMMUNITY ECONOMICS'" style = 'margin-left: 3%' align = 'left'>
    <input @click = 'changenbh' type="radio" name="checkgroup" value="Neighborhood"> Neighborhood<br>
    <select style = 'color: black;' v-model = 'townName' v-show = "nbhselected" id = 'neighborhoodSelect'>
      <option value = '0'>Select a Neighborhood</option>
      <option v-for = 'neighborhood in neighborhoods.recordsets[0]' value = '{{neighborhood.Neighborhood}}'>{{neighborhood.Neighborhood}}</option>
    </select><br>
    <input @click = 'changeac' type="radio" name="checkgroup" value="Activity Center"> Activity Center<br>
    <select style = 'color: black;' v-show = "acselected" v-model = 'townName' id = 'acSelect'>
      <option value = '0'>Select an Activity Center</option>
      <option v-for = 'center in centers.recordsets[0]' value = '{{center.center}}'>{{center.center}}</option>
    </select><br>
    <input @click = 'changetown' type="radio" name="checkgroup" value="Town"> Town<br>
    <select style = 'color: black;' v-model = 'townName' v-show = "townselected" id = 'townSelect'>
      <option value = '0'>Select a Town</option>
      <option v-for = 'town in towns.recordsets[0]' value = '{{town.town}}'>{{town.town}}</option>
    </select>
  </div><br><br>

  <!-- <button v-show = "townThing == 'APPLIED COMMUNITY ECONOMICS'" id = 'Draw' class = 'btn btn-primary'>Draw Poly</button> -->
  <button style = 'float: left; margin-left: 3%' v-show = "townThing != 'APPLIED COMMUNITY ECONOMICS'" @click = "toggleComparison()" class = "btn btn-primary compareButton">Compare to Other {{selectType}}s</button>

</template>

<script>

import {introJs} from '../../node_modules/intro.js/intro.js'
import { loadNeighborhoods, loadActivityCenters, loadTowns, loadTownName, updated3Data, loadACScores, updateSelect, toggleComparison, updateNBH, updateAC, updateTown } from '../vuex/actions'
import { getNeighborhoods, getActivityCenters, getTowns, getd3Data, getACScores, getType, getTownName, getnbhselected, getacselected, gettownselected } from '../vuex/getters'
import * as d3 from "d3"

export default {

  components: {
    
  },

  data () {

    return {

      // nbhselected: false,
      // acselected: false,
      // townselected: false,
      townName: false,      
      BAsites: false,
      rank: ''
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
      updateSelect,
      toggleComparison,
      updateNBH,
      updateAC,
      updateTown
    },

    getters: {

      neighborhoods: getNeighborhoods,
      centers: getActivityCenters,
      towns: getTowns,
      d3data: getd3Data,
      scores: getACScores,
      selectType: getType,
      townThing: getTownName,
      nbhselected: getnbhselected,
      acselected: getacselected,
      townselected: gettownselected
    }
  },

  ready() {

    this.loadNeighborhoods()

    if (this.townThing != 'APPLIED COMMUNITY ECONOMICS') {

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

        var buScore = root.descendants()[0].data.buScore
        var comScore = root.descendants()[0].data.comScore
        var formScore = root.descendants()[0].data.formScore

        // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
        // variable calculations. Last, color the lines and the slices.
      g.selectAll('g')
        .data(root.descendants())
        .enter().append('g').attr("class", "node").append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        // .style('stroke', '#000000')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .each(function(i) {

          if (i.data.name === "Business Activity" && i.depth > buScore) {

            d3.select(this).style('opacity', 0)
          }

          if (i.data.name === "Community Activity" && i.depth > comScore) {

            d3.select(this).style('opacity', 0)
          }

          if (i.data.name === "Building Form" && i.depth > formScore) {

            d3.select(this).style('opacity', 0)
          }
        })
        
      g.append("text")
       .attr("text-anchor", "middle")
       .attr('font-size', '2em')
       .style('fill', '#f0ead6')
       .attr('font-family', 'Open Sans')
       .attr('y', 10)
       .text(this.d3data.finalScore.toFixed(1));


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
  },

  methods: {

    changenbh: function() {

      $('#ACenter').prop('checked', false)
      $('#Town').prop('checked', false)

      $('#neighborhoodSelect').val('0')

      
      this.updateNBH(true)
      this.updateAC(false)
      this.updateTown(false)
    },

    changeac: function() {

      $('#Neighborhood').prop('checked', false)
      $('#Town').prop('checked', false)

      $('#acSelect').val('0')

      this.updateNBH(false)
      this.updateAC(true)
      this.updateTown(false)
    },

    changetown: function() {

      $('#ACenter').prop('checked', false)
      $('#Neighborhood').prop('checked', false)

      $('#townSelect').val('0')

      this.updateNBH(false)
      this.updateAC(false)
      this.updateTown(true)
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

        var buScore = root.descendants()[0].data.buScore
        var comScore = root.descendants()[0].data.comScore
        var formScore = root.descendants()[0].data.formScore

        // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
        // variable calculations. Last, color the lines and the slices.
      g.selectAll('g')
        .data(root.descendants())
        .enter().append('g').attr("class", "node").append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        // .style('stroke', '#000000')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .each(function(i) {

          if (i.data.name === "Business Activity" && i.depth > buScore) {

            d3.select(this).style('opacity', 0)
          }

          if (i.data.name === "Community Activity" && i.depth > comScore) {

            d3.select(this).style('opacity', 0)
          }

          if (i.data.name === "Building Form" && i.depth > formScore) {

            d3.select(this).style('opacity', 0)
          }
        })
        
      g.append("text")
       .attr("text-anchor", "middle")
       .attr('font-size', '2em')
       .style('fill', '#f0ead6')
       .attr('font-family', 'Open Sans')
       .attr('y', 10)
       .text(this.d3data.finalScore.toFixed(1));


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

.compareButton {

  white-space: normal !important;
}

</style>
