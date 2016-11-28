import React, { Component } from 'react';
import ReactMapboxGl, { ScaleControl, ZoomControl, RasterLayer } from 'react-mapbox-gl'; // eslint-disable-line
import config from './config.json';

const { accessToken } = config;

const containerStyle = {
  height: '100vh',
  width: '100%',
};

export default class WMSExample extends Component {
  state = {
    popup: null,
    center: [-74.5447, 40.6892],
    zoom: [8],
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
            baseUrl: 'https://geodata.state.nj.us/imagerywms/Natural2015',
            bbox: '{bbox-epsg-3857}',
            service: 'wms',
            format: 'image/png',
            layers: 'Natural2015',
            version: '1.1.1',
            request: 'GetMap',
            srs: 'EPSG:3857',
            width: 256,
            height: 256,
          }}
          tileSize={256}
          before='aeroway-taxiway'
        />
      </ReactMapboxGl>
    );
  }
}
