import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import isEqual from 'deep-equal';
import uniqueId from 'lodash/uniqueId';

export default class RasterLayer extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    id: PropTypes.string,
    sourceId: PropTypes.string,
    urlProps: React.PropTypes.shape({
      baseUrl: PropTypes.string,
      service: PropTypes.string,
      bbox: PropTypes.string,
      format: PropTypes.string,
      width: PropTypes.number,
      srs: PropTypes.string,
      height: PropTypes.number,
      request: PropTypes.string,
      layers: PropTypes.string,
      transparent: PropTypes.boolean,
      layerName: PropTypes.string,
    }),
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    tileSize: PropTypes.number,
    filter: PropTypes.array,
    layout: PropTypes.object,
    paint: PropTypes.object,
    before: PropTypes.string,
  };

  static defaultProps = {
    minZoom: 0,
    maxZoom: 22,
    filter: null,
    paint: {},
    layout: {},
  };

  id = this.props.id || uniqueId('layer-');

  wmsSource = {
    type: 'raster',
    tiles: [this.buildRasterUrl()],
    tileSize: this.props.tileSize,
    minzoom: this.props.minZoom,
    maxzoom: this.props.maxZoom,
  };

  mapboxSource = {
    type: 'raster',
    url: this.buildRasterUrl(),
    tileSize: this.props.tileSize,
  };

  componentWillMount() {
    const { id, wmsSource, mapboxSource } = this;
    const { layout, paint, sourceId, before } = this.props;
    const { map } = this.context;

    const layer = {
      id,
      source: sourceId || id,
      type: 'raster',
      paint,
      layout,
    };

    if (!sourceId) {
      map.addSource(id, this.isWMSSource() ? wmsSource : mapboxSource);
    }

    map.addLayer(layer, before);
  }

  componentWillUnmount() {
    const { id } = this;
    const { map } = this.context;

    map.removeSource(this.props.sourceId || id);
    map.removeLayer(id);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.urlProps, this.props.urlProps)
        || !isEqual(nextProps.paint, this.props.paint)
        || !isEqual(nextProps.layout, this.props.layout);
  }

  isWMSSource() {
    const urlProps = this.props.urlProps;
    if (urlProps.baseUrl && urlProps.baseUrl.indexOf('mapbox://') !== -1) {
      return false;
    }
    return true;
  }

  buildRasterUrl() {
    const urlProps = this.props.urlProps;
    if (urlProps.baseUrl && urlProps.baseUrl.indexOf('mapbox://') !== -1) {
      return urlProps.baseUrl;
    }
    const urlOptions = List([
      'service',
      'bbox',
      'format',
      'width',
      'transparent',
      'version',
      'layerName',
      'srs',
      'height',
      'request',
      'layers',
    ]);

    const optionsBuild = urlOptions
      .filter(item => urlProps[item] !== null && urlProps[item] !== undefined)
      .map(item => `${item}=${urlProps[item]}`);
    return `${urlProps.baseUrl}?${optionsBuild.join('&')}`;
  }

  render() {
    return null;
  }
}
