import React, { Component } from 'react';

// services
import SwapiService from '../../services/swapi-service';

// components
import Spinner from '../spinner';
// import ErrorIndicator from '../error-indicator';

// styles
import './person-details.css';

export default class PersonDetails extends Component {
  state = {
    person: null,
    loading: false
  };

  // on Start
  componentDidMount() {
    this.updatePerson();
  }

  // on Updating Props
  componentDidUpdate(prevProps) {
    // Проверка ОБЯЗАТЕЛЬНА, чтобы не зациклить код!!
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  // get Swapi service
  swapiService = new SwapiService();

  // update Person Data
  updatePerson() {
    this.setState({ loading: true });
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    // get new Person
    this.swapiService.getPerson(personId).then(person => {
      this.setState({ person, loading: false });
    });
  }

  render() {
    if (!this.state.person) {
      return <div className="text-center">Select a person from a list</div>;
    }

    if (this.state.loading) {
      return <Spinner />;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="hero"
        />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
