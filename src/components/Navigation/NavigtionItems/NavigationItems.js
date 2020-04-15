import React from 'react';
import classes from './NaviItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => (
      <ul className={classes.NavigationItems}>
          <NavigationItem exact link ='/'>Burger Builder </NavigationItem>
          <NavigationItem link ='/orders' >Checkout</NavigationItem>
      </ul>      
    );

export default navigationItems;