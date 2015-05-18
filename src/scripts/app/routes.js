'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './App';
import TrackerWrapper from '../components/sections/TrackerWrapper';
import Team from '../components/sections/Team';
import Profile from '../components/sections/Profile';
import Races from '../components/sections/Races';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={TrackerWrapper}/>
    <Route name="tracker" path="/tracker" handler={TrackerWrapper}/>
    <Route name="team" path="/team" handler={Team}/>
    <Route name="profile" path="/profile" handler={Profile}/>
    <Route name="races" path="/races" handler={Races}/>
  </Route>
);
