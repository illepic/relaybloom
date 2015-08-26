import React from 'react';
import {Parse} from 'parse';
import ParseComponent from 'parse-react/class';

import Leg from '../Leg/Leg';

export default class Legs extends ParseComponent {
  constructor() {
    super();
  }

  observe(props, state) {

    // Our props changed via currentLeg, a sign websockets told us to update
    if (props.currentLeg != 0) {
      this.refreshQueries();
    }

    // this.props.race is a Parse Race object set to the race loaded via url
    return {
      legs: (new Parse.Query("Leg").equalTo("race", this.props.race)).include("racer").ascending('legId')
    };
  }

  refresh () {
    this.refreshQueries();
  }

  render() {
    let accumulatedTime = 0;
    let activeLeg = 0;

    return (
      <div className="legs">
        {this.data.legs.map(function(leg, index) {

          let estimates = {
            estimatedStart: 0,
            estimatedEnd: 0
          };

          // From active leg onward we should start accumulating
          if (leg.isActive) {
            activeLeg = leg.legId;

            // Active should only estimate it's end, but start accumulating
            accumulatedTime = leg.dateStarted + accumulatedTime + leg.targetSplit;
            estimates.estimatedEnd = accumulatedTime;
          }

          // Leg is after active
          if (activeLeg > 0 && leg.legId > activeLeg) {
            estimates.estimatedStart = accumulatedTime;
            accumulatedTime += leg.targetSplit;
            estimates.estimatedEnd = accumulatedTime;
          }

          return (
            <div className="legs__item" key={index}>
              <Leg legData={leg} legEstimates={estimates}/>
            </div>
          );
        }, this)}
      </div>
    );
  }

}
