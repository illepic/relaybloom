'use strict';

import React from 'react';
import Router from 'react-router';

import Pages from './routes';

Router.run(Pages, function (Handler) {
  React.render(<Handler />, document.getElementById('relayBloomAppv2'));
});
