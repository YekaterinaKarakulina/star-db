import React, { Component } from 'react';

import ItemDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import Record from '../record';
import { PlanetList } from '../sw-components';

export default class PlanetPage extends Component {

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
      <PlanetList
        onItemSelected={this.onItemSelected}
        renderItem={({ name, diameter }) => `${name} (${diameter})`}
      />
    )

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.swapiService.getPlanet}
        getImageUrl={this.swapiService.getPlanetImage}>
        <Record field="population" label="Population" />
        <Record field="rotationPeriod" label="Rotation Period" />
        <Record field="diameter" label="Diameter" />
      </ItemDetails>
    )

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    )
  }
}
