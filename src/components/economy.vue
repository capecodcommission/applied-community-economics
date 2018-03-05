<template>

  <div class = 'row'>
    <div class = 'col-md-12 col-heading'>
      <h2 class = 'pull-left'>ECONOMY</h2>
    </div>
  </div>
    
  <div class = 'row'>
    <div class = 'col-md-6 col-heading'>
      <h3 class = 'pull-left'>COMMERCIAL</h3>
    </div>
    <div class = 'col-md-6 col-heading'>
      <h3 class = 'pull-left'>RESIDENTIAL</h3>
    </div>
  </div>

  <div style = 'background-color: #d0d5dd' class = 'row'>
    <div class = 'col-md-6'>
      <div class = 'col-md-6'>
        <h4>Business</h4>
        <canvas id = 'donutChart1'></canvas>
      </div>
      <div class = 'col-md-6'>
        <h4>Employment</h4>
        <canvas id = 'donutChart2'></canvas>
      </div>
    </div>
    <div class = 'col-md-6'>
      <div class = 'col-md-4 housing-stats'>
        <div class = 'row'>
          <h1>$26,255</h1>
          <p>Median Household Income</p>
        </div>
        <div class = 'row'>
          <h1>7.5%</h1>
          <p>Unemployment</p>
        </div>
      </div>
      <div class = 'col-md-4'>
        <h4>Educational Attainment</h4>
        <canvas id = 'donutChart3'></canvas>
      </div>
      <div class = 'col-md-4'>
        <h4>Median Earnings</h4>
        <canvas id = 'barChart1'></canvas>
      </div>
    </div>
  </div>

  <div style = 'background-color: #d0d5dd' class = 'row'>
    <div class = 'col-md-6'>
      <div class = 'col-md-6'>
        <h4>Business</h4>
        <canvas id = 'donutChart4'></canvas>
      </div>
      <div class = 'col-md-6'>
        <h4>Employment</h4>
        <canvas id = 'donutChart5'></canvas>
      </div>
    </div>
    <div class = 'col-md-6'>
      <div class = 'col-md-4 housing-stats'>
        <div class = 'row'>
          <h1>$66,279</h1>
          <p>Median Household Income</p>
        </div>
        <div class = 'row'>
          <h1>6.5%</h1>
          <p>Unemployment</p>
        </div>
      </div>
      <div class = 'col-md-4'>
        <h4>Educational Attainment</h4>
        <canvas id = 'donutChart6'></canvas>
      </div>
      <div class = 'col-md-4'>
        <h4>Median Earnings</h4>
        <canvas id = 'barChart2'></canvas>
      </div>
    </div>
  </div>

</template>

<script>

import * as esriLoader from 'esri-loader'
import { getTownName } from '../vuex/getters'
import { createMap } from './esrimap'

export default {

  components: {

  },

  data () {

    return {

    }
  },

  vuex: {

    actions: {

    },

    getters: {

      townName: getTownName
    }
  },

  ready() {

    // row 1
    var ctx1 = $("#donutChart1");
    var ctx2 = $("#donutChart2");
    var ctx3 = $("#donutChart3");
    var ctx4 = $("#barChart1");

    // row 2
    var ctx5 = $("#donutChart4");
    var ctx6 = $("#donutChart5");
    var ctx7 = $("#donutChart6");
    var ctx8 = $("#barChart2");

    var myChart1 = new Chart(ctx1, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50,60],
            backgroundColor: ['orange','yellow','blue','green','grey', 'red']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Retail/Rest./Entertainment',
          'Industrial',
          'Professional Services',
          'Health Care',
          'Public/Educ.',
          'Other'
        ]
      },
      options: {
        cutoutPercentage: 60,
        legend: {
          display: true,
          position: 'left',
          labels: {
            fontSize: 10,
            boxWidth: 10
          }
        }
      }
    })

    var myChart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50, 60],
            backgroundColor: ['orange','yellow','blue','green','grey', 'red']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Retail/Rest./Entertainment',
          'Industrial',
          'Professional Services',
          'Health Care',
          'Public/Educ.',
          'Other'
        ]
      },
      options: {
        cutoutPercentage: 60,
        legend: {
          display: false
        }
      }
    })

    var myChart3 = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50],
            backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May'
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    })

    var myChart4 = new Chart(ctx4, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50],
            backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May'
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    })

    var myChart5 = new Chart(ctx5, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50,60],
            backgroundColor: ['orange','yellow','blue','green','grey', 'red']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Retail/Rest./Entertainment',
          'Industrial',
          'Professional Services',
          'Health Care',
          'Public/Educ.',
          'Other'
        ]
      },
      options: {
        cutoutPercentage: 60,
        legend: {
          display: true,
          position: 'left',
          labels: {
            fontSize: 10,
            boxWidth: 10
          }
        }
      }
    })

    var myChart6 = new Chart(ctx6, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50,60],
            backgroundColor: ['orange','yellow','blue','green','grey', 'red']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Retail/Rest./Entertainment',
          'Industrial',
          'Professional Services',
          'Health Care',
          'Public/Educ.',
          'Other'
        ]
      },
      options: {
        cutoutPercentage: 60,
        legend: {
          display: false
        }
      }
    })

    var myChart7 = new Chart(ctx7, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50],
            backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May'
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    })

    var myChart8 = new Chart(ctx8, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50],
            backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May'
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    })
  },

  methods: {

  },

  watch: {

  }
}

</script>

<style>

.housing-stats {

  color: #28536c;
}

.col-heading {

  background-color: grey; 
  color: white
}

.nav.is-default {
    background-color: #f5f5f5;
    margin-bottom: 2rem;
  }
  .nav-left{
    align-items: center;
  }
  .nav-item img {
      max-height: 2.2rem;
  }
  input {
    margin-left: 1rem;
    border: 0;
    background: transparent;
    font-weight: normal;
  }
  #home {
    position: fixed;
    top : 30px;
    z-index: 10;
  }
  #viewDiv {
    position: absolute;
    /*top: 3.5rem;
    bottom: 0;
    left: 0;
    right: 0;*/
    height: 100%;
    width: 100%;
  }

.container-table {
    display: table;
    height: 100%;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}

</style>
