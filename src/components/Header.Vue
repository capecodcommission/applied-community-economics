<template>

  <div style = 'padding: 0 !important; background: #28536c;' class = "panel-body">
    <div style = 'padding: 0 !important; margin-right: 0px; margin-top: .2%' class = 'row text-center'>

      <div style = 'padding: 0 !important' class = 'col-md-2'>
        <img style = 'width: 100%' class="img-fluid" src="https://i.imgur.com/2rnoGzZ.png">
      </div>

      <div style = "color: #f0ead6; font-size: 30px; font-family: 'Open Sans'; margin-bottom: 1.5%" class = 'col-md-10'>
        {{townName}}
        <button class = 'btn btn-primary pull-right' @click = "restart('APPLIED COMMUNITY ECONOMICS')">Restart</button>
      </div>

      <br><br><br>

      <div v-show = "townName != 'APPLIED COMMUNITY ECONOMICS' " style = 'display: inline-block' class = 'col-md-10'>
        <div class = ' dropdown'>
          <button class = 'btn btn-block btn-lg headerBtn'>Transportation & Mobility <i class="fa fa-angle-down" ></i></button>
          <div class="dropdown-content">
            <a style = 'border-bottom: 1px solid black' @click = "goTo('pedAccom')">Pedestrian Accommodations <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('bikeAccom')">Bicyclist Accommodations <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('trafficCirc')">Traffic Circulation <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black'  @click = "goTo('parking')">Parking <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a @click = "goTo('transit')">Transit <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
          </div>
        </div>
        <div class = 'dropdown'>
          <button class = 'btn btn-block btn-lg headerBtn'>Water Resources <i class="fa fa-angle-down" ></i></button>
          <div class="dropdown-content">
            <a style = 'border-bottom: 1px solid black' @click = "goTo('drWater')">Drinking Water <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('stormwater')">Stormwater <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('wastewater')">Wastewater <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
          </div>
        </div>
        <div class = 'dropdown'>
          <button class = 'btn btn-block btn-lg headerBtn'>Community Services <i class="fa fa-angle-down" ></i></button>
          <div class="dropdown-content">
            <a style = 'border-bottom: 1px solid black' @click = "goTo('opnsprcr')">Open Space & Recreation <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('comprog')">Community Programming <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('cultmrrs')">Cultural & Marine Resources <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' @click = "goTo('hstrsrcs')" href="#">Historic Resources <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
          </div>
        </div>
        <div class = 'dropdown'>
          <button class = 'btn btn-block btn-lg headerBtn'>Neighborhoods <i class="fa fa-angle-down" ></i></button>
          <div class="dropdown-content">
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('neighborhoods')">Neighborhoods <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('housing')">Housing <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('walkability')">Walkability <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
          </div>
        </div>
        <div class = 'dropdown'>
          <button class = 'btn btn-block btn-lg headerBtn'>Utilities <i class="fa fa-angle-down" ></i></button>
          <div class="dropdown-content">
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('electric')">Electric <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('natgas')">Natural Gas <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('brdtlcm')">Broadband/Telecom <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('other')">Other <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
          </div>
        </div>
        <div class = 'dropdown'>
          <button class = 'btn btn-block btn-lg headerBtn'>Coastal Resiliency <i class="fa fa-angle-down" ></i></button>
          <div class="dropdown-content">
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('hrdsltns')">Hard Solutions <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('sftsltns')">Soft Solutions <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('dsnchrctr')">Design/Character <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('economy')">Economy <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('economyVertical')">Economy (Vertical) <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
            <a style = 'border-bottom: 1px solid black' href="#" @click = "goTo('housingStock')">Housing <i style = 'float: right;' class="fa fa-angle-right" ></i></a>
          </div>
        </div>
      </div><br><br><br>

    </div>
  </div>
</template>

<script>

import { loadTownName } from '../vuex/actions'
import { getTownName, getAttrib } from '../vuex/getters'
import {  } from 'vue-strap'
import { introJs } from '../../node_modules/intro.js/intro.js'

export default {

  components: {

  },

  data () {

    return {

    }
  },

  vuex: {
    actions: {

      loadTownName
    },
    getters: {

      townName: getTownName,
      totals: getAttrib
    }
  },

  props: ['disabled','href'],

  methods: {

    goTo: function(x) {

      router.go({name: x})
    },

    restart: function(x) {

      $('#cont1MI').css('visibility','hidden')
      $('#contROT').css('visibility','hidden')
      $('#contSel').css('visibility','hidden')
      $('#tracts1MI').css('visibility','hidden')
      $('#tractsROT').css('visibility','hidden')
      $('#tractSel').css('visibility','hidden')

      this.loadTownName(x)
      router.go({name: 'Start'})
      this.totals.Toggle = false
    }
  },

  ready() {

    $('#charts').on('click', function () {

      if ($('#charts').hasClass('btn-primary')) {

        $('#charts').removeClass('btn-primary')
      } else {

        $('#charts').addClass('btn-primary')
      }
    })

    $('#table').on('click', function () {

      if ($('#table').hasClass('btn-primary')) {

        $('#table').removeClass('btn-primary')
      } else {

        $('#table').addClass('btn-primary')
      }
    })

    $('#restartMap').on('click', function() {

      window.open('http://10.10.1.148/ace/','_self')
    })

  },

  watch: {

  }
}

</script>

<style scoped>


  .highlight {
    border-color: #646e7a;
    border-radius: 25px;
    border-style: solid;
  }

  .headerBtn {
    color: #f0ead6; 
    background: transparent; 
    border-radius: 5px; 
    border-color: black;
    font-family: "Open Sans";
    white-space: normal;
  }

  .headerBtn:hover {background-color: #30c9c9}

  .dropdown {
    position: relative;
    display: inline-block;
    width: 16%;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #28536c;
    min-width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: #f0ead6;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-family: "Open Sans";
    /*font-size: 20;*/
    text-align: left;
}

.dropdown-content a:hover {background-color: #30c9c9}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: #3e8e41;
}
</style>
