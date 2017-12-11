import { store } from '../vuex/store'
export const createMap = function (loader) {
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
      Legend
    ) => {
      
      var map = new Map({});

      var view = new SceneView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 20,
        camera:{ 
          position: [-70.303634, 41.701660],
          heading: 0,
          tilt: 60
         }              // References the map object created in step 3
      });

      var custom = new TileLayer({
        url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
      })

      map.add(custom)

      $('#neighborhoodSelect').on('change', function() {

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

        var x = $(this).val().toString()

        var embayments = new FeatureLayer({
          url: "http://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/0",
          definitionExpression: "Neighborhood = " + "'" + x + "'",
          outFields: ['*'],
          renderer: renderer,
          popupTemplate: {
            title: '{ClosestRoad_name}',
            content: '{*}'
          }
        })

        var legend = new Legend({
          view: view,
          layerInfos: [{
            layer: embayments,
            title: "Legend"
          }]
        });

        view.ui.add(legend, "bottom-right");

        map.add(embayments)

        embayments.then(() => {

          return embayments.queryExtent()
        }).then((response) => {

          view.goTo(response.extent.expand(1.3))
        })
      })
    }
  )
}