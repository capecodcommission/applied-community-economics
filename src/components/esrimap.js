import { store } from '../vuex/store'
export const createMap = function (loader) {
  const esriLoader = loader
  esriLoader.dojoRequire(
    [
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
    ],
    (
      Map, 
      MapView,
      TileLayer,
      FeatureLayer
    ) => {
      
      var map = new Map({});

      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 10,
        center: [-70.303634, 41.701660]               // References the map object created in step 3
      });

      var custom = new TileLayer({
        url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
      })

      map.add(custom)

      $('#neighborhoodSelect').on('change', function() {

        var x = $(this).val().toString()

        var embayments = new FeatureLayer({
          url: "http://gis-services.capecodcommission.org/arcgis/rest/services/ActivityCenters/CommunityCharacteristics/MapServer/0",
          definitionExpression: "Neighborhood = " + "'" + x + "'"
        })

        map.add(embayments)

        embayments.then(() => {

          return embayments.queryExtent()
        }).then((response) => {

          view.goTo(response.extent)
        })
      })
    }
  )
}