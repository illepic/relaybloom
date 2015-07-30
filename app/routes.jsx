'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './components/App';
import TrackerWrapper from './sections/TrackerWrapper';
//import Team from '../src/scripts/components/sections/Team';
//import Profile from '../src/scripts/components/sections/Profile';
//import Races from '../src/scripts/components/sections/Races';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={TrackerWrapper}/>
  </Route>
);



//<Route name="tracker" path="/tracker" handler={TrackerWrapper}/>
//<Route name="team" path="/team" handler={Team}/>
//<Route name="profile" path="/profile" handler={Profile}/>
//<Route name="races" path="/races" handler={Races}/>
