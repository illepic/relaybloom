'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './components/App';
import TrackerWrapper from './sections/TrackerWrapper';
import Team from './sections/Team';
import Profile from './sections/Profile';
import Races from './sections/Races';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={TrackerWrapper}/>
    <Route name="tracker" path="/tracker" handler={TrackerWrapper}/>
    <Route name="team" path="/team" handler={Team}/>
    <Route name="profile" path="/profile" handler={Profile}/>
    <Route name="races" path="/races" handler={Races}/>
  </Route>
);





