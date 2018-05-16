/*
Techdegree| Project 10
=====================================================================================
by Humberto Ventura
=====================================================================================
*/

import React from 'react';
import Item from './Item';


const Nav= (props) => (
  <nav className="main-nav">
    <ul>
      <Item url="/cats" name="cats"/>
      <Item url="/dogs" name="dogs"/>
      <Item url="/coffee" name="coffee" />
    </ul>
  </nav>
);

export default Nav;
