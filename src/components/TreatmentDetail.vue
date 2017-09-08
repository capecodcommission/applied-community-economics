<template>

  <wqheader></wqheader>

  <div class="panel-body">
    <br>
    
    <div class="row">
      <div class = 'col-md-12 text-center'>
        <button class = 'btn btn-success pull-right' @click = 'excelExport'>Export Data</button><br><br>
      </div>
    </div>

    <div class = 'row'>
      <div class="col-md-12">  

      </div>
    </div>

  </div>

<script src="jquery.js"></script>
<script src="filesaver.js"></script>
<script src="tableexport.js"></script>
</template>

<script>

import {  } from '../vuex/actions'
import {  } from '../vuex/getters'
import {  } from 'vue-strap'
import json2csv from 'nice-json2csv'
import wqheader from './Header'

export default {
  components: {

    'wqheader': wqheader
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

    restartMap() {
      
      window.open('http://2016.watershedmvp.org/cc','_self')
    },

    sortBy (sortKey) {

      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false

      this.sortKey = sortKey
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

      for (var j = 0; j < this.embayment.data.length; j++) {

        arr.push(this.JSONflatten(this.embayment.data[j]))
      }
      

      var csvContent = json2csv.convert(arr)

      var a = document.createElement('a');

      a.textContent='download';
      a.download= "Embayment.csv";
      a.href='data:text/csv;charset=utf-8,'+escape(csvContent);
      document.body.appendChild(a);
      a.click()
      a.remove()
    },

    startIntro() {

      introJs().setOption('showProgress', true).start()
    }
  },

  ready() {


  },

  watch: {

  }
}

</script>

<style lang="scss" scoped>
@import '../../node_modules/intro.js/introjs.css';
thead {
  tr {
    th {
     text-align: center;
   }
 }
}

</style>
