import { store } from '../vuex/store'
import { updateAttrib } from '../vuex/actions'
export const createMap = function (loader,attributes) {
  const esriLoader = loader
  esriLoader.dojoRequire(
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
      GraphicsLayer
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
        // definitionExpression: "Neighborhood = " + "'" + x + "'",
        outFields: ['*'],
        renderer: renderer,
        popupTemplate: {
          title: '{ClosestRoad_name}',
          content: '{*}'
        },
        visible: false
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

      var resultLayer = new GraphicsLayer()

      var map = new Map({basemap: 'dark-gray', layers: [embayments, blockGroups, resultLayer]});

      // var custom = new TileLayer({
      //   url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
      // })

      // map.add(custom)

      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 12,
        center: [-70.303634, 41.701660]
        // camera:{ 
        //   position: [-70.303634, 41.701660],
        //   heading: 0,
        //   tilt: 60
        //  }            
      });

      var legend = new Legend({
        view: view,
        layerInfos: [{
          layer: embayments,
          title: "Legend"
        }]
      });

      view.ui.add(legend, "bottom-left");

      function createGraphic(polygon) {
        var graphic = new Graphic({
          geometry: polygon,
          symbol: {
            type: "simple-fill", // autocasts as SimpleFillSymbol
            color: [178, 102, 234, 0.8],
            style: "solid",
            outline: { // autocasts as SimpleLineSymbol
              color: [255, 255, 255],
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
        view.graphics.removeAll();

        // create a new polygon
        var polygon = createPolygon(vertices);

        // create a new graphic representing the polygon, add it to the view
        var graphic = createGraphic(polygon);
        view.graphics.add(graphic);
      }

      function queryBlockGroup(evt) {

        var vertices = evt.vertices
        var polygon = createPolygon(vertices);

        var buff = geometryEngine.buffer(polygon,[1],'miles',true)

        var query = blockGroups.createQuery()
        query.geometry = buff
        query.spatialRelationship = 'intersects'

        var totalLand = 0
        var totalWater = 0

        var features = ''

        blockGroups.queryFeatures(query).then(function(response) {

          for (var i = response.features.length - 1; i >= 0; i--) {
            totalLand += response.features[i].attributes.AREALAND
            totalWater += response.features[i].attributes.AREAWATER
          }

          features = response.features.map(function(graphic) {

            graphic.symbol = {

              type: 'simple-fill',
              outline: { 
                color: [255, 255, 255],
                width: 2
              }
            }

            return graphic
          })

          resultLayer.addMany(features)

          attributes.Land = (totalLand / 43560).toFixed(2)
          attributes.Water = (totalWater / 43560).toFixed(2)
          attributes.Toggle = true
        })
      }

      function enableCreatePolygon(draw, view) {
        // create() will return a reference to an instance of PolygonDrawAction
        var action = draw.create("polygon");

        attributes.Toggle = false
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
      
      $('#Draw').on('click', function() {

        var draw = new Draw({
          view: view
        });

        enableCreatePolygon(draw, view);
      })

      $('#neighborhoodSelect').on('change', function() {

        resultLayer.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        embayments.definitionExpression = "Neighborhood = " + "'" + x + "'"

        view.whenLayerView(embayments).then((layerview) => {

          embayments.visible = true

          layerview.watch('updating', (val) => {

            if (!val) {

              layerview.queryExtent().then((response) => {

                view.goTo(response.extent.expand(1.5))
              })
            }
          })
        })
      })

      $('#acSelect').on('change', function() {

        resultLayer.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        embayments.definitionExpression = "AC_FINAL = " + "'" + x + "'"

        view.whenLayerView(embayments).then((layerview) => {

          embayments.visible = true

          layerview.watch('updating', (val) => {

            if (!val) {

              layerview.queryExtent().then((response) => {

                view.goTo(response.extent.expand(1.5))
              })
            }
          })
        })
      })

      $('#townSelect').on('change', function() {

        resultLayer.removeAll();
        view.graphics.removeAll();

        var x = $(this).val().toString()

        embayments.definitionExpression = "Town = " + "'" + x + "'"

        view.whenLayerView(embayments).then((layerview) => {

          embayments.visible = true

          layerview.watch('updating', (val) => {

            if (!val) {

              layerview.queryExtent().then((response) => {

                view.goTo(response.extent.expand(1.3))
              })
            }
          })
        })
      })
    }
  )
}