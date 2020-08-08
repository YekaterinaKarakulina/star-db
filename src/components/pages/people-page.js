import React from 'react';

import Row from '../row';
import { PersonList, PersonDetails } from '../sw-components';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history, match }) => {

  const { id } = match.params;

  const itemList = (
    <PersonList
      onItemSelected={(id) => history.push(id)}
      renderItem={({ name, gender }) => `${name} (${gender})`}
    />
  )

  const itemDetails = (
    <PersonDetails itemId={id} />
  )

  return (
    <Row left={itemList} right={itemDetails} />
  )
}

export default withRouter(PeoplePage);
