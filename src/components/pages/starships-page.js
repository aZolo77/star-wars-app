import React, { Component } from 'react';

// components
import Row from '../row';
import { StarshipDetails, StarshipList } from '../sw-components';
import ErrorBoundry from '../error-boundry';

// styles
import './pages.css';

export default class StarshipPage extends Component {
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
          leftElem={<StarshipList onItemSelected={this._onItemSelected} />}
          rightElem={<StarshipDetails itemId={selectedItem} />}
        />
      </ErrorBoundry>
    );
  }
}
