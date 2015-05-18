'use strict';

import React from 'react';
import Moment from 'moment';
require('moment-duration-format');

class Timer extends React.Component {
  render() {
    console.log(this.props.ms);
    console.log(Moment.duration(this.props.ms).format());

    var formattedDuration = Moment.duration(this.props.ms).format();
    return (
      <span>{formattedDuration}</span>
    );
  }
}
Timer.defaultProps = {ms: 0};

export default Timer;
