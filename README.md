# react-mapbox-gl

Forked from [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl)
which is based on [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/) this library aims to bring the mapbox API to a React friendly way with some additional extra behavior.
The library include the following elements :

- ReactMapboxGl (the map wrapper itself)
- FeatureLayer (layer that contains features)
- GeoJSONLayer
- Marker (Html marker)
- Feature
  - Layer type properties `symbol` display a mapbox symbol.
  - Layer type properties `line` display a lineString.
  - Layer type properties `fill` display a polygon.
  - Layer type properties `fill-extrusion` to display a 3d extrusion layer.
  - Layer type properties `circle` display a mapbox circle.
- ZoomControl
- ScaleControl
- Popup

## How to start

```
npm install simacan-react-mapbox-gl --save
```

Import the component :

```
// ES6
import ReactMapboxGl, { FeatureLayer, Feature, Marker } from "react-mapbox-gl";

// ES5
var ReactMapboxGl = require("react-mapbox-gl");
var Layer = ReactMapboxGl.FeatureLayer;
var Feature = ReactMapboxGl.Feature;
```

## Disclaimer

The zoom property is an array on purpose. With a float as a value we can't tell whether the zoom has changed because `7 === 7 // true`. We did a work around using array so that `[7] !== [7] // true`, this way we can reliably update the zoom value.

See https://github.com/alex3165/react-mapbox-gl/issues/57 for more informations.

## Examples

- See the example to display a big amount of markers : [London cycle example](example/src/london-cycle.js)
- See the example to display all the availables shapes : [All shapes example](example/src/all-shapes.js)
- See the example to display a GEOJson file : [geojson example](example/src/geojson-example.js)
- See the example to display a WMS layer : [geojson example](example/src/WMSExample.js)
- See the example to display a Raster layer : [geojson example](example/src/RasterExample.js)

### Run the examples

- Clone the repository
- Go to example folder
- Install the dependencies: `npm install`
- Run the example
  - Build the library `npm run build`
  - Go to example folder `cd example`
  - Run example `npm run start`
  - Default port: `8080`

## [API](docs/API.md)
