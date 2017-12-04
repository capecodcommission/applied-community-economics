<template>

  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-7 col-md-offset-4">
        <ul align = 'left' style = 'font-size: 20px;'>
          <li>Bus routes/stops</li>
          <li>Utilization rates</li>
          <li>Hyannis Youth Use of Transportation Services</li>
          <li>Evening and Weekend Transportation Services Offered</li>
          <li>Population served/within walking distance of bus stop</li>
          <li># businesses, community activity sites along route</li>
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
