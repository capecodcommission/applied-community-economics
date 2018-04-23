export const createMap = function (loader, totals, censusBlocks, censusTracts, censusTowns, censusBlocks2, censusTracts2) {

  loader.dojoRequire(
    [
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
    "dojo/domReady!"
    ],
    (
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
      SimpleRenderer
    ) => {
    
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
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/0",
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
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/1",
        outFields: ['*'],
        visible: false,
        popupTemplate: {
          title: '{SITE_ADDRESS}',
          content: '{*}'
        }
      })

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

      // Town boundary layer to query block groups
      var acBoundaries = new FeatureLayer ({
        url: "http://gis-app-04.cccom.barnstablecounty.org:6080/arcgis/rest/services/ActivityCenters/AC_Boundaries/FeatureServer/0",
        outFields: ['*'],
        visible: false
      })

      // Town boundary layer to query block groups
      var gizBoundaries = new FeatureLayer ({
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/20",
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

      // create basemap with layers prepared but hidden
      var map = new Map({basemap: 'dark-gray', layers: [embayments, blockGroups, parcelLayer, resultLayer, resultLayer1, townBoundaries, acBoundaries, gizBoundaries, resultLayer2, resultLayer3]});

      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 12,
        center: [-70.303634, 41.701660] // Center map over Barnstable
      });

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
      function queryBlockGroup(evt) {

        parcelLayer.definitionExpression = ""

        var vertices = evt.vertices
        var polygon = createPolygon(vertices); // Create polygon 

        // var buff = geometryEngine.buffer(polygon,[1],'miles',true) // Create 1mi buffer

        var query = blockGroups.createQuery()
        query.geometry = polygon
        query.spatialRelationship = 'intersects' 
        query.distance = 1
        query.units = 'miles'

        var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
        query1.geometry = polygon
        query1.spatialRelationship = 'intersects'
        query1.distance = 1
        query1.units = 'miles'

        var features = ''
        var features1 = ''
        var totalLand = 0
        var totalWater = 0
        var totalPop = 0
        var totalPrcl = 0

        parcelLayer.queryFeatures(query1).then((i) => { // Query parcels using extent of defined embayment layer

          features1 = i.features.map((j) => {

            j.symbol = { // Set normal block group symbology

              type: 'simple-fill',
              outline: { 
                color: [255, 255, 255],
                width: 2
              }
            }

            return j
          })

          resultLayer1.addMany(features1) // Push queried parcels to new graphics layer
        })
        .then((j) => {

          blockGroups.queryFeatures(query).then(function(i) { // Query using 1mi buffer

            // Obtain totals from queried blockgroup attributes
            // Create/fill new attribute using census data
            // Create/fill block group polygon symbology
            features = i.features.map(function(j) { 

              if (j.attributes.TRACT != "990000") { // If any block group isn't the water tract

                j.attributes.popPrcl = 0 // Initialize population by parcel field

                resultLayer1.graphics.items.map((k) => { // Look through parcels from queried results

                  if (geometryEngine.intersects(k.geometry, j.geometry)) { // If block group geometry intersects parcels

                    k.attributes.BLKGRP = j.attributes.BLKGRP // Assign block group to individual parcel

                    j.attributes.popPrcl += parseInt(k.attributes.POP_10) // Sum population field in block group layer using POP_10 from individual parcels
                  }
                })

                totalLand += j.attributes.AREALAND // Obtain totals
                totalWater += j.attributes.AREAWATER

                censusData.map((k) => { // Search ACS rows by block group

                  if (k.indexOf(j.attributes.TRACT) >= 0 && k.indexOf(j.attributes.BLKGRP)  >= 0) { // If key-match

                    j.attributes.population = parseInt(k[1]) // Append/fill population (index 1) from store, convert to integer
                  }
                })

                totalPop += j.attributes.population

                if ((j.attributes.popPrcl / j.attributes.population) >= .5) {

                  j.symbol = { // Set normal block group symbology

                    type: 'simple-fill',
                    outline: { 
                      color: [66, 134, 244],
                      width: 2
                    }
                  }
                } else {

                  j.symbol = { // Set empty block group symbology

                    type: 'simple-fill',
                    outline: { 
                      color: [0, 0, 0, 0],
                      width: 0
                    },
                    style: 'none'
                  }
                }
              } else {

                j.symbol = { // Set empty block group symbology

                  type: 'simple-fill',
                  outline: { 
                    color: [0, 0, 0, 0],
                    width: 0
                  },
                  style: 'none'
                }
              }

              return j   
            })

            resultLayer.addMany(features)

            totals.Land = (totalLand / 43560).toFixed(2)
            totals.Water = (totalWater / 43560).toFixed(2)
            totals.Population = totalPop.toFixed(0)
            totals.Toggle = true
          })
        })
      }


      function enableCreatePolygon(draw, view) {
        // create() will return a reference to an instance of PolygonDrawAction
        var action = draw.create("polygon");

        totals.Toggle = false
        resultLayer.removeAll();

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


      // Use parcel feature layer extent w/ 1mi buffer to query for block groups
      // Match group and tract codes to append properties from census API data
      // Estimate additional parameters as necessary
      // Assign attributes data from state with totals from queried layers
      // Display results
      function queryEmblks(x = null) {

        var selection = []

        // use GIZ or other boundary based on x parameter
        if (x === 'GIZ') {

          totals.totalHousingROT = 21626
          totals.avgUnitsPPROT = .96
          totals.avgUnitsPAROT = 1.09
          totals.totalResidentialROT = 19823
          selection = gizBoundaries
        } else {
          totals.totalHousingROT = 19923
          totals.avgUnitsPPROT = .96
          totals.avgUnitsPAROT = 1.06
          totals.totalResidentialROT = 18381
          selection = acBoundaries
        }

        document.getElementById('loading').style.display = true ? 'block' : 'none';

        selection.queryFeatures().then((h) => { // Query selection geometry

          $('#progress').text('queried parcel layer extent')
          console.log('queried parcel layer extent')

          var buff = h.features[0].geometry // use boundary geometry for query

          // var polystring = ''

          // buff.rings[0].map((i) => {

          //   polystring += i[0] + ' ';
          //   polystring += i[1] + ', ';
          // })

          // var finished = "POLYGON((" + polystring + "))"

          // console.log(finished)

          // var url = ''

          // $.ajax({
          //   method: 'POST',
          //   data: data,
          //   url: url
          // })
          // .done(function(msg) {
          //   // console.log(msg);
          //   $('#total_nitrogen_polygon').text(msg);
          //   $('#popdown-opacity').show();
          //             $('div.fa.fa-spinner.fa-spin').remove()
            
          // }).fail(function(msg){
          //   // console.log(msg);
          //   alert('There was a problem saving the polygon. Please send this error message to mario.carloni@capecodcommission.org: <br />Response: ' + msg.status + ' ' + msg.statusText );
          // });


          selection.visible = true
          parcelLayer.definitionExpression = ""

          var query = blockGroups.createQuery() // Initialize block group query using buffered extent
          query.geometry = buff
          query.spatialRelationship = 'intersects'
          query.returnGeometry = true
          query.distance = 1
          query.units = 'miles'

          var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
          query1.geometry = buff
          query1.spatialRelationship = 'contains'
          query1.returnGeometry = true
          query1.distance = 1
          query1.units = 'miles'

          var query5 = tracts.createQuery()
          query5.geometry = buff
          query5.spatialRelationship = 'intersects'
          query5.returnGeometry = true
          query5.distance = 1
          query5.units = 'miles'

          var query6 = tracts.createQuery()
          query6.geometry = buff
          query6.spatialRelationship = 'intersects'
          query6.returnGeometry = true

          // Initialize running totals
          var features = ''
          var features1 = ''
          var totalLand = 0
          var totalWater = 0

          // Household income
          var totalHousing = 0
          var totalSeasonal = 0
          var totalLess10k = 0
          var totalTen14 = 0
          var totalFif19 = 0
          var totalTwenty24 = 0
          var totalTwentyFive29 = 0
          var totalThirty34 = 0
          var totalThirtyFive39 = 0
          var totalFourty44 = 0
          var totalFourtyFive49 = 0
          var totalFifty59 = 0
          var totalSixty74 = 0
          var totalSeventyFive99 = 0
          var totalHundred124 = 0
          var totalHundredTwentyFive149 = 0
          var totalHundredFifty199 = 0
          var totalTwoHundredPlus = 0

          // Unemployment
          var totalCivilLabor = 0
          var totalUnemp = 0
          var percUnemp = 0

          // Education
          var totalEdu = 0
          var totalNoSchool = 0
          var totalNursery = 0
          var totalKindergarten = 0
          var totalG1 = 0
          var totalG2 = 0
          var totalG3 = 0
          var totalG4 = 0
          var totalG5 = 0
          var totalG6 = 0
          var totalG7 = 0
          var totalG8 = 0
          var totalG9 = 0
          var totalG10 = 0
          var totalG11 = 0
          var totalG12 = 0
          var totalLessHS = 0  
          var totalHS = 0
          var totalGED = 0
          var totalHSG = 0
          var totalSCLess1 = 0
          var totalSCMore1 = 0
          var totalAss = 0
          var totalSCA = 0
          var totalBac = 0
          var totalMas = 0
          var totalPro = 0
          var totalDoc = 0
          var totalGradPro = 0
          var totalIncLessHS = 0
          var totalIncHSG = 0
          var totalIncSCA = 0
          var totalIncBac = 0
          var totalIncGrad = 0
          var totalIncLength = 0
          var avgIncLessHS = 0
          var avgIncHSG = 0
          var avgIncSCA = 0
          var avgIncBac = 0
          var avgIncGrad = 0

          var town = ''

          var totalResidential1MI = 0

          var totalHSG_BLDOUT1MI = 0
          var avgUnitsPP1MI = 0

          var totalParcelAcres1MI = 0
          var avgUnitsPA1MI = 0

          // Housing Occupancy
          var totalOwnOccp = 0
          var totalRntOccp = 0
          var totalForRent = 0
          var totalRntNotOcc = 0
          var totalForSale = 0
          var totalSoldNotOcc = 0
          var totalSeaRecOcc = 0
          var totalMigrant = 0
          var totalOtherVac = 0


          // Housing Types

          // HSG_BLDOUT count
          var totalApt1MIHSG = 0
          var totalMixed1MIHSG = 0
          var totalMultiOne1MIHSG = 0
          var totalOther1MIHSG = 0
          var totalResCondo1MIHSG = 0
          var totalShrdTmp1MIHSG = 0
          var totalSingleFam1MIHSG = 0

          // Acres count
          var totalApt1MIAcres = 0
          var totalMixed1MIAcres = 0
          var totalMultiOne1MIAcres = 0
          var totalOther1MIAcres = 0
          var totalResCondo1MIAcres = 0
          var totalShrdTmp1MIAcres = 0
          var totalSingleFam1MIAcres = 0

          $('#progress').text('querying parcels 1mi from GIZ')
          parcelLayer.queryFeatures(query1).then((i) => { // Query parcels using extent of defined embayment layer

            var rowWithCity = i.features.find((i) => {return i.attributes.CITY}) // Get cityname from first row with non-null attribute

            town = rowWithCity.attributes.CITY

            console.log(town) // Establish cityname query working

            features1 = i.features.map((j) => {

              if (j.attributes.LUSE1 === 'Residential') { // Count residential parcels

                switch(j.attributes.USE_CODE) { // Use switch to sum parcel counts by USE_CODE

                  // Apartments (4+ Units)
                  case '111':
                    totalApt1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalApt1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '112':
                    totalApt1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalApt1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1110':
                    totalApt1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalApt1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1120':
                    totalApt1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalApt1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  // Multi-Family / Mixed Use
                  case '105':
                    totalMixed1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalMixed1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '134':
                    totalMixed1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalMixed1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1040':
                    totalMixed1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalMixed1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1050':
                    totalMixed1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalMixed1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  // Multiple Houses on one parcel
                  case '109':
                    totalMultiOne1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalMultiOne1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  // Other
                  case '130':
                    totalOther1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalOther1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '131':
                    totalOther1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalOther1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1060':
                    totalOther1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalOther1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1300':
                    totalOther1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalOther1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1310':
                    totalOther1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalOther1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1320':
                    totalOther1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalOther1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  // Residential Condominium
                  case '1020':
                    totalResCondo1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalResCondo1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  // Shared or Temporary Housing
                  case '1210':
                    totalShrdTmp1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalShrdTmp1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1230':
                    totalShrdTmp1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalShrdTmp1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1250':
                    totalShrdTmp1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalShrdTmp1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1259':
                    totalShrdTmp1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalShrdTmp1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  // Single Family Residential
                  case '101':
                    totalSingleFam1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalSingleFam1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;

                  case '1010':
                    totalSingleFam1MIHSG += parseInt(j.attributes.HSG_BLDOUT)
                    totalSingleFam1MIAcres += parseInt(j.attributes.PARCEL_ACRES)
                    break;
                }

                totalHSG_BLDOUT1MI += parseInt(j.attributes.HSG_BLDOUT)

                totalParcelAcres1MI += parseInt(j.attributes.PARCEL_ACRES)

                totalResidential1MI++
              }

              j.symbol = { // Set empty block group symbology

                type: 'simple-fill',
                outline: { 
                  color: [0,0,0,0],
                  width: 0
                },
                style: 'none'
              }

              return j
            })

            // console.log('totalApt1MIAcres',totalApt1MIAcres)
            // console.log('totalMixed1MIAcres',totalMixed1MIAcres)
            // console.log('totalMultiOne1MIAcres',totalMultiOne1MIAcres)
            // console.log('totalOther1MIAcres',totalOther1MIAcres)
            // console.log('totalResCondo1MIAcres',totalResCondo1MIAcres)
            // console.log('totalShrdTmp1MIAcres',totalShrdTmp1MIAcres)
            // console.log('totalSingleFam1MIAcres',totalSingleFam1MIAcres)

            avgUnitsPP1MI = totalHSG_BLDOUT1MI / totalResidential1MI
            avgUnitsPA1MI = totalHSG_BLDOUT1MI / totalParcelAcres1MI

            totals.avgUnitsPP1MI = avgUnitsPP1MI
            totals.avgUnitsPA1MI = avgUnitsPA1MI

            totals.totalResidential1MI = totalResidential1MI // Set total residential state property

            totals.totalApt1MIHSG = totalApt1MIHSG
            totals.totalMixed1MIHSG = totalMixed1MIHSG
            totals.totalMultiOne1MIHSG = totalMultiOne1MIHSG
            totals.totalOther1MIHSG = totalOther1MIHSG
            totals.totalResCondo1MIHSG = totalResCondo1MIHSG
            totals.totalShrdTmp1MIHSG = totalShrdTmp1MIHSG
            totals.totalSingleFam1MIHSG = totalSingleFam1MIHSG

            totals.totalApt1MIAcres = totalApt1MIAcres
            totals.totalMixed1MIAcres = totalMixed1MIAcres
            totals.totalMultiOne1MIAcres = totalMultiOne1MIAcres
            totals.totalOther1MIAcres = totalOther1MIAcres
            totals.totalResCondo1MIAcres = totalResCondo1MIAcres
            totals.totalShrdTmp1MIAcres = totalShrdTmp1MIAcres
            totals.totalSingleFam1MIAcres = totalSingleFam1MIAcres

            resultLayer1.addMany(features1) // Push queried parcels to new graphics layer

            $('#progress').append('<br/>parcel query done')
          })
          .then((j) => {

            blockGroups.queryFeatures(query).then((i) => { // Query for block groups intersecting the buffered extent

              $('#progress').append('<br/>querying blockgroup feature layer')

              // Initialize block/tract id arrays
              var blockIDArr1MI = []
              var tractIDArr = []

              // Obtain totals from queried blockgroup attributes
              // Create/fill new attribute using census data
              // Create/fill block group polygon symbology
              features = i.features.map((j) => {  // Iterate through response features

                if (j.attributes.TRACT != "990000") { // If census tract isn't cape cod water body

                  var popPrcl = 0 // Initialize population rolling sum by parcel field
                  var blockRow = censusBlocks.find((i) => { return i[53] === j.attributes.BLKGRP && i[52] === j.attributes.TRACT}) // Find 
                  var blockPop = parseInt(blockRow[1])

                  resultLayer1.graphics.items.map((k) => { // Look through parcels from queried results

                    if (geometryEngine.intersects(k.geometry, j.geometry)) { // If block group geometry intersects parcels

                      popPrcl += parseInt(k.attributes.POP_10) // Sum population field in block group layer using POP_10 from individual parcels
                    }
                  })

                  if ((popPrcl / blockPop) >= .5) { // If queried parcel population is greater than 50% of block group population

                    blockIDArr1MI.push(j.attributes.TRACT + j.attributes.BLKGRP)
                    // tractIDArr.push(j.attributes.TRACT)

                    j.symbol = { // Set normal block group symbology

                      type: 'simple-fill',
                      outline: { 
                        color: [66, 134, 244],
                        width: 2
                      }
                    }
                  } else {

                    j.symbol = { // Set empty block group symbology

                      type: 'simple-fill',
                      outline: { 
                        color: [0, 0, 0, 0],
                        width: 0
                      },
                      style: 'none'
                    }
                  }

                } else {

                  j.symbol = { // Set empty block group symbology

                    type: 'simple-fill',
                    outline: { 
                      color: [0, 0, 0, 0],
                      width: 0
                    },
                    style: 'none'
                  }
                }       

                return j 
              }) // End of feature map

              $('#progress').append('<br/>block group feature mapping done')


              // Query tracts within 1MI of boundary
              tracts.queryFeatures(query5).then((i) => {

                $('#progress').append('<br/>begin tract/population calculations')


                // Iterate through tract features, check for parcel intersections, select tracts whose parcel population sum divided by the tract population from the census api is greater than 50%
                i.features.map((j) => {

                  if (j.attributes.TRACT != '990000') {

                    var popPrcl1 = 0
                    var tractRow = censusTracts.find((i) => { return i[52] === j.attributes.TRACT}) // Find census api tract data by id
                    var tractPop = parseInt(tractRow[1])

                    resultLayer1.graphics.items.map((k) => { // Look through parcels from queried results

                      if (geometryEngine.intersects(k.geometry, j.geometry)) { // If block group geometry intersects parcels

                        k.attributes.TRACT = j.attributes.TRACT // Assign block group to individual parcel

                        popPrcl1 += parseInt(k.attributes.POP_10) // Sum population field in block group layer using POP_10 from individual parcels
                      }
                    })

                    
                    if ( (popPrcl1 / tractPop) >= .5) { // If parcel population sum divided by the tract population from the census api is greater than 50%

                      console.log(tractRow[52])
                      console.log(popPrcl1 / tractPop)

                      
                      tractIDArr.push(j.attributes.TRACT) // Push id's to array
                    }
                  }
                })

                $('#progress').append('<br/>calcs done')

                var tractIDUnique = tractIDArr.filter((item, pos) => { return tractIDArr.indexOf(item) == pos}) // Obtain unique tracts if duplicates found

                // Subset census API data by unique tract id's within GIZ
                var censusTractsFiltered = censusTracts.filter(el => {

                  return tractIDUnique.includes(el[52])
                });

                // Use tractblock key to subset API by block group
                var censusBlocksFiltered = censusBlocks.filter(el => {

                  return blockIDArr1MI.includes(el[52] + el[53]) && tractIDUnique.includes(el[52])
                });

                // Use tractblock key to subset API by block group
                var censusBlocksFiltered2 = censusBlocks2.filter(el => {

                  return blockIDArr1MI.includes(el[13] + el[14]) && tractIDUnique.includes(el[13])
                });

                $('#cont1MI').css('visibility','visible')

                $("#tracts1MI").html(censusBlocksFiltered.map(function(value) {

                  return('<p>' + value[52] + ' ' + value[53] + '</p>');
                }))

                $('#tracts1MI').css('visibility','visible')

                // Sum columns from filtered api data
                censusBlocksFiltered2.map((k) => {

                  totalHousing += parseInt(k[0])
                  totalSeasonal += parseInt(k[1]) // Append/fill census attributes by column index
                  totalOwnOccp += parseInt(k[2])
                  totalRntOccp += parseInt(k[3])
                  totalForRent += parseInt(k[4])
                  totalRntNotOcc += parseInt(k[5])
                  totalForSale += parseInt(k[6])
                  totalSoldNotOcc += parseInt(k[7])
                  totalSeaRecOcc += parseInt(k[8])
                  totalMigrant += parseInt(k[9])
                  totalOtherVac += parseInt(k[10])
                })

                $('#progress').append('<br/>mapping through filtered census blocks')

                censusBlocksFiltered.map((k) => { // Sum columns from filtered api data

                  // Income
                  totalLess10k += parseInt(k[2])
                  totalTen14 += parseInt(k[3])
                  totalFif19 += parseInt(k[4])
                  totalTwenty24 += parseInt(k[5])
                  totalTwentyFive29 += parseInt(k[6])
                  totalThirty34 += parseInt(k[7])
                  totalThirtyFive39 += parseInt(k[8])
                  totalFourty44 += parseInt(k[9])
                  totalFourtyFive49 += parseInt(k[10])
                  totalFifty59 += parseInt(k[11])
                  totalSixty74 += parseInt(k[12])
                  totalSeventyFive99 += parseInt(k[13])
                  totalHundred124 += parseInt(k[14])
                  totalHundredTwentyFive149 += parseInt(k[15])
                  totalHundredFifty199 += parseInt(k[16])
                  totalTwoHundredPlus += parseInt(k[17])

                  // Employment
                  totalCivilLabor += parseInt(k[18])
                  totalUnemp += parseInt(k[19])

                  // Education
                  totalEdu += parseInt(k[20])
                  totalNoSchool += parseInt(k[21])
                  totalNursery += parseInt(k[22])
                  totalKindergarten += parseInt(k[23])
                  totalG1 += parseInt(k[24])
                  totalG2 += parseInt(k[25])
                  totalG3 += parseInt(k[26])
                  totalG4 += parseInt(k[27])
                  totalG5 += parseInt(k[28])
                  totalG6 += parseInt(k[29])
                  totalG7 += parseInt(k[30])
                  totalG8 += parseInt(k[31])
                  totalG9 += parseInt(k[32])
                  totalG10 += parseInt(k[33])
                  totalG11 += parseInt(k[34])
                  totalG12 += parseInt(k[35])
                  totalHS += parseInt(k[36])
                  totalGED += parseInt(k[37])
                  totalSCLess1 += parseInt(k[38])
                  totalSCMore1 += parseInt(k[39])
                  totalAss += parseInt(k[40])
                  totalBac += parseInt(k[41])
                  totalMas += parseInt(k[42])
                  totalPro += parseInt(k[43])
                  totalDoc += parseInt(k[44])
                })

                $('#progress').append('<br/>mapping through filtered census tracts')
                censusTractsFiltered.map((k) => { // Search ACS by tract

                  // Income by education
                  totalIncLength++

                  // Replace negative values with 1
                  if (parseInt(k[18]) < 0) {

                    totalIncLessHS += 1
                  } else {

                    totalIncLessHS += parseInt(k[18])
                  }

                  if (parseInt(k[19]) < 0) {

                    totalIncHSG += 1
                  } else {

                    totalIncHSG += parseInt(k[19])
                  }

                  if (parseInt(k[20]) < 0) {

                    totalIncSCA += 1
                  } else {

                    totalIncSCA += parseInt(k[20])
                  }

                  if (parseInt(k[21]) < 0) {

                    totalIncBac += 1
                  } else {

                    totalIncBac += parseInt(k[21])
                  }

                  if (parseInt(k[22]) < 0) {

                    totalIncGrad += 1
                  } else {

                    totalIncGrad += parseInt(k[22])
                  }
                })

                resultLayer.addMany(features) // Add queried features to results layer

                $('#progress').append('<br/>added selected blockgroup features to new results layer')

                // Calculate and set state totals
                avgIncLessHS = totalIncLessHS / totalIncLength
                avgIncHSG = totalIncHSG / totalIncLength
                avgIncSCA = totalIncSCA / totalIncLength
                avgIncBac = totalIncBac / totalIncLength
                avgIncGrad = totalIncGrad / totalIncLength

                totalHSG = totalHS + totalGED
                totalSCA = totalSCLess1 + totalSCMore1 + totalAss
                totalGradPro = totalMas + totalPro + totalDoc
                totalLessHS = totalNoSchool + totalNursery + totalKindergarten + totalG1 + totalG2 + totalG3 + totalG4 + totalG5 + totalG6 + totalG7 + totalG8 + totalG9 + totalG10 + totalG11 + totalG12

                percUnemp = totalUnemp / totalCivilLabor

                var totalYearRound = totalHousing - totalSeasonal

                var totalOwned = totalOwnOccp + totalForSale + totalSoldNotOcc + totalSeaRecOcc + totalMigrant + totalOtherVac

                var totalRental = totalRntOccp + totalForRent + totalRntNotOcc

                totals.totalOwned1MI = totalOwned
                totals.totalRental1MI = totalRental

                totals.totalHousing1MI = totalHousing
                totals.totalYearRound1MI = totalYearRound
                totals.totalSeasonal1MI = totalSeasonal
                totals.percUnemp = parseFloat(percUnemp).toFixed(2)
                totals.lessHS = totalLessHS
                totals.hsg = totalHSG
                totals.sca = totalSCA
                totals.bac = totalBac
                totals.gradPro = totalGradPro
                totals.totalEdu = totalEdu
                totals.incLessHS = avgIncLessHS
                totals.incHSG = avgIncHSG
                totals.incSCA = avgIncSCA
                totals.incBac = avgIncBac
                totals.incGrad = avgIncGrad

                $('#progress').append('<br/>store totals filled by blockgroups/tracts')

                // Sum total household population
                var totalHousehold = totalLess10k + totalTen14 + totalFif19 + totalTwenty24 + totalTwentyFive29 + totalThirty34 + totalThirtyFive39 + totalFourty44 + totalFourtyFive49 + totalFifty59 + totalSixty74 + totalSeventyFive99 + totalHundred124 + totalHundredTwentyFive149 + totalHundredFifty199 + totalTwoHundredPlus
   
                // Create array to be passed to calc_Median function
                var totalsArr = [
                  totalHousehold,
                  totalLess10k,
                  totalTen14,
                  totalFif19,
                  totalTwenty24,
                  totalTwentyFive29,
                  totalThirty34,
                  totalThirtyFive39,
                  totalFourty44,
                  totalFourtyFive49,
                  totalFifty59,
                  totalSixty74,
                  totalSeventyFive99,
                  totalHundred124,
                  totalHundredTwentyFive149,
                  totalHundredFifty199,
                  totalTwoHundredPlus
                ]

                // Estimate Median Household Income using Pareto Interpolation, given frequency distribution of income bins
                // https://en.wikipedia.org/wiki/Pareto_interpolation
                function calc_Median(incomeData) {

                  // Obtain upper bounds for each income bin along with sample population total
                  var bucketTops = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 75000, 100000, 125000, 150000, 200000]
                  var total =  incomeData[0]

                  // Initialize variables to be conditionally filled
                  var lowerBucket = 0
                  var upperBucket = 0
                  var lowerBin = 0
                  var lowerSum = 0
                  var upperBin = 0
                  var upperSum = 0 
                  var lowerPerc = 0
                  var upperPerc = 0
                  var lowerIncome = 0
                  var upperIncome = 0

                  var sampleMedian = 0
                  var thetaHat = 0
                  var kHat = 0

                  // Start with second smallest income bin, skipping the first element (total population), and second element (smallest income bin)
                  for (var i = 2; i < 17; i++) {

                    var bin = incomeData.slice(1,i) // Subset array starting from smallest income bin to ith element
                    var binSum = bin.reduce((a,b) => {return a + b}) // Sum subset array
                    var halfTotal = total / 2.0
                    
                    // If the summed subset array is greater than half the sample population
                    if (binSum > halfTotal) {

                      lowerBucket = i - 2 // Set lower/upper bucket bounds
                      upperBucket = i - 1 

                      if (i == 16) { // Break loop if at final income bin

                        break
                      } else {

                        // Create further lower/upper bounds expressed as sample proportions (%)
                        lowerBin = incomeData.slice(1,lowerBucket+1)
                        lowerSum = lowerBin.reduce((a,b) => {return a + b})

                        upperBin = incomeData.slice(1,upperBucket+1)
                        upperSum = upperBin.reduce((a,b) => {return a + b})

                        lowerPerc = lowerSum / total 
                        upperPerc = upperSum / total

                        lowerIncome = bucketTops[lowerBucket - 1]
                        upperIncome = bucketTops[upperBucket - 1]

                        console.log('sums, percts, incomes filled')
                        $('#progress').append('<br/>sums, percentiles, incomes filled')
                        break
                      }
                    }

                    if (i == 16) { // return highest income bin if proportion condition unmet

                      console.log('i == 16')

                      return 200000
                    }
                  } // end loop

                  if (lowerPerc == 0.0) { // Use simple sample median calculation if lower bound proportion at zero, otherise interpolate

                    console.log('lowerperc is 0')

                    sampleMedian = lowerIncome + ((upperIncome - lowerIncome) / 2.0)
                  } else {

                    // Estimate theta (Pareto Index) ("distribution tail thinness") (Larger value indicates smaller proportion of incomes significantly larger than the lowest allowable income)
                    // Estimate k (Lowest allowable income in population)
                    thetaHat = (Math.log(1.0 - lowerPerc) - Math.log(1.0 - upperPerc)) / (Math.log(upperIncome) - Math.log(lowerIncome))
                    kHat = Math.pow( (upperPerc - lowerPerc) / ( (1/Math.pow(lowerIncome,thetaHat)) - (1/Math.pow(upperIncome,thetaHat)) ), (1/thetaHat) )
                    sampleMedian = (kHat * Math.pow(2,(1/thetaHat)))

                    console.log('stats calculated')
                    $('#progress').append('<br/>stats calculated')
                  }

                  var output = parseInt(sampleMedian.toFixed())

                  return output.toLocaleString() // Add thousands separator
                }

                totals.paretoMedian = calc_Median(totalsArr) // Pass sample median to state property

                townBoundaries.definitionExpression = "TOWN = " + "'" + town + "'" // Subset town boundary layer by town name

                townBoundaries.queryFeatures().then((i) => {

                  var query2 = tracts.createQuery() // Initialize tract query using town boundary geometry
                  query2.geometry = i.features[0].geometry
                  query2.spatialRelationship = 'contains'

                  console.log('begin querying tracts within Barnstable')

                  $('#progress').append('<br/>begin querying tracts within Barnstable')

                  tracts.queryFeatures(query2).then((i) => { // Query tracts within town boundary geometry

                    // Initialize tract array for remainder of town and all town
                    var tractsROT = [] 
                    var tractsTown = [] 

                    // Push tract ids to new array
                    i.features.map((j) => {

                      if (j.attributes.TRACT != "990000" & !tractIDUnique.includes(j.attributes.TRACT)) { // Omit GIZ tracts

                        tractsROT.push(j.attributes.TRACT)
                      }  

                      if (j.attributes.TRACT != "990000") { // Include all town tracts

                        tractsTown.push(j.attributes.TRACT)
                      }
                    })

                    $('#progress').append('<br/>iterate through remainder town tract features for IDs')

                    // Filter census tracts from state using ids from array
                    var censusTractsTownFiltered = censusTracts.filter(el => {

                      return tractsROT.includes(el[52])
                    });

                    // Filter census tracts from state using ids from array
                    var censusTractsTownFiltered2 = censusBlocks2.filter(el => {

                      return tractsROT.includes(el[13])
                    });

                    $('#progress').append('<br/>iterate through all town tract features for IDs')

                    // Filter tracts for entire town
                    var censusTractsAllTown = censusTracts.filter(el => {

                      return tractsTown.includes(el[52])
                    })

                    var censusTownsFiltered = censusTowns.filter((el) => {

                      return el[0] === town
                    })

                    // Housing
                    var townTotalHousing = 0
                    var townTotalSeasonal = 0

                    // Initialize rolling sums and avgs of income by education
                    var townTotalIncLessHS = 0
                    var townTotalIncHSG = 0
                    var townTotalIncSCA = 0
                    var townTotalIncBac = 0
                    var townTotalIncGrad = 0
                    var townTotalIncLength = 0
                    var townAvgIncLessHS = 0
                    var townAvgIncHSG = 0
                    var townAvgIncSCA = 0
                    var townAvgIncBac = 0
                    var townAvgIncGrad = 0

                    // Income by education for rest of town
                    var townTotalIncLessHSROT = 0
                    var townTotalIncHSGROT = 0
                    var townTotalIncSCAROT = 0
                    var townTotalIncBacROT = 0
                    var townTotalIncGradROT = 0
                    var townTotalIncLengthROT = 0
                    var townAvgIncLessHSROT = 0
                    var townAvgIncHSGROT = 0
                    var townAvgIncSCAROT = 0
                    var townAvgIncBacROT = 0
                    var townAvgIncGradROT = 0

                    // Household income
                    var townTotalLess10k = 0
                    var townTotalTen14 = 0
                    var townTotalFif19 = 0
                    var townTotalTwenty24 = 0
                    var townTotalTwentyFive29 = 0
                    var townTotalThirty34 = 0
                    var townTotalThirtyFive39 = 0
                    var townTotalFourty44 = 0
                    var townTotalFourtyFive49 = 0
                    var townTotalFifty59 = 0
                    var townTotalSixty74 = 0
                    var townTotalSeventyFive99 = 0
                    var townTotalHundred124 = 0
                    var townTotalHundredTwentyFive149 = 0
                    var townTotalHundredFifty199 = 0
                    var townTotalTwoHundredPlus = 0

                    // Employment
                    var townTotalCivil = 0
                    var townTotalUnemp = 0
                    var townPercUnemp = 0

                    // Education
                    var townTotalEdu = 0
                    var townTotalNoSchool = 0
                    var townTotalNursery = 0
                    var townTotalKindergarten = 0
                    var townTotalG1 = 0
                    var townTotalG2 = 0
                    var townTotalG3 = 0
                    var townTotalG4 = 0
                    var townTotalG5 = 0
                    var townTotalG6 = 0
                    var townTotalG7 = 0
                    var townTotalG8 = 0
                    var townTotalG9 = 0
                    var townTotalG10 = 0
                    var townTotalG11 = 0
                    var townTotalG12 = 0
                    var townTotalLessHS = 0  
                    var townTotalHS = 0
                    var townTotalGED = 0
                    var townTotalHSG = 0
                    var townTotalSCLess1 = 0
                    var townTotalSCMore1 = 0
                    var townTotalAss = 0
                    var townTotalSCA = 0
                    var townTotalBac = 0
                    var townTotalMas = 0
                    var townTotalPro = 0
                    var townTotalDoc = 0
                    var townTotalGradPro = 0

                    // Housing Occupancy
                    var townTotalOwnOccp = 0
                    var townTotalRntOccp = 0
                    var townTotalForRent = 0
                    var townTotalRntNotOcc = 0
                    var townTotalForSale = 0
                    var townTotalSoldNotOcc = 0
                    var townTotalSeaRecOcc = 0
                    var townTotalMigrant = 0
                    var townTotalOtherVac = 0

                    $('#progress').append('<br/>map all town')
                    censusTownsFiltered.map((k) => {

                      // Replace negative values with 1
                      if (parseInt(k[18]) < 0) {

                        townTotalIncLessHS += 1
                      } else {

                        townTotalIncLessHS += parseInt(k[18])
                      }

                      if (parseInt(k[19]) < 0) {

                        townTotalIncHSG += 1
                      } else {

                        townTotalIncHSG += parseInt(k[19])
                      }

                      if (parseInt(k[20]) < 0) {

                        townTotalIncSCA += 1
                      } else {

                        townTotalIncSCA += parseInt(k[20])
                      }

                      if (parseInt(k[21]) < 0) {

                        townTotalIncBac += 1
                      } else {

                        townTotalIncBac += parseInt(k[21])
                      }

                      if (parseInt(k[22]) < 0) {

                        townTotalIncGrad += 1
                      } else {

                        townTotalIncGrad += parseInt(k[22])
                      }

                      townTotalIncLength++
                    })

                    // Sum columns using filtered api data
                    censusTractsTownFiltered2.map((k) => {

                      townTotalHousing += parseInt(k[0])
                      townTotalSeasonal += parseInt(k[1])
                      townTotalOwnOccp += parseInt(k[2])
                      townTotalRntOccp += parseInt(k[3])
                      townTotalForRent += parseInt(k[4])
                      townTotalRntNotOcc += parseInt(k[5])
                      townTotalForSale += parseInt(k[6])
                      townTotalSoldNotOcc += parseInt(k[7])
                      townTotalSeaRecOcc += parseInt(k[8])
                      townTotalMigrant += parseInt(k[9])
                      townTotalOtherVac += parseInt(k[10])
                    })

                    $('#progress').append('<br/>map remainder')
                    censusTractsTownFiltered.map((k) => { // Iterate through census API by tract

                      // Income
                      townTotalLess10k += parseInt(k[2]) 
                      townTotalTen14 += parseInt(k[3])
                      townTotalFif19 += parseInt(k[4])
                      townTotalTwenty24 += parseInt(k[5])
                      townTotalTwentyFive29 += parseInt(k[6])
                      townTotalThirty34 += parseInt(k[7])
                      townTotalThirtyFive39 += parseInt(k[8])
                      townTotalFourty44 += parseInt(k[9])
                      townTotalFourtyFive49 += parseInt(k[10])
                      townTotalFifty59 += parseInt(k[11])
                      townTotalSixty74 += parseInt(k[12])
                      townTotalSeventyFive99 += parseInt(k[13])
                      townTotalHundred124 += parseInt(k[14])
                      townTotalHundredTwentyFive149 += parseInt(k[15])
                      townTotalHundredFifty199 += parseInt(k[16])
                      townTotalTwoHundredPlus += parseInt(k[17])

                      // Income by education
                      townTotalIncLengthROT++

                      // Employment
                      townTotalCivil += parseInt(k[23])
                      townTotalUnemp += parseInt(k[24])

                      // Education
                      townTotalEdu += parseInt(k[25])
                      townTotalNoSchool += parseInt(k[26])
                      townTotalNursery += parseInt(k[27])
                      townTotalKindergarten = parseInt(k[28])
                      townTotalG1 += parseInt(k[29])
                      townTotalG2 += parseInt(k[30])
                      townTotalG3 += parseInt(k[31])
                      townTotalG4 += parseInt(k[32])
                      townTotalG5 += parseInt(k[33])
                      townTotalG6 += parseInt(k[34])
                      townTotalG7 += parseInt(k[35])
                      townTotalG8 += parseInt(k[36])
                      townTotalG9 += parseInt(k[37])
                      townTotalG10 += parseInt(k[38])
                      townTotalG11 += parseInt(k[39])
                      townTotalG12 += parseInt(k[40])
                      townTotalHS += parseInt(k[41])
                      townTotalGED += parseInt(k[42])
                      townTotalSCLess1 += parseInt(k[43])
                      townTotalSCMore1 += parseInt(k[44])
                      townTotalAss += parseInt(k[45])
                      townTotalBac += parseInt(k[46])
                      townTotalMas += parseInt(k[47])
                      townTotalPro += parseInt(k[48])
                      townTotalDoc += parseInt(k[49])

                      // Replace negative values with 1
                      if (parseInt(k[18]) < 0) {

                        townTotalIncLessHSROT += 1
                      } else {

                        townTotalIncLessHSROT += parseInt(k[18])
                      }

                      if (parseInt(k[19]) < 0) {

                        townTotalIncHSGROT += 1
                      } else {

                        townTotalIncHSGROT += parseInt(k[19])
                      }

                      if (parseInt(k[20]) < 0) {

                        townTotalIncSCAROT += 1
                      } else {

                        townTotalIncSCAROT += parseInt(k[20])
                      }

                      if (parseInt(k[21]) < 0) {

                        townTotalIncBacROT += 1
                      } else {

                        townTotalIncBacROT += parseInt(k[21])
                      }

                      if (parseInt(k[22]) < 0) {

                        townTotalIncGradROT += 1
                      } else {

                        townTotalIncGradROT += parseInt(k[22])
                      }

                      $('#progress').append('<br/>row done')
                    })

                    $('#progress').append('<br/>Calculate average income by education level for entire town')
                    // Calculate average income by education level
                    townAvgIncLessHS = townTotalIncLessHS / townTotalIncLength
                    townAvgIncHSG =  townTotalIncHSG / townTotalIncLength
                    townAvgIncSCA = townTotalIncSCA / townTotalIncLength
                    townAvgIncBac = townTotalIncBac / townTotalIncLength
                    townAvgIncGrad = townTotalIncGrad / townTotalIncLength

                    $('#progress').append('<br/>Calculate average income by education level for rest of town outside GIZ')
                    townAvgIncLessHSROT = townTotalIncLessHSROT / townTotalIncLengthROT
                    townAvgIncHSGROT =  townTotalIncHSGROT / townTotalIncLengthROT
                    townAvgIncSCAROT = townTotalIncSCAROT / townTotalIncLengthROT
                    townAvgIncBacROT = townTotalIncBacROT / townTotalIncLengthROT
                    townAvgIncGradROT = townTotalIncGradROT / townTotalIncLengthROT


                    townPercUnemp = townTotalUnemp / townTotalCivil

                    townTotalHSG = townTotalHS + townTotalGED
                    townTotalSCA = townTotalSCLess1 + townTotalSCMore1 + townTotalAss
                    townTotalGradPro = townTotalMas + townTotalPro + townTotalDoc
                    townTotalLessHS = townTotalNoSchool + townTotalNursery + townTotalKindergarten + townTotalG1 + townTotalG2 + townTotalG3 + townTotalG4 + townTotalG5 + townTotalG6 + townTotalG7 + townTotalG8 + townTotalG9 + townTotalG10 + townTotalG11 + townTotalG12

                    var townTotalYearRound = townTotalHousing - townTotalSeasonal

                    var townTotalOwned = townTotalOwnOccp + townTotalForSale + townTotalSoldNotOcc + townTotalSeaRecOcc + townTotalMigrant + townTotalOtherVac

                    var townTotalRental = townTotalRntOccp + townTotalForRent + townTotalRntNotOcc

                    totals.totalOwnedROT = townTotalOwned
                    totals.totalRentalROT = townTotalRental

                    // totals.totalHousingROT = townTotalHousing

                    // if (x === 'GIZ') {
                    //   totals.totalHousingROT = 21626
                    // } else {
                    //   totals.totalHousingROT = 19923
                    // }
                    


                    totals.totalYearRoundROT = townTotalYearRound
                    totals.totalSeasonalROT = townTotalSeasonal

                    $('#progress').append('<br/>Set education totals as state properties')
                    // Set education totals as state properties
                    totals.townHSG = townTotalHSG
                    totals.townSCA = townTotalSCA
                    totals.townGradPro = townTotalGradPro
                    totals.townLessHS = townTotalLessHS
                    totals.townBac = townTotalBac

                    $('#progress').append('<br/>Set income totals as state properties')
                    // Set income totals as state properties
                    totals.townIncLessHS = townAvgIncLessHS
                    totals.townIncHSG = townAvgIncHSG
                    totals.townIncSCA = townAvgIncSCA
                    totals.townIncBac = townAvgIncBac
                    totals.townIncGrad = townAvgIncGrad
                    totals.townPercUnemp = townPercUnemp
                    totals.townEdu = townTotalEdu

                    $('#progress').append('<br/>Set income totals for remainder of town')
                    totals.townIncLessHSROT = townAvgIncLessHSROT
                    totals.townIncHSGROT = townAvgIncHSGROT
                    totals.townIncSCAROT = townAvgIncSCAROT
                    totals.townIncBacROT = townAvgIncBacROT
                    totals.townIncGradROT = townAvgIncGradROT

                    $('#progress').append('<br/>Sum income bins for sample population')
                    var townTotalHousehold = townTotalLess10k + townTotalTen14 + townTotalFif19 + townTotalTwenty24 + townTotalTwentyFive29 + townTotalThirty34 + townTotalThirtyFive39 + townTotalFourty44 + townTotalFourtyFive49 + townTotalFifty59 + townTotalSixty74 + townTotalSeventyFive99 + townTotalHundred124 + townTotalHundredTwentyFive149 + townTotalHundredFifty199 + townTotalTwoHundredPlus
     
                    $('#progress').append('<br/>Create town income array to be passed to calc_Median function')
                    // Create array to be passed to calc_Median function
                    var townTotalsArr = [
                      townTotalHousehold,
                      townTotalLess10k,
                      townTotalTen14,
                      townTotalFif19,
                      townTotalTwenty24,
                      townTotalTwentyFive29,
                      townTotalThirty34,
                      townTotalThirtyFive39,
                      townTotalFourty44,
                      townTotalFourtyFive49,
                      townTotalFifty59,
                      townTotalSixty74,
                      townTotalSeventyFive99,
                      townTotalHundred124,
                      townTotalHundredTwentyFive149,
                      townTotalHundredFifty199,
                      townTotalTwoHundredPlus
                    ]

                    $('#progress').append('<br/>Calculated median income for remainder of town using pareto interpolation')
                    totals.townParetoMedian = calc_Median(townTotalsArr)


                    // Create parcel query within selected AC or GIZ boundary
                    var query3 = parcelLayer.createQuery()
                    query3.geometry = buff
                    query3.spatialRelationship = 'contains'
                    query3.returnGeometry = true

                    // Household income
                    var totalHousingSelected = 0
                    var totalSeasonalSelected = 0
                    var totalLess10k = 0
                    var totalTen14 = 0
                    var totalFif19 = 0
                    var totalTwenty24 = 0
                    var totalTwentyFive29 = 0
                    var totalThirty34 = 0
                    var totalThirtyFive39 = 0
                    var totalFourty44 = 0
                    var totalFourtyFive49 = 0
                    var totalFifty59 = 0
                    var totalSixty74 = 0
                    var totalSeventyFive99 = 0
                    var totalHundred124 = 0
                    var totalHundredTwentyFive149 = 0
                    var totalHundredFifty199 = 0
                    var totalTwoHundredPlus = 0

                    // Unemployment
                    var totalCivilLabor = 0
                    var totalUnemp = 0
                    var percUnemp = 0

                    // Education
                    var totalEdu = 0
                    var totalNoSchool = 0
                    var totalNursery = 0
                    var totalKindergarten = 0
                    var totalG1 = 0
                    var totalG2 = 0
                    var totalG3 = 0
                    var totalG4 = 0
                    var totalG5 = 0
                    var totalG6 = 0
                    var totalG7 = 0
                    var totalG8 = 0
                    var totalG9 = 0
                    var totalG10 = 0
                    var totalG11 = 0
                    var totalG12 = 0
                    var totalLessHS = 0  
                    var totalHS = 0
                    var totalGED = 0
                    var totalHSG = 0
                    var totalSCLess1 = 0
                    var totalSCMore1 = 0
                    var totalAss = 0
                    var totalSCA = 0
                    var totalBac = 0
                    var totalMas = 0
                    var totalPro = 0
                    var totalDoc = 0
                    var totalGradPro = 0
                    var totalIncLessHS = 0
                    var totalIncHSG = 0
                    var totalIncSCA = 0
                    var totalIncBac = 0
                    var totalIncGrad = 0
                    var totalIncLength = 0
                    var avgIncLessHS = 0
                    var avgIncHSG = 0
                    var avgIncSCA = 0
                    var avgIncBac = 0
                    var avgIncGrad = 0

                    var totalResidentialSelected = 0

                    var totalHSG_BLDOUTSelected = 0
                    var avgUnitsPPSelected = 0

                    var totalParcelAcresSelected = 0
                    var avgUnitsPASelected = 0

                    // Housing Occupancy
                    var totalOwnOccpSelected = 0
                    var totalRntOccpSelected = 0
                    var totalForRentSelected = 0
                    var totalRntNotOccSelected = 0
                    var totalForSaleSelected = 0
                    var totalSoldNotOccSelected = 0
                    var totalSeaRecOccSelected = 0
                    var totalMigrantSelected = 0
                    var totalOtherVacSelected = 0

                    // Housing Types

                    // HSG_BLDOUT count
                    var totalAptSelectedHSG = 0
                    var totalMixedSelectedHSG = 0
                    var totalMultiOneSelectedHSG = 0
                    var totalOtherSelectedHSG = 0
                    var totalResCondoSelectedHSG = 0
                    var totalShrdTmpSelectedHSG = 0
                    var totalSingleFamSelectedHSG = 0

                    // Acres count
                    var totalAptSelectedAcres = 0
                    var totalMixedSelectedAcres = 0
                    var totalMultiOneSelectedAcres = 0
                    var totalOtherSelectedAcres = 0
                    var totalResCondoSelectedAcres = 0
                    var totalShrdTmpSelectedAcres = 0
                    var totalSingleFamSelectedAcres = 0

                    $('#progress').text('querying parcels within selection')

                    // Query by selection
                    parcelLayer.queryFeatures(query3).then((i) => {

                      var features2 = i.features.map((j) => {

                        if (j.attributes.LUSE1 === 'Residential') { // Sum residential parcels

                          switch(j.attributes.USE_CODE) { // Use switch to sum parcel counts by USE_CODE

                            // Apartments (4+ Units)
                            case '111':
                              totalAptSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalAptSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '112':
                              totalAptSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalAptSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1110':
                              totalAptSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalAptSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1120':
                              totalAptSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalAptSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            // Multi-Family / Mixed Use
                            case '105':
                              totalMixedSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalMixedSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '134':
                              totalMixedSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalMixedSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1040':
                              totalMixedSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalMixedSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1050':
                              totalMixedSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalMixedSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            // Multiple Houses on one parcel
                            case '109':
                              totalMultiOneSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalMultiOneSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            // Other
                            case '130':
                              totalOtherSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalOtherSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '131':
                              totalOtherSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalOtherSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1060':
                              totalOtherSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalOtherSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1300':
                              totalOtherSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalOtherSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1310':
                              totalOtherSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalOtherSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1320':
                              totalOtherSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalOtherSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            // Residential Condominium
                            case '1020':
                              totalResCondoSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalResCondoSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            // Shared or Temporary Housing
                            case '1210':
                              totalShrdTmpSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalShrdTmpSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1230':
                              totalShrdTmpSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalShrdTmpSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1250':
                              totalShrdTmpSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalShrdTmpSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1259':
                              totalShrdTmpSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalShrdTmpSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            // Single Family Residential
                            case '101':
                              totalSingleFamSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalSingleFamSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;

                            case '1010':
                              totalSingleFamSelectedHSG += parseInt(j.attributes.HSG_BLDOUT)
                              totalSingleFamSelectedAcres += parseInt(j.attributes.PARCEL_ACRES)
                              break;
                          }

                          totalHSG_BLDOUTSelected += parseInt(j.attributes.HSG_BLDOUT)
                          totalParcelAcresSelected += parseInt(j.attributes.PARCEL_ACRES)

                          totalResidentialSelected++
                        }

                        j.symbol = { // Set empty parcel symbology

                          type: 'simple-fill',
                          outline: { 
                            color: [0,0,0,0],
                            width: 0
                          },
                          style: 'none'
                        }

                        return j
                      })

                      // console.log('totalAptSelectedAcres',totalAptSelectedAcres)
                      // console.log('totalMixedSelectedAcres',totalMixedSelectedAcres)
                      // console.log('totalMultiOneSelectedAcres',totalMultiOneSelectedAcres)
                      // console.log('totalOtherSelectedAcres',totalOtherSelectedAcres)
                      // console.log('totalResCondoSelectedAcres',totalResCondoSelectedAcres)
                      // console.log('totalShrdTmpSelectedAcres',totalShrdTmpSelectedAcres)
                      // console.log('totalSingleFamSelectedAcres',totalSingleFamSelectedAcres)

                      avgUnitsPPSelected = totalHSG_BLDOUTSelected / totalResidentialSelected
                      avgUnitsPASelected = totalHSG_BLDOUTSelected / totalParcelAcresSelected

                      totals.avgUnitsPPSelected = avgUnitsPPSelected
                      totals.avgUnitsPASelected = avgUnitsPASelected

                      totals.totalResidentialSelected = totalResidentialSelected

                      totals.totalAptSelectedHSG = totalAptSelectedHSG
                      totals.totalMixedSelectedHSG = totalMixedSelectedHSG
                      totals.totalMultiOneSelectedHSG = totalMultiOneSelectedHSG
                      totals.totalOtherSelectedHSG = totalOtherSelectedHSG
                      totals.totalResCondoSelectedHSG = totalResCondoSelectedHSG
                      totals.totalShrdTmpSelectedHSG = totalShrdTmpSelectedHSG
                      totals.totalSingleFamSelectedHSG = totalSingleFamSelectedHSG

                      totals.totalAptSelectedAcres = totalAptSelectedAcres
                      totals.totalMixedSelectedAcres = totalMixedSelectedAcres
                      totals.totalMultiOneSelectedAcres = totalMultiOneSelectedAcres
                      totals.totalOtherSelectedAcres = totalOtherSelectedAcres
                      totals.totalResCondoSelectedAcres = totalResCondoSelectedAcres
                      totals.totalShrdTmpSelectedAcres = totalShrdTmpSelectedAcres
                      totals.totalSingleFamSelectedAcres = totalSingleFamSelectedAcres

                      resultLayer2.addMany(features2) // Push queried parcels to new graphics layer

                      $('#progress').append('<br/>parcel query done')
                    })
                    .then((j) => {

                      // Create block group layer query intersecting selection geometry
                      var query4 = blockGroups.createQuery()
                      query4.geometry = buff
                      query4.spatialRelationship = 'intersects'
                      query4.returnGeometry = true

                      blockGroups.queryFeatures(query4).then((i) => {

                        var blockIDArr = []
                        var tractIDArr = []

                        // Obtain totals from queried blockgroup attributes
                        // Create/fill new attribute using census data
                        // Create/fill block group polygon symbology
                        var features3 = i.features.map((j) => {  // Iterate through response features

                          if (j.attributes.TRACT != "990000") { // If census tract isn't cape cod water body

                            var popPrcl = 0 // Initialize population rolling sum by parcel field
                            var blockRow = censusBlocks.find((i) => { return i[53] === j.attributes.BLKGRP && i[52] === j.attributes.TRACT}) // Find blockgroup api row by tract/blockgroup id
                            var blockPop = parseInt(blockRow[1])

                            resultLayer2.graphics.items.map((k) => { // Look through parcels from queried results

                              if (geometryEngine.intersects(k.geometry, j.geometry)) { // If block group geometry intersects parcels

                                k.attributes.BLKGRP = j.attributes.BLKGRP // Assign block group to individual parcel

                                popPrcl += parseInt(k.attributes.POP_10) // Sum population field in block group layer using POP_10 from individual parcels
                              }
                            })

                            if ((popPrcl / blockPop) >= .5) { // If queried parcel population is greater than 50% of block group population

                              blockIDArr.push(j.attributes.TRACT + j.attributes.BLKGRP)
                              // tractIDArr.push(j.attributes.TRACT)

                              j.symbol = { // Set normal block group symbology

                                type: 'simple-fill',
                                outline: { 
                                  color: [66, 134, 244],
                                  width: 2
                                }
                              }
                            } else {

                              j.symbol = { // Set empty block group symbology

                                type: 'simple-fill',
                                outline: { 
                                  color: [0, 0, 0, 0],
                                  width: 0
                                },
                                style: 'none'
                              }
                            }

                          } else {

                            j.symbol = { // Set empty block group symbology

                              type: 'simple-fill',
                              outline: { 
                                color: [0, 0, 0, 0],
                                width: 0
                              },
                              style: 'none'
                            }
                          }       

                          return j 
                        }) // End of feature map


                        // Query tracts intersecting with selection geometry
                        tracts.queryFeatures(query6).then((i) => {

                          i.features.map((j) => {

                            if (j.attributes.TRACT != '990000') {

                              var popPrcl1 = 0
                              var tractRow = censusTracts.find((i) => { return i[52] === j.attributes.TRACT}) // Find tract api data by id
                              var tractPop = parseInt(tractRow[1])

                              resultLayer2.graphics.items.map((k) => { // Look through parcels from queried results

                                if (geometryEngine.intersects(k.geometry, j.geometry)) { // If block group geometry intersects parcels

                                  k.attributes.TRACT = j.attributes.TRACT // Assign block group to individual parcel

                                  popPrcl1 += parseInt(k.attributes.POP_10) // Sum population field in block group layer using POP_10 from individual parcels
                                }
                              })

                              
                              if ( (popPrcl1 / tractPop) >= .5) { // If parcel sum 50% or more of tract population, push tract id to new array

                                console.log(tractRow[52])
                                console.log(popPrcl1 / tractPop)

                                
                                tractIDArr.push(j.attributes.TRACT)
                              }
                            }
                          })

                          var tractIDUnique = tractIDArr.filter((item, pos) => { return tractIDArr.indexOf(item) == pos})

                          // Subset census API data by unique tract id's within GIZ
                          var censusTractsFiltered = censusTracts.filter(el => {

                            return tractIDUnique.includes(el[52])
                          });

                          

                          // Use tractblock key to subset API by block group
                          var censusBlocksFiltered = censusBlocks.filter(el => {

                            return blockIDArr.includes(el[52] + el[53]) && tractIDUnique.includes(el[52])
                          });

                          // Use tractblock key to subset API by block group
                          var censusBlocksFiltered2 = censusBlocks2.filter(el => {

                            return blockIDArr.includes(el[13] + el[14]) && tractIDUnique.includes(el[13])
                          });

                          $('#contSel').css('visibility','visible')

                          // Visualize blockgroup ids within selection
                          $("#tractSel").html(censusBlocksFiltered.map(function(value) {

                            return('<p>' + value[52] + ' ' + value[53] + '</p>');
                          }))

                          $('#tractSel').css('visibility','visible')

                          // Sum columns from filtered api data
                          censusBlocksFiltered2.map((k) => {

                            totalHousingSelected += parseInt(k[0])
                            totalSeasonalSelected += parseInt(k[1]) // Append/fill census attributes by column index
                            totalOwnOccpSelected += parseInt(k[2])
                            totalRntOccpSelected += parseInt(k[3])
                            totalForRentSelected += parseInt(k[4])
                            totalRntNotOccSelected += parseInt(k[5])
                            totalForSaleSelected += parseInt(k[6])
                            totalSoldNotOccSelected += parseInt(k[7])
                            totalSeaRecOccSelected += parseInt(k[8])
                            totalMigrantSelected += parseInt(k[9])
                            totalOtherVacSelected += parseInt(k[10])
                          })

                          $('#progress').append('<br/>mapping through filtered census blocks')
                          censusBlocksFiltered.map((k) => { // Search ACS rows by block group

                            // Income
                            totalLess10k += parseInt(k[2])
                            totalTen14 += parseInt(k[3])
                            totalFif19 += parseInt(k[4])
                            totalTwenty24 += parseInt(k[5])
                            totalTwentyFive29 += parseInt(k[6])
                            totalThirty34 += parseInt(k[7])
                            totalThirtyFive39 += parseInt(k[8])
                            totalFourty44 += parseInt(k[9])
                            totalFourtyFive49 += parseInt(k[10])
                            totalFifty59 += parseInt(k[11])
                            totalSixty74 += parseInt(k[12])
                            totalSeventyFive99 += parseInt(k[13])
                            totalHundred124 += parseInt(k[14])
                            totalHundredTwentyFive149 += parseInt(k[15])
                            totalHundredFifty199 += parseInt(k[16])
                            totalTwoHundredPlus += parseInt(k[17])

                            // Employment
                            totalCivilLabor += parseInt(k[18])
                            totalUnemp += parseInt(k[19])

                            // Education
                            totalEdu += parseInt(k[20])
                            totalNoSchool += parseInt(k[21])
                            totalNursery += parseInt(k[22])
                            totalKindergarten += parseInt(k[23])
                            totalG1 += parseInt(k[24])
                            totalG2 += parseInt(k[25])
                            totalG3 += parseInt(k[26])
                            totalG4 += parseInt(k[27])
                            totalG5 += parseInt(k[28])
                            totalG6 += parseInt(k[29])
                            totalG7 += parseInt(k[30])
                            totalG8 += parseInt(k[31])
                            totalG9 += parseInt(k[32])
                            totalG10 += parseInt(k[33])
                            totalG11 += parseInt(k[34])
                            totalG12 += parseInt(k[35])
                            totalHS += parseInt(k[36])
                            totalGED += parseInt(k[37])
                            totalSCLess1 += parseInt(k[38])
                            totalSCMore1 += parseInt(k[39])
                            totalAss += parseInt(k[40])
                            totalBac += parseInt(k[41])
                            totalMas += parseInt(k[42])
                            totalPro += parseInt(k[43])
                            totalDoc += parseInt(k[44])
                          })

                          $('#progress').append('<br/>mapping through filtered census tracts')
                          censusTractsFiltered.map((k) => { // Search ACS by tract

                            // Income by education
                            totalIncLength++

                            // Replace negative values with 1
                            if (parseInt(k[18]) < 0) {

                              totalIncLessHS += 1
                            } else {

                              totalIncLessHS += parseInt(k[18])
                            }

                            if (parseInt(k[19]) < 0) {

                              totalIncHSG += 1
                            } else {

                              totalIncHSG += parseInt(k[19])
                            }

                            if (parseInt(k[20]) < 0) {

                              totalIncSCA += 1
                            } else {

                              totalIncSCA += parseInt(k[20])
                            }

                            if (parseInt(k[21]) < 0) {

                              totalIncBac += 1
                            } else {

                              totalIncBac += parseInt(k[21])
                            }

                            if (parseInt(k[22]) < 0) {

                              totalIncGrad += 1
                            } else {

                              totalIncGrad += parseInt(k[22])
                            }
                          })

                          resultLayer3.addMany(features3) // Add queried features to results layer

                          // Average income categories
                          avgIncLessHS = totalIncLessHS / totalIncLength
                          avgIncHSG = totalIncHSG / totalIncLength
                          avgIncSCA = totalIncSCA / totalIncLength
                          avgIncBac = totalIncBac / totalIncLength
                          avgIncGrad = totalIncGrad / totalIncLength

                          totalHSG = totalHS + totalGED
                          totalSCA = totalSCLess1 + totalSCMore1 + totalAss
                          totalGradPro = totalMas + totalPro + totalDoc
                          totalLessHS = totalNoSchool + totalNursery + totalKindergarten + totalG1 + totalG2 + totalG3 + totalG4 + totalG5 + totalG6 + totalG7 + totalG8 + totalG9 + totalG10 + totalG11 + totalG12

                          percUnemp = totalUnemp / totalCivilLabor

                          var totalYearRoundSelected = totalHousingSelected - totalSeasonalSelected

                          var totalOwnedSelected = totalOwnOccpSelected + totalForSaleSelected + totalSoldNotOccSelected + totalSeaRecOccSelected + totalMigrantSelected + totalOtherVacSelected

                          var totalRentalSelected = totalRntOccpSelected + totalForRentSelected + totalRntNotOccSelected

                          totals.totalOwnedSelected = totalOwnedSelected
                          totals.totalRentalSelected = totalRentalSelected

                          totals.totalHousingSelected = totalHousingSelected
                          totals.totalYearRoundSelected = totalYearRoundSelected
                          totals.totalSeasonalSelected = totalSeasonalSelected

                          totals.percUnempCont = parseFloat(percUnemp).toFixed(2)
                          totals.lessHSCont = totalLessHS
                          totals.hsgCont = totalHSG
                          totals.scaCont = totalSCA
                          totals.bacCont = totalBac
                          totals.gradProCont = totalGradPro
                          totals.totalEduCont = totalEdu
                          totals.incLessHSCont = avgIncLessHS
                          totals.incHSGCont = avgIncHSG
                          totals.incSCACont = avgIncSCA
                          totals.incBacCont = avgIncBac
                          totals.incGradCont = avgIncGrad

                          $('#progress').append('<br/>store totals filled by blockgroups/tracts')

                          // Sum total household population
                          var totalHousehold = totalLess10k + totalTen14 + totalFif19 + totalTwenty24 + totalTwentyFive29 + totalThirty34 + totalThirtyFive39 + totalFourty44 + totalFourtyFive49 + totalFifty59 + totalSixty74 + totalSeventyFive99 + totalHundred124 + totalHundredTwentyFive149 + totalHundredFifty199 + totalTwoHundredPlus
             
                          // Create array to be passed to calc_Median function
                          var totalsArr = [
                            totalHousehold,
                            totalLess10k,
                            totalTen14,
                            totalFif19,
                            totalTwenty24,
                            totalTwentyFive29,
                            totalThirty34,
                            totalThirtyFive39,
                            totalFourty44,
                            totalFourtyFive49,
                            totalFifty59,
                            totalSixty74,
                            totalSeventyFive99,
                            totalHundred124,
                            totalHundredTwentyFive149,
                            totalHundredFifty199,
                            totalTwoHundredPlus
                          ]

                          totals.paretoMedianCont = calc_Median(totalsArr) // Pass sample median to state property

                          // Query town boundary geometry
                          townBoundaries.queryFeatures().then((i) => {

                            var twnBound = i.features[0].geometry

                            var query7 = blockGroups.createQuery() // Initialize block group query using town boundary geometry
                                query7.geometry = twnBound
                                query7.spatialRelationship = 'contains'

                            var tractsROT = []

                            // Query block group layer using town boundary
                            blockGroups.queryFeatures(query7).then((i) => {

                              i.features.map((j) => {

                                if (j.attributes.TRACT != "990000" & !blockIDArr1MI.includes(j.attributes.TRACT + j.attributes.BLKGRP)) { // Omit GIZ tracts

                                  tractsROT.push(j.attributes.TRACT + ' ' + j.attributes.BLKGRP)
                                }
                              })

                              $('#contROT').css('visibility','visible')

                              // Visualize tracts outside of 1MI buffer
                              $("#tractsROT").html(tractsROT.map(function(value) {

                                return('<p>' + value + '</p>');
                              }))

                              $('#tractsROT').css('visibility','visible')

                              console.log('town tract income averages saved to state')
                              $('#progress').append('<br/>town tract income averages saved to state')

                              totals.Toggle = true // Show results pane
                              document.getElementById('loading').style.display = false ? 'block' : 'none';

                              // var query8 = parcelLayer.createQuery()
                              // query8.geometry = twnBound
                              // query8.spatialRelationship = 'contains'
                              // query8.returnGeometry = true

                              // var totalResidentialROT = 0

                              // parcelLayer.queryFeatures(query8).then((i) => {

                              //   i.features.map((j) => {

                              //     totalResidentialROT++
                              //   })

                              //   console.log(totalResidentialROT)

                              // //   totals.totalResidentialROT = totalResidentialROT
                              // })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
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

        acBoundaries.definitionExpression = "ac_name = " + "'" + x + "'" // set definition expression on parcel layer

        queryEmblks()
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
    }
  )
}