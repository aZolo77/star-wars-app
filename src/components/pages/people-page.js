// libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// components
import Row from '../row';
import { PersonDetails, PersonList } from '../sw-components';
import ErrorBoundry from '../error-boundry';

// styles
import './pages.css';
const PeoplePage = ({ history, match }) => {
  // возвращает компоненты в качестве параметров
  return (
    <ErrorBoundry>
      <Row
        leftElem={<PersonList onItemSelected={id => history.push(id)} />}
        rightElem={<PersonDetails itemId={match.params.id || ''} />}
      />
    </ErrorBoundry>
  );
};

export default withRouter(PeoplePage);
