'use strict';

import React from 'react';


export default class Leg extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <span className="badge">00:35:32 / {this.props.data.timeExpected}</span><span className="label label-default">{this.props.data.abbreviation}</span> <span>{this.props.data.racer.name}</span>
        <br/>
      </li>
    );
  }
}
