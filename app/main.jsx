'use strict';

import React from 'react';
import Router from 'react-router';

import Pages from './routes';

main();

// For now let's just inject an element via js
function main() {
  const app = document.createElement('div');
  app.setAttribute("id", "relayBloomApp");
  document.body.insertBefore(app, document.body.firstChild);
}

// Let our router have at it
Router.run(Pages, function (Handler, state) {
  let params = state.params;
  React.render(<Handler params={params}/>, document.getElementById("relayBloomApp"));
});

