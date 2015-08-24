'use strict';

import React from 'react';
import Router from 'react-router';
const RouteHandler = Router.RouteHandler;

import RelayBloomNav from './../NavBar';

require('./app.scss');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <RelayBloomNav {...this.props}/>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}
