import { Component, PropTypes } from 'react';
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
    url: PropTypes.string,
    urlProps: PropTypes.object,
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
    tileSize: 512,
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
    if (this.props.url && this.props.url.indexOf('mapbox://') !== -1) {
      return false;
    }
    return true;
  }

  buildRasterUrl() {
    const urlProps = this.props.urlProps;
    if (this.props.url && this.props.url.indexOf('mapbox://') !== -1) {
      return this.props.url;
    }

    // include both lower and uppercase, different api's accept different values
    this.props.urlProps.WIDTH = this.props.tileSize;
    this.props.urlProps.HEIGHT = this.props.tileSize;
    this.props.urlProps.height = this.props.tileSize;
    this.props.urlProps.width = this.props.tileSize;

    const urlOptions = List(Object.keys(this.props.urlProps));

    const optionsBuild = urlOptions
      .filter(item => urlProps[item] !== null && urlProps[item] !== undefined)
      .map(item => `${item}=${urlProps[item]}`);
    return `${this.props.url}?${optionsBuild.join('&')}`;
  }

  render() {
    return null;
  }
}
