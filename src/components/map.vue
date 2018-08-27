<template>
    <div id="viewDiv" class="balt-theme"></div>
</template>

<script>
import { getAttrib } from '../vuex/getters'

import * as esriLoader from 'esri-loader'

import axios from 'axios'

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
      totals: getAttrib
    }
  },

  ready() {
      
      // Prepare esri-loader with latest CSS from arcgis api
      esriLoader.loadCss('https://js.arcgis.com/4.7/esri/css/main.css');

      // esrimap.js depreciated
      esriLoader.loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/layers/SceneLayer",
        "esri/layers/TileLayer",
        "esri/layers/FeatureLayer",
        "esri/renderers/UniqueValueRenderer",
        "esri/widgets/Legend",
        "esri/geometry/geometryEngine",
        "esri/views/2d/draw/Draw",
        "esri/geometry/Polygon",
        "esri/Graphic",
        "esri/tasks/support/BufferParameters",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Home",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/views/SceneView",
        "esri/WebScene",
        "dojo/domReady!"
        ]).then(([
          Map, 
          MapView,
          SceneView,
          SceneLayer,
          TileLayer,
          FeatureLayer,
          UniqueValueRenderer,
          Legend,
          geometryEngine,
          Draw,
          Polygon,
          Graphic,
          BufferParameters,
          GraphicsLayer,
          Home,
          SimpleFillSymbol,
          SimpleLineSymbol,
          SimpleRenderer,
          SV,
          WS
          ]) => {
            
            var totals = this.totals
    
            // Color parcels based on housing type
            var renderer = {
              type: "unique-value",  // autocasts as new UniqueValueRenderer()
              field: "HousingType",
              defaultSymbol: {type: 'simple-fill'},
              uniqueValueInfos: [
                {
                  value: 'Apartments',
                  symbol: {
                    type: 'simple-fill',
                    color: 'blue'
                  }
                },
                {
                  value: 'MixedUse',
                  symbol: {
                    type: 'simple-fill',
                    color:'red'
                  }
                },
                {
                  value: 'MultiFamily',
                  symbol: {
                    type: 'simple-fill',
                    color:'yellow'
                  }
                },
                {
                  value: 'SingleFamily',
                  symbol: {
                    type: 'simple-fill',
                    color:'green'
                  }
                }  
              ]
            };

            // parcel layer
            var embayments = new FeatureLayer({
              url: "https://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/0",
              outFields: ['*'],
              renderer: renderer,
              popupTemplate: {
                title: '{ClosestRoad_name}',
                content: '{*}'
              },
              visible: false
            })

            // parcel layer containing census api estimates
            var parcelLayer = new FeatureLayer({
              url: "https://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/1",
              outFields: ['*'],
              visible: false,
              popupTemplate: {
                title: '{SITE_ADDRESS}',
                content: '{*}'
              }
            })

            // // parcel layer containing census api estimates
            // var parcelLayer = new FeatureLayer({
            //   url: "http://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/4",
            //   outFields: ['*'],
            //   visible: false,
            //   popupTemplate: {
            //     title: '{SITE_ADDRESS}',
            //     content: '{*}'
            //   }
            // })

            // block group layer from tigerweb services
            var blockGroups = new FeatureLayer({
              url: "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/5",
              definitionExpression: "STATE = 25 and COUNTY = 001", // Filter layer to Barnstable county
              outFields: ['*'],
              popupTemplate: {
                title: '{NAME}',
                content: '{*}'
              },
              visible: false
            })

            // census tract layer from tigerweb services
            var tracts = new FeatureLayer({
              url: "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/4",
              definitionExpression: "STATE = 25 and COUNTY = 001", // Filter layer to Barnstable county
              outFields: ['*'],
              popupTemplate: {
                title: '{NAME}',
                content: '{*}'
              },
              visible: false
            })

            // Create custom boundary renderer with black boundary outline
            var tbRenderer = {
              type: 'simple',
              symbol: {
                type: 'simple-line',
                color: [0,0,0,1],
                outline: {
                  width: 1,
                  color: 'black'
                }
              }
            }

            // Town boundary layer to query block groups
            var townBoundaries = new FeatureLayer ({
              url: "https://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/8",
              outFields: ['*'],
              renderer: tbRenderer,
              visible: true
              // definitionExpression: "TOWN = 'BARNSTABLE'" // Filter to Barnstable for now
            })

            // Activity Center boundaries in proper spatial reference
            var acBoundaries = new FeatureLayer ({
              url: "https://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/2",
              outFields: ['*'],
              visible: false,
              popupTemplate: {
                content: '{*}'
              }
            })

            // Town boundary layer to query block groups
            var gizBoundaries = new FeatureLayer ({
              url: "https://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/20",
              outFields: ['*'],
              definitionExpression: "OBJECTID = 1",
              popupTemplate: {
                content: '{*}'
              },
              visible: false
            })

            var resultLayer = new GraphicsLayer() // Initialize blank layer to fill with queried block group symbology
            var resultLayer1 = new GraphicsLayer()
            var resultLayer2 = new GraphicsLayer()
            var resultLayer3 = new GraphicsLayer()

            var scene = new WS({
              portalItem: { // autocasts as new PortalItem()
                id: "e54e7f20bc9f4d758649a26015c8cb2b"
              },
              layers: [embayments, blockGroups, parcelLayer, resultLayer, resultLayer1, townBoundaries, acBoundaries, gizBoundaries, resultLayer2, resultLayer3]
            });

            /************************************************************
             * Set the WebScene instance to the map property in a SceneView.
             ************************************************************/
            var view = new SV({
              map: scene,
              container: "viewDiv",
              camera: {
                position: [-70.302834, 41.6999, 50],
                tilt: 70,
                heading: 0
              }
            })

            var homeBtn = new Home({ // Home button resets zoom/center
              view: view
            });

            view.ui.add(homeBtn, "top-left");

            function createGraphic(polygon) { // Create graphic from user-defined polygon
              var graphic = new Graphic({
                geometry: polygon,
                symbol: {
                  type: "simple-fill",
                  outline: { 
                    color: [178, 102, 234],
                    width: 2
                  }
                }
              });
              return graphic;
            }

            function createPolygon(vertices) { // Create polygon object from user-defined vertices

              return new Polygon({

                rings: vertices,
                spatialReference: view.spatialReference
              });
            }

            function drawPolygon(evt) { // Add user-defined polygon to map layer

              var vertices = evt.vertices;

              //remove existing graphic
              resultLayer.removeAll();
              resultLayer1.removeAll();
              view.graphics.removeAll();


              // create a new polygon
              var polygon = createPolygon(vertices);

              // create a new graphic representing the polygon, add it to the view
              var graphic = createGraphic(polygon);
              view.graphics.add(graphic);
            }

            // Query block groups with 1mi-buffered user-defined polygon
            // Total selected attributes for results pane
            // Add queried block groups to results layer on map
            function queryBlockGroup(selection) {

              console.log('start query')

              if (!selection.vertices) { // If selection is a boundary

                console.log('selection found')

                selection.visible = true // Show layer

                selection.when(function(){
                  return selection.queryExtent();
                })
                .then(function(response){
                  view.goTo({
                    target: response.extent, 
                    tilt: 70});
                })
                
                selection.queryFeatures().then((h) => { // Query boundary geometry

                  console.log('querying boundary geometry')

                  var polygon = h.features[0].geometry // Use geometry for parcel layer query
                  var vertices = h.features[0].geometry.rings // Use rings for API calls

                  continueBlock(polygon, vertices, true)
                })
              } else { // Selection has vertices and is therefore user-defined

                console.log('using drawn poly')

                var vertices = selection.vertices // Use vertices for API calls
                var polygon = createPolygon(vertices); // Use polygon for parcel layer query

                
                view.goTo({
                  target: polygon.extent,
                  tilt: 70
                })

                continueBlock(polygon, vertices, false)
              }
            }

            function continueBlock(polygon, vertices, boundary) {

              console.log(polygon)
              console.log(vertices)

              document.getElementById('loading').style.display = true ? 'block' : 'none';

              parcelLayer.definitionExpression = ""

              var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
              query1.geometry = polygon
              query1.spatialRelationship = 'contains'

              var townName = ''
              var townRequest = ''

              console.log('querying parcel layer')

              parcelLayer.queryFeatures(query1).then((i) => { // Query a single feature to obtain town name

                console.log('parcel layer queried')

                var rowWithCity = i.features.find((i) => {return i.attributes.CITY}) // Get town name from first row with non-null attribute

                townName = rowWithCity.attributes.CITY

                townRequest = [townName]
              })
              .then((i) => {

                townBoundaries.definitionExpression = "TOWN = " + "'" + townName + "'"

                var polystringSelected = ''
                
                if(!boundary) {

                  // Create SQL spatial valid POLYGON ((x y, x y, x y)) from user-defined geometry rings
                  vertices.map((i) => { 

                    polystringSelected += i[0] + ' ';
                    polystringSelected += i[1] + ', ';
                  })
                } else {

                  // Create SQL spatial valid POLYGON ((x y, x y, x y)) from user-defined geometry rings
                  vertices[0].map((i) => { 

                    polystringSelected += i[0] + ' ';
                    polystringSelected += i[1] + ', ';
                  })
                }

                console.log(polystringSelected)

                var firstOccurenceOfComma = polystringSelected.indexOf(',') // Obtain index of first x y coordinates
                var polySliceFirstXY = polystringSelected.slice(0,firstOccurenceOfComma) // Slice poly string to first coordinate set
                var completeRings = polystringSelected + polySliceFirstXY // Append first coordinates as last coordinates to complete polygon
                var realData = {town: townName, rings: completeRings}

                console.log(realData)

                // Pass asynchronous request functions to promise handler
                Promise.all([
                  getParcelSums(realData,'within'),
                  getParcelSums(realData,'1MI'),
                  getParcelSums(realData,'ROT'),
                  getBlocks(realData,'within'), 
                  getBlocks(realData,'1MI'), 
                  getBlocks(realData, 'ROT'), 
                  getTracts(realData,'within'), 
                  getTracts(realData,'1MI'), 
                  getTracts(realData,'ROT')
                ])
                  .then(function ([ // Parse responses at same indicies as async requests
                    pWithin,
                    p1MI,
                    pROT,
                    bWithin, 
                    b1MI, 
                    bROT, 
                    tWithin, 
                    t1MI, 
                    tROT
                  ]) {

                    // Log parcel sums, blockgroup and tractid array responses
                    console.log(pWithin)
                    console.log(bWithin)
                    console.log(tWithin)

                    // Obtain true data within nested responses
                    pWithin = pWithin.data.recordset[0]
                    p1MI = p1MI.data.recordset[0]
                    pROT = pROT.data.recordset[0]
                    
                    // Store parcel sums within boundary to state
                    totals.avgUnitsPPSelected = pWithin.avgUnitsPP
                    totals.avgUnitsPASelected = pWithin.avgUnitsPA
                    totals.totalAptSelectedHSG = pWithin.totalApartmentUnits
                    totals.totalAptSelectedAcres = pWithin.totalApartmentAcres
                    totals.totalMixedSelectedHSG = pWithin.totalMixsedUseUnits
                    totals.totalMixedSelectedAcres = pWithin.totalMixsedUseAcres
                    totals.totalMultiOneSelectedHSG = pWithin.totalMultiOneUnits
                    totals.totalMultiOneSelectedAcres = pWithin.totalMultiOneAcres
                    totals.totalOtherSelectedHSG = pWithin.totalOtherUnits
                    totals.totalOtherSelectedAcres = pWithin.totalOtherAcres
                    totals.totalResCondoSelectedHSG = pWithin.totalResCondoUnits
                    totals.totalResCondoSelectedAcres = pWithin.totalResCondoAcres
                    totals.totalSingleFamSelectedHSG = pWithin.totalSFUnits
                    totals.totalSingleFamSelectedAcres = pWithin.totalSFAcres
                    totals.totalShrdTmpSelectedHSG = pWithin.totalTempUnits
                    totals.totalShrdTmpSelectedAcres = pWithin.totalTempAcres
                    totals.totalResidentialSelected = pWithin.totalParcels

                    // Store parcel sums 1 MI from boundary to state
                    totals.avgUnitsPP1MI = p1MI.avgUnitsPP
                    totals.avgUnitsPA1MI = p1MI.avgUnitsPA
                    totals.totalApt1MIHSG = p1MI.totalApartmentUnits
                    totals.totalApt1MIAcres = p1MI.totalApartmentAcres
                    totals.totalMixed1MIHSG = p1MI.totalMixsedUseUnits
                    totals.totalMixed1MIAcres = p1MI.totalMixsedUseAcres
                    totals.totalMultiOne1MIHSG = p1MI.totalMultiOneUnits
                    totals.totalMultiOne1MIAcres = p1MI.totalMultiOneAcres
                    totals.totalOther1MIHSG = p1MI.totalOtherUnits
                    totals.totalOther1MIAcres = p1MI.totalOtherAcres
                    totals.totalResCondo1MIHSG = p1MI.totalResCondoUnits
                    totals.totalResCondo1MIAcres = p1MI.totalResCondoAcres
                    totals.totalSingleFam1MIHSG = p1MI.totalSFUnits
                    totals.totalSingleFam1MIAcres = p1MI.totalSFAcres
                    totals.totalShrdTmp1MIHSG = p1MI.totalTempUnits
                    totals.totalShrdTmp1MIAcres = p1MI.totalTempAcres
                    totals.totalResidential1MI = p1MI.totalParcels

                    // Store parcels sums for remainder of town, outside 1 MI boundary, to state
                    totals.avgUnitsPPROT = pROT.avgUnitsPP
                    totals.avgUnitsPAROT = pROT.avgUnitsPA
                    totals.totalAptROTHSG = pROT.totalApartmentUnits
                    totals.totalAptROTAcres = pROT.totalApartmentAcres
                    totals.totalMixedROTHSG = pROT.totalMixsedUseUnits
                    totals.totalMixedROTAcres = pROT.totalMixsedUseAcres
                    totals.totalMultiOneROTHSG = pROT.totalMultiOneUnits
                    totals.totalMultiOneROTAcres = pROT.totalMultiOneAcres
                    totals.totalOtherROTHSG = pROT.totalOtherUnits
                    totals.totalOtherROTAcres = pROT.totalOtherAcres
                    totals.totalResCondoROTHSG = pROT.totalResCondoUnits
                    totals.totalResCondoROTAcres = pROT.totalResCondoAcres
                    totals.totalSingleFamROTHSG = pROT.totalSFUnits
                    totals.totalSingleFamROTAcres = pROT.totalSFAcres
                    totals.totalShrdTmpROTHSG = pROT.totalTempUnits
                    totals.totalShrdTmpROTAcres = pROT.totalTempAcres
                    totals.totalResidentialROT = pROT.totalParcels

                    // Prepare array of async requests at each selection type using blockgroup/tract responses
                    Promise.all([
                      getCensusIncomeEmploymentEducationTotals(bWithin),
                      getCensusIncomeEmploymentEducationTotals(b1MI),
                      getCensusIncomeEmploymentEducationTotals(bROT),
                      getCensusHousingOccTotals(bWithin),
                      getCensusHousingOccTotals(b1MI),
                      getCensusHousingOccTotals(bROT),
                      getCensusEduTractTotals(tWithin),
                      getCensusEduTractTotals(t1MI),
                      getCensusEduTractTotals(tROT),
                      getCensusAffordabilityTotals(bWithin),
                      getCensusAffordabilityTotals(b1MI),
                      getCensusAffordabilityTotals(bROT),
                      getCensusAgeTotals(bWithin),
                      getCensusAgeTotals(b1MI),
                      getCensusAgeTotals(bROT),
                      getCensusRentMedian(bWithin),
                      getCensusRentMedian(b1MI),
                      getCensusRentMedian(bROT),
                      getCensusHomePriceMedian(bWithin),
                      getCensusHomePriceMedian(b1MI),
                      getCensusHomePriceMedian(bROT),
                      getCensusEduTownTotals(townRequest)
                    ])
                      .then(function ([ // Parse responses at same indices as async requests
                        incWithin,
                        inc1MI,
                        incROT,
                        occWithin,
                        occ1MI,
                        occROT,
                        eduWithin,
                        edu1MI,
                        eduROT,
                        affWithin,
                        aff1MI,
                        affROT,
                        ageWithin,
                        age1MI,
                        ageROT,
                        rentWithin,
                        rent1MI,
                        rentROT,
                        priceWithin,
                        price1MI,
                        priceROT,
                        eduTown
                      ]) {

                        // Log income, occulation, educatino, affordability, age, rent, and home price census data
                        console.log(incWithin)
                        console.log(occWithin)
                        console.log(eduWithin)
                        console.log(affWithin)
                        console.log(ageWithin)
                        console.log(rentWithin)
                        console.log(priceWithin)
                        console.log(eduTown)

                        // Obtain true income data for blockgroups at each selection, use to set state properties
                        incWithin = incWithin.data
                        inc1MI = inc1MI.data
                        incROT = incROT.data

                        // Obtain true occupation data for blockgroups at each selection, use to set state properties
                        occWithin = occWithin.data
                        occ1MI = occ1MI.data
                        occROT = occROT.data

                        // Obtain true education data for tracts at each selection, use to set state properties
                        eduWithin = eduWithin.data
                        edu1MI = edu1MI.data
                        eduROT = eduROT.data

                        // Obtain true affordability data for blockgroups at each selection, use to set state properties
                        affWithin = affWithin.data
                        aff1MI = aff1MI.data
                        affROT = affROT.data

                        // Obtain true age data for blockgroups at each selection, use to set state properties
                        ageWithin = ageWithin.data
                        age1MI = age1MI.data
                        ageROT = ageROT.data

                        // Obtain true rent data for blockgroups at each selection, use to set state properties
                        rentWithin = rentWithin.data
                        rent1MI = rent1MI.data
                        rentROT = rentROT.data

                        // Obtain true price data for blockgroups at each selection, use to set state properties
                        priceWithin = priceWithin.data
                        price1MI = price1MI.data
                        priceROT = priceROT.data

                        // Obtain true education data at the town level, use to set state properties
                        eduTown = eduTown.data

                        // Parse income data to state using blockgroups intersecting parcels within boundary
                        totals.percUnempCont = incWithin.percUnemp
                        totals.paretoMedianCont = incWithin.paretoMedian
                        totals.lessHSCont = incWithin.lessHS
                        totals.hsgCont = incWithin.hsg
                        totals.scaCont = incWithin.sca
                        totals.bacCont = incWithin.bac
                        totals.gradProCont = incWithin.gradPro
                        totals.totalEduCont = incWithin.totalEdu

                        // Parse income data to state using blockgroups intersecting parcels 1MI outside boundary
                        totals.percUnemp = inc1MI.percUnemp
                        totals.paretoMedian = inc1MI.paretoMedian
                        totals.lessHS = inc1MI.lessHS
                        totals.hsg = inc1MI.hsg
                        totals.sca = inc1MI.sca
                        totals.bac = inc1MI.bac
                        totals.gradPro = inc1MI.gradPro
                        totals.totalEdu = inc1MI.totalEdu

                        // Parse income data to state using blockgroups intersecting parcels outside of 1MI boundary but within town
                        totals.townPercUnemp = incROT.percUnemp
                        totals.townParetoMedian = incROT.paretoMedian
                        totals.townLessHS = incROT.lessHS
                        totals.townHSG = incROT.hsg
                        totals.townSCA = incROT.sca
                        totals.townBac = incROT.bac
                        totals.townGradPro = incROT.gradPro
                        totals.townEdu = incROT.totalEdu

                        // Parse occupation data to state using blockgroups intersecting parcels within boundary
                        totals.totalHousingSelected = occWithin.totalHousing
                        totals.totalOwnedSelected = occWithin.totalOwned
                        totals.totalRentalSelected = occWithin.totalRental
                        totals.totalSeasonalSelected = occWithin.totalSeasonal
                        totals.totalYearRoundSelected = occWithin.totalYearRound
                        
                        // Parse occupation data to state using blockgroups intersecting parcels 1MI outside boundary
                        totals.totalHousing1MI = occ1MI.totalHousing
                        totals.totalOwned1MI = occ1MI.totalOwned
                        totals.totalRental1MI = occ1MI.totalRental
                        totals.totalSeasonal1MI = occ1MI.totalSeasonal
                        totals.totalYearRound1MI = occ1MI.totalYearRound

                        // Parse occupation data to state using blockgroups intersecting parcels outside of 1MI boundary but within town
                        totals.totalHousingROT = occROT.totalHousing
                        totals.totalOwnedROT = occROT.totalOwned
                        totals.totalRentalROT = occROT.totalRental
                        totals.totalSeasonalROT = occROT.totalSeasonal
                        totals.totalYearRoundROT = occROT.totalYearRound

                        // Parse education data to state using blockgroups intersecting parcels within boundary
                        totals.incLessHSCont = eduWithin.totalLessHSG
                        totals.incHSGCont = eduWithin.totalHSG
                        totals.incSCACont = eduWithin.totalSCA
                        totals.incBacCont = eduWithin.totalBac
                        totals.incGradCont = eduWithin.totalGrad

                        // Parse education data to state using blockgroups intersecting parcels 1MI outside boundary
                        totals.incLessHS = edu1MI.totalLessHSG
                        totals.incHSG = edu1MI.totalHSG
                        totals.incSCA = edu1MI.totalSCA
                        totals.incBac = edu1MI.totalBac
                        totals.incGrad = edu1MI.totalGrad

                        // Parse education data to state using blockgroups intersecting parcels outside of 1MI boundary but within town
                        totals.townIncLessHSROT = eduROT.totalLessHSG
                        totals.townIncHSGROT = eduROT.totalHSG
                        totals.townIncSCAROT = eduROT.totalSCA
                        totals.townIncBacROT = eduROT.totalBac
                        totals.townIncGradROT = eduROT.totalGrad

                        // Parse affordability data to state using blockgroups intersecting parcels at each selection type
                        totals.totalHHBelowPovertyWithin = affWithin.HHBelowPovertyLine
                        totals.totalHHBelowPoverty1MI = aff1MI.HHBelowPovertyLine
                        totals.totalHHBelowPovertyROT = affROT.HHBelowPovertyLine
                        totals.totalHHWithChildrenWithin = affWithin.HHWithChildren
                        totals.totalHHWithChildren1MI = aff1MI.HHWithChildren
                        totals.totalHHWithChildrenROT = affROT.HHWithChildren
                        totals.totalHHSpendingGreater30Within = affWithin.HHSpendingGreater30
                        totals.totalHHSpendingGreater301MI = aff1MI.HHSpendingGreater30
                        totals.totalHHSpendingGreater30ROT = affROT.HHSpendingGreater30

                        // Parse age data to state using blockgroups intersecting parcels at each selection type
                        totals.totalAgesZero19Within = ageWithin.agesZero19
                        totals.totalAgesZero191MI = age1MI.agesZero19
                        totals.totalAgesZero19ROT = ageROT.agesZero19
                        totals.totalAgesTwenty44Within = ageWithin.agesTwenty44
                        totals.totalAgesTwenty441MI = age1MI.agesTwenty44
                        totals.totalAgesTwenty44ROT = ageROT.agesTwenty44
                        totals.totalAgesFortyFive64Within = ageWithin.agesFortyFive64
                        totals.totalAgesFortyFive641MI = age1MI.agesFortyFive64
                        totals.totalAgesFortyFive64ROT = ageROT.agesFortyFive64
                        totals.totalAgesSixtyFivePlusWithin = ageWithin.agesSixtyFivePlus
                        totals.totalAgesSixtyFivePlus1MI = age1MI.agesSixtyFivePlus
                        totals.totalAgesSixtyFivePlusROT = ageROT.agesSixtyFivePlus

                        // Parse rent data to state using blockgroups intersecting parcels at each selection type
                        totals.totalRentMedianWithin = rentWithin.paretoMedian
                        totals.totalRentMedian1MI = rent1MI.paretoMedian
                        totals.totalRentMedianROT = rentROT.paretoMedian

                        // Parse home price data to state using blockgroups intersecting parcels at each selection type
                        totals.totalPriceMedianWithin = priceWithin.paretoMedian
                        totals.totalPriceMedian1MI = price1MI.paretoMedian
                        totals.totalPriceMedianROT = priceROT.paretoMedian

                        // Parse education data to state using town name
                        totals.townIncLessHS = eduTown.totalLessHSG
                        totals.townIncHSG = eduTown.totalHSG
                        totals.townIncSCA = eduTown.totalSCA
                        totals.townIncBac = eduTown.totalBac
                        totals.townIncGrad = eduTown.totalGrad

                        totals.Toggle = true
                        document.getElementById('loading').style.display = false ? 'block' : 'none';
                      })
                  }).catch(error => {

                    console.log(error)
                    document.getElementById('loading').style.display = false ? 'block' : 'none';
                  })
              })
            }

            // Obtain parcel sums by selection type
            async function getParcelSums(data, type = null) {

              var parcelSumsRoute = ''

              switch (type) { // switch between selection types

                case 'within':
                  parcelSumsRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getParcelSums/' 
                  // parcelSumsRoute = 'http://localhost:8081/api/getParcelSums/' 
                  break;

                case '1MI':
                  parcelSumsRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getParcelSums1MI/' 
                  // parcelSumsRoute = 'http://localhost:8081/api/getParcelSums1MI/' 
                  break;

                case 'ROT':
                  parcelSumsRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getParcelSumsROT/'
                  // parcelSumsRoute = 'http://localhost:8081/api/getParcelSumsROT/'
                  break; 
              }

              try {

                const response = await axios.post(parcelSumsRoute, data) // Await response from post

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain intersecting block group ids by selection type
            async function getBlocks(data, type = null) {

              var blockGroupRoute = ''

              switch (type) {

                case 'within':
                  blockGroupRoute = 'http://ccc-api-05.api.capecodcommission.org/api/selectBlockGroups/' 
                  // blockGroupRoute = 'http://localhost:8081/api/selectBlockGroups/' 
                  break;

                case '1MI':
                  blockGroupRoute = 'http://ccc-api-05.api.capecodcommission.org/api/selectBlockGroups1MI/' 
                  // blockGroupRoute = 'http://localhost:8081/api/selectBlockGroups1MI/' 
                  break;

                case 'ROT':
                  blockGroupRoute = 'http://ccc-api-05.api.capecodcommission.org/api/selectBlockGroupsROT/'
                  // blockGroupRoute = 'http://localhost:8081/api/selectBlockGroupsROT/'
                  break; 
              }

              try {

                const response = await axios.post(blockGroupRoute, data)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain intersecting tract ids by selection type
            async function getTracts(data, type = null) {

              var tractRoute = '' 

              switch (type) {

                case 'within':
                  tractRoute = 'http://ccc-api-05.api.capecodcommission.org/api/selectTracts/' 
                  // tractRoute = 'http://localhost:8081/api/selectTracts/' 
                  break;

                case '1MI':
                  tractRoute = 'http://ccc-api-05.api.capecodcommission.org/api/selectTracts1MI/' 
                  // tractRoute = 'http://localhost:8081/api/selectTracts1MI/' 
                  break;

                case 'ROT':
                  tractRoute = 'http://ccc-api-05.api.capecodcommission.org/api/selectTractsROT/'
                  // tractRoute = 'http://localhost:8081/api/selectTractsROT/'
                  break; 
              }

              try {

                const response = await axios.post(tractRoute, data)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain education related totals from census api
            async function getCensusIncomeEmploymentEducationTotals (idArray) {

              var ids = parseBlockData(idArray) // Format getBlocks response into request data for post

              // var censusIncomeEmploymentEducationRoute = 'http://localhost:8081/api/getCensusIncomeEmploymentEducationTotals/' 
              var censusIncomeEmploymentEducationRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusIncomeEmploymentEducationTotals/' 
              
              try {

                const response = await axios.post(censusIncomeEmploymentEducationRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain housing related totals from census api
            async function getCensusHousingOccTotals (idArray) {

              var ids = parseBlockData(idArray)

              // var censusHousingOccTotalsRoute = 'http://localhost:8081/api/getCensusHousingOccTotals/' 
              var censusHousingOccTotalsRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusHousingOccTotals/' 

              try {

                const response = await axios.post(censusHousingOccTotalsRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain education related totals by tract
            async function getCensusEduTractTotals (idArray) {

              var ids = parseTractData(idArray)

              // var censusEduTractTotalsRoute = 'http://localhost:8081/api/getCensusEduTractTotals/' 
              var censusEduTractTotalsRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusEduTractTotals/' 

              try {

                const response = await axios.post(censusEduTractTotalsRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain education related totals by town name
            async function getCensusEduTownTotals (townName) {

              // var censusEduTownTotalsRoute = 'http://localhost:8081/api/getCensusEduTownTotals/' 
              var censusEduTownTotalsRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusEduTownTotals/' 

              try {

                const response = await axios.post(censusEduTownTotalsRoute, townName)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Obtain affordability related totals from census api
            async function getCensusAffordabilityTotals (idArray) {

              var ids = parseBlockData(idArray)

              // var censusAffordabilityRoute = 'http://localhost:8081/api/getCensusAffordabilityTotals/' 
              var censusAffordabilityRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusAffordabilityTotals/' 
              
              try {

                const response = await axios.post(censusAffordabilityRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            async function getCensusRentMedian (idArray) {

              var ids = parseBlockData(idArray)

              // var censusRentRoute = 'http://localhost:8081/api/getCensusRentMedian/' 
              var censusRentRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusRentMedian/' 
              
              try {

                const response = await axios.post(censusRentRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            async function getCensusHomePriceMedian (idArray) {

              var ids = parseBlockData(idArray)

              // var censusHomePriceRoute = 'http://localhost:8081/api/getCensusHomePriceMedian/' 
              var censusHomePriceRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusHomePriceMedian/' 
              
              try {

                const response = await axios.post(censusHomePriceRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            async function getCensusAgeTotals (idArray) {

              var ids = parseBlockData(idArray)

              // var censusAgeRoute = 'http://localhost:8081/api/getCensusAgeTotals/' 
              var censusAgeRoute = 'http://ccc-api-05.api.capecodcommission.org/api/getCensusAgeTotals/' 
              
              try {

                const response = await axios.post(censusAgeRoute, ids)

                return response
              } catch (error) {

                console.log(error)
              }
            }

            // Parse tract IDs into new array for census API requests
            function parseTractData(data) {

              var idArray = []

              if (!data) {

                return idArray
              } else {

                data.data.recordset.map((i) => {

                  idArray.push(i.TRACT)
                })

                return idArray
              }
            }

            // Parse tractBlockIDs into new array for census API requests
            function parseBlockData(data) {

              var idArray = []

              if (!data) {

                return idArray
              } else {

                data.data.recordset.map((i) => {

                  idArray.push(i.tractBlockID)
                })

                return idArray
              }
            }


            function enableCreatePolygon(draw, view) {
              // create() will return a reference to an instance of PolygonDrawAction
              var action = draw.create("polygon");

              totals.Toggle = false
              resultLayer.removeAll();
              townBoundaries.definitionExpression = ""

              // focus the view to activate keyboard shortcuts for drawing polygons
              view.focus();

              // listen to vertex-add event on the action
              action.on("vertex-add", drawPolygon);

              // listen to cursor-update event on the action
              action.on("cursor-update", drawPolygon);

              // listen to vertex-remove event on the action
              action.on("vertex-remove", drawPolygon);

              // *******************************************
              // listen to draw-complete event on the action
              // *******************************************
              action.on("draw-complete", queryBlockGroup);
            }
            
            // Activate and attach polygon draw to view on button click
            $('#Draw').on('click', function() {

              var draw = new Draw({
                view: view
              });

              enableCreatePolygon(draw, view);
            })

            $('#neighborhoodSelect').on('change', function() {

              resultLayer.removeAll(); // Reset graphics layers 
              resultLayer1.removeAll();
              view.graphics.removeAll();

              var x = $(this).val().toString()

              parcelLayer.definitionExpression = "NEIGHB_1 = " + "'" + x + "'" // set definition expression on parcel layer

              queryEmblks()
            })

            $('#acSelect').on('change', function() {

              resultLayer.removeAll(); // Reset graphics layers 
              resultLayer1.removeAll();
              resultLayer2.removeAll();
              view.graphics.removeAll();

              var x = $(this).val().toString()

              acBoundaries.definitionExpression = "AC_name = " + "'" + x + "'" // set definition expression on parcel layer

              queryBlockGroup(acBoundaries)
              gizBoundaries.visible = false
            })

            $('#townSelect').on('change', function() {

              resultLayer.removeAll(); // Reset graphics layers 
              resultLayer1.removeAll();
              view.graphics.removeAll();

              var x = $(this).val().toString()

              parcelLayer.definitionExpression = "CITY = " + "'" + x + "'" // set definition expression on parcel layer

              queryEmblks()
            })

            $('#computeGIZ').on('click', function() {

              resultLayer.removeAll(); // Reset graphics layers 
              resultLayer1.removeAll();
              resultLayer2.removeAll();
              view.graphics.removeAll();

              acBoundaries.visible = false
              queryEmblks('GIZ')
            })
      })

  },

  methods: {

  },

  watch: {

    'censusTowns': function(x) {

    }
  }
}

</script>

<style>

.maxHeight {
  min-height: 100% !important;
  height:100% !important;
  flex-shrink: 0 !important;
  padding-bottom: 0;
  /*max-height: 88%;*/
}

.center {
    width: 650px;
    height: 300px;
    color: #f0ead6;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 101;

    margin: auto;
}

#loading {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(192, 192, 192, 0.5);
    background-image: url("https://i.stack.imgur.com/MnyxU.gif");
    background-repeat: no-repeat;
    background-position: center;
}

.esri-ui-bottom-left {
  bottom: 15% !important;
}

.esri-legend {
  background: #28536c;
  color: #f0ead6;
  border-radius: 25px;
  border: 5px solid grey;
}

#viewDiv {
    position: fixed !important;
    /*top: 3.5rem;
    bottom: 0;
    left: 0;
    right: 0;*/
    height: 100%;
    width: 100%;
  }


#BAsites {

  color: #ed7d31
}

#CAsites {
  color: #4472c4
}

#pct_GF {
  color: #a5a5a5
}

#radio-group {
  display: inline-block
}

h1 {
  font-family: "Open Sans";
  font-size: 28px;
}

h2 {
  font-family: "Open Sans"
}

p {
  font-family: "Open Sans";
  font-size: 15px;
}

.cccLogo {
  position: absolute;
  z-index: 2;
  right: 0px;

}

.sidething {
  /*position: absolute !important;*/
  background: #28536c;
  color: #f0ead6;
  padding: 1%;
  height: 100% !important;
  max-height: 100%;
  overflow: hidden;
  /*display: flex; */
  flex-direction: column; 
}

.selectEmbayment {
  /*top: 0;*/
  position: absolute;
  /*z-index: 6;*/
  /*width: 16%;*/
  float: left;
  background: #28536c;
  /*border-radius: 25px;*/
  /*padding: 1.5em;*/
  /*border: 2px solid black;*/
  /*opacity: 0.9;*/
  color: #f0ead6;
  padding: 0;
  padding-bottom: 1%;
}

.selectEmbayment1 {
  top: 5px;
  right: 1px;
  position: absolute;
  z-index: 4;
  float: right;
  background: #28536c;
  border-radius: 25px;
  padding: 1.5em;
  border: 2px solid black;
  opacity: 0.9;
  color: black;

}

.comparison {
  bottom: 1px;
  left: 1px;
  /*position: absolute;*/
  /*z-index: 5;*/
  float: right;
  background: #28536c;
  border-radius: 25px;
  /*padding: 1.5em;*/
  border: 5px solid grey;
  /*opacity: 0.9;*/
  /*height: 40%*/
  /*color: black;*/

}

.Comparison {
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  float: left;
  margin-left: 1%;
  z-index: 99;
  bottom: 40%;
  left: 15%;
}

.Results {
  background: #28536c;
  border-radius: 25px;
  border: 5px solid grey;
  float: right;
  margin-right: 1%;
  color: white;
  text-align: center;
  font-family: "Open Sans";
  
}

.headthing {
  /*z-index: 6;*/
  top: 1px;
  position: absolute;
  padding: 0 !important;
  /*flex-shrink: 0 !important;*/
}

.smallFont {
  font-size: 10px;
}

#legendDiv {
  float: right;
  background: #28536c;
  color: #f0ead6;
}

 html, body, #app {

    height: 100%;
    width: 100%
 }

 .fill-height {

  min-height: 100%;
  height: auto !important;
  height: 100%;
 }
</style>
