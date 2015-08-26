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
      'panel': true,
      'panel-default': true,
      'leg--active': this.props.legData.isActive,
      'panel-primary': this.props.legData.isActive,
      'leg--done': !!this.props.legData.dateCompleted,
      'leg--upcoming': !this.props.legData.dateStarted
    };

    let legProgress = (this.state.legElapsed / this.props.legData.targetSplit) * 100;

    return (
      <div className={classNames(legClasses)}>

        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">
            <span className="label label-default leg__abbrv-label">L{this.props.legData.legId}</span>
            <strong className="leg__racer-name">{this.props.legData.racer.name}</strong>
          </h3>
          <div className="pull-right">
              <span className="badge leg__timer">
                <span className="leg__distance"><Glyphicon glyph='move'/>{this.props.legData.legDistance}mi</span>
                <span className="leg__split">{Moment.duration(this.props.legData.targetSplit).format()}</span>
              </span>
          </div>
        </div>

        <div className="panel-body">

          <div className="leg__info">

            <table className="table leg-dates">
              <tbody>
                <tr className="leg-dates__est-start">
                  <th className="leg__dates-label"><span className="label label-warning text-uppercase">Est. Start Date</span></th>
                  <td>{this.estimatedStartDate()}</td>
                </tr>
                <tr className="leg-dates__real-start">
                  <th className="leg__dates-label"><span className="label label-success text-uppercase">Real Start Date</span></th>
                  <td>{this.shortDate(this.props.legData.dateStarted)}</td>
                </tr>

                <tr className="leg-dates__est-end">
                  <th className="leg__dates-label"><span  className="label label-warning text-uppercase">Est. End Date</span></th>
                  <td>{this.estimatedEndDate()}</td>
                </tr>
                <tr className="leg-dates__real-end">
                  <th className="leg__dates-label"><span  className="label label-success text-uppercase">Real End Date</span></th>
                  <td>{this.shortDate(this.props.legData.dateCompleted)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProgressBar className="leg__progress" bsStyle="success" now={legProgress}/>

          <h3 className="leg__progress-text text-center">
            <TimerStatic elapsed={this.state.legElapsed} totalTime={this.props.legData.targetSplit}/>
          </h3>

        </div>
      </div>
    );
  }

  tick() {
    //console.log('Leg tick happening');
    this.setState({
      legElapsed: Moment().valueOf() - this.props.legData.dateStarted
    });
  }

  estimatedStartDate() {
    return this.shortDate(this.props.legEstimates.estimatedStart);
  }

  estimatedEndDate() {
    return this.shortDate(this.props.legEstimates.estimatedEnd);
  }

  shortDate(date) {
    const shortMomentFormat = 'ddd, HH:mm:ss';

    if (!!date) {
      return Moment(date).format(shortMomentFormat);
    }
    else {
      return '---';
    }
  }

}
