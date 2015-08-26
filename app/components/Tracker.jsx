'use strict';

import React from 'react';
import {Button} from 'react-bootstrap';
import Moment from 'moment';
import _ from 'lodash';
import {Parse} from 'parse';
import ParseReact from 'parse-react';
import ParseComponent from 'parse-react/class';

import io from 'socket.io-client';

import Timer from './Timer';
import Leg from './Leg/Leg';
import Legs from './Legs/Legs';


export default class Tracker extends ParseComponent {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    this.clear = this.clear.bind(this);
    this.emit = this.emit.bind(this);
    this.refresh = this.refresh.bind(this);

    var topScope = this;
    this.legs = [];

    // Make a query of legs based on current Race. Store basic info about legs
    let Legs = Parse.Object.extend("Leg");
    var query = new Parse.Query(Legs);
    query.equalTo("race", this.props.race);

    query.find({
      success: function(legs) {
        topScope.legs = _.map(legs, function(leg) {
          return {
            objectId: leg.id,
            legId: leg.get('legId')
          }
        });
      }
    });

    // Socket setup
    this.socket = io();
    // Reply to all events (for this room)
    this.socket.on('leg handoff', function(msg) {
      // Refresh A) current Race, B) Legs (by updating Legs currentLeg prop
      topScope.refresh(msg.leg);
    });

    // Used to communicate that leg queries should update
    this.currentLeg = 0;

  }

  observe(props, state) {
    // Run adjustments
    return {
      race: (new Parse.Query("Race")).observeOne(this.props.race.id)
    }
  }

  refresh(leg) {
    this.refreshQueries();
    this.currentLeg = leg;
  }

  render() {
    return (
      <div className="RELAYbloomTracker tracker">

        <h2 className="text-center">
          <small>{_.get(this.data.race, 'raceName', '')}<br/>Race ID: {this.props.raceId}, Leg: {_.get(this.data.race, 'currentLeg')}</small>
          <br/>
          <small>Started: {Moment(_.get(this.data.race, 'raceStart', Moment().valueOf())).format('ddd, MMM D HH:mm:ss')}</small>
        </h2>

        <h1 className="text-center tracker__elapsed">
          <Timer startDate={_.get(this.data.race, 'raceStart', Moment().valueOf())} endDate={_.get(this.data.race, 'raceEnd', Moment().valueOf())} totalTime={_.get(this.data.race, 'expectedDuration', 0)}/>
        </h1>

        <Button bsStyle='warning' className='btn-block text-uppercase handoff-button' onClick={this.handoff}>Handoff</Button>

        <Legs race={this.props.race} currentLeg={this.currentLeg}/>

        <Button bsStyle='danger' className='btn-block text-uppercase clear-button' onClick={this.clear}>Clear</Button>

        <Button bsStyle='danger' className='btn-block text-uppercase clear-button' onClick={this.emit}>Emit Stuff</Button>
      </div>
    );
  }

  emit(leg) {
    // Race objectid goes here
    this.socket.emit('leg handoff', {room: this.props.raceId, leg: leg});
  }

  // Wipe all race data to test
  clear() {

    let clearBatch = new ParseReact.Mutation.Batch();

    // Wipe Race
    ParseReact.Mutation.Set(this.data.race, {
      currentLeg: 0,
      raceStart: 0,
      raceEnd: 0
    }).dispatch({batch:clearBatch});

    // Wipe each leg
    _.forEach(this.legs, function(leg) {
      ParseReact.Mutation.Set({className: "Leg", objectId: _.get(leg, 'objectId')}, {
        isActive: false,
        dateCompleted: 0,
        dateStarted: 0
      }).dispatch({batch:clearBatch});
    });

    clearBatch.dispatch().then(
      function(object) {
        console.log("Clear successful");
        document.location.reload();
      }
    );

  }

  handoff() {

    let previousLeg = this.data.race.currentLeg;
    let nextLeg = this.data.race.currentLeg + 1;
    const legCount = this.legs.length;

    let batch = new ParseReact.Mutation.Batch();

    // Set previous leg
    if (previousLeg > 0 && previousLeg <= legCount) {
      let previousObjectIdLookup = _.result(_.find(this.legs, 'legId', previousLeg), 'objectId');
      ParseReact.Mutation.Set({className: "Leg", objectId: previousObjectIdLookup}, {
        isActive: false,
        dateCompleted: Moment().valueOf()
      }).dispatch({batch:batch});
    }

    // Set next leg
    if (nextLeg <= legCount ) {
      let currentObjectIdLookup = _.result(_.find(this.legs, 'legId', nextLeg), 'objectId');
      ParseReact.Mutation.Set({className: "Leg", objectId: currentObjectIdLookup}, {
        isActive: true,
        dateStarted: Moment().valueOf()
      }).dispatch({batch:batch});
    }

    // If raceStart has not already been sent, send parse query to start race
    if (previousLeg === 0) {
      ParseReact.Mutation.Set(this.data.race, {
        raceStart: Moment().valueOf()
      }).dispatch({batch:batch});
    }

    // Stop if we're on the last
    if (previousLeg === legCount) {
      ParseReact.Mutation.Set(this.data.race, {
        raceEnd: Moment().valueOf()
      }).dispatch({batch:batch});
    }

    // Set current leg always
    ParseReact.Mutation.Set(this.data.race, {
      currentLeg: nextLeg
    }).dispatch({batch:batch});

    let that = this;
    batch.dispatch().then(
      function(object) {
        console.log("Handoff successful");
        that.emit(nextLeg);
      }
    );

  }
}

