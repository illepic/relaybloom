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
    // this.props.race is a Parse Race object set to the race loaded via url
    return {
      legs: (new Parse.Query("Leg").equalTo("race", this.props.race)).include("racer").ascending('legId')
    };
  }

  render() {
    //console.log(this.props.raceId);
    //console.log(this.data.legs);
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