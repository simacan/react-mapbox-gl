// Add a style tag to the document's head for the map's styling
import injectCSS from './util/inject-css';
import Map from './map';
import FeatureLayer from './FeatureLayer';
import GeoJSONLayer from './geojson-layer';
import Feature from './feature';
import ZoomControl from './zoom-control';
import Popup from './popup';
import ScaleControl from './scale-control';
import Marker from './marker';
import RasterLayer from './RasterLayer';

injectCSS(window);

export {
  Feature,
  FeatureLayer,
  GeoJSONLayer,
  Map,
  Popup,
  ZoomControl,
  ScaleControl,
  Marker,
  RasterLayer,
};

export default Map;
