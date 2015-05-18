'use strict';

import React from 'react';
import Router from 'react-router';

import RelayBloomNav from '../components/NavBar';
const RouteHandler = Router.RouteHandler;

import RaceData from '../data/race';

require('bootswatch/flatly/bootstrap.min.css');
require('./app.css');


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
        <RouteHandler appdata={RaceData}/>
      </div>
    );
  }

  handoff() {
    console.log('handoff clicked');

    if (this.state.isRunning) {
      this.setState({isRunning: false});
      clearInterval( this.interval );
    }
    else {
      this.setState({
        raceStart: moment(),
        isRunning: true
      });
      this.interval = setInterval(this.tick.bind(this), 1000);
    }

  }
  tick() {
    this.setState({ elapsed: moment().diff(this.state.raceStart) });
  }
}
