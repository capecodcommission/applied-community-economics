<template>

  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-8 col-md-offset-4">
        <h3>Supply</h3>
        <ul align = 'left' style = 'font-size: 20px;'>
          <li>Volume Clean Water Supply available to meet demand</li>
          <li>Water Quality</li>
          <li>#Exceedances of Standard</li>
          <li style = 'color: red;'># Parcels that pose a risk to water supply</li>
          <li style = 'color: red;'>#/acres of Deed Restricted Parcels</li>
          <li style = 'color: red;'>#/Acres of Deed Restricted  Parcels in Zone 1 and Zone 2</li>
        </ul>
        <br>
        <h3>Distribution</h3>
        <ul align = 'left' style = 'font-size: 20px;'>
          <li>Efficiency</li>
          <li>Cost of Water production – is water more or less expensive</li>
          <li>Correlate of cost for residents, commercial accounts, or by service connection</li>
          <li>Reliability</li>
          <li>Feet or Miles of Distribution system constraints (physical constraints)</li>
          <li>Allocation of Current or Future Supply</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>


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
