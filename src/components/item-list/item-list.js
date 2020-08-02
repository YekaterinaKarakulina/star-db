import React from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import { withData } from '../hoc-helper';

const ItemList = (props) => {

  const { data, onItemSelected, renderItem } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderItem(item);

    return (
      <li className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);

/* export default class ItemList extends Component {

  state = {
    itemList: null
  }

  componentDidMount() {

    const { getData } = this.props;

    getData()
      .then((itemList) => {
        this.setState({
          itemList
        });
      });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);

      return (
        <li className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}>
          {label}
        </li>
      );
    });
  }

  render() {

    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />
    }

    const people = this.renderItems(itemList);

    return (
      <ul className="item-list list-group">
        {people}
      </ul>
    );
  }
} */
