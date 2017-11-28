<template>

  <div style = 'padding: 0 !important; background: #28536c;' class = "panel-body">
    <div style = 'padding: 0 !important;' class = 'row text-center'>

      <div style = 'padding: 0 !important' class = 'col-md-2'>
        <img style = 'width: 100%' class="img-fluid" src="https://i.imgur.com/2rnoGzZ.png">
      </div>

      <div style = "color: #f0ead6; font-size: 30px; font-family: 'Open Sans'" class = 'col-md-10'>
        {{townName}}
      </div>

      <br><br><br>

      <div class = 'col-md-2'>
        <button @click = 'goComingSoon' class = 'btn btn-block btn-lg headerBtn'>Mobility & Transportation <i class="fa fa-angle-down" ></i></button>
      </div>
      <div class = 'col-md-2'>
        <button class = 'btn btn-block btn-lg headerBtn'>Water Resources <i class="fa fa-angle-down" ></i></button>
      </div>
      <div class = 'col-md-2'>
        <button class = 'btn btn-block btn-lg headerBtn'>Community Services <i class="fa fa-angle-down" ></i></button>
      </div>
      <div class = 'col-md-2'>
        <button class = 'btn btn-block btn-lg headerBtn'>Housing <i class="fa fa-angle-down" ></i></button>
      </div>
      <div class = 'col-md-2'>
        <button class = 'btn btn-block btn-lg headerBtn'>Utilities <i class="fa fa-angle-down" ></i></button>
      </div>

    </div>
  </div>
</template>

<script>

import {  } from '../vuex/actions'
import { getTownName } from '../vuex/getters'
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

      
    },
    getters: {
      townName: getTownName
    }
  },

  props: ['disabled','href'],

  methods: {

    goComingSoon: function() {

      router.go({name: 'comingSoon'})
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
  }
</style>
