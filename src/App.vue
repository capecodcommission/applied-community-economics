<template>
	<div id = 'app'>
    	<router-view></router-view>
    </div>

</template>
<style lang = 'scss'>

#app {

	margin-top: 0;
}
.row {
	width: 100%;
	margin-right: 0 !important;
	margin-left: 0 !important;
}


@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/intro.js/introjs.css';
@import '../node_modules/intro.js/themes/introjs-modern.css';
@import url('https://js.arcgis.com/4.5/esri/css/main.css');
</style>
