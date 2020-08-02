import React, { Component } from 'react';

import ItemDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import Record from '../record';
import { PersonList } from '../sw-components';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedItem: 5,
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
      <PersonList
        onItemSelected={this.onItemSelected}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    )

    const itemDetails = (
      <ItemDetails itemId={this.state.selectedItem}
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage} >
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    )

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    )
  }
}
