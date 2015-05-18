'use strict';

import React from 'react';
import Tracker from './Tracker';

import RaceData from '../../data/race';

// A way for us to pass props to just this
export default class TrackerWrapper extends React.Component {
  render() {
    return (
      <Tracker appdata={RaceData}/>
    );
  }
}
