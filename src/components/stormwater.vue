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
    <canvas id = 'myChart'></canvas>
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

    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        datasets: [{
          data: [1, 2, 3],
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
