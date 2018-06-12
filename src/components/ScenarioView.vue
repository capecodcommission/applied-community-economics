<template>

  <div style = 'padding-bottom: 0px; flex-shrink: 0 !important' class = 'row'>

    <div style = 'padding-right: 0px; padding-left: 0px' class = 'col-md-12'>
      <headthing></headthing>
    </div>

  </div>

  <div style = 'height: 100%; padding-bottom: 0' class = 'row'>

    <div class = 'col-md-2 sidebar'>
      <sidething></sidething>
    </div>

    <div id = 'selectionRow' style = 'margin-top: 5%' class = 'col-md-10 text-center'>
      <router-view></router-view>
    </div>

  </div>


  <div transition = 'fade' v-show = 'showComparison' class = 'col-md-8 Comparison'>
    <comparison></comparison>
  </div>

</template>

<script>
import { getComparison, getTownName } from '../vuex/getters'
import { loadTownName } from '../vuex/actions'
import treatmentDetail from './TreatmentDetail'
import Header from './Header'
import sidething from './sideBar'

export default {

  components: {
    'comparison': treatmentDetail,
    'headthing': Header,
    'sidething': sidething
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

    $('#tractsROT').css('visibility','hidden')

  },

  methods: {

  },

  watch: {
    
  }
}

</script>

<style>

#BAsites {

  color: #ed7d31
}

#CAsites {
  color: #4472c4
}

#pct_GF {
  color: #a5a5a5
}

#radio-group {
  display: inline-block
}

h1 {
  font-family: "Open Sans";
  font-size: 28px;
}

h2 {
  font-family: "Open Sans"
}

p {
  font-family: "Open Sans";
  font-size: 15px;
}

.cccLogo {
  position: absolute;
  z-index: 2;
  right: 0px;

}

.sidebar {
  background: #28536c;
  color: #f0ead6;
  padding: 1%;
  height: 100%;
  /*max-height: 100%;*/
  overflow: hidden;
  flex-direction: column; 
}

.selectEmbayment {
  /*top: 0;*/
  position: absolute;
  /*z-index: 6;*/
  /*width: 16%;*/
  float: left;
  background: #28536c;
  /*border-radius: 25px;*/
  /*padding: 1.5em;*/
  /*border: 2px solid black;*/
  /*opacity: 0.9;*/
  color: #f0ead6;
  padding: 0;
  padding-bottom: 1%;
}

.selectEmbayment1 {
  top: 5px;
  right: 1px;
  position: absolute;
  z-index: 4;
  float: right;
  background: #28536c;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: black;

}

.comparison {
  bottom: 1px;
  left: 1px;
  float: right;
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  z-index: 99;
}

.Comparison {
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  float: left;
  margin-left: 1%;
  z-index: 99;
}

.headthing {
  /*z-index: 6;*/
  top: 1px;
  position: absolute;
  padding: 0 !important;
}

.smallFont {
  font-size: 10px;
}

#legendDiv {
  float: right;
  background: #28536c;
  color: #f0ead6;
}

 html, body, #app {

    height: 100%;
    width: 100%
 }

 .fill-height {

  min-height: 100%;
  height: auto !important;
  height: 100%;
 }
</style>
