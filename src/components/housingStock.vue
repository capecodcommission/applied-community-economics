<template>

  <div class = 'row'>
    <div class = 'col-md-12 col-heading'>
      <h2 class = 'pull-left'>HOUSING</h2>
    </div>
  </div>
    
  <div class = 'row'>
    <div class = 'col-md-6'>
      <div class = 'col-md-12 col-heading'>
        <h3 class = 'pull-left'>STOCK</h3>
      </div>
    </div>
    <div style = 'padding-left: 0 !important; padding-right: 0 !important' class = 'col-md-6'>
      <div class = 'col-md-12 col-heading'>
        <h3 class = 'pull-left'>AFFORDABILITY</h3>
      </div>
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-6'>
      <div class = 'col-md-4 vizCol text-center'>
        <h4>Seasonality</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows14" :options="options6"></vue-chart>
        <p class = 'housing-stats'>Total Units: {{totals.totalHousingSelected.toLocaleString()}}</p>
        <p class = 'housing-stats'>Built Residential Parcels: {{totals.totalResidentialSelected.toLocaleString()}}</p>
        <div class = 'row text-center'>
          <ul class="legend text-center">
            <li><span class="superawesome1"></span> Year-round</li>
            <li><span class="awesome1"></span> Seasonal</li>
          </ul>
        </div>
      </div>
      <div style="padding-bottom: 1.5%" class = 'col-md-4 vizCol text-center'>
        <h4>Tenure</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows1" :options="options7"></vue-chart>
        <p class = 'housing-stats'>** Subsidized Units Not Available Within Selection **</p>
        <div class = 'row text-center'>
          <ul class="legend text-center">
            <li><span class="superawesome1"></span> Owned</li>
            <li><span class="awesome2"></span> Rental</li>
          </ul>
        </div>
      </div>
      <div style="padding-bottom: 4%" class = 'col-md-4 vizCol text-center'>
        <div class = 'row'>
          <div class = 'col-md-6 vizCol text-center'>
            <p class = 'housing-stats'>Average Units Per Parcel: {{totals.avgUnitsPPSelected.toFixed(1)}}</p>
          </div>
          <div class = 'col-md-6 vizCol text-center'>
            <p class = 'housing-stats'>Average Units Per Acre: {{totals.avgUnitsPASelected.toFixed(1)}}</p>
          </div>
        </div>
        <div class = 'row'>
          <vue-chart class = 'chart' :chart-type="chartType4" :columns="columns4" :rows="rows15" :options="options4"></vue-chart>
        </div>
        <div class = 'row text-center'>
          <ul class="legend text-center">
            <li><span class="superawesome2"></span> Units</li>
            <li><span class="awesome3"></span> Acres</li>
          </ul>
        </div>
      </div>
    </div>
    <div style = 'background-color: #aeb3ba' class = 'col-md-6'>
      <!-- <div class = 'col-md-4 housing-stats vizCol'>
        <div class = 'row'>
          <h1>${{totals.paretoMedianCont}}</h1>
          <p><b>Median Household Income</b></p>
        </div>
      </div> -->
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-6'>
      <div style = 'padding-bottom: 7%' class = 'col-md-4 vizCol'>
        <h4>Seasonality</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns2" :rows="rows11" :options="options6"></vue-chart>
        <p class = 'housing-stats'>Total Units: {{totals.totalHousing1MI.toLocaleString()}}</p>
        <p class = 'housing-stats'>Built Residential Parcels: {{totals.totalResidential1MI.toLocaleString()}}</p>
      </div>
      <div class = 'col-md-4 vizCol text-center'>
        <h4>Tenure</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows2" :options="options7"></vue-chart>
        <p class = 'housing-stats'>Subsidized Rentals: 672*</p>
        <p class = 'housing-stats'>Subsidized Owned: 50*</p>
        <p class = 'housing-stats'>* Hyannis (Zip code 02601) Source Growth Management Department</p>
      </div>
      <div style = 'padding-bottom: 10.5%' class = 'col-md-4 vizCol text-center'>
        <div class = 'row'>
          <div class = 'col-md-6 vizCol text-center'>
            <p class = 'housing-stats'>Average Units Per Parcel: {{totals.avgUnitsPP1MI.toFixed(1)}}</p>
          </div>
          <div class = 'col-md-6 vizCol text-center'>
            <p class = 'housing-stats'>Average Units Per Acre: {{totals.avgUnitsPA1MI.toFixed(1)}}</p>
          </div>
        </div>
        <div class = 'row'>
          <vue-chart class = 'chart' :chart-type="chartType4" :columns="columns4" :rows="rows10" :options="options4"></vue-chart>
        </div>
      </div>
    </div>
    <div style = 'background-color: #aeb3ba' class = 'col-md-6'>
      <!-- <div class = 'col-md-4 housing-stats vizCol'>
        <div class = 'row'>
          <h1>${{totals.paretoMedian}}</h1>
          <p><b>Median Household Income</b></p>
        </div>
      </div> -->
    </div>
  </div>

  <div class = 'row'>
    <div class = 'col-md-6'>
      <div style = 'padding-bottom: 2%' class = 'col-md-4 vizCol2'>
        <h4>Seasonality</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows12" :options="options5"></vue-chart>
        <p class = 'housing-stats'>Total Units: {{totals.totalHousingROT.toLocaleString()}}</p>
        <p class = 'housing-stats'>Built Residential Parcels: {{totals.totalResidentialROT.toLocaleString()}}</p>
      </div>
      <div style = 'padding-bottom: 2%' class = 'col-md-4 vizCol2 text-center'>
        <h4>Tenure</h4>
        <vue-chart class = 'chart' :chart-type="chartType1" :columns="columns1" :rows="rows13" :options="options8"></vue-chart>
        <p class = 'housing-stats'>Subsidized Rentals: 197</p>
        <p class = 'housing-stats'>Subsidized Owned: 80</p>
      </div>
      <div style="padding-bottom:6%" class = 'col-md-4 vizCol2 text-center'>
        <div class = 'row'>
          <div class = 'col-md-6 vizCol2 text-center'>
            <p class = 'housing-stats'>Average Units Per Parcel: {{totals.avgUnitsPPROT.toFixed(1)}}</p>
          </div>
          <div class = 'col-md-6 vizCol2 text-center'>
            <p class = 'housing-stats'>Average Units Per Acre: {{totals.avgUnitsPAROT.toFixed(1)}}</p>
          </div>
        </div>
        <div class = 'row'>
          <vue-chart class = 'chart' :chart-type="chartType4" :columns="columns4" :rows="rows16" :options="options9"></vue-chart>
        </div>
      </div>
    </div>
    <div style = 'background-color: #d0d5dd' class = 'col-md-6'>
      <!-- <div class = 'col-md-4 housing-stats vizCol2'>
        <div class = 'row'>
          <h1>${{totals.townParetoMedian}}</h1>
          <p><b>Median Household Income</b></p>
        </div>
      </div> -->
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
          'label': 'Housing Type'
        },
        {
          'type': 'number',
          'label': 'Units'
        },
        {
          'type': 'string',
          'role': 'style' // Define bar color using hex value
        },
        {
          'type': 'number',
          'label': 'Acres'
        }
      ],
      rows1: [
        ['Year-round',this.totals.totalOwnedSelected],
        ['Seasonal',this.totals.totalRentalSelected]
      ],
      rows2: [
        ['Owned',this.totals.totalOwned1MI],
        ['Rental',this.totals.totalRental1MI]
      ],
      rows3: [
        ['Less than high school graduate',this.totals.lessHS],
        ['High school graduate',this.totals.hsg],
        ['Some college or associates degree',this.totals.sca],
        ['Bachelors degree',this.totals.bac],
        ['Grduate or professional degree',this.totals.gradPro]
      ],
      rows4: [
        ['Grduate or professional degree', this.totals.incGrad, '#222a35', 'Graduate or professional degree', this.totals.townIncGrad],
        ['Bachelors degree', this.totals.incBac, '#333f50', 'Bachelors degree', this.totals.townIncBac],
        ['Some college or associates degree', this.totals.incSCA, '#849bb0', 'Some college or associates degree', this.totals.townIncSCA],
        ['High school graduate', this.totals.incHSG, '#adb9ca', 'High school graduate', this.totals.townIncHSG],
        ['Less than high school graduate', this.totals.incLessHS, '#dae3f3', 'Less than high school graduate', this.totals.townIncLessHS]
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
        ['Grduate or professional degree',this.totals.townGradPro]
      ],
      rows8: [
        ['Grduate or professional degree', this.totals.townIncGradROT, '#222a35', 'Graduate or professional degree', this.totals.townIncGrad],
        ['Bachelors degree', this.totals.townIncBacROT, '#333f50', 'Bachelors degree', this.totals.townIncBac],
        ['Some college or associates degree', this.totals.townIncSCAROT, '#849bb0', 'Some college or associates degree', this.totals.townIncSCA],
        ['High school graduate', this.totals.townIncHSGROT, '#adb9ca', 'High school graduate', this.totals.townIncHSG],
        ['Less than high school graduate', this.totals.townIncLessHSROT, '#dae3f3', 'Less than high school graduate', this.totals.townIncLessHS]
      ],
      rows9: [
        ['Less than high school graduate',this.totals.lessHSCont],
        ['High school graduate',this.totals.hsgCont],
        ['Some college or associates degree',this.totals.scaCont],
        ['Bachelors degree',this.totals.bacCont],
        ['Grduate or professional degree',this.totals.gradProCont]
      ],
      rows10: [
        ['Residential Condo', this.totals.totalResCondo1MIHSG, '#333f50', this.totals.totalResCondo1MIAcres],
        ['Apartments (4+)', this.totals.totalApt1MIHSG, '#333f50', this.totals.totalApt1MIAcres],
        ['Shared or Temporary Housing', this.totals.totalShrdTmp1MIHSG, '#333f50', this.totals.totalShrdTmp1MIAcres],
        ['Multifamily or Mixed Use', this.totals.totalMixed1MIHSG, '#333f50', this.totals.totalMixed1MIAcres],
        ['Multiple Houses/Parcel', this.totals.totalMultiOne1MIHSG, '#333f50', this.totals.totalMultiOne1MIAcres],
        ['Single Family', this.totals.totalSingleFam1MIHSG, '#333f50', this.totals.totalSingleFam1MIAcres]
      ],
      rows11: [
        ['Year-round',this.totals.totalYearRound1MI],
        ['Seasonal',this.totals.totalSeasonal1MI]
      ],
      rows12: [
        ['Year-round',this.totals.totalYearRoundROT],
        ['Seasonal',this.totals.totalSeasonalROT]
      ],
      rows13: [
        ['Owned',this.totals.totalOwnedROT],
        ['Rented',this.totals.totalRentalROT]
      ],
      rows14: [
        ['Year-round',this.totals.totalYearRoundSelected],
        ['Seasonal',this.totals.totalSeasonalSelected]
      ],
      rows15: [
        ['Residential Condo', this.totals.totalResCondoSelectedHSG, '#333f50', this.totals.totalResCondoSelectedAcres],
        ['Apartments (4+)', this.totals.totalAptSelectedHSG, '#333f50', this.totals.totalAptSelectedAcres],
        ['Shared or Temporary Housing', this.totals.totalShrdTmpSelectedHSG, '#333f50', this.totals.totalShrdTmpSelectedAcres],
        ['Multifamily or Mixed Use', this.totals.totalMixedSelectedHSG, '#333f50', this.totals.totalMixedSelectedAcres],
        ['Multiple Houses/Parcel', this.totals.totalMultiOneSelectedHSG, '#333f50', this.totals.totalMultiOneSelectedAcres],
        ['Single Family', this.totals.totalSingleFamSelectedHSG, '#333f50', this.totals.totalSingleFamSelectedAcres]
      ],
      rows16: [
        ['Residential Condo', this.totals.totalResCondoROTHSG, '#333f50', this.totals.totalResCondoROTAcres],
        ['Apartments (4+)', this.totals.totalAptROTHSG, '#333f50', this.totals.totalAptROTAcres],
        ['Shared or Temporary Housing', this.totals.totalShrdTmpROTHSG, '#333f50', this.totals.totalShrdTmpROTAcres],
        ['Multifamily or Mixed Use', this.totals.totalMixedROTHSG, '#333f50', this.totals.totalMixedROTAcres],
        ['Multiple Houses/Parcel', this.totals.totalMultiOneROTHSG, '#333f50', this.totals.totalMultiOneROTAcres],
        ['Single Family', this.totals.totalSingleFamROTHSG, '#333f50', this.totals.totalSingleFamROTAcres]
      ],
      options1: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#aeb3ba',
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
        backgroundColor: '#aeb3ba',
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
        backgroundColor: '#aeb3ba',
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
      options4: {
        backgroundColor: '#aeb3ba',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '80%',
          left: 75,
          top: 0
        },
        colors: ['#FFFFFF'],
        hAxis: {
          textStyle:{
            color: '#FFF'
          }
        }
      },
      options5: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#FFFFFF','#FF5500']
      },
      options6: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#aeb3ba',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#FFFFFF','#FF5500']
      },
      options7: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#aeb3ba',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#FFFFFF','#6677CD']
      },
      options8: {
        pieHole: 0.5, // Define donut hole width
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        },
        slices: {
          0: {textStyle: {color: '#000000'}}
        },
        colors: ['#FFFFFF','#6677CD']
      },
      options9: {
        backgroundColor: '#d0d5dd',
        legend: 'none',
        chartArea: {
          width: '100%',
          height: '80%',
          left: 75,
          top: 0
        },
        colors: ['#FFFFFF'],
        hAxis: {
          textStyle:{
            color: '#FFF'
          }
        }
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

  },

  methods: {

  },

  watch: {

  }
}

</script>

<style scoped>

vue-chart { width: 100% !important }

.legend { list-style: none; }
.legend li { font-size: 10px; float: left; }
.legend span { border: 1px solid #ccc; float: left; width: 10px; height: 10px; margin: 2px; }

.legend .superawesome { background-color: #dae3f3;}
.legend .awesome { background-color: #adb9ca; }
.legend .kindaawesome { background-color: #849bb0; }
.legend .notawesome { background-color: #333f50; }
.legend .neato { background-color: #222a35; }

.legend .superawesome1 { background-color: white;}
.legend .awesome1 { background-color: #FF5500;}
.legend .kindaawesome1 { background-color: #92d050; }
.legend .notawesome1 { background-color: #ffc000; }
.legend .neato1 { background-color: #5b9bd5; }
.legend .great { background-color: #bfbfbf; }

.legend .awesome2 { background-color: #6677CD; }

.legend .superawesome2 { background-color: #333F50;}
.legend .awesome3 { background-color: #FFFFFF; }

.vizCol { 
  background-color: #aeb3ba; 
  padding-left: 3px !important; 
  padding-right:0 !important;
}

.vizCol2 { 
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
