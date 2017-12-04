<template>

  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-offset-2 col-md-6">
        <h3 style = 'color: red'>Open Space</h3>
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
        <h3 style = 'color: red'>Recreation</h3>
        <ul align = 'left' style = 'font-size: 20px; color: red'>
          <li>Acres of Active Recreation Area</li>
          <li>Distribution of Parks and Recreation throughout {{townName}}</li>
          <li>Connectivity or residential parcels to recreational facilities</li>
          <li>Miles pedestrian and bicycle access routes</li>
          <li>Public Access fields, courts, playgrounds and parks in {{townName}}</li>
          <li>#/% {{townName}} Residents Participating in Recreational Programs relative to Town Participation</li>
        </ul>
      </div>
      <div class = 'col-md-4'>
        <img width = '100%' src = 'https://i.imgur.com/s1zoH9n.png'>
      </div>
    </div>
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
