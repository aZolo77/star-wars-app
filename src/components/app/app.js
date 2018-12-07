import React, { Component } from 'react';

// = Context Provider
import { SwapiServiceProvider } from '../swapi-service-context';

// = Services
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

// = Components
import Header from '../header';
import ErrorBoundry from '../error-boundry';
// случайная планета
import RandomPlanet from '../random-planet';
// pages
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

// = styles
import './app.css';

export default class App extends Component {
  state = {
    swapiService: new SwapiService()
  };

  // обновить сервис
  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Header onServiceChange={this.onServiceChange} />

          <RandomPlanet updateInterval={10000} />

          <PeoplePage />
          <PlanetPage />
          <StarshipPage />
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
