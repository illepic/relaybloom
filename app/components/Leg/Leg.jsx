'use strict';

import React from 'react';
import {ProgressBar, Glyphicon} from 'react-bootstrap';
import Moment from 'moment';
import Timer from './../Timer';
import classNames from 'classNames';

require('./leg.scss');

export default class Leg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log(this.props.legActive.dateCompleted);

    let legElapsed = 0;
    //let legActive = false;
    //console.log(this.props);

    // Leg has end date, it's done
    if (this.props.legActive.dateCompleted) {
      legElapsed = this.props.legActive.dateCompleted - this.props.legActive.dateStarted;
      //legActive = false;
    }
    // Or we have a start date, meaning we've started
    else if (this.props.legActive.dateStarted > 0) {
      legElapsed = Moment().valueOf() - this.props.legActive.dateStarted;
      //legActive = true;
    }

    //let activeClass = (!!legElapsed) ? 'bg-success' : '';
    let legClasses = {
      'leg': true,
      'leg--active': this.props.legActive.isActive
    };

    return (
      <div className={classNames(legClasses)}>
        <div className="leg__info">
          <div className="clearfix">

            <div className="pull-left">
              <span className="label label-default leg__abbrv-label">L{this.props.legData.legId}</span>
              <span className="leg__racer-name">{this.props.legData.racer.name} | start: {this.props.legActive.dateStarted}, end: {this.props.legActive.dateCompleted}</span>
            </div>

            <div className="pull-right">
              <span className="badge leg__timer">
                <span className="leg__distance"><Glyphicon glyph='move'/>{this.props.legData.legDistance}mi </span>
                <Timer tickTime={legElapsed} totalTime={this.props.legData.targetSplit}/>
              </span>
            </div>

          </div>
        </div>
        <ProgressBar className="leg__progress" now={60}/>
      </div>
    );
  }
}
