/*
Techdegree| Project 10
=====================================================================================
by Humberto Ventura
=====================================================================================
*/

import React from 'react';
import { NavLink } from 'react-router-dom';

const Item = ({url, name}) => (
  <li><NavLink to={url}>{name}</NavLink></li>
);

export default Item;
