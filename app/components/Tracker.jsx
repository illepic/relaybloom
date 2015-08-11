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
                <li className="list-group-item" key={index+1}>
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


    // UNBREAK THIS
    let currentLeg = this.state.legState[this.state.currentLeg];
    currentLeg.dateStarted = Moment();
    console.log(currentLeg);

    // Handing off always increases leg
    this.setState({
      currentLeg: ++this.state.currentLeg,
      legState: this.state.legState
    });

    // Very first press, leg will be 0
    if (this.state.currentLeg === 1) {
      this.state.raceStart = Moment();
      this.interval = setInterval(this.tick, 1000);
      return null;
    }

    // Reached end and timer running, for now stop it
    if (this.state.currentLeg > this.props.raceData.legs.length) {
      clearInterval(this.interval);
      return null;
    }
  }

  tick() {
    let totalElapsed = Moment().diff(this.state.raceStart);
    let currentLeg =
    this.setState({
      elapsed: totalElapsed
    });
  }

}

