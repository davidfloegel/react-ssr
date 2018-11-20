import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
  width: 100%;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  margin: 0 10px;

  &:hover,
  &:visited,
  &:focus {
    color: #2980b9;
  }
`;

const Nav = () => (
  <NavBar>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/lyrics">Remote Data</NavLink>
    <NavLink to="/private">Private</NavLink>
  </NavBar>
);

export default Nav;
