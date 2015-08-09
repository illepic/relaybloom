'use strict';

import React from 'react';
import Timer from './../Timer';

require('./leg.scss');

export default class Leg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activeClass = (this.props.currentLeg === this.props.legData.legId) ? 'list-group-item-success' : null;
    return (
      <div className="leg">
        <span className="label label-default left__label">{this.props.legData.abbreviation}</span>
        <span className="leg__racer-name">{this.props.legData.racer.name}, {activeClass}</span>
        <span className="badge leg__timer">
          <Timer tickTime={this.props.legData.timeCompleted} totalTime={this.props.legData.timeExpected}/>
        </span>
      </div>
    );
  }
}
