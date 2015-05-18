'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './App';
import Tracker from '../components/Tracker';
import Team from '../components/Team';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Tracker}/>
    <Route name="tracker" path="/tracker" handler={Tracker}/>
    <Route name="team" path="/team" handler={Team}/>
    <Route name="profile" path="/profile" handler={Tracker}/>
    <Route name="races" path="/races" handler={Tracker}/>
  </Route>
);
