import React from 'react';
import {Parse} from 'parse';
import ParseComponent from 'parse-react/class';
import _ from 'lodash';

import Leg from '../Leg/Leg';

export default class Legs extends ParseComponent {
  constructor() {
    super();
  }

  observe(props, state) {
    return {
      legs: new Parse.Query("Leg").include("racer").ascending('legId')
    };
  }

  render() {
    console.log(this.data.legs);
    return (
      <div className="legs">
        {this.data.legs.map(function(leg, index) {
          return (
            <div className="legs__item" key={index}>
              <Leg legData={leg}/>
            </div>
          );
        }, this)}
      </div>
    );
  }

}