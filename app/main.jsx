'use strict';

import React from 'react';
import Router from 'react-router';

import Pages from './routes';

Router.run(Pages, function (Handler, state) {
  React.render(<Handler params={state.params}/>, document.getElementById("relayBloomApp"));
});
