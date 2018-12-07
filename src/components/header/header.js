// libraries
import React, { Component } from 'react';
// uses API History of Browser
import { Link } from 'react-router-dom';

// styles
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header d-flex">
        <h3>
          <Link to="/">Star DB</Link>
        </h3>
        <ul className="d-flex">
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/planets">Planets</Link>
          </li>
          <li>
            <Link to="/starships">Starships</Link>
          </li>
        </ul>

        <button
          className="btn btn-primary btn-small"
          onClick={this.props.onServiceChange}
        >
          Change Service
        </button>
      </div>
    );
  }
}
