'use strict';

import React from 'react';
import {Parse} from 'parse';
import Tracker from './../components/Tracker';

//import RaceData from '../libs/racedata';

// A way for us to pass props to just this
export default class TrackerWrapper extends React.Component {
  constructor(props) {
    super(props);

    // Parse key
    Parse.initialize("J0KTo2bvYUhCK8dap1Cbcz0vWK11fXzJ2kHZinx0", "82COMXIuq31Ff0QLuUIjoUOSlt8twxQzTnOmhUQ8");

    // Check localstorage for these values before calling to Parse
    let Race = Parse.Object.extend("Race");
    this.raceLookup = new Race();
    this.raceLookup.id = this.props.params.trackerId;

    // Localstorage dance here
  }
  render() {
    return(
      <Tracker raceId={this.props.params.trackerId} race={this.raceLookup}/>
    );
  }
}
