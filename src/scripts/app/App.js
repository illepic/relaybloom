'use strict';

import React from 'react';
import Router from 'react-router';

import RelayBloomNav from '../components/NavBar';
const RouteHandler = Router.RouteHandler;

require('bootswatch/flatly/bootstrap.min.css');
require('./app.css');


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <RelayBloomNav />
        <RouteHandler />
      </div>
    );
  }
}
