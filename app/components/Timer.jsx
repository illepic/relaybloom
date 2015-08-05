'use strict';

import React from 'react';
import Moment from 'moment';
import {Glyphicon} from 'react-bootstrap';

require('moment-duration-format');

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log(this.props.ms);
    //console.log(Moment.duration(this.props.ms).format());

    const elapsedTime = this.props.tickTime;
    const totalTime = this.props.totalTime;

    var formattedDuration = Moment.duration(this.props.ms).format();

    return (
      <h1 className="text-center">
        <small>
          <Glyphicon glyph='time'/> <strong><span>{elapsedTime}</span></strong> <span> / </span> <span>{totalTime}</span>
        </small>
      </h1>
    );
  }
}
Timer.defaultProps = {ms: 0};

export default Timer;
