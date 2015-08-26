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
        <Glyphicon glyph='time'/><span className="spacer">&nbsp;</span>
        <strong><span>{Moment.duration(this.props.elapsed).format("H:mm:ss", {trim:false})}</span></strong>
        <span> / </span> <span>{Moment.duration(this.props.totalTime).format("H:mm:ss", {trim:false})}</span>
      </span>
    );
  }

}
