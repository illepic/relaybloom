'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Tracker extends React.Component {
  render() {
    return (
      <div className="RELAYbloomTracker">
        <h1 className="text-center"><small><Glyphicon glyph='time'/> <strong>73:00:00</strong> / 34:32:22</small></h1>
        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.props.handleHandoff}>Handoff</Button>
      </div>
    );
  }
}

