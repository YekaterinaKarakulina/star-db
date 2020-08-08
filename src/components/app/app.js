import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import PlanetPage from '../planet-page';
import StarshipPage from '../starship-page';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import { StarshipDetails } from '../sw-components/details';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      <Router>
        <div>
          <Header />
          <RandomPlanet />
          <Route path="/"
            render={() => <h2>Welcome to starDB</h2>}
            exact />
          <Route path="/people/:id?" component={PeoplePage} />
          <Route path="/planets" component={PlanetPage} />
          <Route path="/starships" exact component={StarshipPage} />
          <Route path="/starships/:id"
            render={({ match }) => {
              const { id } = match.params;
              return (
                <StarshipDetails itemId={id} />
              )
            }} />
        </div>
      </Router>
    );
  }
}
