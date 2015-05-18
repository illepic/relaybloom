'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './App';
import Tracker from '../components/sections/Tracker';
import Team from '../components/sections/Team';
import Profile from '../components/sections/Profile';
import Races from '../components/sections/Races';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Tracker}/>
    <Route name="tracker" path="/tracker" handler={Tracker}/>
    <Route name="team" path="/team" handler={Team}/>
    <Route name="profile" path="/profile" handler={Profile}/>
    <Route name="races" path="/races" handler={Races}/>
  </Route>
);
