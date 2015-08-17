'use strict';

import React from 'react';
import {Parse} from 'parse';
import Tracker from './../components/Tracker';

import RaceData from '../libs/racedata';

// A way for us to pass props to just this
export default class TrackerWrapper extends React.Component {
  constructor(props) {
    super(props);

    // testing parse
    Parse.initialize("J0KTo2bvYUhCK8dap1Cbcz0vWK11fXzJ2kHZinx0", "82COMXIuq31Ff0QLuUIjoUOSlt8twxQzTnOmhUQ8");
    //var TestObject = Parse.Object.extend("TestObject");
    //var testObject = new TestObject();
    //testObject.save({foo: "bar"}).then(function(object) {
    //  alert("yay! it worked");
    //});

    // Check localstorage for these values before calling to Parse

  }
  render() {
    return(
      <Tracker raceData={RaceData}/>
    );
  }
}
