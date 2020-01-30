<template>

  <div style = 'overflow: hidden' id="loading">
    <p id = 'progress' class = 'center'></p>
  </div>

  <div style = 'padding-bottom: 0px; flex-shrink: 0 !important' class = 'row'>
    <div style = 'padding-right: 0px; padding-left: 0px' class = 'col-md-12'>
      <headthing></headthing>
    </div>
  </div>

  <div style = 'height: calc(100% - 123.797px); padding-bottom: 0' class = 'row'>
    <div class = 'col-md-2 sidething'>
      <sidething></sidething>
    </div>
    <div style = 'padding-left: 0;' class = 'col-md-10 text-center'>
      <map></map>
      <debug></debug>
    </div>
  </div>

  <div transition = 'fade' v-show = 'showComparison' class = 'col-md-8 Comparison'>
    <comparison></comparison>
  </div>

</template>

<script>
import treatmentDetail from './TreatmentDetail'
import aceHeader from './ACEHeader'
import sidething from './sideBar'
import debug from './debug'
import map from './map'
import { getComparison } from '../vuex/getters'

export default {

  components: {
    'comparison': treatmentDetail,
    'headthing': aceHeader,
    'sidething': sidething,
    'debug': debug,
    'map': map
  },

  data () {

    return {

      
    }
  },

  vuex: {

    actions: {

    },

    getters: {
      showComparison: getComparison
    }
  },

  ready() {
    document.getElementById('loading').style.display = false ? 'block' : 'none';

    $('#tractsROT').css('visibility','hidden')
  },

  methods: {

  },

  watch: {

    'blockGroups': function(x) {
    },

    'tracts': function(x) {

    },
    'censusTowns': function(x) {

    }
  }
}

</script>

<style>

</style>
