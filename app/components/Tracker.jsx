'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';
import Moment from 'moment';
import _ from 'lodash';
import {Parse} from 'parse';
var ParseReact = require('parse-react');
import ParseComponent from 'parse-react/class';

import Timer from './Timer';
import Leg from './Leg/Leg';
import Legs from './Legs/Legs';

export default class Tracker extends ParseComponent {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    //this.tick = this.tick.bind(this);

    // New starting array of leg states
    //let startingLegs = _.map(this.props.raceData.legs, function(leg) {
    //  return {
    //    dateStarted: 0,
    //    dateCompleted: 0,
    //    isActive: false,
    //    dateEstimatedStart: 0,
    //    dateEstimatedEnd: 0
    //  };
    //});

    this.state = {
      //raceStart: 0,
      currentLegNum: 0
    };
  }

  observe(props, state) {
    return {
      race: new Parse.Query("Race").observeOne(this.props.raceId)
    }
  }

  render() {
    console.log('tracker rendered');
    return (
      <div className="RELAYbloomTracker tracker">

        <h2 className="text-center">
          <small>{_.get(this.data.race, 'raceName', '')}, {this.props.raceId}</small>
          <br/>
          <small>Started: {Moment(_.get(this.data.race, 'raceStart', Moment().valueOf())).format('ddd, MMM D HH:mm:ss')}</small>
        </h2>

        <h1 className="text-center tracker__elapsed">
          <Timer tickTime={this.state.elapsed} totalTime={_.get(this.data.race, 'expectedDuration', 0)}/>
        </h1>

        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.handoff}>Handoff</Button>

        <div className="panel panel-primary">
          <div className="panel-heading"><span className="label label-info">L1-L6</span> <span>Van 1 (test)</span></div>
          <div className="panel-body">
            <p>Pertinent info up here maybe.</p>
          </div>


          <Legs/>


        </div>

      </div>
    );
  }

//<div className="legs">
//{this.props.raceData.legs.map(function(leg, index) {
//  return (
//    <div className="legs__item" key={index}>
//      <Leg legData={leg} legActive={this.state.legState[index]}/>
//    </div>
//  );
//}, this)}
//</div>



  handoff() {

    const next = this.state.currentLegNum + 1;

    //ParseReact.Mutation.Create("Team", {
    //  teamId: 3,
    //  teamName: "Herp derp"
    //}).dispatch();

    //let Leg = new Parse.Object.extend("Leg");
    //let query = new Parse.Query(Leg);
    //
    //ParseReact.Mutation.Set({className: "Leg", objectId: "TkhUEBQoE8"}, {
    //  isActive:true,
    //  dateStarted: Moment().valueOf()
    //}).dispatch();
    //
    //ParseReact.Mutation.Set({className: "Race", objectId: "hutipkX3QL"}, {
    //  raceStart: Moment().valueOf()
    //}).dispatch();

    //query.get("TkhUEBQoE8", {
    //  success: function(leg) {
    //    console.log('leg returned');
    //    console.log(leg.get("legDistance"));
    //    console.log(leg.get("targetSplit"));
    //
    //    console.log(leg);
    //
    //  },
    //  error: function(object, error) {
    //    console.log(error);
    //  }
    //});

    // START race
    //if (next === 1) {
    //  this.setState({ raceStart: Moment().valueOf() });
    //  this.interval = setInterval(this.tick, 1000);
    //}

    //if (!this.state.raceState) {
    //  this.setstate({ raceStart: Moment().valueOf() });
    //}

    // If raceStart has not already been sent, send parse query to start race
    if (!_.get(this.data.race, 'raceStart')) {
      ParseReact.Mutation.Set({className: "Race", objectId: this.props.raceId}, {
        raceStart: Moment().valueOf()
      }).dispatch();
    }

    //// END race
    //if (next > this.props.raceData.legs.length) {
    //  clearInterval(this.interval);
    //}
    //
    //// Stop *previous* leg
    //this.stopPreviousLeg(next);
    //// Start current leg
    //this.startNextLeg(next);
    //
    //// Save it all
    //this.setState({
    //  currentLegNum: next,
    //  legState: this.state.legState
    //});

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

  //tick() {
  //  this.setState({
  //    elapsed: Moment().diff(this.state.raceStart)
  //  });
  //}

}

