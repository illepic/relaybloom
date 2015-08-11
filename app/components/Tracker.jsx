'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';
import Moment from 'moment';
import _ from 'lodash';

import Timer from './Timer';
import Leg from './Leg/Leg';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    this.tick = this.tick.bind(this);

    // New starting array of leg states
    let startingLegs = _.map(this.props.raceData.legs, function(leg) {
      return {dateStarted: 0, dateCompleted: 0, active: false};
    });

    this.state = {
      raceState: 0,
      elapsed: 0,
      currentLeg: 0,
      legState: startingLegs
    };
  }
  render() {
    console.log(this.state);
    return (
      <div className="RELAYbloomTracker">
        <h2 className="text-center">
          <small>{this.props.raceData.raceName}</small>
        </h2>

        <h1 className="text-center">
          <Timer tickTime={this.state.elapsed} totalTime={this.props.raceData.expectedDuration}/>
        </h1>

        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.handoff}>Handoff</Button>

        <div className="panel panel-primary another-class">
          <div className="panel-heading"><span className="label label-info">L1-L6</span> <span>Van 1</span></div>
          <div className="panel-body">
            <h1>Jen <small>00:35:32</small></h1>
            <p>Total time: 343:343</p>
            <p><span>More stats about legs goes here</span><span className="label label-default">L1</span></p>
          </div>

          <ul className="list-group">
            {this.props.raceData.legs.map(function(leg, index) {
              return (
                <li className="list-group-item" key={index}>
                  <Leg legData={leg} legActive={this.state.legState[index]}/>
                </li>
              );
            }, this)}
          </ul>

        </div>

      </div>
    );
  }


  handoff() {

    const now = Moment().valueOf();
    const current = this.state.currentLeg;

    // Before incrementing leg
    if (current === 0) {
      this.state.raceStart = now;
      this.interval = setInterval(this.tick, 1000);
    }
    else {
      this.state.legState[current - 1].dateCompleted = now;
    }
    // Reached end and timer running, for now stop it
    if (current === this.props.raceData.legs.length) {
      clearInterval(this.interval);
      return null;
    }

    this.state.legState[current].dateStarted = now;

    // Handing off always increases leg
    this.setState({
      currentLeg: current + 1,
      legState: this.state.legState
    });


  }

  tick() {
    this.setState({
      elapsed: Moment().diff(this.state.raceStart)
    });
  }

}

