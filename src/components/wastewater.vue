<template>

  <h3 align = 'left'>Treatment</h3>
  <ul align = 'left' style = 'font-size: 20px;'>
    <li>Frequency of septic replacement</li>
    <li>Percent town</li>
  </ul>
  <br>
  <h3 align = 'left'>Collection</h3>
  <ul align = 'left' style = 'font-size: 20px;'>
    <li>Residents served by sewer</li>
    <li>Sewer capacity</li>
    <li>Additional sewer demand</li>
    <li>Miles of pipeline needed for additional demand</li>
    <li># Parcels serviced per treatment facility</li>
  </ul>

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
