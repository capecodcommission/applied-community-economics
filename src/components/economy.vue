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
      <div class = 'col-md-6 vizColDark'>
        <h4>Business</h4>
        <!-- <div style = 'padding-bottom: 0' class = 'row'>
          <ul class="legend">
            <li><span class="superawesome1"></span> Retail/Rest./Entertainment</li>
            <li><span class="awesome1"></span> Industrial</li>
            <li><span class="kindaawesome1"></span> Professional Services</li>
            <li><span class="notawesome1"></span> Health Care</li>
            <li><span class="neato1"></span> Public/Educ.</li>
            <li><span class="great"></span> Other</li>
          </ul>
        </div> -->
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows1" :options="options1"></vue-chart>
        <p class = 'housing-stats'>Total Businesses: {{(1478).toLocaleString()}}</p>
        <p class = 'housing-stats'>Diversity: {{(.77).toLocaleString()}}</p>
      </div>
      <div class = 'col-md-6 vizColDark'>
        <h4>Employment</h4>
        <div style = 'padding-bottom: 0' class = 'row'>
          <ul class="legend hidden">
            <li><span class="superawesome1"></span> Retail/Rest./Entertainment</li>
            <li><span class="awesome1"></span> Industrial</li>
            <li><span class="kindaawesome1"></span> Professional Services</li>
            <li><span class="notawesome1"></span> Health Care</li>
            <li><span class="neato1"></span> Public/Educ.</li>
            <li><span class="great"></span> Other</li>
          </ul>
        </div>
        <vue-chart class = 'chart' :chart-type="chartType2" :columns="columns2" :rows="rows2" :options="options2"></vue-chart>
        <p class = 'housing-stats'>Total Jobs: {{(23508).toLocaleString()}}</p>
        <p class = 'housing-stats'>Diversity: {{(.72).toLocaleString()}}</p>
      </div>
    </div>
    <div style = 'background-color: #a5a9af; padding-top: 2%' class = 'col-md-7'>
      <div class = 'col-md-4 housing-stats vizColDark'>
        <div class = 'row'>
          <h1>${{totals.paretoMedianCont}}</h1>
          <p><b>Median Household Income</b></p>
        </div>
        <div class = 'row'>
          <h1>{{(totals.percUnempCont * 100).toFixed(1)}}%</h1>
          <p><b>Unemployment</b></p>
        </div>
        <!-- <div class = 'row'>
          <ul class="legend">
            <li><span class="superawesome"></span> Less than high school graduate</li>
            <li><span class="awesome"></span> High school graduate (includes equivalency)</li>
            <li><span class="kindaawesome"></span> Some college or associate's degree</li>
            <li><span class="notawesome"></span> Bachelor's degree</li>
            <li><span class="neato"></span> Graduate or professional degree</li>
          </ul>
        </div> -->
      </div>
      <div class = 'col-md-4 vizColDark'>
        <h4>Educational Attainment</h4>
        <vue-chart class = 'chart' :chart-type="chartType3" :columns="columns3" :rows="rows9" :options="options3"></vue-chart>
        <p class = 'housing-stats'>Population > 25 years: {{totals.totalEduCont.toLocaleString()}}</p>
      </div>
      <div class = 'col-md-4 vizColDark'>
        <h4>Median Earnings</h4>
        <div style = 'padding-bottom: 0' class = 'row'>
          <ul class="legend pull-right">
            <li><span class="awesome2"></span> Town of Barnstable</li>
          </ul>
        </div>
        <vue-chart class = 'chart' :chart-type="chartType4" :columns="columns4" :rows="rows10" :options="options4"></vue-chart>
      </div>
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-5'>
      <div class = 'col-md-6 vizColDark'>
        <h4>Business</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows1" :options="options1"></vue-chart>
        <p class = 'housing-stats'>Total Businesses: {{(23508).toLocaleString()}}</p>
        <p class = 'housing-stats'>Diversity: {{(.72).toLocaleString()}}</p>
      </div>
      <div class = 'col-md-6 vizColDark'>
        <h4>Employment</h4>
        <vue-chart class = 'chart' :chart-type="chartType2" :columns="columns2" :rows="rows2" :options="options2"></vue-chart>
        <p class = 'housing-stats'>Total Jobs: {{(23508).toLocaleString()}}</p>
        <p class = 'housing-stats'>Diversity: {{(.72).toLocaleString()}}</p>
      </div>
    </div>
    <div style = 'background-color: #a5a9af; padding-top: 2%' class = 'col-md-7'>
      <div class = 'col-md-4 housing-stats vizColDark'>
        <div class = 'row'>
          <h1>${{totals.paretoMedian}}</h1>
          <p><b>Median Household Income</b></p>
        </div>
        <div class = 'row'>
          <h1>{{(totals.percUnemp * 100).toFixed(1)}}%</h1>
          <p><b>Unemployment</b></p>
        </div>
      </div>
      <div class = 'col-md-4 vizColDark'>
        <h4>Educational Attainment</h4>
        <vue-chart class = 'chart' :chart-type="chartType3" :columns="columns3" :rows="rows3" :options="options3"></vue-chart>
        <p class = 'housing-stats'>Population > 25 years: {{totals.totalEdu.toLocaleString()}}</p>
      </div>
      <div class = 'col-md-4 vizColDark'>
        <h4>Median Earnings</h4>
        <div style = 'padding-bottom: 0' class = 'row'>
          <ul class="legend pull-right">
            <li><span class="awesome2"></span> Town of Barnstable</li>
          </ul>
        </div>
        <vue-chart class = 'chart' :chart-type="chartType4" :columns="columns4" :rows="rows4" :options="options4"></vue-chart>
      </div>
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-5'>
      <div class = 'col-md-6 vizCol'>
        <h4>Business</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows5" :options="options5"></vue-chart>
        <p class = 'housing-stats'>Total Businesses: {{(23508).toLocaleString()}}</p>
        <p class = 'housing-stats'>Diversity: {{(.72).toLocaleString()}}</p>
      </div>
      <div class = 'col-md-6 vizCol'>
        <h4>Employment</h4>
        <vue-chart class = 'chart' :chart-type="chartType2" :columns="columns2" :rows="rows6" :options="options9"></vue-chart>
        <p class = 'housing-stats'>Total Jobs: {{(23508).toLocaleString()}}</p>
        <p class = 'housing-stats'>Diversity: {{(.72).toLocaleString()}}</p>
      </div>
    </div>
    <div style = 'background-color: #d0d5dd; padding-top: 2%' class = 'col-md-7'>
      <div class = 'col-md-4 housing-stats vizCol'>
        <div class = 'row'>
          <h1>${{totals.townParetoMedian}}</h1>
          <p><b>Median Household Income</b></p>
        </div>
        <div class = 'row'>
          <h1>{{(totals.townPercUnemp * 100).toFixed(1)}}%</h1>
          <p><b>Unemployment</b></p>
        </div>
      </div>
      <div class = 'col-md-4 vizCol'>
        <h4>Educational Attainment</h4>
        <vue-chart class = 'chart' :chart-type="chartType3" :columns="columns3" :rows="rows7" :options="options6"></vue-chart>
        <p class = 'housing-stats'>Population > 25 years: {{totals.townEdu.toLocaleString()}}</p>
      </div>
      <div class = 'col-md-4 vizCol'>
        <h4>Median Earnings</h4>
        <div style = 'padding-bottom: 0' class = 'row'>
          <ul class="legend pull-right">
            <li><span class="awesome2"></span> Town of Barnstable</li>
          </ul>
        </div>
        <vue-chart class = 'chart' :chart-type="chartType4" :columns="columns4" :rows="rows8" :options="options10"></vue-chart>
      </div>
    </div>
  </div>

</template>

<script>

import * as esriLoader from 'esri-loader'
import { getAttrib, getTownName } from '../vuex/getters'

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
          'type': 'number',
          'label': 'IncomeTown'
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
        ['Less than high school graduate',this.totals.lessHS],
        ['High school graduate',this.totals.hsg],
        ['Some college or associates degree',this.totals.sca],
        ['Bachelors degree',this.totals.bac],
        ['Graduate or professional degree',this.totals.gradPro]
      ],
      rows4: [
        ['Graduate or professional degree', this.totals.incGrad, '#222a35', this.totals.townIncGrad],
        ['Bachelors degree', this.totals.incBac, '#333f50', this.totals.townIncBac],
        ['Some college or associates degree', this.totals.incSCA, '#849bb0', this.totals.townIncSCA],
        ['High school graduate', this.totals.incHSG, '#adb9ca', this.totals.townIncHSG],
        ['Less than high school graduate', this.totals.incLessHS, '#dae3f3', this.totals.townIncLessHS]
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
        ['Less than high school graduate',this.totals.townLessHS],
        ['High school graduate',this.totals.townHSG],
        ['Some college or associates degree',this.totals.townSCA],
        ['Bachelors degree',this.totals.townBac],
        ['Graduate or professional degree',this.totals.townGradPro]
      ],
      rows8: [
        ['Graduate or professional degree', this.totals.townIncGradROT, '#222a35', this.totals.townIncGrad],
        ['Bachelors degree', this.totals.townIncBacROT, '#333f50', this.totals.townIncBac],
        ['Some college or associates degree', this.totals.townIncSCAROT, '#849bb0', this.totals.townIncSCA],
        ['High school graduate', this.totals.townIncHSGROT, '#adb9ca', this.totals.townIncHSG],
        ['Less than high school graduate', this.totals.townIncLessHSROT, '#dae3f3', this.totals.townIncLessHS]
      ],
      rows9: [
        ['Less than high school graduate',this.totals.lessHSCont],
        ['High school graduate',this.totals.hsgCont],
        ['Some college or associates degree',this.totals.scaCont],
        ['Bachelors degree',this.totals.bacCont],
        ['Graduate or professional degree',this.totals.gradProCont]
      ],
      rows10: [
        ['Graduate or professional degree', this.totals.incGradCont, '#222a35', this.totals.townIncGrad],
        ['Bachelors degree', this.totals.incBacCont, '#333f50', this.totals.townIncBac],
        ['Some college or associates degree', this.totals.incSCACont, '#849bb0', this.totals.townIncSCA],
        ['High school graduate', this.totals.incHSGCont, '#adb9ca', this.totals.townIncHSG],
        ['Less than high school graduate', this.totals.incLessHSCont, '#dae3f3', this.totals.townIncLessHS]
      ],
      options1: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#a5a9af',
        legend: {
          position: 'left',
          textStyle: {
            fontSize: 9
          }
        },
        slices: {
          2: {textStyle: {color: '#000000'}},
          3: {textStyle: {color: '#000000'}}
        },
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        colors: ['#c00000','#ed7d31','#92d050','#ffc000','5b9bd5', '#bfbfbf']
      },
      options2: {
        pieHole: 0.5,
        backgroundColor: '#a5a9af',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%'
        },
        slices: {
          2: {textStyle: {color: '#000000'}},
          3: {textStyle: {color: '#000000'}}
        },
        colors: ['#c00000','#ed7d31','#92d050','#ffc000','5b9bd5', '#bfbfbf']
      },
      options3: {
        pieHole: 0.5,
        backgroundColor: '#a5a9af',
        legend: {
          position: 'left',
          textStyle: {
            fontSize: 9
          }
        },
        chartArea: {
          width: '100%',
          height: '100%'
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#dae3f3','#adb9ca','#849bb0','#333f50','#222a35']
      },
      options4: {
        backgroundColor: '#a5a9af',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '80%',
          left: 75,
          top: 0
        },
        hAxis: {
          title: "Thousands",
          format: 'currency'
        },
        colors: ['grey']
      },
      options5: {
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
        slices: {
          2: {textStyle: {color: '#000000'}},
          3: {textStyle: {color: '#000000'}}
        },
        colors: ['#c00000','#ed7d31','#92d050','#ffc000','#5b9bd5', '#bfbfbf']
      },
      options6: {
        pieHole: 0.5,
        backgroundColor: '#d0d5dd',
        legend: {
          position: 'left',
          textStyle: {
            fontSize: 9
          }
        },
        chartArea: {
          width: '100%',
          height: '100%'
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#dae3f3','#adb9ca','#849bb0','#333f50','#222a35']
      },
      options7: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#d0d5dd',
        legend: {
          position: 'left',
          textStyle: {
            fontSize: 9
          }
        },
        slices: {
          2: {textStyle: {color: '#000000'}},
          3: {textStyle: {color: '#000000'}}
        },
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        colors: ['#c00000','#ed7d31','#92d050','#ffc000','5b9bd5', '#bfbfbf']
      },
      options8: {
        pieHole: 0.5,
        backgroundColor: '#a5a9af',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%'
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#dae3f3','#adb9ca','#849bb0','#333f50','#222a35']
      },
      options9: {
        pieHole: 0.5,
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%'
        },
        slices: {
          2: {textStyle: {color: '#000000'}},
          3: {textStyle: {color: '#000000'}}
        },
        colors: ['#c00000','#ed7d31','#92d050','#ffc000','5b9bd5', '#bfbfbf']
      },
      options10: {
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '80%',
          left: 75,
          top: 0
        },
        hAxis: {
          title: "Thousands",
          format: 'currency'
        },
        colors: ['grey']
      },
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

vue-chart { width: 100% !important }

.legend { list-style: none; }
.legend li { font-size: 10px; float: left; }
.legend span { border: 1px solid #ccc; float: left; width: 10px; height: 10px; margin: 2px; }

.legend .superawesome { background-color: #dae3f3;}
.legend .awesome { background-color: #adb9ca; }
.legend .kindaawesome { background-color: #849bb0; }
.legend .notawesome { background-color: #333f50; }
.legend .neato { background-color: #222a35; }

.legend .superawesome1 { background-color: #c00000;}
.legend .awesome1 { background-color: #ed7d31; }
.legend .kindaawesome1 { background-color: #92d050; }
.legend .notawesome1 { background-color: #ffc000; }
.legend .neato1 { background-color: #5b9bd5; }
.legend .great { background-color: #bfbfbf; }

.legend .awesome2 { background-color: #686868; }

.vizCol { 
  background-color: #d0d5dd; 
  padding-left: 3px !important; 
  padding-right:0 !important;
}

.vizColDark { 
  background-color: #a5a9af; 
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
