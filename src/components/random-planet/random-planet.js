// libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// services
import SwapiService from '../../services/swapi-service';

// components
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

// styles
import './random-planet.css';

export default class RandomPlanet extends Component {
  // State of the Planet
  state = {
    planet: {},
    loading: true,
    error: false
  };

  // default props
  static defaultProps = {
    updateInterval: 10000
  };

  // Замена TypeScript - используем библиотеку PropTypes
  static propTypes = {
    // берём любое переданное свойство и делаем проверку
    updateInterval: PropTypes.number
  };

  // Component rendered first time (DOM is 100% ready)
  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  // arraised Before Component is going to be Deleted from the Page
  componentWillUnmount() {
    // очищаем интервал
    clearInterval(this.interval);
  }

  // get service
  swapiService = new SwapiService();

  // Event Listener setting State [id, name, population, diameter, rotation_period]
  _onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };

  // Error
  _onError = err => {
    console.log(err);
    this.setState({ error: true, loading: false });
  };

  // get planet
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this._onPlanetLoaded)
      .catch(this._onError);
  };

  render() {
    const { planet, loading, error } = this.state;

    // loading or error logic
    const errorMessage = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error);
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : errorMessage;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>
    );
  }
}

// Random Planet View
const PlanetView = ({ planet }) => {
  const { id, population, rotationPeriod, diameter, name } = planet;

  return (
    // Элемент обёртка для siblings
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="random-planet"
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
