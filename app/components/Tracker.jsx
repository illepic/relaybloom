'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';
import Moment from 'moment';

import Timer from './Timer';
import Leg from './Leg/Leg';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    this.tick = this.tick.bind(this);

    this.raceStart = 0;

    this.state = {
      elapsed: 0,
      currentLeg: 0
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
                  <Leg legData={leg} currentLeg={this.state.currentLeg}/>
                </li>
              );
            }, this)}
          </ul>

        </div>

      </div>
    );
  }


  handoff() {

    // Handing off always increases leg
    this.setState({
      currentLeg: ++this.state.currentLeg
    });

    // Very first press, leg will be 0
    if (this.state.currentLeg === 1) {
      this.raceStart = Moment();
      this.interval = setInterval(this.tick, 1000);
      return null;
    }

    // Timer running, for now stop it
    if (this.state.currentLeg > this.props.raceData.legs.length) {
      clearInterval(this.interval);
      return null;
    }
  }

  tick() {
    this.setState({
      elapsed: Moment().diff(this.raceStart)
    });
  }

}

