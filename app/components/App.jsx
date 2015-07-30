'use strict';

import React from 'react';
import Router from 'react-router';
import Moment from 'moment';

import RelayBloomNav from './NavBar';
const RouteHandler = Router.RouteHandler;

require('bootswatch/flatly/bootstrap.min.css');
require('../stylesheets/app.css');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handoff = this.handoff.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      raceStart: 0,
      elapsed: 0,
      isRunning: false,
      currentLeg: 0
    };
  }

  render() {
    return (
      <div>
        <RelayBloomNav />
        <RouteHandler/>
      </div>
    );
  }

  handoff() {
    console.log('handoff called from app');

    // for now stop it
    if (this.state.isRunning) {
      this.setState({isRunning: false});
      clearInterval( this.interval );
    }
    else {
      this.setState({
        raceStart: Moment(),
        isRunning: true
      });
      this.interval = setInterval(this.tick.bind(this), 1000);
    }

  }
  tick() {
    this.setState({ elapsed: Moment().diff(this.state.raceStart) });
  }
}
