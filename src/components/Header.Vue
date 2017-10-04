<template>

  <div class = "panel-body">
    <div class = 'row'>
      <div class = 'col-md-12 text-center'>
        <button @click = 'goComingSoon($route.params.id)' class = 'btn btn-success pull-right'>More Metrics</button><br><br>
        <button id ='restartMap' class = 'btn btn-success pull-right'>Restart</button>
      </div>
    </div>

    <br>
    
  </div>

</template>

<script>

import {  } from '../vuex/actions'
import {  } from '../vuex/getters'
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
      
    }
  },

  props: ['disabled','href'],

  methods: {

    goComingSoon: function(x) {

      router.go({name: 'comingSoon', params: {id: x}})
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

<style lang="scss" scoped>

</style>
