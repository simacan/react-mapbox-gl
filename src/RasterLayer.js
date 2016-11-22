/* eslint-disable */
import MapboxGl from "mapbox-gl/dist/mapbox-gl.js";
import React, { Component, PropTypes, Children } from "react";
import isEqual from "deep-equal";
import uniqueId from 'lodash/uniqueId';

export default class RasterLayer2 extends Component {
  static contextTypes = {
    map: PropTypes.object
  };

  static propTypes = {
    id: PropTypes.string,
    sourceId: PropTypes.string,
    before: PropTypes.string,
  };

  static defaultProps = {
    type: "fill",
    layout: {},
    paint: {},
  };

  hover = [];

  id = this.props.id || uniqueId('layer-');

  lry = {
    'id': 'buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      },
      'fill-extrusion-opacity': .6
    }
  }

  componentWillMount() {
    const { id, source, lry } = this;
    const { type, layout, paint, layerOptions, sourceId, before } = this.props;
    const { map } = this.context;

    const layer = {
      id,
      source: sourceId || id,
      type,
      layout,
      paint,
      ...layerOptions,
    };

    map.addLayer(lry);
  }

  componentWillUnmount() {
    const { id } = this;
    const { map } = this.context;

    map.removeLayer(id);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.children, this.props.children)
        || !isEqual(nextProps.paint, this.props.paint)
        || !isEqual(nextProps.layout, this.props.layout);
  }

  render() {
    return null;
  }
}
