<template>

  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-5 col-md-offset-4">
        <ul align = 'left' style = 'font-size: 20px;'>
          <li>Connectivity of Sidewalks, Crosswalks</li>
          <li>Gaps in connectivity</li>
          <li>Curb cuts</li>
          <li>Walking paths</li>
          <li>Presence of on-street parking buffers</li>
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
