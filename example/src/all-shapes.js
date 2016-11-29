/* eslint-disable no-console, no-param-reassign */

import React, { Component } from 'react';
import ReactMapboxGl, { FeatureLayer, Feature, ScaleControl, ZoomControl, Marker } from 'react-mapbox-gl'; // eslint-disable-line
import route from './route.json';
import config from './config.json';
import style from './style.json';

const { accessToken } = config;

const containerStyle = {
  height: '100vh',
  width: '100%',
};

const polygonCoords = [[
  [-0.13235092163085938, 51.518250335096376],
  [-0.1174163818359375, 51.52433860667918],
  [-0.10591506958007812, 51.51974577545329],
  [-0.10831832885742188, 51.51429786349477],
  [-0.12531280517578122, 51.51429786349477],
  [-0.13200759887695312, 51.517823057404094],
]];

const multiPolygonCoords = [
  [[
    [-0.18235092163085938, 51.518250335096376],
    [-0.1674163818359375, 51.52433860667918],
    [-0.15591506958007812, 51.51974577545329],
    [-0.15831832885742188, 51.51429786349477],
    [-0.17531280517578122, 51.51429786349477],
    [-0.18200759887695312, 51.517823057404094],
  ]],
  [[
    [-0.18235092163085938, 51.538250335096376],
    [-0.1674163818359375, 51.54433860667918],
    [-0.15591506958007812, 51.53974577545329],
    [-0.15831832885742188, 51.53429786349477],
    [-0.17531280517578122, 51.53429786349477],
    [-0.18200759887695312, 51.537823057404094],
  ]],
];

const markerCoord = [
  -0.2416815,
  51.5285582,
];

const mappedRoute = route.points.map(point => [point.lat, point.lng]);

const markerContainer = document.createElement('div');
markerContainer.style.width = '400px';
markerContainer.style.position = 'absolute';

export default class AllShapes extends Component {

  state = {
    popup: null,
    center: [0.2174037, 51.6476704],
    circleRadius: 30,
    routeIndex: 0,
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        center: [-0.120736, 51.5118219],
        circleRadius: 10,
      });
    }, 6000);

    setInterval(() => {
      this.setState({
        routeIndex: this.state.routeIndex + 1,
      });
    }, 8000);
  }

  _onClickMarker = ({ feature }) => {
    this.setState({
      center: feature.geometry.coordinates,
    });
  };

  _onClickMap(map) {
    console.log('Clicked on the map : ', map);
  }

  _onStyleLoad(map) {
    console.log('Style loaded: ', map);
  }

  _onHover({ map }) {
    map.getCanvas().style.cursor = 'pointer';
  }

  _onZoom(map) {
    console.log('Zoom level changed to ', map.getZoom());
  }

  _onEndHover({ map }) {
    map.getCanvas().style.cursor = '';
  }

  _polygonClicked = ({ feature }) => {
    console.log('Polygon clicked', feature.geometry.coordinates);
  };

  render() {
    return (
      <ReactMapboxGl
        style={style}
        onClick={this._onClickMap}
        onZoom={this._onZoom}
        onStyleLoad={this._onStyleLoad}
        accessToken={accessToken}
        center={this.state.center}
        movingMethod="jumpTo"
        containerStyle={containerStyle}>
        <ScaleControl/>
        <ZoomControl/>
        <FeatureLayer
          type="symbol"
          layout={{ 'icon-image': 'harbor-15' }}>
          <Feature
            coordinates={markerCoord}
            onHover={this._onHover}
            onEndHover={this._onEndHover}
            onClick={this._onClickMarker}/>
        </FeatureLayer>

        <FeatureLayer
          id="mapbox-route-example"
          type="line"
          sourceId="route"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': '#888',
            'line-width': 8,
          }}/>

        <FeatureLayer
          type="line"
          layout={{ 'line-cap': 'round', 'line-join': 'round' }}
          paint={{ 'line-color': '#4790E5', 'line-width': 12 }}>
          <Feature coordinates={mappedRoute}/>
        </FeatureLayer>

        <FeatureLayer
          type="circle"
          paint={{ 'circle-radius': this.state.circleRadius, 'circle-color': '#E54E52', 'circle-opacity': 0.8 }}>
          <Feature coordinates={mappedRoute[this.state.routeIndex]}/>
        </FeatureLayer>

        <Marker
          container={markerContainer}
          coordinates={markerCoord}
          onClick={e => console.log('Clicked the marker', e)}
        >
          <h1>
            TEST
          </h1>
        </Marker>

        <FeatureLayer
          type="fill"
          paint={{ 'fill-color': '#6F788A', 'fill-opacity': 0.7 }}>
          <Feature
            onClick={this._polygonClicked}
            coordinates={polygonCoords}/>
        </FeatureLayer>

        <FeatureLayer
          type="fill"
          paint={{ 'fill-color': '#3bb2d0', 'fill-opacity': 0.5 }}>
          <Feature
            onClick={this._polygonClicked}
            coordinates={multiPolygonCoords}/>
        </FeatureLayer>

      </ReactMapboxGl>
    );
  }
}
