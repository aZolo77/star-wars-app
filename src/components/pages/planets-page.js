import React, { Component } from 'react';

// components
import Row from '../row';
import { PlanetDetails, PlanetList } from '../sw-components';
import ErrorBoundry from '../error-boundry';

// styles
import './pages.css';

export default class PlanetPage extends Component {
  state = {
    selectedItem: null
  };

  // private methods
  _onItemSelected = selectedItem => {
    this.setState({
      selectedItem
    });
  };

  render() {
    const { selectedItem } = this.state;

    // возвращает компоненты в качестве параметров
    return (
      <ErrorBoundry>
        <Row
          leftElem={<PlanetList onItemSelected={this._onItemSelected} />}
          rightElem={<PlanetDetails itemId={selectedItem} />}
        />
      </ErrorBoundry>
    );
  }
}
