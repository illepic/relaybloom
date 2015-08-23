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
    return (
      <span className="timer">
        <Glyphicon glyph='time'/>
        <strong><span>{Moment.duration(this.props.elapsed).format()}</span></strong>
        <span> / </span> <span>{Moment.duration(this.props.totalTime).format()}</span>
      </span>
    );
  }

}
