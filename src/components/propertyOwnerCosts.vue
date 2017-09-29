<template>
	<wqheader></wqheader>
	<div class="panel-body">
		<div class = 'row text-center'>
			<div class = 'col-md-12'>
				<div class = 'jumbotron'>
					<h1 style= "font-family: 'Open Sans'">{{$route.params.id}}</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import wqheader from './Header'
import {  } from '../vuex/getters'
import {  } from '../vuex/actions'
import {introJs} from '../../node_modules/intro.js/intro.js'

export default {

	vuex: {
		getters: {

		},
		actions: {

		}
	},

	data () {
		return {
			
		}
	},
		
	

	ready() {

	},

	methods: {

	},

	watch: {

	},

	components: {

		'wqheader': wqheader
	}
}

</script>

<style>
td {
  padding: 3px 0;
}
table {
	border-collapse: separate;
	border-spacing: 10px 0;
}
ul {
  list-style-type: none;
}	
li {
	margin: 10px 0;
}
</style>
