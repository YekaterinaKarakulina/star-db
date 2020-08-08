import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import { StarshipDetails } from '../sw-components/details';
import {
  PeoplePage, PlanetPage,
  StarshipPage, LoginPage, SecretPage
} from '../pages';

import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';

import './app.css';

export default class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    hasError: false,
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const { isLoggedIn } = this.state;

    return (
      <Router>
        <div>
          <Header />
          <RandomPlanet />
          <Switch>
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
            <Route path="/login"
              render={() => (
                <LoginPage
                  isLoggedIn={isLoggedIn}
                  onLogin={this.onLogin} />
              )} />
            <Route path="/secret"
              render={() => (
                <SecretPage isLoggedIn={isLoggedIn} />
              )} />
            <Route render={() => <h2>Page not found</h2>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
