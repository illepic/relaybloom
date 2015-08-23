'use strict';

import React from 'react';
import {ProgressBar, Glyphicon} from 'react-bootstrap';
import Moment from 'moment';
import TimerStatic from './../TimerStatic';
import classNames from 'classnames';

require('./leg.scss');

export default class Leg extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);

    this.state = {
      legElapsed: this.props.legData.dateCompleted - this.props.legData.dateStarted
    };

    this.interval = 0;
  }

  render() {

    console.log('Leg rendered');

    // Leg has end date, it's done
    if (this.props.legData.dateCompleted) {
      clearInterval(this.interval);
    }
    // Or we have a start date, meaning we've started
    else if (this.props.legData.dateStarted && !this.interval) {
      this.interval = setInterval(this.tick, 1000)
    }

    const legClasses = {
      'leg': true,
      'leg--active': this.props.legData.isActive
    };

    let legProgress = (this.state.legElapsed / this.props.legData.targetSplit) * 100;

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
              <tr><th className="leg__dates-label"><span className="label label-warning text-uppercase">Est. Start Date</span></th><td>{this.shortDate(this.props.legData.dateEstimatedStart)}</td></tr>
              <tr><th className="leg__dates-label"><span className="label label-success text-uppercase">Real Start Date</span></th><td>{this.shortDate(this.props.legData.dateStarted)}</td></tr>

              <tr><th className="leg__dates-label"><span  className="label label-warning text-uppercase">Est. End Date</span></th><td>{this.shortDate(this.props.legData.dateEstimatedEnd)}</td></tr>
              <tr><th className="leg__dates-label"><span  className="label label-success text-uppercase">Real End Date</span></th><td>{this.shortDate(this.props.legData.dateCompleted)}</td></tr>
            </tbody>
          </table>
        </div>

        <ProgressBar className="leg__progress" bsStyle="success" now={legProgress}/>

        <h3 className="leg__progress-text text-center">
          <TimerStatic elapsed={this.state.legElapsed} totalTime={this.props.legData.targetSplit}/>
        </h3>

      </div>
    );
  }

  tick() {
    console.log('Leg tick happening');
    this.setState({
      legElapsed: Moment().valueOf() - this.props.legData.dateStarted
    });
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
