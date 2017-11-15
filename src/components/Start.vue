<template>

  <iframe height="100%" width="100%" src="http://cccommission.maps.arcgis.com/apps/webappviewer3d/index.html?id=05b27aa7e69140be8ae47045b7efc120"></iframe>

  <div transition = 'fade' v-show = 'showComparison' class = 'col-md-7 comparison'>
    <comparison></comparison>
  </div>

  <div class = 'col-md-12 headthing'>
    <headthing></headthing>
  </div>

  <div class = 'col-md-2 selectEmbayment text-center'>
    <sidething></sidething>
  </div>

</template>

<script>
import { getComparison } from '../vuex/getters'
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

.selectEmbayment {
  top: 0;
  position: absolute;
  z-index: 6;
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
  position: absolute;
  z-index: 5;
  float: right;
  background: #28536c;
  border-radius: 25px;
  /*padding: 1.5em;*/
  border: 5px solid grey;
  /*opacity: 0.9;*/
  /*height: 40%*/
  /*color: black;*/

}

.headthing {
  z-index: 6;
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
 }

 .fill-height {

  min-height: 100%;
  height: auto !important;
  height: 100%;
 }
</style>
