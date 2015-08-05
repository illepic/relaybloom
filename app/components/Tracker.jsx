'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';

import Timer from './Timer';
import Leg from './Leg';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleHandoff = this.handleHandoff.bind(this);
  }
  render() {
    console.log(this.state);
    return (
      <div className="RELAYbloomTracker">
        <h1 className="text-center">{this.props.raceData.raceName}</h1>

        <Timer tickTime={this.props.raceData.plan.currentTime} totalTime={this.props.raceData.plan.expectedDuration}/>

        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.handleHandoff}>Handoff</Button>

        <div className="panel panel-primary another-class">
          <div className="panel-heading"><span className="label label-info">L1-L6</span> <span>Van 1</span></div>
          <div className="panel-body">
            <h1>Jen <small>00:35:32</small></h1>
            <p>Total time: 343:343</p>
            <p><span>More stats about legs goes here</span><span className="label label-default">L1</span></p>
          </div>

          <ul className="list-group">
            {this.props.raceData.plan.legs.map(function(leg, index) {
              return (<Leg key={leg.abbreviation} index={index+1} data={leg}/>);
            })}
          </ul>

        </div>

      </div>
    );
  }

  handleHandoff() {
    console.log('handoff handled from tracker');
    this.props.handoff('hello string');
  }
}

