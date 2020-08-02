import React, { Component } from 'react';

import ItemDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';

import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import Record from '../record';

import { StarshipList } from '../sw-components';

export default class StarshipPage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedItem: 9,
    hasError: false
  }

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <StarshipList
        onItemSelected={this.onItemSelected}
        renderItem={({ name, model }) => `${name} (${model})`}
      />
    )

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.swapiService.getStarship}
        getImageUrl={this.swapiService.getStarshipImage}>
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    )

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    )
  }
}
