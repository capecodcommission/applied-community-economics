export const createMap = function (loader, totals, censusData) {

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
      Home
    ) => {
    

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

      var parcelLayer = new FeatureLayer({
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/1",
        outFields: ['*'],
        visible: false,
        popupTemplate: {
          title: '{SITE_ADDRESS}',
          content: '{*}'
        }
      })

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

      var resultLayer = new GraphicsLayer() // Initialize blank layer to fill with queried block group symbology
      var resultLayer1 = new GraphicsLayer()

      var map = new Map({basemap: 'dark-gray', layers: [embayments, blockGroups, parcelLayer, resultLayer, resultLayer1]});

      // var custom = new TileLayer({
      //   url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
      // })

      // map.add(custom)

      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 12,
        center: [-70.303634, 41.701660]
      });

      var legend = new Legend({
        view: view,
        layerInfos: [{
          layer: embayments,
          title: "Legend"
        }]
      });

      view.ui.add(legend, "bottom-left");

      var homeBtn = new Home({
        view: view
      });

      view.ui.add(homeBtn, "top-left");

      function createGraphic(polygon) {
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

        var vertices = evt.vertices
        var polygon = createPolygon(vertices); // Create polygon 

        var buff = geometryEngine.buffer(polygon.extent,[1],'miles',true) // Create 1mi buffer

        var query = blockGroups.createQuery()
        query.geometry = buff
        query.spatialRelationship = 'contains' 

        var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
        query1.geometry = polygon.extent
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

                console.log(j.attributes.popPrcl / j.attributes.population)

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


      // Use embayment feature layer extent w/ 1mi buffer to query for block groups
      // Match group and tract codes to append population column from census API data
      // Assign attributes data from state with totals from queried layers
      // Display results
      function queryEmblks() {

        embayments.queryExtent().then((h) => {

          var buff = geometryEngine.buffer(h.extent,[1],'miles',true) // Create geometry buffer w/ 1mi radius from defined embayment layer extent

          var query = blockGroups.createQuery() // Initialize block group query using buffered extent
          query.geometry = buff
          query.spatialRelationship = 'contains'

          var query1 = parcelLayer.createQuery() // Initialize parcel query using unbuffered extent
          query1.geometry = h.extent
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

            blockGroups.queryFeatures(query).then((i) => { // Query for block groups intersecting the buffered extent

              // Obtain totals from queried blockgroup attributes
              // Create/fill new attribute using census data
              // Create/fill block group polygon symbology
              features = i.features.map((j) => {  // Iterate through response features

                if (j.attributes.TRACT != "990000") { // If census tract isn't cape cod water body

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

                  console.log(j.attributes.popPrcl / j.attributes.population)

                  if ((j.attributes.popPrcl / j.attributes.population) >= .5) { // If queried parcel population is greater than 50% of block group population

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

              resultLayer.addMany(features) // Add queried features to results layer

              totals.Land = (totalLand / 43560).toFixed(2) // Update state values using queried totals
              totals.Water = (totalWater / 43560).toFixed(2)
              totals.Population = totalPop.toFixed(0)
              totals.Toggle = true // Show results pane
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

        resultLayer.removeAll();
        resultLayer1.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        embayments.definitionExpression = "Neighborhood = " + "'" + x + "'"

        queryEmblks()
      })

      $('#acSelect').on('change', function() {

        resultLayer.removeAll();
        resultLayer1.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        embayments.definitionExpression = "AC_FINAL = " + "'" + x + "'"

        queryEmblks()
      })

      $('#townSelect').on('change', function() {

        resultLayer.removeAll();
        resultLayer1.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        embayments.definitionExpression = "Town = " + "'" + x + "'"

        queryEmblks()
      })
    }
  )
}