'use strict';

import React from 'react';
import Moment from 'moment';
import {Glyphicon} from 'react-bootstrap';

require('moment-duration-format');

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);

    this.state = {
      elapsed: this.props.endDate - this.props.startDate
    };

    this.interval = 0;
  }

  render() {

    // If has start date and no end date, timer runs
    if (this.props.endDate) {
      clearInterval(this.interval);
    }
    // If here, we don't have end date, only start date means we're live
    else if (this.props.startDate && !this.interval) {
      this.interval = setInterval(this.tick, 1000)
    }

    let elapsed = (this.state.elapsed) ? this.state.elapsed : this.props.endDate - this.props.startDate;

    return (
      <span className="timer">
        <Glyphicon glyph='time'/>
        <strong><span>{Moment.duration(elapsed).format('HH:mm:ss')}</span></strong>
        <span> / </span> <span>{Moment.duration(this.props.totalTime).format()}</span>
      </span>
    );
  }

  tick() {
    //console.log('Timer tick happening');
    this.setState({
      elapsed: Moment().valueOf() - this.props.startDate
    });
  }
}
