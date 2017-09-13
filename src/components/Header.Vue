<template>

  <div class = "panel-body">
    <div class = 'row'>
      <div class = 'col-md-12 text-center'>
        <button class = 'btn btn-primary text-center'>{{townName}}</button><br>
        <button id ='restartMap' class = 'btn btn-success pull-right'>Restart</button>
      </div>
    </div>

    <br>

    <div class = 'row'>
      <div class = 'col-md-12'>
        
      </div>
    </div>
  </div>

</template>

<script>

import {  } from '../vuex/actions'
import { getTownName } from '../vuex/getters'
import {  } from 'vue-strap'
import {introJs} from '../../node_modules/intro.js/intro.js'

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

      window.open('http://2016.watershedmvp.org/cc/','_self')
    })

  },

  watch: {

  }
}

</script>

<style lang="scss" scoped>

</style>
