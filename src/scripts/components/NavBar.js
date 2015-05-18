'use strict';

import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

let relayBloomIcon = (
  <span><Glyphicon glyph='road'/> RELAYbloom</span>
);

export default class RelayBloomNav extends React.Component {
  render() {
    return (
      <Navbar brand={relayBloomIcon} inverse toggleNavKey={0}>
        <Nav eventKey={0}>
          <NavItem eventKey={1} active href='#/tracker'><Glyphicon glyph='dashboard'/> Race Tracker</NavItem>
          <NavItem eventKey={2} href='#/team'><Glyphicon glyph='tent'/> Team</NavItem>
          <NavItem eventKey={3} href='#/user'><Glyphicon glyph='user'/> Profile</NavItem>
          <NavItem eventKey={4} href='#/races'><Glyphicon glyph='tasks'/> Races</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
