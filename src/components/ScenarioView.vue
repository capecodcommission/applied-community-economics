<template>

  <div id="scenario-view" class="row">
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>

import { loadEmbayment, loadEmbayments } from '../vuex/actions'
import { getEmbayment, getEmbayments } from '../vuex/getters'
import { aside, tooltip } from 'vue-strap'
import json2csv from 'nice-json2csv'
import {introJs} from '../../node_modules/intro.js/intro.js'
import moment from 'moment'

export default {

  components: {

    'aside': aside,
    'tooltip': tooltip
  },

  data () {

    return {

      showRight: false
    }
  },

  vuex: {
    actions: {
      loadEmbayment,
      loadEmbayments
    },
    getters: {
      embayment: getEmbayment,
      embayments: getEmbayments
    }
  },

  watch: {

    'embayment': function (val) {

      var filtered = this.embayments.filter((el) => el['id'] === this.$router._currentRoute.params.id)

      this.embayment.name = filtered[0]['embayment']

    }
  },

  // Get scenario and finance options based on scenarioId passed from parent ScenarioView
  ready () {

    // $('#table').addClass('btn-primary')

    // this.loadEmbayments()
    // this.loadEmbayment(this.$router._currentRoute.params.id)

    // for (var i = this.embayment.data.length - 1; i >= 0; i--) {
      
    //   if (this.embayment.data[i].year == null) {

    //     this.embayment.data[i].year = 0
    //   } 

    //   if (this.embayment.data[i].salinity == null) {

    //     this.embayment.data[i].salinity = 0
    //   }

    //   if (this.embayment.data[i].disolvedoxygen == null) {

    //     this.embayment.data[i].disolvedoxygen = 0
    //   }

    //   if (this.embayment.data[i].nitrogen == null) {

    //     this.embayment.data[i].nitrogen = 0
    //   }

    //   if (this.embayment.data[i].water_temp == null) {

    //     this.embayment.data[i].water_temp = 0
    //   } 

    //   if (this.embayment.data[i].depth == null) {

    //     this.embayment.data[i].depth = 0
    //   } 

    //   if (this.embayment.data[i].precipitation == null) {

    //     this.embayment.data[i].precipitation = 0
    //   } 

    //   if (this.embayment.data[i].nitrate_nitrite == null) {

    //     this.embayment.data[i].nitrate_nitrite = 0
    //   } 

    //   if (this.embayment.data[i].ammonium == null) {

    //     this.embayment.data[i].ammonium = 0
    //   } 

    //   if (this.embayment.data[i].orthophosphate == null) {

    //     this.embayment.data[i].orthophosphate = 0
    //   } 

    //   if (this.embayment.data[i].chlorophyll == null) {

    //     this.embayment.data[i].chlorophyll = 0
    //   } 

    //   if (this.embayment.data[i].phaeophytin == null) {

    //     this.embayment.data[i].phaeophytin = 0
    //   } 

    //   this.embayment.data[i].date = Date(this.embayment.data[i].date)

    // }
  },

  methods: {

    startIntro() {

      introJs().start()
    },

    JSONflatten (data) {

      var result = {};

      function recurse(cur, prop) {

        if (Object(cur) !== cur) {

          result[prop] = cur;
        } else if (Array.isArray(cur)) {

          for (var i = 0, l = cur.length; i < l; i++)

            recurse(cur[i], prop + "[" + i + "]");

          if (l == 0) result[prop] = [];

        } else {
          var isEmpty = true;

          for (var p in cur) {

            isEmpty = false;
            recurse(cur[p], prop ? prop + "." + p : p);
          }

          if (isEmpty && prop) result[prop] = {};
        }
      }

      recurse(data, "");
      return result;
    },

    excelExport() {

      var arr = []

      for (var i = 0; i < this.treat.length; i++) {

        for (var j = 0; j < this.treat[i].costTypes.length; j++) {

          arr.push(this.JSONflatten(this.treat[i].costTypes[j]))
        }
      }

      var csvContent = json2csv.convert(arr)

      var a = document.createElement('a');

      a.textContent='download';
      a.download= "Treatments.csv";
      a.href='data:text/csv;charset=utf-8,'+escape(csvContent);
      document.body.appendChild(a);
      a.click()
      a.remove()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
