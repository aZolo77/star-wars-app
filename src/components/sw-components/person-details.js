import React from 'react';

// = HOC
import { withSwapiService } from '../hoc-helpers';

// components
import ItemDetails, { Record } from '../item-details/item-details';

const PersonDetails = props => {
  return (
    <ItemDetails {...props}>
      <Record field="gender" label="Gender:" />
      <Record field="eyeColor" label="Eye Color:" />
    </ItemDetails>
  );
};

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage
  };
};

export default withSwapiService(PersonDetails, mapMethodsToProps);
