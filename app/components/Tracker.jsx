'use strict';

import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import Moment from 'moment';
import _ from 'lodash';
import {Parse} from 'parse';
import ParseReact from 'parse-react';
import ParseComponent from 'parse-react/class';
import io from 'socket.io-client';
import store from 'store';

require('offline-js/offline.min');

import Timer from './Timer';
import Leg from './Leg/Leg';
import Legs from './Legs/Legs';
import OfflineTable from './OfflineTable';

export default class Tracker extends ParseComponent {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    this.clear = this.clear.bind(this);
    //this.emit = this.emit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.reconcile = this.reconcile.bind(this);
    this.openHandoffModal = this.openHandoffModal.bind(this);
    this.closeHandoffModal = this.closeHandoffModal.bind(this);

    this.legs = [];

    this.raceId = this.props.race.id;

    // Make a query of legs based on current Race. Store basic info about legs
    let Legs = Parse.Object.extend("Leg");
    var query = new Parse.Query(Legs);
    query.equalTo("race", this.props.race);

    query.find({
      success: (legs) => {
        this.legs = _.map(legs, (leg) => {
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
    this.socket.on('leg handoff', (msg) => {
      // Refresh A) current Race, B) Legs (by updating Legs currentLeg prop
      this.refresh(msg.leg);
    });
    this.socket.on('race refresh', () => {
      // Reload page
      document.location.reload();
    });

    // Used to communicate that leg queries should update
    // @TODO: Triggering updates in Legs sucks. This goes away when we go back
    // to global state tick
    this.currentLeg = 0;

    this.state = {
      failedRequests: _.get(store.get(this.raceId), 'failedRequests'),
      showHandoffModal: false
    };
  }

  observe(props, state) {
    // Run adjustments
    return {
      race: (new Parse.Query("Race")).observeOne(this.props.race.id)
    }
  }

  openHandoffModal() {
    this.setState({showHandoffModal: true});
  }
  closeHandoffModal() {
    this.setState({showHandoffModal: false});
  }

  refresh(leg) {
    this.refreshQueries();
    this.currentLeg = leg;
  }

  render() {
    return (
      <div className="RELAYbloomTracker tracker container">

        <h2 className="text-center">
          <small>{_.get(this.data.race, 'raceName', '')}<br/>Race ID: {this.raceId}, Leg: {_.get(this.data.race, 'currentLeg')}</small>
          <br/>
          <small>Started: {Moment(_.get(this.data.race, 'raceStart', Moment().valueOf())).format('ddd, MMM D HH:mm:ss')}</small>
        </h2>

        <h1 className="text-center tracker__elapsed">
          <Timer startDate={_.get(this.data.race, 'raceStart', Moment().valueOf())} endDate={_.get(this.data.race, 'raceEnd', Moment().valueOf())} totalTime={_.get(this.data.race, 'expectedDuration', 0)}/>
        </h1>



        <Button block bsStyle='warning' className='text-uppercase handoff-modal' onClick={this.openHandoffModal}>Prepare to HANDOFF</Button>

        <OfflineTable failed={this.state.failedRequests} reconcile={this.reconcile} />

        <Legs race={this.props.race} currentLeg={this.currentLeg}/>

        <Button bsStyle='danger' className='btn-block text-uppercase clear-button' onClick={this.clear}>Clear</Button>

        {/**<Button bsStyle='danger' className='btn-block text-uppercase clear-button' onClick={this.emit}>Emit Stuff</Button>**/}
        {/**<Button bsStyle='warning' className='btn-block text-uppercase clear-button' onClick={this.reconcile}>Reconcile</Button>**/}

        <Modal show={this.state.showHandoffModal} onHide={this.closeHandoffModal}>
          <Modal.Header closeButton>
            <Modal.Title>Handoff next leg of race?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Warning! This CANNOT BE UNDONE. Please only click HANDOFF! a single time. If offline, the time and leg will be stored until you're online again.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button block bsStyle='success' className='text-uppercase handoff-button' onClick={this.handoff}>HANDOFF!</Button>
            <Button block onClick={this.closeHandoffModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  emit(leg) {
    this.socket.emit('leg handoff', {room: this.raceId, leg: leg});
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
      (object) => {
        // Nuke localstorage
        store.remove(this.raceId);
        this.socket.emit('race refresh', {room: this.raceId});
        console.log("Clear successful");

        // Reload page
        document.location.reload();
      }
    );

  }

  handoff() {

    const legCount = this.legs.length;
    const now = Moment().valueOf();

    let previousLeg = this.data.race.currentLeg;
    let nextLeg = this.data.race.currentLeg + 1;

    let batch = new ParseReact.Mutation.Batch();

    // Set previous leg
    if (previousLeg > 0 && previousLeg <= legCount) {
      let previousObjectIdLookup = _.result(_.find(this.legs, 'legId', previousLeg), 'objectId');
      ParseReact.Mutation.Set({className: "Leg", objectId: previousObjectIdLookup}, {
        isActive: false,
        dateCompleted: now
      }).dispatch({batch:batch});
    }

    // Set next leg
    if (nextLeg <= legCount ) {
      let currentObjectIdLookup = _.result(_.find(this.legs, 'legId', nextLeg), 'objectId');
      ParseReact.Mutation.Set({className: "Leg", objectId: currentObjectIdLookup}, {
        isActive: true,
        dateStarted: now
      }).dispatch({batch:batch});
    }

    // If raceStart has not already been sent, send parse query to start race
    if (previousLeg === 0) {
      ParseReact.Mutation.Set(this.data.race, {
        raceStart: now
      }).dispatch({batch:batch});
    }

    // Stop if we're on the last
    if (previousLeg === legCount) {
      ParseReact.Mutation.Set(this.data.race, {
        raceEnd: now
      }).dispatch({batch:batch});
    }

    // Set current leg always
    ParseReact.Mutation.Set(this.data.race, {
      currentLeg: nextLeg
    }).dispatch({batch:batch});

    this.closeHandoffModal();

    // DISPATCH ALL MUTATIONS
    batch.dispatch().then(
      // Success
      (object) => {
        console.log("Handoff successful");
        // move this logic into reconcile and get it out of Handoff
        if (store.get(this.raceId)) {
          console.log('NEED TO RECONCILE');
          this.reconcile();
        }
        this.emit(nextLeg);
      },
      // Failure, MOVE ALL THIS SHIT TO IT'S OWN LIBRARY
      (message) => {

        // Pull from store once
        let localStore = (store.get(this.raceId)) ? store.get(this.raceId) : {};
        //console.log(localStore);
        localStore.startingOfflineLegNum = (localStore.startingOfflineLegNum) ? localStore.startingOfflineLegNum : nextLeg;
        localStore.offlineHandoffCount = (localStore.offlineHandoffCount >= 0) ? localStore.offlineHandoffCount + 1 : 1;

        // These may already exist if we're handing off multiple times offline
        let existingFailedRequests = _.toArray(_.get(localStore, 'failedRequests'));
        // These just came in from a failed batch, we need to mess with
        let newFailedRequests = _.get(batch, "_requests");

        // Put notes here about what the fuck you're doing and why
        let previousLeg = localStore.startingOfflineLegNum + localStore.offlineHandoffCount - 2;
        let currentLeg = localStore.startingOfflineLegNum + localStore.offlineHandoffCount - 1;
        let fixedFailedRequests= _.map(newFailedRequests, (request) => {
          // Previous leg
          if (!request.data.isActive && request.className === 'Leg') {
            request.objectId = _.result(_.find(this.legs, 'legId', previousLeg), 'objectId');
          }
          // current active leg
          if (request.data.isActive && request.className === 'Leg') {
            request.objectId = _.result(_.find(this.legs, 'legId', currentLeg), 'objectId');
          }
          if (request.className === 'Race') {
            request.data.currentLeg = currentLeg;
          }
          return request;
        });

        localStore.failedRequests = existingFailedRequests.concat(fixedFailedRequests);

        // Put this on state to get to later
        this.setState({failedRequests:localStore.failedRequests});

        console.log(localStore);

        // Smoosh together exiting requests and new requests into new array
        store.set(this.raceId, localStore);

      }
    );

  }

  reconcile() {

    let batch = new ParseReact.Mutation.Batch();

    // Get store.[raceid].failedRequests array
    let reconcilliations = store.getAll()[this.raceId].failedRequests;

    // Loop through all stored, failed requests and make new Parse Mutations
    _.forEach(reconcilliations, (request) => {
      console.log('reconcile requests', request);
      ParseReact.Mutation.Set(
        {className: request.className, objectId: request.objectId},
        request.data
      ).dispatch({batch:batch});
    });

    // Run all new Parse mutations
    batch.dispatch().then(
      // Success
      (object) => {
        store.remove(this.raceId);
        this.setState({failedRequests: []});
        this.emit(this.data.race.currentLeg + 1);
        console.log('Reconcilliation success!');
      },
      // Failure
      (message) => {
        console.log('Reconcilliation failed!');
      }
    );

  }
}

