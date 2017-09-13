<template>

  <wqheader></wqheader>

  <div class="panel-body">
    <br>
    
    <div class="row">
      <div class = 'col-md-12 text-center'>
        <button class = 'btn btn-success pull-right' @click = 'excelExport'>Export Data</button><br><br>
      </div>
    </div>

    <div class = 'row'>
      <div class="col-md-2">
          <canvas style = 'display: inline' id="myChart" width="200" height="200"></canvas>
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

  </div>

<script src="jquery.js"></script>
<script src="filesaver.js"></script>
<script src="tableexport.js"></script>
</template>

<script>

import { loadACScores } from '../vuex/actions'
import { getACScores } from '../vuex/getters'
import {  } from 'vue-strap'
import json2csv from 'nice-json2csv'
import wqheader from './Header'

export default {
  components: {

    'wqheader': wqheader
  },

  data () {

    return {

    }
  },

  vuex: {
    actions: {

      loadACScores
    },
    getters: {

      scores: getACScores
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

    this.loadACScores()
  },

  watch: {

    'scores': function() {

      var myChart = new Chart($("#myChart"), {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [this.scores[0].comScore, this.scores[0].buScore, this.scores[0].formScore],
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
            text: this.scores[0].Activity_Center
          }
        }
      })

      var myChart1 = new Chart($("#myChart1"), {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [this.scores[1].comScore, this.scores[1].buScore, this.scores[1].formScore],
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
            text: this.scores[1].Activity_Center
          }
        }
      })

      var myChart2 = new Chart($("#myChart2"), {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [this.scores[2].comScore, this.scores[2].buScore, this.scores[2].formScore],
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
            text: this.scores[2].Activity_Center
          }
        }
      })

      var myChart3 = new Chart($("#myChart3"), {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [this.scores[3].comScore, this.scores[3].buScore, this.scores[3].formScore],
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
            text: this.scores[3].Activity_Center
          }
        }
      })

      var myChart4 = new Chart($("#myChart4"), {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [this.scores[4].comScore, this.scores[4].buScore, this.scores[4].formScore],
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
            text: this.scores[4].Activity_Center
          }
        }
      })

      var myChart5 = new Chart($("#myChart5"), {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [this.scores[5].comScore, this.scores[5].buScore, this.scores[5].formScore],
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
            text: this.scores[5].Activity_Center
          }
        }
      })
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
