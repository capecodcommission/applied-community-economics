<template>

  <div class = 'row'>
    <div class = 'col-md-12 col-heading'>
      <h2 class = 'pull-left'>ECONOMY</h2>
    </div>
  </div>
    
  <div class = 'row'>
    <div class = 'col-md-5'>
      <div class = 'col-md-12 col-heading'>
        <h3 class = 'pull-left'>COMMERCIAL</h3>
      </div>
    </div>
    <div style = 'padding-left: 0 !important; padding-right: 0 !important' class = 'col-md-7'>
      <div class = 'col-md-12 col-heading'>
        <h3 class = 'pull-left'>RESIDENTIAL</h3>
      </div>
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-5'>
      <div class = 'col-md-6 vizCol'>
        <h4>Business</h4>
        <vue-chart :chart-type="chartType1" :columns="columns1" :rows="rows1" :options="options1"></vue-chart>
      </div>
      <div class = 'col-md-6 vizCol'>
        <h4>Employment</h4>
        <vue-chart :chart-type="chartType2" :columns="columns2" :rows="rows2" :options="options2"></vue-chart>
      </div>
    </div>
    <div style = 'background-color: #d0d5dd' class = 'col-md-7'>
      <div class = 'col-md-4 housing-stats vizCol'>
        <div class = 'row'>
          <h1>${{totals.paretoMedian}}</h1>
          <p>Median Household Income</p>
        </div>
        <div class = 'row'>
          <h1>7.5%</h1>
          <p>Unemployment</p>
        </div>
      </div>
      <div class = 'col-md-4 vizCol'>
        <h4>Educational Attainment</h4>
        <vue-chart :chart-type="chartType3" :columns="columns3" :rows="rows3" :options="options3"></vue-chart>
      </div>
      <div class = 'col-md-4 vizCol'>
        <h4>Median Earnings</h4>
        <vue-chart :chart-type="chartType4" :columns="columns4" :rows="rows4" :options="options4"></vue-chart>
      </div>
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-5'>
      <div class = 'col-md-6 vizCol'>
        <h4>Business</h4>
        <vue-chart :chart-type="chartType1" :columns="columns1" :rows="rows5" :options="options1"></vue-chart>
      </div>
      <div class = 'col-md-6 vizCol'>
        <h4>Employment</h4>
        <vue-chart :chart-type="chartType2" :columns="columns2" :rows="rows6" :options="options2"></vue-chart>
      </div>
    </div>
    <div style = 'background-color: #d0d5dd' class = 'col-md-7'>
      <div class = 'col-md-4 housing-stats vizCol'>
        <div class = 'row'>
          <h1>$66,279</h1>
          <p>Median Household Income</p>
        </div>
        <div class = 'row'>
          <h1>6.5%</h1>
          <p>Unemployment</p>
        </div>
      </div>
      <div class = 'col-md-4 vizCol'>
        <h4>Educational Attainment</h4>
        <vue-chart :chart-type="chartType3" :columns="columns3" :rows="rows7" :options="options3"></vue-chart>
      </div>
      <div class = 'col-md-4 vizCol'>
        <h4>Median Earnings</h4>
        <vue-chart :chart-type="chartType4" :columns="columns4" :rows="rows8" :options="options4"></vue-chart>
      </div>
    </div>
  </div>

</template>

<script>

import * as esriLoader from 'esri-loader'
import { getAttrib, getTownName } from '../vuex/getters'
import { createMap } from './esrimap'

export default {

  components: {

  },

  data () {

    return {

      // Define chart types, column data types, row data types, and options for each chart
      chartType1: 'PieChart',
      chartType2: 'PieChart',
      chartType3: 'PieChart',
      chartType4: 'BarChart',
      columns1: [
        {
          'type': 'string',
          'label': 'sector'
        },
        {
          'type': 'number',
          'label': 'count'
        }
      ],
      columns2: [
        {
          'type': 'string',
          'label': 'sector'
        },
        {
          'type': 'number',
          'label': 'count'
        }
      ],
      columns3: [
        {
          'type': 'string',
          'label': 'sector'
        },
        {
          'type': 'number',
          'label': 'count'
        }
      ],
      columns4: [
        {
          'type': 'string',
          'label': 'Education'
        },
        {
          'type': 'number',
          'label': 'IncomeGiz'
        },
        {
          'type': 'string',
          'role': 'style' // Define bar color using hex value
        },
        {
          'type': 'string',
          'role': 'annotation' // Define bar label with string 
        },
        {
          'type': 'number',
          'label': 'IncomeTown'
        },
        {
          'type': 'string',
          'role': 'annotation'
        }
      ],
      rows1: [
        ['Retail/Rest./Entertainment',33],
        ['Industrial',13],
        ['Professional Services',18],
        ['Health Care',14],
        ['Public/Educ.',8],
        ['Other',14]
      ],
      rows2: [
        ['Retail/Rest./Entertainment',20],
        ['Industrial',7],
        ['Professional Services',4],
        ['Health Care',53],
        ['Public/Educ.',9],
        ['Other',7]
      ],
      rows3: [
        ['Less than high school graduate',13],
        ['High school graduate',42],
        ['Some college or associates degree',33],
        ['Bachelors degree',7],
        ['Grduate or professional degree',5]
      ],
      rows4: [
        ['Grduate or professional degree', 50000, '#1365c6', 'Graduate or professional degree', 62000, 'Town of'],
        ['Bachelors degree', 65000, '#3f7fcc', 'Bachelors degree', 50000, 'Town of'],
        ['Some college or associates degree', 30000, '#689ad6', 'Some college or associates degree', 35000, 'Town of'],
        ['High school graduate', 25000, '#a8bfdb', 'High school graduate', 30000, 'Town of'],
        ['Less than high school graduate', 10000, '#d2d7dd', 'Less than high school graduate', 25000, 'Town of']
      ],
      rows5: [
        ['Retail/Rest./Entertainment',26],
        ['Industrial',27],
        ['Professional Services',20],
        ['Health Care',7],
        ['Public/Educ.',6],
        ['Other',14]
      ],
      rows6: [
        ['Retail/Rest./Entertainment',37],
        ['Industrial',20],
        ['Professional Services',10],
        ['Health Care',9],
        ['Public/Educ.',13],
        ['Other',11]
      ],
      rows7: [
        ['Less than high school graduate',5],
        ['High school graduate',27],
        ['Some college or associates degree',29],
        ['Bachelors degree',23],
        ['Grduate or professional degree',16]
      ],
      rows8: [
        ['Grduate or professional degree', 50000, '#1365c6', 'Graduate or professional degree', 62000, 'Town of'],
        ['Bachelors degree', 65000, '#3f7fcc', 'Bachelors degree', 50000, 'Town of'],
        ['Some college or associates degree', 30000, '#689ad6', 'Some college or associates degree', 35000, 'Town of'],
        ['High school graduate', 25000, '#a8bfdb', 'High school graduate', 30000, 'Town of'],
        ['Less than high school graduate', 10000, '#d2d7dd', 'Less than high school graduate', 25000, 'Town of']
      ],
      options1: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#d0d5dd',
        legend: {
          position: 'left',
          textStyle: {
            fontSize: 9
          }
        },
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        colors: ['red','orange','green','yellow','blue', 'grey']
      },
      options2: {
        pieHole: 0.5,
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%'
        },
        colors: ['red','orange','green','yellow','blue', 'grey']
      },
      options3: {
        pieHole: 0.5,
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%'
        },
        colors: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
      },
      options4: {
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '80%',
          left: 0,
          top: 0
        },
        hAxis: {
          title: "Thousands",
          format: 'currency'
        },
        colors: ['grey']
      }
    }
  },

  vuex: {

    actions: {

    },

    getters: {

      townName: getTownName,
      totals: getAttrib
    }
  },

  ready() {

    // Chartsjs version. Commented out for now

    // // row 1
    // var ctx1 = $("#donutChart1");
    // var ctx2 = $("#donutChart2");
    // var ctx3 = $("#donutChart3");
    // var ctx4 = $("#barChart1");

    // // row 2
    // var ctx5 = $("#donutChart4");
    // var ctx6 = $("#donutChart5");
    // var ctx7 = $("#donutChart6");
    // var ctx8 = $("#barChart2");

    // var myChart1 = new Chart(ctx1, {
    //   type: 'doughnut',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50,60],
    //         backgroundColor: ['orange','yellow','blue','green','grey', 'red']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Retail/Rest./Entertainment',
    //       'Industrial',
    //       'Professional Services',
    //       'Health Care',
    //       'Public/Educ.',
    //       'Other'
    //     ]
    //   },
    //   options: {
    //     cutoutPercentage: 60,
    //     legend: {
    //       display: true,
    //       position: 'left',
    //       labels: {
    //         fontSize: 10,
    //         boxWidth: 10
    //       }
    //     }
    //   }
    // })

    // var myChart2 = new Chart(ctx2, {
    //   type: 'doughnut',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,25,40,55,70, 85],
    //         backgroundColor: ['orange','yellow','blue','green','grey', 'red']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Retail/Rest./Entertainment',
    //       'Industrial',
    //       'Professional Services',
    //       'Health Care',
    //       'Public/Educ.',
    //       'Other'
    //     ]
    //   },
    //   options: {
    //     cutoutPercentage: 60,
    //     legend: {
    //       display: false
    //     }
    //   }
    // })

    // var myChart3 = new Chart(ctx3, {
    //   type: 'doughnut',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50],
    //         backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Less than high school graduate',
    //       'High school graduate',
    //       'Some college or associates degree',
    //       'Bachelors degree',
    //       'Grduate or professional degree'
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     }
    //   }
    // })

    // var myChart4 = new Chart(ctx4, {
    //   type: 'horizontalBar',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50],
    //         backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Less than high school graduate',
    //       'High school graduate',
    //       'Some college or associates degree',
    //       'Bachelors degree',
    //       'Grduate or professional degree'
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           fontSize: 8
    //         }
    //       }],
    //       xAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // })

    // var myChart5 = new Chart(ctx5, {
    //   type: 'doughnut',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50,60],
    //         backgroundColor: ['orange','yellow','blue','green','grey', 'red']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Retail/Rest./Entertainment',
    //       'Industrial',
    //       'Professional Services',
    //       'Health Care',
    //       'Public/Educ.',
    //       'Other'
    //     ]
    //   },
    //   options: {
    //     cutoutPercentage: 60,
    //     legend: {
    //       display: true,
    //       position: 'left',
    //       labels: {
    //         fontSize: 10,
    //         boxWidth: 10
    //       }
    //     }
    //   }
    // })

    // var myChart6 = new Chart(ctx6, {
    //   type: 'doughnut',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50,60],
    //         backgroundColor: ['orange','yellow','blue','green','grey', 'red']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Retail/Rest./Entertainment',
    //       'Industrial',
    //       'Professional Services',
    //       'Health Care',
    //       'Public/Educ.',
    //       'Other'
    //     ]
    //   },
    //   options: {
    //     cutoutPercentage: 60,
    //     legend: {
    //       display: false
    //     }
    //   }
    // })

    // var myChart7 = new Chart(ctx7, {
    //   type: 'doughnut',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50],
    //         backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'January',
    //       'February',
    //       'March',
    //       'April',
    //       'May'
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     }
    //   }
    // })

    // var myChart8 = new Chart(ctx8, {
    //   type: 'horizontalBar',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'data1',
    //         data: [10,20,30,40,50],
    //         backgroundColor: ['#d2d7dd','#a8bfdb','#689ad6','#3f7fcc','#1365c6']
    //       }
    //     ],

    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //       'Less than high school graduate',
    //       'High school graduate',
    //       'Some college or associates degree',
    //       'Bachelors degree',
    //       'Grduate or professional degree'
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           fontSize: 8
    //         }
    //       }],
    //       xAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // })
  },

  methods: {

  },

  watch: {

  }
}

</script>

<style>

.vizCol { 
  background-color: #d0d5dd; 
  padding-left: 3px !important; 
  padding-right:0 !important;
}

.vericaltext{
  width:1px;
  word-wrap: break-word;
  white-space:pre-wrap; 
}

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
