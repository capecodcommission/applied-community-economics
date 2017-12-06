<template>

  <div class = 'col-md-6'>
    <ul align = 'left' style = 'font-size: 20px;'>
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
  </div>
  <div class = 'col-md-6'>
    <img width = '100%' src = 'https://i.imgur.com/s1zoH9n.png'>
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
