import React, { Component } from 'react';
import AllShapes from './all-shapes';
import LondonCycle from './london-cycle';
import GeoJSONExample from './geojson-example';
import Buildings3DExample from './Buildings3DExample';
import WMSExample from './WMSExample';
import RasterExample from './RasterExample';

const examples = [
  {
    component: LondonCycle,
    label: 'London cycle',
  },
  {
    component: AllShapes,
    label: 'All shapes',
  },
  {
    component: GeoJSONExample,
    label: 'GEOJson',
  },
  {
    component: Buildings3DExample,
    label: '3D Buildings',
  },
  {
    component: WMSExample,
    label: 'WMS Layer',
  },
  {
    component: RasterExample,
    label: 'Raster Layer',
  },
];

const styles = {
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  item: {
    margin: '0px 10px',
    cursor: 'pointer',
    paddingBottom: 6,
  },
  activeItem: {
    color: '#4790E5',
    borderBottom: '1px solid #4790E5',
  },
};

export default class Main extends Component {

  state = {
    index: 0,
  };

  indexToExample = index => examples[index].component;

  onClick(index) {
    if (this.state.index !== index) {
      this.setState({ index });
    }
  }

  render() {
    const ComponentToRender = this.indexToExample(this.state.index);

    return (
      <div>
        <nav style={styles.nav}>
          {
            examples.map((item, index) =>
              <div
                key={index}
                style={{
                  ...styles.item,
                  ...(index === this.state.index && styles.activeItem),
                }}
                onClick={this.onClick.bind(this, index)}>
                {
                  item.label
                }
              </div>
            )
          }
        </nav>
        <ComponentToRender/>
      </div>
    );
  }
}
