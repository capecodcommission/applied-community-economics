export const createMap = function (loader, totals, censusBlocks, censusTracts) {

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
        definitionExpression: "STATE = 25 and COUNTY = 001",
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
        definitionExpression: "STATE = 25 and COUNTY = 001",
        outFields: ['*'],
        popupTemplate: {
          title: '{NAME}',
          content: '{*}'
        },
        visible: false
      })

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
        visible: true,
        popupTemplate: {
          content: '{*}'
        },
        definitionExpression: "TOWN = 'BARNSTABLE'" // Filter to Barnstable for now
      })

      var resultLayer = new GraphicsLayer() // Initialize blank layer to fill with queried block group symbology
      var resultLayer1 = new GraphicsLayer()

      // create basemap with layers prepared but hidden
      var map = new Map({basemap: 'dark-gray', layers: [embayments, blockGroups, parcelLayer, resultLayer, resultLayer1, townBoundaries]});

      // var custom = new TileLayer({
      //   url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
      // })

      // map.add(custom)

      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 12,
        center: [-70.303634, 41.701660] // Center map over Barnstable
      });

      // var legend = new Legend({
      //   view: view,
      //   layerInfos: [{
      //     layer: embayments,
      //     title: "Legend"
      //   }]
      // });

      // view.ui.add(legend, "bottom-left");

      var homeBtn = new Home({ // Home button resets zoom/center
        view: view
      });

      view.ui.add(homeBtn, "top-left");

      function createGraphic(polygon) { //
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

      function createPolygon(vertices) {

        return new Polygon({

          rings: vertices,
          spatialReference: view.spatialReference
        });
      }

      function drawPolygon(evt) {

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

        var buff = geometryEngine.buffer(polygon,[1],'miles',true) // Create 1mi buffer

        var query = blockGroups.createQuery()
        query.geometry = buff
        query.spatialRelationship = 'contains' 

        var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
        query1.geometry = polygon
        query1.spatialRelationship = 'contains'

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

                // console.log(j.attributes.population)

                // console.log(j.attributes.popPrcl)

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
      function queryEmblks() {

        document.getElementById('loading').style.display = true ? 'block' : 'none';

        parcelLayer.queryExtent().then((h) => { // Obtain GIZ extent

          console.log('queried parcel layer extent')

          var buff = geometryEngine.buffer(h.extent,[1],'miles',true) // Create geometry buffer w/ 1mi radius from defined embayment layer extent

          parcelLayer.definitionExpression = ""

          var query = blockGroups.createQuery() // Initialize block group query using buffered extent
          query.geometry = buff
          query.spatialRelationship = 'contains'

          var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
          query1.geometry = buff
          query1.spatialRelationship = 'contains'

          // Initialize running totals
          var features = ''
          var features1 = ''
          var totalLand = 0
          var totalWater = 0

          // Household income
          var totalPop = 0
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

          parcelLayer.queryFeatures(query1).then((i) => { // Query parcels using extent of defined embayment layer

            features1 = i.features.map((j) => {

              j.symbol = { // Set empty block group symbology

                type: 'simple-fill',
                outline: { 
                  color: [0, 0, 0, 0],
                  width: 0
                },
                style: 'none'
              }

              return j
            })

            resultLayer1.addMany(features1) // Push queried parcels to new graphics layer
            console.log('queried parcels added to new layer')
          })
          .then((j) => {

            blockGroups.queryFeatures(query).then((i) => { // Query for block groups intersecting the buffered extent

              console.log('querying blockgroup feature layer')

              // Obtain totals from queried blockgroup attributes
              // Create/fill new attribute using census data
              // Create/fill block group polygon symbology
              features = i.features.map((j) => {  // Iterate through response features

                if (j.attributes.TRACT != "990000") { // If census tract isn't cape cod water body

                  var popPrcl = 0 // Initialize population by parcel field

                  resultLayer1.graphics.items.map((k) => { // Look through parcels from queried results

                    if (geometryEngine.intersects(k.geometry, j.geometry)) { // If block group geometry intersects parcels

                      k.attributes.BLKGRP = j.attributes.BLKGRP // Assign block group to individual parcel

                      popPrcl += parseInt(k.attributes.POP_10) // Sum population field in block group layer using POP_10 from individual parcels
                    }
                  })

                  j.attributes.popPrcl = popPrcl // Set summed population as block group attribute

                  totalLand += j.attributes.AREALAND // Obtain totals
                  totalWater += j.attributes.AREAWATER

                  censusBlocks.map((k) => { // Search ACS rows by block group

                    if (k[52] == j.attributes.TRACT && k[53] == j.attributes.BLKGRP) { // If key-match

                      j.attributes.population = parseInt(k[1]) // Append/fill census attributes by column index

                      // Income
                      j.attributes.less10k = parseInt(k[2])
                      j.attributes.ten14 = parseInt(k[3])
                      j.attributes.fifteen19 = parseInt(k[4])
                      j.attributes.twenty24 = parseInt(k[5])
                      j.attributes.twentyFive29 = parseInt(k[6])
                      j.attributes.thirty34 = parseInt(k[7])
                      j.attributes.thirtyFive39 = parseInt(k[8])
                      j.attributes.fourty44 = parseInt(k[9])
                      j.attributes.fourtyFive49 = parseInt(k[10])
                      j.attributes.fifty59 = parseInt(k[11])
                      j.attributes.sixty74 = parseInt(k[12])
                      j.attributes.seventyFive99 = parseInt(k[13])
                      j.attributes.hundred124 = parseInt(k[14])
                      j.attributes.hundredTwentyFive149 = parseInt(k[15])
                      j.attributes.hundredFifty199 = parseInt(k[16])
                      j.attributes.twoHundredPlus = parseInt(k[17])

                      // Employment
                      j.attributes.civil = parseInt(k[18])
                      j.attributes.unemp = parseInt(k[19])

                      // Education
                      j.attributes.edu = parseInt(k[20])
                      j.attributes.noSchool = parseInt(k[21])
                      j.attributes.nursery = parseInt(k[22])
                      j.attributes.kindergarten = parseInt(k[23])
                      j.attributes.g1 = parseInt(k[24])
                      j.attributes.g2 = parseInt(k[25])
                      j.attributes.g3 = parseInt(k[26])
                      j.attributes.g4 = parseInt(k[27])
                      j.attributes.g5 = parseInt(k[28])
                      j.attributes.g6 = parseInt(k[29])
                      j.attributes.g7 = parseInt(k[30])
                      j.attributes.g8 = parseInt(k[31])
                      j.attributes.g9 = parseInt(k[32])
                      j.attributes.g10 = parseInt(k[33])
                      j.attributes.g11 = parseInt(k[34])
                      j.attributes.g12 = parseInt(k[35])
                      j.attributes.hs = parseInt(k[36])
                      j.attributes.ged = parseInt(k[37])
                      j.attributes.scLess1 = parseInt(k[38])
                      j.attributes.scMore1 = parseInt(k[39])
                      j.attributes.ass = parseInt(k[40])
                      j.attributes.bac = parseInt(k[41])
                      j.attributes.mas = parseInt(k[42])
                      j.attributes.pro = parseInt(k[43])
                      j.attributes.doc = parseInt(k[44])
                    }
                  })

                  censusTracts.map((k) => { // Search ACS by tract

                    if (k[8] === j.attributes.TRACT) { // If match, append/fill census data as block group attributes

                      // Income by education
                      j.attributes.incLessHS = parseInt(k[1])
                      j.attributes.incHSG = parseInt(k[2])
                      j.attributes.incSCA = parseInt(k[3])
                      j.attributes.incBac = parseInt(k[4])
                      j.attributes.incGrad = parseInt(k[5])

                      // Replace negative values with 1
                      if (j.attributes.incLessHS < 0) {

                        j.attributes.incLessHS = 1
                      }

                      if (j.attributes.incHSG < 0) {

                        j.attributes.incHSG = 1
                      }

                      if (j.attributes.incSCA < 0) {

                        j.attributes.incSCA = 1
                      }

                      if (j.attributes.incBac < 0) {

                        j.attributes.incBac = 1
                      }

                      if (j.attributes.incGrad < 0) {

                        j.attributes.incGrad = 1
                      }
                    }
                  })

                  totalPop += j.attributes.population
                  

                  if ((j.attributes.popPrcl / j.attributes.population) >= .5) { // If queried parcel population is greater than 50% of block group population

                    // Sum income, employment, and education attributes across block groups
                    totalLess10k += j.attributes.less10k 
                    totalTen14 += j.attributes.ten14
                    totalFif19 += j.attributes.fifteen19
                    totalTwenty24 += j.attributes.twenty24
                    totalTwentyFive29 += j.attributes.twentyFive29
                    totalThirty34 += j.attributes.thirty34
                    totalThirtyFive39 += j.attributes.thirtyFive39
                    totalFourty44 += j.attributes.fourty44
                    totalFourtyFive49 += j.attributes.fourtyFive49
                    totalFifty59 += j.attributes.fifty59
                    totalSixty74 += j.attributes.sixty74
                    totalSeventyFive99 += j.attributes.seventyFive99
                    totalHundred124 += j.attributes.hundred124
                    totalHundredTwentyFive149 += j.attributes.hundredTwentyFive149
                    totalHundredFifty199 += j.attributes.hundredFifty199
                    totalTwoHundredPlus += j.attributes.twoHundredPlus

                    totalCivilLabor += j.attributes.civil
                    totalUnemp += j.attributes.unemp

                    totalEdu += j.attributes.edu
                    totalNoSchool += j.attributes.noSchool
                    totalNursery += j.attributes.nursery
                    totalKindergarten += j.attributes.kindergarten
                    totalG1 += j.attributes.g1
                    totalG2 += j.attributes.g2
                    totalG3 += j.attributes.g3
                    totalG4 += j.attributes.g4
                    totalG5 += j.attributes.g5
                    totalG6 += j.attributes.g6
                    totalG7 += j.attributes.g7
                    totalG8 += j.attributes.g8
                    totalG9 += j.attributes.g9
                    totalG10 += j.attributes.g10
                    totalG11 += j.attributes.g11
                    totalG12 += j.attributes.g12
                    totalHS += j.attributes.hs
                    totalGED += j.attributes.ged
                    totalSCLess1 += j.attributes.scLess1
                    totalSCMore1 += j.attributes.scMore1
                    totalAss += j.attributes.ass
                    totalBac += j.attributes.bac
                    totalMas += j.attributes.mas
                    totalPro += j.attributes.pro
                    totalDoc += j.attributes.doc

                    totalIncLessHS += j.attributes.incLessHS
                    totalIncHSG += j.attributes.incHSG
                    totalIncSCA += j.attributes.incSCA
                    totalIncBac += j.attributes.incBac
                    totalIncGrad += j.attributes.incGrad
                    totalIncLength += 1


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

              resultLayer.addMany(features) // Add queried features to results layer

              console.log('added selected blockgroup features to new results layer')

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

              totals.Land = parseFloat(totalLand / 43560).toFixed(2) // Update state values using queried totals
              totals.Water = parseFloat(totalWater / 43560).toFixed(2)
              totals.less10k = parseInt(totalLess10k)
              totals.ten14 = parseInt(totalTen14)
              totals.fifteen19 = parseInt(totalFif19)
              totals.twenty24 = parseInt(totalTwenty24)
              totals.twentyFive29 = parseInt(totalTwentyFive29)
              totals.thirty34 = parseInt(totalThirty34)
              totals.thirtyFive39 = parseInt(totalThirtyFive39)
              totals.fourty44 = parseInt(totalFourty44)
              totals.fourtyFive49 = parseInt(totalFourtyFive49)
              totals.fifty59 = parseInt(totalFifty59)
              totals.sixty74 = parseInt(totalSixty74)
              totals.seventyFive99 = parseInt(totalSeventyFive99)
              totals.hundred124 = parseInt(totalHundred124)
              totals.hundredTwentyFive149 = parseInt(totalHundredTwentyFive149)
              totals.hundredFifty199 = parseInt(totalHundredFifty199)
              totals.twoHundredPlus = parseInt(totalTwoHundredPlus)
              totals.percUnemp = parseFloat(percUnemp).toFixed(2)
              totals.lessHS = parseInt(totalLessHS)
              totals.hsg = parseInt(totalHSG)
              totals.sca = parseInt(totalSCA)
              totals.bac = parseInt(totalBac)
              totals.gradPro = parseInt(totalGradPro)
              totals.totalEdu = parseInt(totalEdu)
              totals.incLessHS = parseInt(avgIncLessHS)
              totals.incHSG = parseInt(avgIncHSG)
              totals.incSCA = parseInt(avgIncSCA)
              totals.incBac = parseInt(avgIncBac)
              totals.incGrad = parseInt(avgIncGrad)

              console.log('state (store) totals filled by blockgroups')

              // Sum total household population
              var totalHousehold = totals.less10k + totals.ten14 + totals.fifteen19 + totals.twenty24 + totals.twentyFive29 + totals.thirty34 + totals.thirtyFive39 + totals.fourty44 + totals.fourtyFive49 + totals.fifty59 + totals.sixty74 + totals.seventyFive99 + totals.hundred124 + totals.hundredTwentyFive149 + totals.hundredFifty199 + totals.twoHundredPlus
 
              // Create array to be passed to calc_Median function
              var totalsArr = [
                totalHousehold,
                totals.less10k,
                totals.ten14,
                totals.fifteen19,
                totals.twenty24,
                totals.twentyFive29,
                totals.thirty34,
                totals.thirtyFive39,
                totals.fourty44,
                totals.fourtyFive49,
                totals.fifty59,
                totals.sixty74,
                totals.seventyFive99,
                totals.hundred124,
                totals.hundredTwentyFive149,
                totals.hundredFifty199,
                totals.twoHundredPlus
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

                      console.log('sums, percs, incomes filled')
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
                  sampleMedian = kHat * Math.pow(2,(1/thetaHat))

                  console.log('median calculated')
                }

                return sampleMedian.toLocaleString() // Add thousands separator
              }

              totals.paretoMedian = calc_Median(totalsArr) // Pass sample median to state property

              var query2 = tracts.createQuery() // Initialize block group query using town boundary geometry
              query2.geometry = townBoundaries
              query2.spatialRelationship = 'contains'

              console.log('begin querying tracts within Barnstable')

              tracts.queryFeatures(query2).then((i) => { // Query tracts within town boundary geometry

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

                i.features.map((j) => { // Iterate through tract features

                  if (j.attributes.TRACT != '990000') {

                    censusTracts.map((k) => { // Iterate through census API by tract

                      if (k[8] === j.attributes.TRACT) { // If tract match

                        // Income by education
                        j.attributes.incLessHS = parseInt(k[1])
                        j.attributes.incHSG = parseInt(k[2])
                        j.attributes.incSCA = parseInt(k[3])
                        j.attributes.incBac = parseInt(k[4])
                        j.attributes.incGrad = parseInt(k[5])

                        // Replace negative values with 1
                        if (j.attributes.incLessHS < 0) {

                          j.attributes.incLessHS = 1
                        }

                        if (j.attributes.incHSG < 0) {

                          j.attributes.incHSG = 1
                        }

                        if (j.attributes.incSCA < 0) {

                          j.attributes.incSCA = 1
                        }

                        if (j.attributes.incBac < 0) {

                          j.attributes.incBac = 1
                        }

                        if (j.attributes.incGrad < 0) {

                          j.attributes.incGrad = 1
                        }
                      }
                    })

                    // Sum income by education across tracts
                    townTotalIncLessHS += j.attributes.incLessHS
                    townTotalIncHSG += j.attributes.incHSG
                    townTotalIncSCA += j.attributes.incSCA
                    townTotalIncBac += j.attributes.incBac
                    townTotalIncGrad += j.attributes.incGrad
                    townTotalIncLength += 1
                  }
                })

                console.log('town tracts attributed with census data')

                // Calculate average income by education level
                townAvgIncLessHS = townTotalIncLessHS / townTotalIncLength
                townAvgIncHSG =  townTotalIncHSG / townTotalIncLength
                townAvgIncSCA = townTotalIncSCA / townTotalIncLength
                townAvgIncBac = townTotalIncBac / townTotalIncLength
                townAvgIncGrad = townTotalIncGrad / townTotalIncLength

                // Set totals as state properties
                totals.townIncLessHS = parseInt(townAvgIncLessHS)
                totals.townIncHSG = parseInt(townAvgIncHSG)
                totals.townIncSCA = parseInt(townAvgIncSCA)
                totals.townIncBac = parseInt(townAvgIncBac)
                totals.townIncGrad = parseInt(townAvgIncGrad)

                console.log('town tract income averages saved to state')

                totals.Toggle = true // Show results pane
                document.getElementById('loading').style.display = false ? 'block' : 'none';
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
        view.graphics.removeAll();

        var x = $(this).val().toString()

        parcelLayer.definitionExpression = "AC_NAME = " + "'" + x + "'" // set definition expression on parcel layer

        queryEmblks()
      })

      $('#townSelect').on('change', function() {

        resultLayer.removeAll(); // Reset graphics layers 
        resultLayer1.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        parcelLayer.definitionExpression = "CITY = " + "'" + x + "'" // set definition expression on parcel layer

        queryEmblks()
      })
    }
  )
}