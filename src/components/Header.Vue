<template>

  <div style = 'padding: 0 !important; background: #28536c;' class = "panel-body">

    <div style = 'padding: 0 !important' class = 'row text-center'>
      <div style = 'padding: 0 !important' class = 'col-md-2'>
        <img style = 'width: 100%' class="img-fluid" src="https://i.imgur.com/2rnoGzZ.png">
      </div>
      <div style = "padding: 0 !important; color: #f0ead6; font-size: 30px; font-family: 'Open Sans'" class = 'col-md-10'>
        {{townName}}
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
