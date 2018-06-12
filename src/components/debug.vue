<template>
    <div transition = 'fade' v-show = 'totals.Toggle' class = 'col-md-2 Results'>
        <div class = 'row text-center'>
            <p>Selected Pareto Median: ${{totals.paretoMedianCont}}</p>
            <p>Selected Unemployment: {{(totals.percUnempCont * 100).toFixed(0)}}%</p>
            <p>Selected LessHS: ${{totals.incLessHSCont.toFixed(0)}}</p>
            <p>Selected HSG: ${{totals.incHSGCont.toFixed(0)}}</p>
            <p>Selected SCA: ${{totals.incSCACont.toFixed(0)}}</p>
            <p>Selected Bac: ${{totals.incBacCont.toFixed(0)}}</p>
            <p>Selected Grad: ${{totals.incGradCont.toFixed(0)}}</p>
            <p>1mi Pareto Median: ${{totals.paretoMedian}}</p>
            <p>1mi Unemployment: {{(totals.percUnemp * 100).toFixed(0)}}%</p>
            <p>1mi LessHS: ${{totals.incLessHS.toFixed(0)}}</p>
            <p>1mi HSG: ${{totals.incHSG.toFixed(0)}}</p>
            <p>1mi SCA: ${{totals.incSCA.toFixed(0)}}</p>
            <p>1mi Bac: ${{totals.incBac.toFixed(0)}}</p>
            <p>1mi Grad: ${{totals.incGrad.toFixed(0)}}</p>
            <p>Rest of Town Pareto Median: ${{totals.townParetoMedian}}</p>
            <p>Rest of Town Unemployment: {{(totals.townPercUnemp * 100).toFixed(0)}}%</p>
            <p>Rest of Town Income (Less than High School): ${{totals.townIncLessHSROT.toFixed(0)}}</p>
            <p>Rest of Town Income (High School Grad): ${{totals.townIncHSGROT.toFixed(0)}}</p>
            <p>Rest of Town Income (Some College / Associates): ${{totals.townIncSCAROT.toFixed(0)}}</p>
            <p>Rest of Town Income (Bachelor's): ${{totals.townIncBacROT.toFixed(0)}}</p>
            <p>Rest of Town Income (Graduate): ${{totals.townIncGradROT.toFixed(0)}}</p>
        </div>
    </div>
</template>

<script>

import { getAttrib } from '../vuex/getters' 

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

      totals: getAttrib
    }
  },

  ready() {

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

.Results {
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  float: right;
  margin-right: 1%;
  color: white;
  text-align: center;
  font-family: "Open Sans";
  
}
</style>
