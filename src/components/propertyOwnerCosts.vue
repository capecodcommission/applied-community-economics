<template>

	<wqheader></wqheader>
		
		<div class = 'panel-body'><br>
			<div id = 'dashboard_div1'>
				<div class = 'row text-center'>
					<tooltip effect = 'scale' placement = 'top' content = 'These charts display the nutrient content of an embayment over time'>
						<h1 data-position = 'top'><b>Nutrient Charts</b></h1><br>
					</tooltip>
					<div id = 'filter_div'></div>
					<div class = 'col-md-4'>
						<div id = 'chart_div1'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div2'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div3'></div>
					</div>
				</div>
				<div class = 'row text-center'>
					<div class = 'col-md-4'>
						<div id = 'chart_div4'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div5'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div6'></div>
					</div>
				</div>
				<div class = 'row text-center'>
					<div class = 'col-md-4'>
						<div id = 'chart_div7'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div8'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div9'></div>
					</div>
				</div>
				<div class = 'row text-center'>
					<div class = 'col-md-4'>
						<div id = 'chart_div10'></div>
					</div>
					<div class = 'col-md-4'>
						<div id = 'chart_div11'></div>
					</div>
				</div>
			</div>
		</div>

<!-- <pre>{{ embayment.data | json}}</pre> -->
</template>

<script>

import wqheader from './Header'
import { getEmbayment } from '../vuex/getters'
import { calculatetitle5inflated } from '../vuex/actions'
import { tooltip } from 'vue-strap'
import json2csv from 'nice-json2csv'
import {introJs} from '../../node_modules/intro.js/intro.js'

export default {

	vuex: {
		getters: {

			embayment: getEmbayment
		},
		actions: {

			inflate: calculatetitle5inflated
		}
	},

	data () {
		return {
			
		}
	},
		
	

	ready() {

		this.drawDashboard()
	},

	methods: {

		drawDashboard() {

			var intro = introJs()

		    intro.setOptions({

		      showStepNumbers: false,

		      tooltipClass: 'introjs-tooltip-mario text-center'
		    })

			var rows1 = []

			rows1.push([
				'Date',
				'Depth',
				'Salinity',
				'Disolved Oxygen',
				'Nitrogen',
				'Water Temperature (c)',
				'Precipitation Level',
				'Nitrate + Nitrite',
				'Ammonium',
				'Orthophosphate',
				'Chlorophyll',
				'Phaeophytin'
			])

			// var formatterDate = new google.visualization.DateFormat({pattern: 'dd.MM.yyyy'})

			function parseISOLocal(s) {

			  var b = s.split(/\D/);

			  return new Date(b[0], b[1]-1, b[2]);
			}
			
			
			for (var i = 0; i < this.embayment.data.length; i++) {

				rows1.push([
					parseISOLocal(this.embayment.data[i].date),
					parseFloat(this.embayment.data[i].depth),
					parseFloat(this.embayment.data[i].salinity),
					parseFloat(this.embayment.data[i].disolvedoxygen),
					parseFloat(this.embayment.data[i].nitrogen),
					parseFloat(this.embayment.data[i].water_temp),
					parseFloat(this.embayment.data[i].precipitation),
					parseFloat(this.embayment.data[i].nitrate_nitrite),
					parseFloat(this.embayment.data[i].ammonium),
					parseFloat(this.embayment.data[i].orthophosphate),
					parseFloat(this.embayment.data[i].chlorophyll),
					parseFloat(this.embayment.data[i].phaeophytin)
				])
			}

			var data1 = google.visualization.arrayToDataTable(rows1)

			var dateRangeSlider = new google.visualization.ControlWrapper({

				'controlType': 'ChartRangeFilter',
				'containerId': 'filter_div',
				'options': {
					'filterColumnIndex': 0
				}
			})

			var columnChart1 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div1',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','green'],
					'title' : 'Depth / Salinity',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Parts-per-Trillion'
						}
					},
					'legend': {
						'position': 'top'
					},
					'bar': {
						'groupWidth': '100%'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,2]
				}
			})

			var columnChart2 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div2',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','orange'],
					'title' : 'Disolved Oxygen',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Milligrams per Litre'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,3]
				}
			})

			var columnChart3 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div3',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','yellow'],
					'title' : 'Nitrogen',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,4]
				}
			})

			var columnChart4 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div4',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','aqua'],
					'title' : 'Water Temp (c)',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Celcius'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,5]
				}
			})

			var columnChart5 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div5',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','purple'],
					'title' : 'Precipitation',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Precipitation Level: (1: None, 2: Light, 3: Heavy)'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,6]
				}
			})

			var columnChart6 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div6',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','purple'],
					'title' : 'Station Depth',
					'series': {
						'0': {
							'targetAxisIndex': 0
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1]
				}
			})

			var columnChart7 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div7',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','teal'],
					'title' : 'Nitrate Nitrite',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,7]
				}
			})

			var columnChart8 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div8',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','black'],
					'title' : 'Ammonium',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,8]
				}
			})

			var columnChart9 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div9',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','pink'],
					'title' : 'Orthophosphate',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,9]
				}
			})

			var columnChart10 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div10',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','red'],
					'title' : 'Chlorophyll',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,10]
				}
			})

			var columnChart11 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_div11',
				'options': {
					'height': 400,
					'width': 600,
					'colors': ['blue','indigo'],
					'title' : 'Phaeophytin',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrograms per Litre'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,11]
				}
			})

			var columnChartPopup1 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup1',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','green'],
					'title' : 'Depth / Salinity',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Parts-per-Trillion'
						}
					},
					'legend': {
						'position': 'top'
					},
					'bar': {
						'groupWidth': '50%'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,2]
				}
			})

			var columnChartPopup2 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup2',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','orange'],
					'title' : 'Disolved Oxygen',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Milligrams per Litre'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,3]
				}
			})

			var columnChartPopup3 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup3',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','yellow'],
					'title' : 'Nitrogen',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,4]
				}
			})

			var columnChartPopup4 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup4',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','aqua'],
					'title' : 'Water Temp (c)',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Celcius'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,5]
				}
			})

			var columnChartPopup5 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup5',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','purple'],
					'title' : 'Precipitation',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Precipitation Level: (1: None, 2: Light, 3: Heavy)'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,6]
				}
			})

			var columnChartPopup6 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup6',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','purple'],
					'title' : 'Station Depth',
					'series': {
						'0': {
							'targetAxisIndex': 0
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1]
				}
			})

			var columnChartPopup7 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup7',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','teal'],
					'title' : 'Nitrate Nitrite',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,7]
				}
			})

			var columnChartPopup8 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup8',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','black'],
					'title' : 'Ammonium',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,8]
				}
			})

			var columnChartPopup9 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup9',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','pink'],
					'title' : 'Orthophosphate',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,9]
				}
			})

			var columnChartPopup10 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup10',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','red'],
					'title' : 'Chlorophyll',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrometres'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,10]
				}
			})

			var columnChartPopup11 = new google.visualization.ChartWrapper({

				'chartType': 'LineChart',
				'containerId': 'chart_divpopup11',
				'dataTable': data1,
				'options': {
					'height': '100%',
					'width': '100%',
					'colors': ['blue','indigo'],
					'title' : 'Phaeophytin',
					'series': {
						'0': {
							'targetAxisIndex': 0
						},
						'1': {
							'targetAxisIndex': 1
						}
					},
					'vAxes': {
						'0': {
							'title': 'Meters'
						},
						'1': {
							'title': 'Micrograms per Litre'
						}
					},
					'legend': {
						'position': 'top'
					},
					'explorer': {},
					'hAxis': {
						'gridlines': {
							'count': -1
						}
					}
				},
				'view': {
					'columns': [0,1,11]
				}
			})

			var dashboard1 = new google.visualization.Dashboard($('#dashboard_div1'))
			
			dashboard1.bind(dateRangeSlider, 
				[
					columnChart1,
					columnChart2,
					columnChart3,
					columnChart4,
					columnChart5,
					columnChart6,
					columnChart7,
					columnChart8,
					columnChart9,
					columnChart10,
					columnChart11
				]
			)

			dashboard1.draw(data1)

			// columnChartPopup1.draw()

			$('#chart_div1').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup1'></div>"}]
			    })

			    intro.start()

			    columnChartPopup1.draw()
			})

			$('#chart_div2').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup2'></div>"}]
			    })

			    intro.start()

			    columnChartPopup2.draw()
			})

			$('#chart_div3').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup3'></div>"}]
			    })

			    intro.start()

			    columnChartPopup3.draw()
			})

			$('#chart_div4').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup4'></div>"}]
			    })

			    intro.start()

			    columnChartPopup4.draw()
			})

			$('#chart_div5').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup5'></div>"}]
			    })

			    intro.start()

			    columnChartPopup5.draw()
			})

			$('#chart_div6').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup6'></div>"}]
			    })

			    intro.start()

			    columnChartPopup6.draw()
			})

			$('#chart_div7').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup7'></div>"}]
			    })

			    intro.start()

			    columnChartPopup7.draw()
			})

			$('#chart_div8').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup8'></div>"}]
			    })

			    intro.start()

			    columnChartPopup8.draw()
			})

			$('#chart_div9').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup9'></div>"}]
			    })

			    intro.start()

			    columnChartPopup9.draw()
			})

			$('#chart_div10').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup10'></div>"}]
			    })

			    intro.start()

			    columnChartPopup10.draw()
			})

			$('#chart_div11').on('click', function() {

				intro.setOptions({

			      showStepNumbers: false,

			      tooltipClass: 'introjs-tooltip-mario text-center',

			      steps: [{intro: "<div style = 'width: 1000px; height: 600px' id = 'chart_divpopup11'></div>"}]
			    })

			    intro.start()

			    columnChartPopup11.draw()
			})
		},

		restartMap() {
      		window.open('http://2016.watershedmvp.org/wq','_self')
    	}	
	},

	watch: {

	},

	components: {

		'wqheader': wqheader,
		'tooltip': tooltip
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
