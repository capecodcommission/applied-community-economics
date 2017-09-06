<template>

  <div id="scenario-view" class="row">
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>

import {  } from '../vuex/actions'
import {  } from '../vuex/getters'
import {  } from 'vue-strap'
import json2csv from 'nice-json2csv'
import {introJs} from '../../node_modules/intro.js/intro.js'
import moment from 'moment'

export default {

  components: {

  },

  data () {

    return {

      showRight: false
    }
  },

  vuex: {
    actions: {

    },
    getters: {

    }
  },

  watch: {

    'embayment': function (val) {

    }
  },

  // Get scenario and finance options based on scenarioId passed from parent ScenarioView
  ready () {

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
      a.download= "ReportCard.csv";
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
