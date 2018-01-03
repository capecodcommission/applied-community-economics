<template>
  
  <div class="col-md-6">
    <h3 align = 'left' style = 'color: red'>Open Space</h3>
    <ul align = 'left' style = 'font-size: 20px; color: red'>
      <li>% of System Mapped</li>
      <li>Area Served with Stormwater Treatment</li>
      <li>Creation of Priority Site List</li>
      <li>Frequency of Street Flooding</li>
      <li>Frequency of Catch basin Cleaning (and # of basins cleaned)</li>
      <li>Increase/Decrease in Tie Ins to Roof Drain System</li>
      <li>Water Quality Reports – Closures, Bacterial Reports</li>
      <li style = 'color: red;'>% of Area Impervious</li>
      <li style = 'color: red;'>Acres of Open Space restricted for Water Quality</li>
    </ul>
    <br>
    <h3 align = 'left' style = 'color: red'>Recreation</h3>
    <ul align = 'left' style = 'font-size: 20px; color: red'>
      <li>Acres of Active Recreation Area</li>
      <li>Distribution of Parks and Recreation throughout {{townName}}</li>
      <li>Connectivity or residential parcels to recreational facilities</li>
      <li>Miles pedestrian and bicycle access routes</li>
      <li>Public Access fields, courts, playgrounds and parks in {{townName}}</li>
      <li>#/% {{townName}} Residents Participating in Recreational Programs relative to Town Participation</li>
    </ul>
  </div>
  <div class = 'col-md-6'>
    <ul align = 'left' style = 'font-size: 20px;'>
      <li>555 acres of Protected and Recreational Open Space</li>
      <ul>
        <li>82 acres Preserved for Open Space and Passive Recreation</li>
        <li>350 acres Preserved for Active Recreation</li>
        <li>101 acres to Protect Hyannis Water supply</li>
        <li>22 acres to Protect historical/cultural</li>
      </ul>
      <li>Total 5,175 acres in Greater Hyannis Area (10.7% Open Space)</li>
      <ul>
        <li>4,475 acres of Parcel area (12.4% Open Space)</li>
      </ul>
    </ul>
    <!-- <img width = '100%' src = 'https://i.imgur.com/ePoscEj.png'> -->
    <canvas id = 'myChart'></canvas>
  </div>

</template>

<script>

import { getTownName } from '../vuex/getters'

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

  ready() {

    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          data: [{x:1,y:2,r:10},{x:3,y:4,r:20},{x:5,y:6,r:30}],
          backgroundColor: ['#4286f4', '#f4a941', '#6c6772']
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Community Score',
          'Business Score',
          'Form Score'
        ]
      }
    })

  },

  methods: {

  },

  watch: {

  }
}

</script>

<style>

.container-table {
    display: table;
    height: 100%;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}

</style>
