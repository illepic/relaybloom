'use strict';

import React from 'react';
import Router from 'react-router';

import Pages from './routes';

Router.run(Pages, function (Handler) {
  const app = document.createElement('div');
  document.body.appendChild(app);

  React.render(<Handler />, app);
});
