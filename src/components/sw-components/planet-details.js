import React from 'react';

// = HOC
import { withSwapiService } from '../hoc-helpers';

// components
import ItemDetails, { Record } from '../item-details/item-details';

const PlanetDetails = props => {
  return (
    <ItemDetails {...props}>
      <Record field="population" label="Population:" />
      <Record field="diameter" label="Diameter:" />
    </ItemDetails>
  );
};

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage
  };
};

export default withSwapiService(PlanetDetails, mapMethodsToProps);
