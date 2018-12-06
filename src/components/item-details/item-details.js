import React, { Component } from 'react';

// components
import Spinner from '../spinner';
import ErrorButton from '../error-button/error-button';

// styles
import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
    loading: false
  };

  // on Start
  componentDidMount() {
    this.updateItem();
  }

  // on Updating Props
  componentDidUpdate(prevProps) {
    // Проверка ОБЯЗАТЕЛЬНА, чтобы не зациклить код!!
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.updateItem();
    }
  }

  // update Person Data
  updateItem() {
    this.setState({ loading: true });
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    // get new Person
    getData(itemId).then(item => {
      this.setState({ item, image: getImageUrl(item), loading: false });
    });
  }

  render() {
    const { item, image } = this.state;

    if (!item) {
      return <div className="text-center">Select an item from a list</div>;
    }

    if (this.state.loading) {
      return <Spinner />;
    }

    const { name } = item;

    return (
      <div className="person-details card">
        <img className="person-image" src={image} alt="hero" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush mb-3">
            {/* Iterating children */}
            {React.Children.map(this.props.children, (child, idx) => {
              /* cloning each child with new Property [item] */
              return React.cloneElement(child, { item });
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
