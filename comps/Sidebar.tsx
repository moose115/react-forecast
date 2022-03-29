import React from 'react';
import styled from 'styled-components';
import SidebarCurrent from './SidebarCurrent';
import SidebarSearch from './SidebarSearch';

const NavContainer = styled.nav`
  padding: 2em;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-flow: column;
  backdrop-filter: blur(20px);
  grid-area: sidebar;
  position: relative;
  font-size: 1.5rem;
`;

const Nav = () => {
  return (
    <NavContainer>
      <SidebarSearch />
      <SidebarCurrent />
    </NavContainer>
  );
};

export default Nav;
