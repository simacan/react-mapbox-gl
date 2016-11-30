import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export default class ReactMapboxGl extends React.PureComponent {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    container: PropTypes.object,
    onClick: PropTypes.func,
    zIndex: PropTypes.number,
  }

  div = document.createElement('div');

  componentWillMount() {
    const { map } = this.context;
    const {
      children,
      coordinates,
      container,
      onClick,
      zIndex,
    } = this.props;

    if (container && container.nodeName) {
      this.div = container;
    }

    this.div.style.position = 'absolute';

    if (zIndex) {
      this.div.style.zIndex = zIndex;
    }

    this.marker = new MapboxGl.Marker(this.div).setLngLat(coordinates);
    if (onClick) {
      this.div.addEventListener('click', onClick);
    }

    render(children, this.div, () => {
      this.marker.addTo(map);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { marker, div } = this;
    const { coordinates, children, zIndex } = nextProps;

    if (children) {
      render(children, div);
    }

    if (this.props.zIndex !== zIndex) {
      div.style.zIndex = zIndex;
    }

    if (this.props.coordinates !== coordinates) {
      marker.setLngLat(coordinates);
    }
  }

  componentWillUnmount() {
    const { marker, div, onClick } = this;
    if (onClick) {
      div.removeEventListener('click');
    }
    marker.remove();
    unmountComponentAtNode(div);
  }

  render() {
    return null;
  }
}
