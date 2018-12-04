import React, { Component } from 'react';

// services
import SwapiService from '../../services/swapi-service';

// components
import Spinner from '../spinner';
// import ErrorIndicator from '../error-indicator';

// styles
import './item-list.css';

export default class ItemList extends Component {
  state = {
    peopleList: null
  };

  // Component Initialized
  componentDidMount() {
    // getting Heroes List
    this.swapiService
      .getAllPeople()
      .then(peopleList => this.setState({ peopleList }));
  }

  // get Swapi service
  swapiService = new SwapiService();

  // render Heroes List
  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {name}
        </li>
      );
    });
  }

  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }

    const items = this.renderItems(peopleList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
