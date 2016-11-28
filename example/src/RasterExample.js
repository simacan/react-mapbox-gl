import React, { Component } from 'react';
import ReactMapboxGl, { ScaleControl, ZoomControl, RasterLayer } from 'react-mapbox-gl'; // eslint-disable-line
import config from './config.json';

const { accessToken } = config;

const containerStyle = {
  height: '100vh',
  width: '100%',
};

export default class RasterExample extends Component {
  state = {
    popup: null,
    center: [-74.50, 40],
    zoom: [2],
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
        <RasterLayer
          urlProps={{
            baseUrl: 'mapbox://mapbox.streets',
          }}
          tileSize={256}
        />
      </ReactMapboxGl>
    );
  }
}
