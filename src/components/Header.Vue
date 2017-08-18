<template>

  <div class = "panel-body">
    <div class = 'row'>
      <div class = 'col-md-12 text-center'>
        <tooltip effect = 'scale' placement = 'bottom' content = 'This is your selected station'>
          <button class = 'btn btn-primary text-center'>{{ embayment.id }}</button><br>
        </tooltip>
        <button id ='restartMap' class = 'btn btn-success pull-right'>Restart</button>
      </div>
    </div>

    <br>

    <div class = 'row'>
      <div class = 'col-md-12'>
        <div class = "btn-group btn-group-justified">
  		    <div class="btn-group">
            <tooltip effect = 'scale' placement = 'bottom' content = 'This is your current page'>
              <button id = 'table' v-link="{ name: 'TreatmentDetail' }" class="btn">Nutrient Table</button>
            </tooltip>
          </div>
  		    <div class="btn-group">
            <button id = 'charts' v-link="{ name: 'propertyOwnerCosts' }" class="btn">Nutrient Charts</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { loadEmbayment } from '../vuex/actions'
import { getEmbayment, getEmbayments } from '../vuex/getters'
import { tooltip, alert } from 'vue-strap'
import {introJs} from '../../node_modules/intro.js/intro.js'

export default {

  components: {

    tooltip,
    alert
  },

  data () {

    return {

    }
  },

  vuex: {
    actions: {

      loadEmbayment
    },
    getters: {
      
      embayment: getEmbayment,
      embayments: getEmbayments
    }
  },

  props: ['disabled','href', 'embayment.data'],

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

      window.open('http://2016.watershedmvp.org/wq/','_self')
    })

  },

  watch: {

  }
}

</script>

<style lang="scss" scoped>

</style>
