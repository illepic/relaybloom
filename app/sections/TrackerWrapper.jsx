'use strict';

import React from 'react';
import {Parse} from 'parse';
import Tracker from './../components/Tracker';
import io from 'socket.io-client';

require('offline-js/offline.min');
require('offline-js/themes/offline-theme-chrome-indicator.css');
require('offline-js/themes/offline-language-english-indicator.css');

// A way for us to pass props to just this
export default class TrackerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.checkOffline = this.checkOffline.bind(this);

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

    // Offline
    window.Offline.options = {
      checkOnLoad: true,
      interceptRequests: false,
      checks: {
        xhr: {
          url: '/offline'
        }
      }
    };
    this.offlineInterval = setInterval(this.checkOffline, 10000);

    window.addEventListener('online', function() {
      console.log('Online');
    });
    window.addEventListener('offline', function() {
      console.log('Offline');
    });

    // Localstorage dance here

  }
  render() {
    return(
      <Tracker race={this.raceLookup}/>
    );
  }

  checkOffline() {
    window.Offline.check();
  }
}
