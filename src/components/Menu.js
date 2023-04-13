import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import styled from "styled-components";

const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: dark-blue;
  backdrop-filter: blur(5px);
`;

const MenuItem = styled(NavLink)`
  padding: 20px;
  text-decoration: none;
  color: white;
`;

const Menu = () => {
  let history = useHistory();

  const handleRouteChange = (path) => {
    history.push(path);
  }

  return (
    <MenuContainer>
      <MenuItem to="/" onClick={() => handleRouteChange('/')}>TV Shows</MenuItem>
      <MenuItem to="/suggestion" onClick={() => handleRouteChange('/suggestion')}>Suggestion</MenuItem>
      <MenuItem to="/my-list" onClick={() => handleRouteChange('/my-list')}>My List</MenuItem>
    </MenuContainer>
  );
}

export default Menu;
