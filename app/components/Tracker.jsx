'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';
import Moment from 'moment';
import _ from 'lodash';

import Timer from './Timer';
import Leg from './Leg/Leg';
import Legs from './Legs/Legs';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    this.tick = this.tick.bind(this);

    // New starting array of leg states
    let startingLegs = _.map(this.props.raceData.legs, function(leg) {
      return {
        dateStarted: 0,
        dateCompleted: 0,
        isActive: false,
        dateEstimatedStart: 0,
        dateEstimatedEnd: 0
      };
    });

    this.state = {
      raceStart: 0,
      elapsed: 0,
      currentLegNum: 0,
      legState: startingLegs
    };
  }
  render() {
    //console.log(this.state);
    return (
      <div className="RELAYbloomTracker">

        <h2 className="text-center">
          <small>{this.props.raceData.raceName}</small>
          <br/>
          <small>Started: {Moment(this.state.raceStart).format('ddd, MMM D HH:mm:ss')}</small>
        </h2>

        <h1 className="text-center">
          <Timer tickTime={this.state.elapsed} totalTime={this.props.raceData.expectedDuration}/>
        </h1>

        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.handoff}>Handoff</Button>

        <div className="panel panel-primary another-class">
          <div className="panel-heading"><span className="label label-info">L1-L6</span> <span>Van 1</span></div>
          <div className="panel-body">
            <p>Pertinent info up here maybe.</p>
          </div>

          <Legs/>

          <div className="legs">
            {this.props.raceData.legs.map(function(leg, index) {
              return (
                <div className="legs__item" key={index}>
                  <Leg legData={leg} legActive={this.state.legState[index]}/>
                </div>
              );
            }, this)}
          </div>

        </div>

      </div>
    );
  }

  handoff() {

    const next = this.state.currentLegNum + 1;

    // START race
    if (next === 1) {
      this.setState({ raceStart: Moment().valueOf() });
      this.interval = setInterval(this.tick, 1000);
    }
    // END race
    if (next > this.props.raceData.legs.length) {
      clearInterval(this.interval);
    }

    // Stop *previous* leg
    this.stopPreviousLeg(next);
    // Start current leg
    this.startNextLeg(next);

    // Save it all
    this.setState({
      currentLegNum: next,
      legState: this.state.legState
    });

  }

  // next is already 1 greater than the zero-index array key, we must go back 2
  stopPreviousLeg(next) {
    if (next === 1 || next > this.props.raceData.legs.length) { return null; }

    let current = next - 2;
    this.state.legState[current].dateCompleted = Moment().valueOf();
    this.state.legState[current].isActive = false;
    this.adjustEstimatedStartTimes(next);
  }

  // next is already 1 greater than the zer-index array key, go back 2 for real
  startNextLeg(next) {
    if (next > this.props.raceData.legs.length) { return null; }

    let current = next - 1;
    this.state.legState[current].dateStarted = Moment().valueOf();
    this.state.legState[current].isActive = true;
    this.adjustEstimatedStartTimes(current);
  }

  // Estimate start time of all upcoming legs
  adjustEstimatedStartTimes(next) {
    let now = Moment().valueOf();
    let virtualAccumulatedTime = 0;
    let split = 0;

    _.forEach(this.state.legState, function(leg, index) {

      // If completed, nuke estimated start/end
      if (leg.dateCompleted) {
        leg.dateEstimatedStart = 0;
        leg.dateEstimatedEnd = 0;
        return null;
      }
      // Otherwise, calc up
      else if (!leg.dateCompleted) {
        split = this.props.raceData.legs[index].targetSplit;

        leg.dateEstimatedStart = now + virtualAccumulatedTime;
        leg.dateEstimatedEnd = leg.dateEstimatedStart + split;
        virtualAccumulatedTime += split;
      }
      if (leg.dateStarted && !leg.dateCompleted) {
        leg.dateEstimatedStart = 0;
      }

    }, this);
  }

  tick() {
    this.setState({
      elapsed: Moment().diff(this.state.raceStart)
    });
  }

}

