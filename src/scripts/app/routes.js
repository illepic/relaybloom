'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './App';
import Tracker from './../components/Tracker';

export default (
  <Route name="tracker" path="/" handler={App}>
    <DefaultRoute handler={Tracker}/>
    <Route name="team" path="/team" handler={Tracker}/>
    <Route name="profile" path="/profile" handler={Tracker}/>
    <Route name="races" path="/races" handler={Tracker}/>
  </Route>
);
