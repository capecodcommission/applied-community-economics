<template>

  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-7 col-md-offset-2">
        <ul align = 'left' style = 'font-size: 20px;'>
          <li>Bicycle paths</li>
          <li>Connectivity of bicycle paths, bike-friendly roads</li>
          <li>Speed limits</li>
          <li>Road surface type</li>
          <li>Frequency of car/bike accidents</li>
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
