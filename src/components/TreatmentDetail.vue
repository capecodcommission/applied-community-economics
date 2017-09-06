<template>

  <wqheader></wqheader>

  <div class="panel-body">
    <br>
    
    <div class="row">
      <div class = 'col-md-12 text-center'>
        <button class = 'btn btn-success pull-right' @click = 'excelExport'>Export Data</button><br><br>
        <button class = 'btn btn-primary text-center'>Raw Table</button>
      </div>
    </div>

    <div class = 'row'>
      <div class="col-md-12">  
        <v-client-table :data = 'embayment.data' :columns = 'columns' :options = 'options'></v-client-table>
      </div>
    </div>

  </div>

<script src="jquery.js"></script>
<script src="filesaver.js"></script>
<script src="tableexport.js"></script>
</template>

<script>

import { loadEmbayment } from '../vuex/actions'
import { getEmbayment, getEmbayments } from '../vuex/getters'
import { tooltip, alert } from 'vue-strap'
import json2csv from 'nice-json2csv'
import {introJs} from '../../node_modules/intro.js/intro.js'
import wqheader from './Header'

export default {
  components: {

    'wqheader': wqheader,
    tooltip,
    alert
  },

  data () {

    return {

      active: false,
      activeArr: [],
      reverse: false,
      sortKey: 'Year',
      columns: ['date','salinity','disolvedoxygen','nitrogen','water_temp','precipitation','depth','nitrate_nitrite','ammonium','orthophosphate','chlorophyll','phaeophytin'],
      options: {
        dateColumns: ['date'],
        headings: {
          date: 'Date',
          salinity: 'Salinity',
          disolvedoxygen: 'Disolved Oxygen',
          nitrogen: 'Nitrogen',
          water_temp: 'Water Temp',
          precipitation: 'Precipitation',
          depth: 'Depth',
          nitrate_nitrite: 'Nitrate Nitrite',
          ammonium: 'Ammonium',
          orthophosphate: 'Orthophosphate',
          chlorophyll: 'Chlorophyll',
          phaeophytin: 'Phaeophytin'
        }
      }
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

    restartMap() {
      
      window.open('http://2016.watershedmvp.org/cc','_self')
    },

    sortBy (sortKey) {

      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false

      this.sortKey = sortKey
    },

    gotm_Id() {

      var win = window.open('http://www.cch2o.org/Matrix/detail.php?treatment=' + this.treatment.tm_Id, '_blank');

      if (win) {
          //Browser has allowed it to be opened
          win.focus();
      } else {
          //Browser has blocked it
          alert('Please allow popups for this website');
      }

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

    'embayment.data': function (val) {

      for (var i = this.embayment.data.length - 1; i >= 0; i--) {

        this.embayment.data[i].date = this.embayment.data[i].date.substring(0,10)
      
        if (this.embayment.data[i].year == null) {

          this.embayment.data[i].year = null
        }

        if (this.embayment.data[i].salinity == null) {

          this.embayment.data[i].salinity = null
        }

        if (this.embayment.data[i].disolvedoxygen == null) {

          this.embayment.data[i].disolvedoxygen = null
        }

        if (this.embayment.data[i].nitrogen == null) {

          this.embayment.data[i].nitrogen = null
        }

        if (this.embayment.data[i].water_temp == null) {

        this.embayment.data[i].water_temp = null
        } 

        if (this.embayment.data[i].depth == null) {

          this.embayment.data[i].depth = null
        } 

        if (this.embayment.data[i].precipitation == null) {

          this.embayment.data[i].precipitation = null
        } 

        if (this.embayment.data[i].nitrate_nitrite == null || isNaN(this.embayment.data[i].nitrate_nitrite)) {

          this.embayment.data[i].nitrate_nitrite = null
        } 

        if (this.embayment.data[i].ammonium == null) {

          this.embayment.data[i].ammonium = null
        } 

        if (this.embayment.data[i].orthophosphate == null) {

          this.embayment.data[i].orthophosphate = null
        } 

        if (this.embayment.data[i].chlorophyll == null) {

          this.embayment.data[i].chlorophyll = null
        } 

        if (this.embayment.data[i].phaeophytin == null) {

          this.embayment.data[i].phaeophytin = null
        } 
      }
    }
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
