'use strict';

import React from 'react';
import Router from 'react-router';

import RelayBloomNav from './../NavBar';

const RouteHandler = Router.RouteHandler;

require('bootswatch/flatly/bootstrap.min.css');
require('./app.scss');


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <RelayBloomNav />
        <RouteHandler/>
      </div>
    );
  }
}
