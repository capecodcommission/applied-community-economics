import { store } from '../vuex/store'
export const createMap = function (loader) {
  const esriLoader = loader
  esriLoader.dojoRequire(
    [
    "esri/Map",
    "esri/views/MapView",
    "dojo/domReady!"
    ],
    (
      Map, 
      MapView
    ) => {
      
      var map = new Map({
        basemap: "streets"
      });

      var view = new MapView({
      container: "viewDiv",  // Reference to the DOM node that will contain the view
      map: map,
      zoom: 15,
      center: [-70.303634, 41.701660]               // References the map object created in step 3
      });
    }
  )
}