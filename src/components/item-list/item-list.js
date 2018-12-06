import React, { Component } from 'react';

// styles
import './item-list.css';

class ItemList extends Component {
  // render Heroes List
  renderItems(arr) {
    return arr.map(item => {
      const { id } = item;

      // передаём полученный item во внешнюю функцию
      const label = this.props.children(item);

      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { data } = this.props;

    const items = this.renderItems(data);

    return <ul className="item-list list-group mb-4">{items}</ul>;
  }
}

export default ItemList;
