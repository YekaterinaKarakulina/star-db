import React from 'react';

export default class Record extends React.Component {
  render() {

    const { item, field, label } = this.props;

    return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
    );
  }
}
