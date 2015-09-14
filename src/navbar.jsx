import React from "react";
import {
  Navbar
}  from "react-bootstrap";
const navbarInstance = (
  <Navbar brand='React-Bootstrap'>
  </Navbar>
);
export default class NavbarComponent extends React.Component{
  render(){
    return navbarInstance;
  }
}
