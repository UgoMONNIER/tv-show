import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.nav`
  height: 80px;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: dark-blue;
`;

const MenuItem = styled(NavLink)`
  padding: 20px;
  text-decoration: none;
  color: white;

  &.active {
    border-bottom: 2px solid #CCC;
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem exact to="/" activeClassName="active">
        TV Shows
      </MenuItem>
      <MenuItem to="/my-list" activeClassName="active">
        My List
      </MenuItem>
      <MenuItem to="/suggestions" activeClassName="active">
        Suggestion
      </MenuItem>
    </MenuContainer>
  );
};

export default Menu;
