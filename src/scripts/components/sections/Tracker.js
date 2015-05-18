'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import Leg from '../Leg';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RELAYbloomTracker">

        <h1 className="text-center"><small><Glyphicon glyph='time'/><strong><span> 73:00:00</span></strong><span> / </span><span>34:32:22</span></small></h1>
        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.handleHandoff}>Handoff</Button>

        <div className="panel panel-primary">
          <div className="panel-heading"><span className="label label-info">L1-L6</span> <span>Van 1</span></div>
          <div className="panel-body">
            <h1>Jen <small>00:35:32</small></h1>
            <p>Total time: 343:343</p>
            <p><span>More stats about legs goes here</span><span className="label label-default">L1</span></p>
          </div>

          <ul className="list-group">
            {this.props.appdata.plan.legs.map(function(leg, index) {
              return (<Leg key={leg.key} index={index+1} data={leg}/>);
            })}
          </ul>

        </div>

      </div>
    );
  }
}

