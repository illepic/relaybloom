'use strict';

import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';

const relayBloomIcon = (
  <a href="#"><Glyphicon glyph='road'/> <span>RELAYbloom v0.0.1</span></a>
);

export default class RelayBloomNav extends React.Component {
  render() {
    return (
      <Navbar brand={relayBloomIcon} inverse toggleNavKey={0}>
        <Nav eventKey={0}>
          <NavItemLink to='tracker' eventKey={1} params={{trackerId:"hutipkX3QL"}}><Glyphicon glyph='dashboard'/> Race Tracker</NavItemLink>
          <NavItemLink to='team' eventKey={2}><Glyphicon glyph='tent'/> Team (Coming Soon)</NavItemLink>
          <NavItemLink to='profile' eventKey={3}><Glyphicon glyph='user'/> Profile (Coming Soon)</NavItemLink>
          <NavItemLink to='races' eventKey={4}><Glyphicon glyph='tasks'/> Races (Coming Soon)</NavItemLink>
        </Nav>
      </Navbar>
    );
  }
}
