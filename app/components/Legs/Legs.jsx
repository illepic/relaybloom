import React from 'react';
import {Parse} from 'parse';
import ParseComponent from 'parse-react/class';

import Leg from '../Leg/Leg';

export default class Legs extends ParseComponent {
  constructor() {
    super();
  }

  observe(props, state) {
    return {
      legs: (new Parse.Query("Leg")).include("racer").ascending('legId')
    };
  }

  render() {

    //console.log(this.data.legs);

    return (
      <div className="legs">
        {this.data.legs.map(function(leg, index) {
          return (
            <div className="legs__item" key={index}>
              <p>LegId: {leg.legId}</p>
              <p>Runner: {leg.racer.name}</p>
              <p>targetsplit: {leg.targetSplit}</p>
              <p>isActive: {(leg.isActive) ? 'active' : 'not active'}</p>
            </div>
          );
        }, this)}
      </div>
    );
  }

}