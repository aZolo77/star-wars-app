// libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  SecretPage,
  LoginPage
} from '../pages';
import { StarshipDetails } from '../sw-components';

// = styles
import './app.css';

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
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

  onLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet updateInterval={10000} />
              {/* Switch gets first Route in its Body and doesnt use others and if the Route was not found, it uses last instruction */}
              <Switch>
                {/* Routing [exact - точное совпадение] */}
                <Route
                  path="/"
                  render={() => <h2>Welcome to Star Db!</h2>}
                  exact
                />
                {/* опциональный параметр [:id?] */}
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" component={StarshipPage} exact />
                <Route
                  path="/starships/:id"
                  // {match, location, history}
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                {/* will work if none of the Routes did: can use Route or Redirect */}
                <Route
                  render={() => (
                    <h2>
                      <span style={{ fontSize: '32px', marginRight: '10px' }}>
                        {String.fromCharCode(9762)}
                      </span>
                      Page not found
                      <span style={{ fontSize: '32px', marginLeft: '10px' }}>
                        {String.fromCharCode(9762)}
                      </span>
                    </h2>
                  )}
                />
                {/* <Redirect to="/" /> */}
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
