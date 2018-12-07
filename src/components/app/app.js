// libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet updateInterval={10000} />

              {/* Routing [exact - точное совпадение] */}
              <Route
                path="/"
                render={() => <h2>Welcome to Star Db!</h2>}
                exact
              />
              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" component={StarshipPage} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
