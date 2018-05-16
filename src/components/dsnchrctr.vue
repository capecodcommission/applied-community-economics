<template>
  
  <div class="col-md-6">

    <h3 align = 'left' style = 'color: red'>Design / Character</h3>

    <ul align = 'left' style = 'font-size: 20px;'>

      <li style = 'color: red;'>#/% {{townName}} Residents Participating in Youth Programs relative to Town Participation</li>
      <li>{{townName}} Youth Use of Transportation Services</li>
      <li>Evening and Weekend Transportation Services Offered</li>
      <li>#/% {{townName}} Residents Participating in Senior Center Programs relative to Town Participation</li>
      <li style = 'color: red;'>Hyannis Free Library – Hours; Staffing and Circulation Relative to Service Area Size and Town of Barnstable Use Overall</li>
      <li style = 'color: red;'># of Non profit land uses  & Income from non profit land uses</li>
      <li>Barnstable County/Town of Barnstable utilization Rates</li>
      <li>Annual Revenue from Shanty Program & Net Profit to Town</li>
      <li>#/type of Artists Participating</li>
      <li># Artists from Hyannis/Town of Barnstable Participating</li>
      <li># Visitors to Cultural Facilities</li>
      <li># Public Art Installations</li>
      
    </ul>

  </div>

  <div class = 'col-md-6'>

    <div class = 'row'>

      <div class = 'col-md-12'>

        <canvas id = 'pieChart2'></canvas> 

      </div>
    </div>
  </div>

</template>

<script>

import * as esriLoader from 'esri-loader'
import { getTownName } from '../vuex/getters'

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

    var ctx2 = $("#pieChart2");

    var myChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Bar',
            data: [10,20,30,40,50],
            backgroundColor: 'grey'
          },
          {
            label: 'Line',
            data: [5,10,20,40,60],
            type: 'line',
            backgroundColor: 'purple'
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
