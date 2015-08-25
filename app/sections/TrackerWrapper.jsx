'use strict';

import React from 'react';
import {Parse} from 'parse';
import Tracker from './../components/Tracker';
import io from 'socket.io-client';

// A way for us to pass props to just this
export default class TrackerWrapper extends React.Component {
  constructor(props) {
    super(props);

    // Parse key
    Parse.initialize("J0KTo2bvYUhCK8dap1Cbcz0vWK11fXzJ2kHZinx0", "82COMXIuq31Ff0QLuUIjoUOSlt8twxQzTnOmhUQ8");

    // The race object is really useful here filtering within the Tracker
    let Race = Parse.Object.extend("Race");
    this.raceLookup = new Race();
    this.raceLookup.id = this.props.params.trackerId;

    // Socket setup
    this.socket = io();
    // Create room for just this race
    this.socket.emit('create', this.props.params.trackerId);
    // Reply to all events (for this room)
    this.socket.on('leg handoff', function(msg) {
      alert(msg.message);
    });

    // Localstorage dance here
  }
  render() {
    return(
      <Tracker raceId={this.props.params.trackerId} race={this.raceLookup}/>
    );
  }
}
