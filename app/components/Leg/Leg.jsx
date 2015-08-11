'use strict';

import React from 'react';
import {ProgressBar, Glyphicon} from 'react-bootstrap';
import Moment from 'moment';
import Timer from './../Timer';

require('./leg.scss');

export default class Leg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    //let activeClass = (this.props.currentLeg === this.props.legData.legId) ? 'active' : null;
    let legElapsed = (this.props.legActive.dateStarted > 0) ? Moment().valueOf() - this.props.legActive.dateStarted : 0;
    return (
      <div className="leg">
        <div className="leg__info">
          <span className="label label-default leg__abbrv-label">L{this.props.legData.legId}</span>
          <span className="leg__racer-name">{this.props.legData.racer.name} | start: {this.props.legActive.dateStarted}, end: {this.props.legActive.dateCompleted}</span>
          <span className="badge leg__timer">
            <span className="leg__distance"><Glyphicon glyph='move'/>{this.props.legData.legDistance}mi </span>
            <Timer tickTime={legElapsed} totalTime={this.props.legData.targetSplit}/>
          </span>
        </div>
        <ProgressBar className="leg__progress" now={60}/>
      </div>
    );
  }
}
