// libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// components
import { StarshipList } from '../sw-components';
import ErrorBoundry from '../error-boundry';

// styles
import './pages.css';

const StarshipPage = ({ match, location, history }) => {
  // возвращает компоненты в качестве параметров
  return (
    <ErrorBoundry>
      {/* переход на сл страницу (путь относительный) */}
      <StarshipList onItemSelected={id => history.push(id)} />
    </ErrorBoundry>
  );
};

// HOC-fn from react-router - передаёт компоненту объект с {match, location, history} параметрами
export default withRouter(StarshipPage);
