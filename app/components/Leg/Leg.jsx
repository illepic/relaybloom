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

    console.log('Leg rendered');

    let legElapsed = 0;

    // Leg has end date, it's done
    if (this.props.legActive.dateCompleted) {
      legElapsed = this.props.legActive.dateCompleted - this.props.legActive.dateStarted;
    }
    // Or we have a start date, meaning we've started
    else if (this.props.legActive.dateStarted > 0) {
      legElapsed = Moment().valueOf() - this.props.legActive.dateStarted;
    }

    const legClasses = {
      'leg': true,
      'leg--active': this.props.legActive.isActive
    };

    let legProgress = (legElapsed / this.props.legData.targetSplit) * 100;


    return (
      <div className={classNames(legClasses)}>
        <div className="leg__info">
          <div className="clearfix">

            <div className="pull-left">
              <span className="label label-default leg__abbrv-label">L{this.props.legData.legId}</span>
              <strong className="leg__racer-name">{this.props.legData.racer.name}</strong>
            </div>

            <div className="pull-right">
              <span className="badge leg__timer">
                <span className="leg__distance"><Glyphicon glyph='move'/>{this.props.legData.legDistance}mi</span>
                <span className="leg__split">{Moment.duration(this.props.legData.targetSplit).format()}</span>
              </span>
            </div>

          </div>
          <table className="table leg__dates">
            <tbody>
              <tr><th className="leg__dates-label"><span className="label label-warning text-uppercase">Est. Start Date</span></th><td>{this.shortDate(this.props.legActive.dateEstimatedStart)}</td></tr>
              <tr><th className="leg__dates-label"><span className="label label-success text-uppercase">Real Start Date</span></th><td>{this.shortDate(this.props.legActive.dateStarted)}</td></tr>

              <tr><th className="leg__dates-label"><span  className="label label-warning text-uppercase">Est. End Date</span></th><td>{this.shortDate(this.props.legActive.dateEstimatedEnd)}</td></tr>
              <tr><th className="leg__dates-label"><span  className="label label-success text-uppercase">Real End Date</span></th><td>{this.shortDate(this.props.legActive.dateCompleted)}</td></tr>
            </tbody>
          </table>
        </div>

        <ProgressBar className="leg__progress" bsStyle="success" now={legProgress}/>
        <h3 className="leg__progress-text text-center">
          <Timer tickTime={legElapsed} totalTime={this.props.legData.targetSplit}/>
        </h3>

      </div>
    );
  }

  shortDate(date) {
    const shortMomentFormat = 'ddd D, HH:mm:ss';

    if (!!date) {
      return Moment(date).format(shortMomentFormat);
    }
    else {
      return '---';
    }
  }

}
