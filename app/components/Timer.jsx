'use strict';

import React from 'react';
import Moment from 'moment';
import {Glyphicon} from 'react-bootstrap';

require('moment-duration-format');

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let elapsedTime = Moment.duration(this.props.tickTime).format();
    const totalTime = Moment.duration(this.props.totalTime).format();

    return (
      <span className="timer">
        <Glyphicon glyph='time'/> <strong><span>{elapsedTime}</span></strong> <span> / </span> <span>{totalTime}</span>
      </span>
    );
  }
}
