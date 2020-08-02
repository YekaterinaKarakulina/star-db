import React, { Component, Fragment } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    const { getImageUrl } = this.props;
    this.setState({
      item,
      image: getImageUrl(item),
      loading: false
    });
  }

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    });

    getData(itemId).then(this.onItemLoaded);
  }

  render() {

    const { item, image } = this.state;

    if (!item) {
      return <span>Select the item from a list</span>
    }

    const { loading } = this.state;
    const hasData = !loading;

    const spinner = loading ? <Spinner /> : null;

    const { id, name, gender, birthYear, eyeColor } = item;

    return (
      <div className="person-details card" >
        {spinner}
        {hasData &&

          <Fragment>
            <img className="person-image"
              src={image}
              alt="img" />

            <div className="card-body">
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                {
                  React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, { item });
                  })
                }
              </ul>
            </div>
          </Fragment>
        }
      </div>
    );
  }
}
