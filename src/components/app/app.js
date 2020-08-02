import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import PlanetPage from '../planet-page';
import StarshipPage from '../starship-page';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';




import './app.css';

export default class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div>
        <Header />
        <RandomPlanet />
        <PeoplePage />

        <PlanetPage />
        <StarshipPage />


      </div>
    );
  }
}
