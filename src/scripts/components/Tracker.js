'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Tracker extends React.Component {
  render() {
    return (
      <div className="RELAYbloomTracker">
        <h1 className="text-center"><small><Glyphicon glyph='time'/><strong><span> 73:00:00</span></strong><span> / </span><span>34:32:22</span></small></h1>
        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.props.handleHandoff}>Handoff</Button>
      </div>
    );
  }
}

