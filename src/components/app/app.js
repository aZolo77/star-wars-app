import React, { Component } from 'react';

// = styles
import './app.css';

// = components
import Header from '../header';
import ItemList from '../item-list';
// случайная планета
import RandomPlanet from '../random-planet';
import PersonDetails from '../person-details';
// import PlanetDetails from '../planet-details';
// import StarshipDetails from '../starship-details';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList />
          </div>
          <div className="col-md-6">
            <PersonDetails />
          </div>
        </div>
      </div>
    );
  }
}
