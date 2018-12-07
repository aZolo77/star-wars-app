import React from 'react';

// components
import ItemList from '../item-list';

// HOC
import {
  compose,
  withData,
  withSwapiService,
  withChildFunction
} from '../hoc-helpers';

// = rendering
const renderName = ({ name }) => {
  return <span>{name}</span>;
};

const renderModelAndName = ({ length, name }) => {
  return (
    <span>
      {name} (Length: {length})
    </span>
  );
};

// = getting swapi methods
const mapPersonMethodsToProps = swapiSerivice => {
  return {
    getData: swapiSerivice.getAllPeople
  };
};

const mapPlanetMethodsToProps = swapiSerivice => {
  return {
    getData: swapiSerivice.getAllPlanets
  };
};

const mapStarshipMethodsToProps = swapiSerivice => {
  return {
    getData: swapiSerivice.getAllStarships
  };
};

// = composing Hoc-funcs to create React-components
const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  withData,
  withChildFunction(renderModelAndName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };
