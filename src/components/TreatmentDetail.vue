<template>

  <!-- <wqheader style = "background:#404144 !important; padding-bottom: 1px"></wqheader> -->

  <div style = "background:#404144 !important; padding-top: 0px" class="panel-body">

    <div class="row text-center">
      <div class = 'col-md-12'>
        <span>
          <h1 style = 'font-size: 50px; margin-top: 1px !important; display: inline-block; color: white' class = 'text-center'>{{ type }} Comparison</h1>
          <button id ='restartMap' class = 'btn btn-success pull-right'>Restart</button>
        </span><br>
        <button @click = 'goComingSoon($route.params.id)' class = 'btn btn-success pull-right'>More Metrics</button><br><br>
        <button class = 'btn btn-success pull-right' @click = 'excelExport'>Export Data</button>
      </div>
    </div>
    <!-- <wqheader style = "background:#404144 !important; padding-bottom: 1px"></wqheader> -->

    <div class = 'row'>
      <div class="col-md-2">
          <svg style = 'display: inline' id="myChart0"></svg>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart1" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart2" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart3" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart4" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart5" width="200" height="200"></canvas>
      </div>
    </div>

    <div class = 'row'>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart6" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart7" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart8" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart9" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart10" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart11" width="200" height="200"></canvas>
      </div>
    </div>

    <div class = 'row'>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart12" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart13" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart14" width="200" height="200"></canvas>
      </div>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart15" width="200" height="200"></canvas>
      </div>
    </div>
  </div>

<script src="jquery.js"></script>
<script src="filesaver.js"></script>
<script src="tableexport.js"></script>
</template>

<script>

import { loadACScores } from '../vuex/actions'
import { getACScores, getTownName } from '../vuex/getters'
import {  } from 'vue-strap'
import json2csv from 'nice-json2csv'
import wqheader from './Header'
import * as d3 from "d3";

export default {
  components: {

    'wqheader': wqheader
  },

  data () {

    return {

      type: ''
    }
  },

  vuex: {
    actions: {

      loadACScores
    },
    getters: {

      scores: getACScores,
      townname: getTownName
    }
  },

  props: ['disabled','href'],

  methods: {

    goComingSoon: function(x) {

      router.go({name: 'comingSoon', params: {id: x}})
    },

    restartMap() {
      
      window.open('http://10.10.1.148/ace','_self')
    },

    JSONflatten (data) {

      var result = {};

      function recurse(cur, prop) {

        if (Object(cur) !== cur) {

          result[prop] = cur;
        } else if (Array.isArray(cur)) {

          for (var i = 0, l = cur.length; i < l; i++)

            recurse(cur[i], prop + "[" + i + "]");

          if (l == 0) result[prop] = [];

        } else {
          var isEmpty = true;

          for (var p in cur) {

            isEmpty = false;
            recurse(cur[p], prop ? prop + "." + p : p);
          }

          if (isEmpty && prop) result[prop] = {};
        }
      }

      recurse(data, "");
      return result;
    },

    excelExport() {

      var arr = []

      for (var j = 0; j < this.scores.length; j++) {

        arr.push(this.JSONflatten(this.scores[j]))
      }
      

      var csvContent = json2csv.convert(arr)

      var a = document.createElement('a');

      a.textContent='download';
      a.download= "Scores.csv";
      a.href='data:text/csv;charset=utf-8,'+escape(csvContent);
      document.body.appendChild(a);
      a.click()
      a.remove()
    },

    startIntro() {

      introJs().setOption('showProgress', true).start()
    }
  },

  ready() {

    if (this.$route.params.type === 'ac') {

      this.type = 'Activity Center'
    } else if (this.$route.params.type === 'twn') {

      this.type = 'Town'
    } else if (this.$route.params.type === 'nbh') {

      this.type = 'Neighborhood'
    }

    this.loadACScores(this.$route.params.type)

    $('#restartMap').on('click', function() {

      window.open('http://10.10.1.148/ace/','_self')
    })
  },

  watch: {

    'scores': function() {

      console.log(this.scores)

      d3.select('#myChart0').selectAll("g > *").remove()
      // Variables
      var width = 230;
      var height = 200;
      var radius = Math.min(width, height) / 2;
      var color = d3.scaleOrdinal(["#4472c4", "#a5a5a5","#ed7d31"]);
      

      // Size our <svg> element, add a <g> element, and move translate 0,0 to the center of the element.
      var g = d3.select('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      // Create our sunburst data structure and size it.
      var partition = d3.partition()
          .size([2 * Math.PI, radius]);

      // Find the root node of our data, and begin sizing process.
      var root = d3.hierarchy(this.scores[0])
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
        .style('stroke', '#000000')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })

      // for (var i = this.scores.length - 1; i >= 0; i--) {

      //   new Chart($("#myChart" + i.toString()), {
      //     type: 'polarArea',
      //     data: {
      //       datasets: [{
      //         data: [this.scores[i].comScore, this.scores[i].buScore, this.scores[i].formScore],
      //         backgroundColor: ['rgb(68, 114, 196)', 'rgb(165, 165, 165)', 'rgb(237, 125, 49)']
      //       }],

      //   // These labels appear in the legend and in the tooltips when hovering different arcs
      //       labels: [
      //         'Community Score',
      //         'Business Score',
      //         'Form Score'
      //       ]
      //     },
      //     options: {
      //       scale: {
      //         ticks: {
      //           min: 0,
      //           max: 4,
      //           stepSize: 1
      //         }
      //       },
      //       startAngle: -0.4 * Math.PI,
      //       title: {
      //         display: true,
      //         text: this.scores[i].Activity_Center,
      //         fontFamily: "Open Sans",
      //         fontColor: "White"
      //       },
      //       legend: {
      //         display: false
      //       }
      //     }
      //   })

      //   if (this.scores[i].Activity_Center === this.$route.params.id) {

      //     $('#myChart' + i.toString()).css('border-color','#646e7a').css('border-radius', '25px').css('border-style','solid')
      //   }
      // }
    }
  }
}

</script>

<style>

</style>
