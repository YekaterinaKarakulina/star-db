import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import { PlanetList, PlanetDetails } from '../sw-components';

export default class PlanetPage extends Component {

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
      <PlanetDetails itemId={this.state.selectedItem} />
    )

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    )
  }
}
