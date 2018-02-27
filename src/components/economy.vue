<template>

  <div class = 'row'>

    <h1 align = 'left' style = 'color: white; background-color: gray'>ECONOMY</h1>
  </div>
  
  <div class="col-md-6">

    <div class = 'row'>

      <h4 align = 'left' style = 'color: white; background-color: gray'>COMMERCIAL</h4>
      <canvas id = 'pieChart2'></canvas> 
    </div>

  </div>

  <div class = 'col-md-6'>

    <div class = 'row'>

      <h4 align = 'left' style = 'color: white; background-color: gray'>RESIDENTIAL</h4>
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

    var ctx2 = $("#pieChart2");

    var myChart = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'data1',
            data: [10,20,30,40,50],
            backgroundColor: ['red','yellow','blue','green','purple']
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
