'use strict';

import React from 'react';
import Router from 'react-router';

import Pages from './routes';

Router.run(Pages, function (Handler, state) {
  let params = state.params;
  React.render(<Handler params={params}/>, document.getElementById("relayBloomApp"));
});
