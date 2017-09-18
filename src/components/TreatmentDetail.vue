<template>

  <wqheader style = "background:#dbd7ce !important"></wqheader>

  <div style = "background:#dbd7ce !important" class="panel-body">

    <div class="row">
      <div style="background:transparent !important" class = 'jumbotron text-center'>
        <h1>{{ type }} Comparison</h1>
      </div>
      <div class = 'col-md-12'>
        <button class = 'btn btn-success pull-right' @click = 'excelExport'>Export Data</button>
      </div>
    </div>

    <div class = 'row'>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart0" width="200" height="200"></canvas>
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

    restartMap() {
      
      window.open('http://2016.watershedmvp.org/cc','_self')
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

      for (var j = 0; j < this.embayment.data.length; j++) {

        arr.push(this.JSONflatten(this.embayment.data[j]))
      }
      

      var csvContent = json2csv.convert(arr)

      var a = document.createElement('a');

      a.textContent='download';
      a.download= "Embayment.csv";
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
  },

  watch: {

    'scores': function() {

      for (var i = this.scores.length - 1; i >= 0; i--) {

        new Chart($("#myChart" + i.toString()), {
          type: 'polarArea',
          data: {
            datasets: [{
              data: [this.scores[i].comScore, this.scores[i].buScore, this.scores[i].formScore],
              backgroundColor: ['rgba(66, 134, 244,.5)', 'rgba(244, 169, 65, .5)', 'rgba(108, 103, 114, .5)']
            }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
              'Community Score',
              'Business Score',
              'Form Score'
            ]
          },
          options: {
            scale: {
              ticks: {
                min: 0,
                max: 4,
                stepSize: 1
              }
            },
            startAngle: -0.4 * Math.PI,
            title: {
              display: true,
              text: this.scores[i].Activity_Center
            }
          }
        })

        if (this.scores[i].Activity_Center === this.$route.params.id) {

          $('#myChart' + i.toString()).css('background','#efef81').css('border-radius', '25px')
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../../node_modules/intro.js/introjs.css';
thead {
  tr {
    th {
     text-align: center;
   }
 }
}

</style>
