import React, { Component } from 'react';

// components
import Row from '../row';
import { PersonDetails, PersonList } from '../sw-components';
import ErrorBoundry from '../error-boundry';

// styles
import './pages.css';

export default class PeoplePage extends Component {
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
          leftElem={<PersonList onItemSelected={this._onItemSelected} />}
          rightElem={<PersonDetails itemId={selectedItem} />}
        />
      </ErrorBoundry>
    );
  }
}
