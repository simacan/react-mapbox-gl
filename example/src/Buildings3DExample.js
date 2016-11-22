import React, { Component } from 'react';
import ReactMapboxGl, { ScaleControl, ZoomControl, FeatureLayer } from 'react-mapbox-gl'; // eslint-disable-line
import config from './config.json';

const { accessToken } = config;

const containerStyle = {
  height: '100vh',
  width: '100%',
};

export default class Buildings3DExample extends Component {
  state = {
    popup: null,
    center: [-74.0066, 40.7135],
    zoom: [15],
    pitch: 45,
    bearing: 17.6,
  };

  render() {
    return (
      <ReactMapboxGl
        style="mapbox://styles/mapbox/light-v9"
        accessToken={accessToken}
        center={this.state.center}
        movingMethod="jumpTo"
        zoom={this.state.zoom}
        pitch={this.state.pitch}
        bearing={this.state.bearing}
        containerStyle={containerStyle}>

        <ScaleControl/>
        <ZoomControl/>
        <FeatureLayer
          type="fill-extrusion"
          filter={['==', 'extrude', 'true']}
          paint={{
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': {
              type: 'identity',
              property: 'height',
            },
            'fill-extrusion-base': {
              type: 'identity',
              property: 'min_height',
            },
            'fill-extrusion-opacity': 0.6,
          }}
          layerOptions={{
            id: 'buildings',
            source: 'composite',
            'source-layer': 'building',
          }}
        />


      </ReactMapboxGl>
    );
  }
}
