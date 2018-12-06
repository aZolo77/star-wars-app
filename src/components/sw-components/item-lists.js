import React from 'react';

// components
import ItemList from '../item-list';

// HOC
import { withData, withSwapiService } from '../hoc-helpers';

// HOC-fn
const withChildFunction = (Wrapped, fn) => {
  return props => {
    return <Wrapped {...props}>{fn}</Wrapped>;
  };
};

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

const PersonList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPersonMethodsToProps
);

const PlanetList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPlanetMethodsToProps
);

const StarshipList = withSwapiService(
  withData(withChildFunction(ItemList, renderModelAndName)),
  mapStarshipMethodsToProps
);

export { PersonList, PlanetList, StarshipList };
